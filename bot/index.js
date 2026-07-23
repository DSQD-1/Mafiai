const { Telegraf } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const ADMIN_ID = 5082864281;

bot.start((ctx) => {
  const id = ctx.from.id;

  let text = `
🎭 Добро пожаловать в Mafiai!

Игра в мафию прямо в Telegram.

Доступно:
🎮 Играть
👤 Профиль
🏆 Рейтинг
⭐ Магазин
`;

  if (id === ADMIN_ID) {
    text += "\n\n👑 Вам доступна админ-панель";
  }

  ctx.reply(text);
});

bot.launch();

console.log("Mafiai запущен!");