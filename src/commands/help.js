import { readFile } from "node:fs";

export default {

 name: "help",

 description: "Lista de comandos o detalles de estos.",

 alias: ["ayuda", "h"],

 use: "!help (comando)",

 run: (socket, msg, args) => {

    const name = args.join(" ");

    const command = socket.commands.find((c) => {

      return c.name === name || c.alias.includes(name);

    });

    if (!name || !command) {

      const commands = socket.commands.map((c) => c.name).join("\n");

      socket.sendMessage(msg.messages[0].key.remoteJid, {

        text: `*Mis comandos [${socket.commands.length}]:*\n${commands}\n\nPara ver todas las especificaciones de cada código utiliza '!help (comando)'.`,

      });

      return;

    }

    const info = `*Información del comando: ${command.name}*\n${

      command.description

    }\n\nAlias: ${command.alias.join(", ") || "Sin alias"}\n\nUso: ${

      command.use

    }\n\n'Obligatorio' (Opcional)\n\nPara ver todas las especificaciones de cada código utiliza '!help (comando)'.`;

    socket.sendMessage(msg.messages[0].key.remoteJid, {

      text: info,

    });

 },

};