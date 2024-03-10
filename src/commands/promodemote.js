export default {
  name: "demote",
  alias: ["d", "quitaradmin"],
  description: "Quitar privilegios de administrador a un miembro del grupo",
  use: "!demote [mención]",
  run: async (socket, msg, args) => {
    try {
      // Verificar si el comando se ejecuta en un grupo
      if (!msg.messages[0].key.remoteJid.endsWith('@g.us')) {
        await socket.sendMessage(msg.messages[0].key.remoteJid, { text: "Este comando solo funciona en grupos." });
        return;
      }

      // Obtener la información del grupo
      const group = msg.messages[0].key.remoteJid;
      const groupInfo = await socket.groupMetadata(group, true);

      // Verificar si el mensaje contiene una mención
      if (!msg.messages[0].message.extendedTextMessage || !msg.messages[0].message.extendedTextMessage.contextInfo || !msg.messages[0].message.extendedTextMessage.contextInfo.mentionedJid) {
        await socket.sendMessage(group, { text: "No se proporcionó la mención del usuario." });
        return;
      }

      // Obtener la ID del usuario mencionado
      const mentioned = msg.messages[0].message.extendedTextMessage.contextInfo.mentionedJid[0];


      // Quitar privilegios de administrador al usuario
      await socket.groupParticipantsUpdate(group, [mentioned], "demote");
      await socket.sendMessage(group, { text: `el usuario ya no es administrador.`});
    } catch (error) {
      await socket.sendMessage(msg.messages[0].key.remoteJid, { text: `Error: ${error}` });
    }
  }
};
