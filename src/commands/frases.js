//Almacenar las frases inspiradoras en un array

const frasesInspiradoras = [

"El éxito es una suma de pequeños esfuerzos constantes, ya sea al principio o al final.",

"Cada amanecer es una nueva oportunidad para ser feliz, ya sea al principio o al final del día.",
    
  "Al final, la perseverancia supera cualquier obstáculo, al principio o durante el camino.",

"Las mejores decisiones comienzan con la voluntad de intentar, ya sea al principio o al final.",

"Al principio de la adversidad reside la oportunidad para un crecimiento extraordinario al final.",

"El éxito no es un destino, sino un viaje constante, ya sea al principio o al final del trayecto.",

"La creatividad encuentra su hogar en la valentía al principio y en la satisfacción al final.",

"En la calma o en la tormenta, al principio o al final, la esperanza ilumina nuestro camino.",

"la abundancia es lo mismo que la insuficiencia.",
    
"La autenticidad es el faro que guía hacia la realización personal, ya sea al principio o al final del viaje."
];

// Función para seleccionar una frase al azar del array

function obtenerFraseAleatoria(array) {

 const indice = Math.floor(Math.random() * array.length);

 return array[indice];

}

// Lógica del código del bot

export default {

 name: "inspirar",

 alias: ["inspirate", "inspirame"],

 run: (socket, msg, args) => {

    // Obtener una frase inspiradora al azar del array

    const fraseInspiradora = obtenerFraseAleatoria(frasesInspiradoras);

    // Enviar la frase inspiradora como respuesta al usuario

    socket.sendMessage(msg.messages[0].key.remoteJid, {

      text: fraseInspiradora},{
quoted: msg.messages[0]
    });

 }

}