export default {
  name: "kick",
  alias: ["k", "expulsar"],
  description: "Expulsar a un miembro del grupo",
  use: "!kick [mención]",
  run: async (socket, msg, args) => {
    try {
      const sender = msg.messages[0].key.participant;
      const groupInfo = await socket.groupMetadata(msg.messages[0].key.remoteJid, true);
      const participant = groupInfo.participants.find(x => x.id === sender);

      // Validar si el usuario que ejecuta el comando es administrador
      if (!participant || !participant.admin) {
        await socket.sendMessage(msg.messages[0].key.remoteJid, { text: "No tienes permisos para ejecutar este comando." });
        return;
      }

      if (msg.messages[0].key.remoteJid.endsWith('@g.us')) {
        const group = msg.messages[0].key.remoteJid;
        const groupInfo = await socket.groupMetadata(group, true);

        if (!msg.messages[0].message.extendedTextMessage || !msg.messages[0].message.extendedTextMessage.contextInfo || !msg.messages[0].message.extendedTextMessage.contextInfo.mentionedJid) {
          await socket.sendMessage(group, { text: "No se proporcionó la mención del usuario." });
          return;
        }

        const mentioned = msg.messages[0].message.extendedTextMessage.contextInfo.mentionedJid[0];

        // Evitar expulsar al número específico
        if (mentioned === "5492644161376@s.whatsapp.net") {
          await socket.sendMessage(group, { text: "No puedo expulsarme a mi mismo."}, {
          quoted: msg.messages[0]});
          return;
        }

        // Evitar que el usuario se expulse a sí mismo
        if (mentioned === sender) {
          await socket.sendMessage(group, { text: "No puedes expulsarte a ti mismo." },
                                  {
                                  quoted: msg.messages[0], 
          });
          return;
        }

        const isUserAdmin = groupInfo.participants.some(participant => participant.id === mentioned && (participant.isAdmin || participant.isSuperAdmin || participant.isCreator));

        await socket.groupParticipantsUpdate(group, [mentioned], "remove");
        await socket.sendMessage(group, { text: `el usuario ha sido expulsado exitosamente.`},
                                 {
            quoted:msg.messages[0]
        });
      } else {
        await socket.sendMessage(msg.messages[0].key.remoteJid, { text: "Este comando solo funciona en grupos." });
      }
    } catch (error) {
      await socket.sendMessage(msg.messages[0].key.remoteJid, { text: `Error: ${error}` });
    }
  }
};
