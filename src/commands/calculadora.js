export default {
  name: "calculadora",
  alias: ["calcula", "calculo"],
  description: "Resuelve problemas matemáticos como suma, resta, multiplicación y división.",
  use: "!math <numero1> <operacion> <numero2>",
  run: (socket, msg, args) => {
    if (args.length < 3) {
      socket.sendMessage(msg.messages[0].key.remoteJid, {
        text: "Uso incorrecto del comando. Por favor, coloque un espacio entre numero y operacion"
      });
      return;
    }

    let number1;
    let operation;
    let number2;

    const operationWords = ["suma", "resta", "multiplicación", "división", "por", "x", "mas", "menos", "+", "-"];

    // Buscar la operación en los argumentos
    for (const word of operationWords) {
      if (args.includes(word)) {
        operation = word.toLowerCase();
        const index = args.indexOf(word);
        number1 = parseFloat(args[index - 1]);
        number2 = parseFloat(args[index + 1]);

        if (isNaN(number1) || isNaN(number2)) {
          socket.sendMessage(msg.messages[0].key.remoteJid, {
            text: "Error: Ambos números deben ser valores numéricos."
          });
          return;
        }

        break;
      }
    }

    if (!operation) {
      socket.sendMessage(msg.messages[0].key.remoteJid, {
        text: "Operación no válida. Por favor, utilice 'suma', 'resta', 'multiplicación' o 'división'."
      });
      return;
    }

    let result;

    switch (operation) {
      case "suma":
      case "+":
      case "mas":
        result = number1 + number2;
        break;
      case "resta":
      case "-":
      case "menos":
        result = number1 - number2;
        break;
      case "multiplicación":
      case "por":
      case "x":
        result = number1 * number2;
        break;
      case "división":
      case "/":
        if (number2 === 0) {
          socket.sendMessage(msg.messages[0].key.remoteJid, {
            text: "Error: No se puede dividir por cero."
          });
          return;
        }
        result = number1 / number2;
        break;
      default:
        socket.sendMessage(msg.messages[0].key.remoteJid, {
          text: "Operación no válida. Por favor, utilice 'suma', 'resta', 'multiplicación' o 'división'."
        });
        return;
    }

    socket.sendMessage(msg.messages[0].key.remoteJid, {
      text:  `El resultado de ${number1} ${operation} ${number2} es: ${result}` });
 }
  }

