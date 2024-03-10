import translate from 'translate-google';

export default {
  name: "traductor",
  alias: ["traduce"],
  description: "Traduce mensajes al español.",
  use: "!traduce <tu texto>",
  run: async (socket, msg, args) => {
    const userMessage = args.join(" ");

    try {
      // Lógica de traducción usando la biblioteca translate-google
      const translatedText = await translate(userMessage, { to: 'es' });

      // Envío del mensaje traducido
      socket.sendMessage(msg.messages[0].key.remoteJid, {
        text: `Mensaje original: ${userMessage}\nTraducción: ${translatedText}`,
      });
    } catch (error) {
      console.error("Error al traducir el mensaje:", error);
      socket.sendMessage(msg.messages[0].key.remoteJid, {
        text: "Hubo un error al traducir el mensaje. Por favor, intenta de nuevo más tarde.",
      });
    }
  }
};
