export default {
  name: "add",
  alias: ["agregarusuario", "agregaa"],
  description: "Añadir un miembro al grupo",
  use: "!add [numero]",
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

        const phoneNumber = args[0];

        if (!phoneNumber || isNaN(phoneNumber)) {
          await socket.sendMessage(group, { 
              text: "Por favor, proporciona un número de teléfono válido." });
          return;
        }

        const userToAdd = `${phoneNumber}@s.whatsapp.net`;

        await socket.groupParticipantsUpdate(group, [userToAdd], "add");
        await socket.sendMessage(group, { 
            text: `El usuario ha sido agregado correctamente.` },
 {
            quoted:msg.messages[0] });
      } else {
        await socket.sendMessage(msg.messages[0].key.remoteJid, { text: "Este comando solo funciona en grupos." });
      }
    } catch (error) {
      await socket.sendMessage(msg.messages[0].key.remoteJid, { text: `Error: ${error}` });
    }
  }
};
