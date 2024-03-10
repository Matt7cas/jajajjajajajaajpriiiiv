import { Hercai } from "hercai";

export default {
  name: "imagegenerator",
  description: "Genera una imagen con Hercai.",
  alias: ["img", "imagen", "foto"],
  use: "!generateImage 'modelo' 'prompt' 'negative_prompt'",

  run: async (socket, msg, args) => {
    try {
      const prompt = args.join(" ") || "anime girl";

      // Enviar mensaje de espera
      const message = await socket.sendMessage(msg.messages[0].key.remoteJid, {
        text: "Generando imagen...",
      });

      socket.sendMessage(msg.messages[0].key.remoteJid, {
        react: { text: "📷", key: msg.messages[0]?.key },
      });

      const response = await new Hercai().drawImage({
        model: "v3",
        prompt,
        negative_prompt: "",
      });

      // Enviar la imagen generada
      await socket.sendMessage(msg.messages[0].key.remoteJid, {
        image: {
          url: response.url,
        },
      });

      // Cambiar mensaje a "Imagen generada con éxito"
      socket.sendMessage(message.key.remoteJid, {
        text: "*Imagen generada con éxito 🎨*",
        edit: message.key,
      });

      // React al mensaje original
      socket.sendMessage(msg.messages[0].key.remoteJid, {
        react: { text: "✅", key: msg.messages[0]?.key },
      });
    } catch (error) {
      console.error(error);

      // Mensaje de error general
      await socket.sendMessage(msg.messages[0].key.remoteJid, {
        text: "Sucedió un error inesperado al generar la imagen.",
      });

      // React al mensaje original con error
      socket.sendMessage(msg.messages[0].key.remoteJid, {
        react: { text: "❌", key: msg.messages[0]?.key },
      });
    }
  },
};
