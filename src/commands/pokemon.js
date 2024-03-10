import axios from 'axios';

export default {
  name: "pokeinfo",
  alias: ["pinfo"],
  description: "Obtiene información sobre un Pokémon.",
  use: "pinfo [nombre o número de Pokémon]",
  run: async (socket, msg, args) => {
    if (args.length !== 1) {
      socket.sendMessage(msg.messages[0].key.remoteJid, {
        text: "Por favor, proporciona el nombre o número del Pokémon que deseas buscar."},{
          quoted: msg.messages[0]
      });
      return;
    }

    const pokemonNameOrId = args[0].toLowerCase();

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`);
      
      const pokemonInfo = response.data;

      // Construir la URL de la imagen del Pokémon desde Dreamworld
      const dreamworldImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonInfo.id}.png`;

      // Convertir la altura de decímetros a metros y pies
      const heightInMeters = pokemonInfo.height / 10;
      const heightInFeet = heightInMeters * 3.28084;

      // Convertir el peso de hectogramos a kilogramos y libras
      const weightInKg = pokemonInfo.weight / 10;
      const weightInLbs = weightInKg * 2.20462;

      // Obtener la rareza del Pokémon y el porcentaje de aparición
      const baseExperience = pokemonInfo.base_experience;
      const rarity = baseExperience > 200 ? 'Raro' : 'Común';
      const appearancePercentage = (baseExperience / 255) * 100;

      // Obtener las habilidades del Pokémon
      const abilities = pokemonInfo.abilities.map(ability => ability.ability.name).join(', ');

      // Construir el mensaje con la imagen de Dreamworld, el caption actualizado y las habilidades
      const message = {
        image: { url: dreamworldImageUrl },
        caption: `Nombre: *${pokemonInfo.name}*\nNúmero: *${pokemonInfo.id}*\nAltura: *${heightInMeters} m (${heightInFeet.toFixed(2)} ft)*\nPeso: *${weightInKg} kg (${weightInLbs.toFixed(2)} lbs)*\nTipo: *${pokemonInfo.types.map(type => type.type.name).join(', ')}*\nRareza: *${rarity} (${appearancePercentage.toFixed(2)}%)*\nHabilidades: *${abilities}*`
      };

      // Enviar el mensaje con la imagen de Dreamworld, el caption actualizado y las habilidades
      socket.sendMessage(msg.messages[0].key.remoteJid, message);
    } catch (error) {
      socket.sendMessage(msg.messages[0].key.remoteJid, {
        text: "No se pudo obtener información sobre el Pokémon. Por favor, verifica el nombre o número y vuelve a intentarlo."
      });
    }
  }
};
