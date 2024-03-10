import { TiktokDL } from "@tobyg74/tiktok-api-dl";
import { mediaFromUrl } from "../functions/mediaFromUrl.js";

export default {
  name: "tiktokaudio",
  alias: ["tikaud"],
  description: "Descarga y envía el audio de un video de TikTok.",
  use: "!tiktokaudio 'url'",

  run: async (socket, msg, args) => {
    try {
      const url = args.join(" ");

      if (!url) {
        socket.sendMessage(msg.messages[0]?.key.remoteJid, {
          text: "Ingrese la URL del video de TikTok del cual desea descargar el audio.",
        });
        return;
      }

      const regexp = /^(https?:\/\/)?(www\.|vm\.)?tiktok\.com\/[@a-zA-Z0-9_.~=\/-?]+/i;

      if (!regexp.test(url)) {
        socket.sendMessage(msg.messages[0]?.key.remoteJid, {
          text: "URL inválida.",
        });
        return;
      }

      // Enviar mensaje de espera
      const message = await socket.sendMessage(msg.messages[0]?.key.remoteJid, {
        text: `El audio se está enviando...`,
      });

      socket.sendMessage(msg.messages[0]?.key.remoteJid, {
        react: { text: "⏳", key: msg.messages[0]?.key },
      });

      const { status, result } = await TiktokDL(url, { version: "v3" });

      if (status !== "success") {
        // Mensaje de error
        await socket.sendMessage(msg.messages[0]?.key.remoteJid, {
          text: "Ha ocurrido un error, vuelve a intentarlo.",
          edit: message.key,
        });

        return;
      }

      await new Promise(async (resolve, reject) => {
        if (result.type === "video") {
          const audioUrl = result.video2;

          const audioData = await mediaFromUrl(audioUrl);

          if (audioData === "limit exceeded") {
            // Mensaje si el audio excede el límite de peso permitido
            await socket.sendMessage(msg.messages[0]?.key?.remoteJid, {
              text: "No pude enviar el audio ya que supera el límite de peso permitido.",
              edit: message.key,
            });

            socket.sendMessage(msg.messages[0]?.key?.remoteJid, {
              react: { text: "❌", key: msg.messages[0]?.key },
            });
            return;
          }

          // Enviar el audio
          await socket.sendMessage(msg.messages[0]?.key.remoteJid, {
            audio: audioData.data,
            mimetype: "audio/mp4",
          });

          audioData.data = null;

          resolve(true);
        }
      });

      // Cambiar mensaje a "Se ha enviado con éxito el archivo"
      socket.sendMessage(message.key.remoteJid, {
        text: "*El audio se ha enviado con éxito 🎉*",
        edit: message.key,
      });

      // React al mensaje original
      socket.sendMessage(msg.messages[0]?.key.remoteJid, {
        react: { text: "✅", key: msg.messages[0]?.key },
      });
    } catch (error) {
      console.error(error);

      // Mensaje de error general
      socket.sendMessage(msg.messages[0]?.key.remoteJid, {
        text: "Sucedió un error inesperado.",
      });
    }
  },
};
q