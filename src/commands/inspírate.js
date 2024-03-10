//Almacenar las frases inspiradoras en un array

const frasesInspiradoras = [

 "El éxito no se mide por lo que te alcanzas a conseguir, sino por lo que superas. Thomas J. Watson",

 "No es un obstáculo el que impide tu camino, sino tu forma de reaccionar frente a él. John R. Hall",

 "El futuro pertenece a aquellos que creen en la belleza de sus sueños. Elbert Hubbard",

 "No soy quien fue, soy quien puedo ser. Horacio Vázquez-Rana",
"Al principio de cada logro está la decisión de intentarlo.",

"Nunca es tarde para empezar, al final todo es aprendizaje.",

"La paciencia es amarga, pero sus frutos son dulces al final.",

"Al final, lo que cuenta no son los años de vida, sino la vida de los años.",

"Cada día es una nueva oportunidad para cambiar tu vida, al principio o al final.",

"Al final del día, la clave es nunca rendirse ante los desafíos.",

"Al principio, los sueños parecen imposibles; al final, son inevitables logros.",

"Aprovecha cada comienzo como una oportunidad para ser mejor al final.",

"Al final, el coraje es el motor que impulsa todos los logros.",

"La felicidad se encuentra en las pequeñas cosas, al principio o al final del día.",

"Al principio de cada meta hay una elección valiente; al final, una satisfacción duradera.",

"Las mejores historias comienzan con un paso audaz y terminan con un valioso aprendizaje al final.",

"No importa cuántas veces caigas, lo importante es levantarte al final.",

"El éxito es una suma de pequeños esfuerzos constantes, ya sea al principio o al final.",

"Cada amanecer es una nueva oportunidad para ser feliz, ya sea al principio o al final del día.",
    
  "Al final, la perseverancia supera cualquier obstáculo, al principio o durante el camino.",

"Las mejores decisiones comienzan con la voluntad de intentar, ya sea al principio o al final.",

"Al principio de la adversidad reside la oportunidad para un crecimiento extraordinario al final.",

"El éxito no es un destino, sino un viaje constante, ya sea al principio o al final del trayecto.",

"La creatividad encuentra su hogar en la valentía al principio y en la satisfacción al final.",

"En la calma o en la tormenta, al principio o al final, la esperanza ilumina nuestro camino.",

"La vida es un lienzo en blanco que podemos pintar con nuestras elecciones, ya sea al principio o al final.",

"La clave para avanzar está en el primer paso, ya sea al principio o al final de la jornada.",

"La gratitud transforma lo ordinario en extraordinario, ya sea al principio o al final del día.",

"La verdadera grandeza comienza con la voluntad de ser mejor, ya sea al principio o al final.",

"Al principio, los sueños parecen inalcanzables, pero al final, son realidades extraordinarias.",

"Cada desafío es una oportunidad para crecer, ya sea al principio o al final del camino.",

"La resiliencia florece en la aceptación y la fortaleza, ya sea al principio o al final de la prueba.",

"El amor y la compasión guían nuestro viaje, ya sea al principio o al final del sendero.",

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

      text: fraseInspiradora

    });

 }

}