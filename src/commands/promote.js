export default {
  name: "promote",
  alias: ["p"],
  description: "Promover a un usuario a administrador del grupo",
  use: "!promote [mención]",
  run: async (socket, msg, args) => {
    try {
      const groupInfo = await socket.groupMetadata(msg.messages[0].key.remoteJid, true);

      // Verificar si el que ejecuta el comando es administrador
      const sender = msg.messages[0].key.participant;
      const senderParticipant = groupInfo.participants.find(x => x.id === sender);
      if (!senderParticipant || !senderParticipant.admin) {
        await socket.sendMessage(msg.messages[0].key.remoteJid, { text: "No tienes permisos para ejecutar este comando." });
        return;
      }

      // Verificar si se proporcionó la mención del usuario a promover
      if (!msg.messages[0].message.extendedTextMessage || !msg.messages[0].message.extendedTextMessage.contextInfo || !msg.messages[0].message.extendedTextMessage.contextInfo.mentionedJid) {
        await socket.sendMessage(msg.messages[0].key.remoteJid, { text: "No se proporcionó la mención del usuario." });
        return;
      }

      const mentioned = msg.messages[0].message.extendedTextMessage.contextInfo.mentionedJid[0];

      // Verificar si el usuario mencionado es parte del grupo
      const isMember = groupInfo.participants.some(participant => participant.id === mentioned);
      if (!isMember) {
        await socket.sendMessage(msg.messages[0].key.remoteJid, { text: "El usuario mencionado no es miembro del grupo." });
        return;
      }

      // Promover al usuario a administrador
      await socket.groupParticipantsUpdate(msg.messages[0].key.remoteJid, [mentioned], "promote");

      await socket.sendMessage(msg.messages[0].key.remoteJid, { text: `Se ha promovido a administrador.`});
    } catch (error) {
      await socket.sendMessage(msg.messages[0].key.remoteJid, { text: `Error: ${error}` });
    }
  }
};
