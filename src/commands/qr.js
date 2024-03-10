// Función para verificar la validez de la URL
function isValidUrl(url) {
 const urlPattern =
    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
 return urlPattern.test(url);
}

export default {
 name: "qr",
 description: "brinda un código QR a base de cualquier URL",
  alias: ["qrcode","qr"],
  use: "qr <enlace>",
 run: async (socket, msg, args) => {
    try {
      const web = args.join("");

      if (!web || !isValidUrl(web)) {
        socket.sendMessage(msg.messages[0]?.key?.remoteJid, {
          text: "Por favor, proporciona una URL válida para generar el código QR.",
        });
        return;
      }

      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${web}`;

      await socket.sendMessage(msg.messages[0]?.key?.remoteJid, {
        image: { url: qrCodeUrl },
        caption: "Aquí tienes tu código QR",
      });
    } catch (error) {
      console.error(error);

      socket.sendMessage(msg.messages[0]?.key?.remoteJid, {
        text: "¡Ups! Sucedió un error.",
      });
    }
 },
};