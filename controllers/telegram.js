const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TOKEN_TELEGRAM;
const idGrupo = process.env.ID_GRUPO_TELEGRAM;

const bot = new TelegramBot(token, {polling: false});

const enviarMensaje = async(mensaje) => {
    await bot.sendMessage(idGrupo, `${mensaje}`);
}


module.exports = enviarMensaje;

