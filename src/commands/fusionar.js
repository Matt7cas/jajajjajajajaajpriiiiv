import axios from "axios";

export default {
  name: "fusionaremojis",
  alias: ["emojimix", "fusimoji"],
  description: "Fusiona dos emojis y envía la imagen.",
  use: "<emoji1> <emoji2>",
  run: async (socket, msg, args) => {
    // Validar argumentos
    if (args.length !== 2) {
      socket.sendMessage(
        msg.messages[0].key.remoteJid,
        { text: "Debes enviar dos emojis separados con un espacio." }
      );
      return;
    }

    const emoji1 = encodeURIComponent(args[0]);
    const emoji2 = encodeURIComponent(args[1]);

    try {
      // Obtener URL de la imagen fusionada
      const response = await axios.get(
        `http://141.144.253.29:25689/emojimix?emojis=${emoji1}_${emoji2}&key=3vWedXiN3M56f27OLpGEy2QW`
      );

      // Enviar imagen
      socket.sendMessage(msg.messages[0].key.remoteJid, {
        image: { url: response.data.url }},{
          quoted: msg.messages[0]
      });
    } catch (error) {
      console.error("Error al obtener la imagen fusionada:", error.message);
      socket.sendMessage(
        msg.messages[0].key.remoteJid,
        { text: "No existe una imagen para esa fusion."},{
        quoted: msg.messages[0]}, 
          {
              quoted: msg.messages[0] }
      );
    }
  },
};
