export default {
  name: "hugg",
  alias: ["abrazo"],
  description: "Envía un mensaje de abrazo a un usuario mencionado",
  use: ".hug @usuario",
  run: async (socket, msg, args) => {
    // Extrae el nombre de usuario del primer argumento
    const mention = args[0].replace("@", "");

    // Comprueba si se mencionó a un usuario

    // Lista de videos de abrazos
    const hugVideos = [
      "https://cdn.discordapp.com/attachments/1194154476702027778/1209224528958332928/34RE2EWe.mp4?ex=65e6251a&is=65d3b01a&hm=42d7a27ca264be9155f5b16cef4d258ed3a9a3d75a5facd597ca48884d12b70b&",
      "https://cdn.discordapp.com/attachments/1194154476702027778/1208510729603522570/VID-20240213-WA0087.mp4?ex=65e38c52&is=65d11752&hm=91d056ad5ffe52935341cd3629670f70d39cf5e8f8878c665ff68713f702a0fa&",
      "https://cdn.discordapp.com/attachments/1194154476702027778/1209224529294008401/8veG9wrny.mp4?ex=65e6251a&is=65d3b01a&hm=3af20e882ad237d97229e247cbc05a07c5715f3663d28ab559eefb587dfe1304&",
      "https://cdn.discordapp.com/attachments/1194154476702027778/1209224529604517958/kJGA1tpO.mp4?ex=65e6251a&is=65d3b01a&hm=11a82689cf507de24b22ccaa8cc870bcd7f57b695c6d6f5f33daace448ce6315&",
      "https://cdn.discordapp.com/attachments/1194154476702027778/1209224529969156236/gsJ_MC4a.mp4?ex=65e6251a&is=65d3b01a&hm=64e02ecf2c3ca459df8bc55266947bba48bdccd015e0a5923775c04c73c35661&",
      "https://cdn.discordapp.com/attachments/1194154476702027778/1209224530233659512/HGVIl-bq.mp4?ex=65e6251a&is=65d3b01a&hm=942a683162fe9e1165f77f1990a77870ae8a034a261beb85a3429374d7d9516e&"
    ];

    // Obtener un video de abrazo aleatorio
    const randomHugVideo = hugVideos[Math.floor(Math.random() * hugVideos.length)];

    // Enviar video con caption
    await socket.sendMessage(msg.messages[0].key.remoteJid, {
      video: { url: randomHugVideo },
      mimetype: "video/mp4",
      caption: `¡Un cálido abrazo para @${mention}!`,
      mentions: [`${mention}@s.whatsapp.net`],
      gifPlayback: true
    },
    {
      quoted: msg.messages[0]
    });
  },
};
