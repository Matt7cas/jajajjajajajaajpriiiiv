import ytdl from "@distube/ytdl-core";
import ytSearch from "yt-search";
import axios from "axios";  // Asegúrate de tener axios instalado mediante npm install axios

export default {
  name: "videodocument",
  description: "Descarga videos de Youtube.",
  alias: ["vdd", "vidcument", "vídeodocument", "ytdocument"],
  use: "!video 'nombre o url'",

  run: async (socket, msg, args) => {
    let message;

    try {
      const query = args.join(" ");

      if (!query) {
        return socket.sendMessage(msg.messages[0].key.remoteJid, {
          text: "Ingresa el nombre o URL del vídeo.",
        });
      }

      // Enviar mensaje inicial
      message = await socket.sendMessage(msg.messages[0].key.remoteJid, {
        text: `El archivo se está enviando...`},{
          quoted: msg.messages[0]
      });

      const video = (await ytSearch(query)).all.find((i) => i.type === "video");

      if (!video) {
        // Actualizar mensaje si no hay resultados
        await socket.sendMessage(message.key.remoteJid, {
          text: "Sin resultados disponibles.",
          edit: message.key,
        });

        return socket.sendMessage(msg.messages[0]?.key.remoteJid, {
          react: { text: "❌", key: msg.messages[0]?.key },
        });
      }

      const url = `http://141.144.253.29:25689/mp4?url=${video.url}&key=3vWedXiN3M56f27OLpGEy2QW`;

      await socket.sendMessage(msg.messages[0]?.key.remoteJid, {
        document: { url },
        fileName: video.title,
        mimetype: "video/mp4",
        caption: `*Duración > ${video.timestamp}*\n*Vistas > ${video.views}*\n*Autor > ${video.author.name}*`,
      });

      // Cambiar mensaje a "Se ha enviado con éxito el vídeo"
      socket.sendMessage(message.key.remoteJid, {
        text: "Se ha enviado con éxito el archivo🎉",
        edit: message.key,
      });
    } catch (error) {
      console.error(error);

      // Mensaje de error
      if (message) {
        await socket.sendMessage(msg.messages[0].key.remoteJid, {
          text: "¡Ups! Acaba de suceder un error inesperado.",
          edit: message.key,
        });
      }

      socket.sendMessage(msg.messages[0]?.key?.remoteJid, {
        react: { text: "❌", key: msg.messages[0]?.key },
      });
    }
  },
};
