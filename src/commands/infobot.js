import { readFile } from "node:fs";

export default {

 name: "*idown*",

 description: "obtén información sobre down",

 alias: ["down","do","d","idown"],

 use: "!idown",

 run: (socket, msg, args) => {

    socket.sendMessage(msg.messages[0].key.remoteJid, {

      text: "¡Hola! Soy *Down*, tu asistente en WhatsApp Estoy aquí para *ayudar* con tareas como hacer stickers, descargar videos de TikTok e Instagram o ayudar a encontrar información. También puedo ayudarte a aprender cosas nuevas, como una nueva habilidad o un nuevo idioma. ¿Qué quieres que hace por ti? ¡Solo pregunta!                                                         Down es un bot gratuito, pero a veces puede caer debido a las limitaciones del servicio en el que se aloja. Si quieres ayudar a *mejorar* el rendimiento de Down y que sea mucho más veloz y eficaz, puedes hacer una *donación* a través de PayPal:https://www.paypal.me/mattcas07",

    });

 },

};