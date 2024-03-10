import axios from 'axios';

export default {
  name: "NewsBot",
  alias: ["newsbot"],
  description: "Sends the latest news from different countries.",
  use: "Use !news followed by country code (ar, ch, sp, pe, mx) to get the latest news.",
  run: async (socket, msg, args) => {
    const countryCodes = {
      ar: "argentina",
      ch: "chile",
      sp: "españa",
      pe: "perú",
      mx: "méxico"
    };

    const countryCode = args[0]?.toLowerCase();
    if (!countryCode || !countryCodes[countryCode]) {
      socket.sendMessage(msg.messages[0].key.remoteJid, {
        text: "Invalid country code. Use !news followed by ar, ch, sp, pe, or mx."
      });
      return;
    }

    const newsUrl = `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=29a1f570445040d6ad4205ebd299f5fc`;
    try {
      const response = await fetch(newsUrl);
      const newsData = await response.json();
      
      console.log(newsData); // Añade esta línea para imprimir en la consola

      if (newsData.articles && newsData.articles.length > 0) {
        const latestNews = newsData.articles[0];
        const message = `*${latestNews.title}*
Canal: ${countryCodes[countryCode]}
Tiempo: ${getTimeElapsed(latestNews.publishedAt)}
Lee aquí: ${latestNews.url}`;
        socket.sendMessage(msg.messages[0].key.remoteJid, {
          text: message
        });
      } else {
        socket.sendMessage(msg.messages[0].key.remoteJid, {
          text: "No news found for this country."
        });
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      socket.sendMessage(msg.messages[0].key.remoteJid, {
        text: "An error occurred while fetching news."
      });
    }
  }
};

function getTimeElapsed(publishedAt) {
  const currentTime = new Date();
  const publishedTime = new Date(publishedAt);
  const timeDiff = currentTime.getTime() - publishedTime.getTime();
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  return `${hours} hours ago`;
}
