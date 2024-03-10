export default {
  name: "groupinfo",
  alias: ["ginfo"],
  description: "Obtener información del grupo",
  use: "!groupInfo",
  run: async (socket, msg, args) => {
    try {
      // Verificar si el comando se ejecutó en un grupo
      if (!msg.messages[0].key.remoteJid.endsWith('@g.us')) {
        await socket.sendMessage(msg.messages[0].key.remoteJid, {
          text: "Este comando solo funciona en grupos.",
        });
        return;
      }

      const groupInfo = await socket.groupMetadata(msg.messages[0].key.remoteJid);

      // Extraer nombre, descripción y cantidad de usuarios del grupo
      const groupName = groupInfo.subject || "Sin nombre";
      const groupDescription = groupInfo.desc || "Sin descripción";
      const totalMembers = groupInfo.participants.length || 0;

      // Enviar la información como mensaje
      await socket.sendMessage(msg.messages[0].key.remoteJid, {
        text: `Nombre del grupo: *${groupName}*\n\nDescripción: *${groupDescription}*\n\nCantidad de usuarios: *${totalMembers}*\n\nImagen del grupo:`},{
          quoted: msg.messages[0]
      });

      // Obtener la URL de la imagen del grupo en alta resolución
      const groupImage = await socket.profilePictureUrl(msg.messages[0].key.remoteJid, 'image');

      if (groupImage) {
        // Enviar la imagen del grupo
        await socket.sendMessage(msg.messages[0].key.remoteJid, {
            image:  { url: groupImage },
          caption: "Aquí está la imagen del grupo",
        });
      } else {
        // Si el grupo no tiene una imagen de perfil
        await socket.sendMessage(msg.messages[0].key.remoteJid, { text: "Este grupo no tiene imagen de perfil." });
      }
    } catch (error) {
      await socket.sendMessage(msg.messages[0].key.remoteJid, {
        text: `Error al obtener información del grupo: ${error}`,
      });
    }
  },
};
