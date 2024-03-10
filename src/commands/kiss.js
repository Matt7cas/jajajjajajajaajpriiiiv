export default {
  name: "kiss",
  alias: ["beso"],
  description: "Envía un mensaje de beso a un usuario mencionado",
  use: ".kiss @usuario",
  run: async (socket, msg, args) => {
    // Extrae el nombre de usuario del primer argumento
    const mention = args[0].replace("@", "");

    // Lista de videos de besos
    const kissVideos = [
      "https://cdn.discordapp.com/attachments/1194154476702027778/1211547002580635738/ezgif-5-a6f19e3c83.mp4?ex=65ee9812&is=65dc2312&hm=d8673e51ad12a3d25bf31c3b873e2b69910029d0c1c181c89d50e30efd9d3cda&",
      "https://cdn.discordapp.com/attachments/1194154476702027778/1211547002849202226/ezgif-5-d4a85bc3bc.mp4?ex=65ee9812&is=65dc2312&hm=e9dfce6d69bc3dbd7c3b21c8c62e437ab46a79418749aaae50cc00f8d3b7212e&",
      "https://cdn.discordapp.com/attachments/1194154476702027778/1211547003239137371/ezgif-5-64ff2f6324.mp4?ex=65ee9813&is=65dc2313&hm=b734c39b68773ba5dbccabe88f4b0b78ffbf26df3dc3fd9b2b7530f8b721a1b8&",
      "https://cdn.discordapp.com/attachments/1194154476702027778/1211547003545329734/ezgif-5-cc23b9e486.mp4?ex=65ee9813&is=65dc2313&hm=35598dfb24c28cee9ee8e2119a602268d98f28359b04e6eb0181b862119acc40&",
      "https://cdn.discordapp.com/attachments/1194154476702027778/1211547003910094929/ezgif-5-976fb8c68b.mp4?ex=65ee9813&is=65dc2313&hm=7f66b4db23f95be390b588376e3b84dd2ff47ebde29fd4eada05cd682ec746e5&",
      "https://cdn.discordapp.com/attachments/1194154476702027778/1211547004228866048/ezgif-5-96fad6ed03.mp4?ex=65ee9813&is=65dc2313&hm=b89a02d537b51658577b7fa7641e881bb4e3982b15f10b3af063053107c92213&"
    ];

    // Obtener un video de beso aleatorio
    const randomKissVideo = kissVideos[Math.floor(Math.random() * kissVideos.length)];

    // Enviar video con caption
    await socket.sendMessage(msg.messages[0].key.remoteJid, {
      video: { url: randomKissVideo },
      mimetype: "video/mp4",
      caption: `¡Un dulce beso para @${mention}!`,
      mentions: [`${mention}@s.whatsapp.net`],
      gifPlayback: true
    },
    {
      quoted: msg.messages[0]
    });
  },
};
