import fs from 'fs';

export default {
 name: "temporizador",
 alias: [],

 run: async (socket, msg, args) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Valida el formato del tiempo
        const timeRegex = /^(?:(\d+)\s*h)?\s*(?:(\d+)\s*m)?\s*(?:(\d+)\s*s)?$/;
        const timeMatch = timeRegex.exec(args.join(" "));

        if (!timeMatch) {
          return socket.sendMessage(msg.messages[0].key.remoteJid, {
            text: "Formato de tiempo inválido. Por favor, utiliza '0h 0m 10s' o '10s' por ejemplo."
          });
        }

        const hours = parseInt(timeMatch[1] || 0);
        const minutes = parseInt(timeMatch[2] || 0);
        const seconds = parseInt(timeMatch[3] || 0);

        const totalMilliseconds = (hours * 3600000) + (minutes * 60000) + (seconds * 1000);

        // Envía un mensaje de confirmación
        socket.sendMessage(msg.messages[0].key.remoteJid, {
          text: `Temporizador configurado para ${hours}h ${minutes}m ${seconds}s.`},{
            quoted: msg.messages[0]
        });

        // Retrasa el mensaje usando setTimeout
        setTimeout(async () => {
          await socket.sendMessage(msg.messages[0].key.remoteJid, {
            text: "¡El tiempo ha terminado!"
          });
          resolve();
        }, totalMilliseconds);
      } catch (error) {
        console.error("Error al configurar el temporizador:", error);
        socket.sendMessage(msg.messages[0].key.remoteJid, {
          text: "Se ha producido un error al configurar el temporizador. Por favor, inténtalo de nuevo."
        });
        reject(error);
      }
    });
 }
};