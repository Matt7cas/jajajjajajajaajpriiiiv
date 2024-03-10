export default {
  name: "getpp",
  alias: ["imagenperfil"],
  description: "Obtener la imagen de perfil en alta resolución de un usuario (si el ususario no tiene foto de perfil, habrá un error).",
  use: "!getpp @usuario",
  run: async (socket, msg, args) => {
    // Validar si se proporcionó una mención
    if (!msg.messages[0].message.extendedTextMessage || !msg.messages[0].message.extendedTextMessage.contextInfo || !msg.messages[0].message.extendedTextMessage.contextInfo.mentionedJid) {
      await socket.sendMessage(msg.messages[0].key.remoteJid, { text: "No se proporcionó la mención del usuario." });
      return;
    }

    // Obtener la ID del usuario mencionado
    const mentioned = msg.messages[0].message.extendedTextMessage.contextInfo.mentionedJid[0];

    try {
      // Obtener la URL de la imagen de perfil en alta resolución
      const ppUrl = await socket.profilePictureUrl(mentioned, 'image');

      if (ppUrl) {
        // Mostrar la imagen
        await socket.sendMessage(msg.messages[0].key.remoteJid, {
            image: { url: ppUrl },
          caption: "Aquí está la imagen de perfil en alta resolución:"},
                                 {
            quoted: msg.messages[0]
        });
      } else {
        // Informar que el usuario no tiene foto de perfil
        await socket.sendMessage(msg.messages[0].key.remoteJid, { text: "Este usuario no tiene foto de perfil." });
      }
    } catch (error) {
      await socket.sendMessage(msg.messages[0].key.remoteJid, { text: `Error al obtener la imagen de perfil: ${error}`}, {
                              quoted:msg.messages[0]
                               
                               });
    }
  },
};

