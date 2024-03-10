import axios from 'axios';
import { downloadMediaMessage } from "@whiskeysockets/baileys";
import FormData from 'form-data';

export default {
  name: "quecancion",
  alias: ["shazam","ns","quecanción","nombrecancion"],
  description: "Reconoce música o video utilizando la API de Shazam.",
  use: "!shazam-recognize 'archivo de audio o video'",

  run: async (socket, msg, args) => {
    try {
      const mediaFile = await downloadMediaMessage(msg.messages[0], "stream");

      if (!mediaFile) {
        socket.sendMessage(msg.messages[0].key.remoteJid, {
          text: "Por favor, adjunta un archivo de audio o video para reconocer.",
        });
        return;
      }

      // Enviar mensaje de espera
      const message = await socket.sendMessage(msg.messages[0]?.key.remoteJid, {
        text: `Enviando archivo para reconocer...`,
      });

      const data = new FormData();
      data.append('upload_file', mediaFile);

      const options = {
        method: 'POST',
        url: 'https://shazam-api-free.p.rapidapi.com/shazam/recognize/',
        headers: {
          'X-RapidAPI-Key': 'd6aecb7479msh733c1d39204ab3ep1a7965jsn8cda32943c26',
          'X-RapidAPI-Host': 'shazam-api-free.p.rapidapi.com',
          ...data.getHeaders(),
        },
        data: data,
      };

      // Realizar la solicitud a la API de Shazam
      const response = await axios.request(options);

      // Extraer información de la respuesta
      const songName = response.data.title;
      const thumbnailUrl = response.data.images.coverart;

      // Cambiar mensaje a "Información enviada con éxito 🎉"
      socket.sendMessage(message.key.remoteJid, {
        text: `Nombre de la canción: *${songName}*`,
        edit: message.key,
      });
    } catch (error) {
      console.error(error);

      // Mensaje de error
      socket.sendMessage(msg.messages[0]?.key?.remoteJid, {
        text: "¡Ups! Algo salió mal durante el reconocimiento.",
      });
    }
  },
};