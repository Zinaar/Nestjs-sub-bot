export default () => {
  return {
    database: {
      url: process.env.DB_URL,
    },
    bot: {
      token: process.env.BOT_TOKEN,
      url: process.env.BOT_URL,
    },
    weatherApi: {
      apiUrl: process.env.API_URL,
      apiKey: process.env.API_KEY,
    },
  };
};
