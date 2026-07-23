const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();

const {
  isAdmin,
  createAnnouncement,
  getAdminData
} = require("./admin");


const bot = new Telegraf(process.env.BOT_TOKEN);


const ADMIN_ID = 5082864281;



bot.start((ctx)=>{

let buttons = [
[
Markup.button.callback("🎮 Играть","play")
],
[
Markup.button.callback("👤 Профиль","profile")
]
];


if(isAdmin(ctx.from.id)){

buttons.push([
Markup.button.callback("👑 Админка","admin")
]);

}


ctx.reply(
`🎭 Mafiai

Добро пожаловать!

Чёрная тема.
Белый текст.
Красные акценты.`,
Markup.inlineKeyboard(buttons)
);

});





// АДМИНКА

bot.action("admin",(ctx)=>{

if(!isAdmin(ctx.from.id))
return;


ctx.reply(
`👑 Админ-панель

Выбери действие:

📢 Сообщение всем
🎭 Роли
👥 Пользователи
🎮 Игры
⚙️ Настройки`,
Markup.inlineKeyboard([

[
Markup.button.callback(
"📢 Сообщение",
"admin_message"
)
],

[
Markup.button.callback(
"🎭 Роли",
"admin_roles"
)
],

[
Markup.button.callback(
"👥 Пользователи",
"admin_users"
)
],

[
Markup.button.callback(
"🎮 Игры",
"admin_games"
)
]

])
);

});





// сообщение всем

bot.action("admin_message",(ctx)=>{

ctx.reply(
"📢 Напиши сообщение для всех игроков:"
);


});




// роли

bot.action("admin_roles",(ctx)=>{

ctx.reply(
`🎭 Управление ролями

Скоро:

➕ Добавить роль
➖ Удалить роль
🎲 Настроить шанс
🎁 Выдать роль`
);

});




// пользователи

bot.action("admin_users",(ctx)=>{

ctx.reply(
`👥 Пользователи

Будет:

- список игроков
- ID
- статистика
- рейтинг`
);

});




// игры

bot.action("admin_games",(ctx)=>{

ctx.reply(
`🎮 Игры

Будет:

- активные комнаты
- игроки
- роли
- завершение игры`
);

});





bot.action("profile",(ctx)=>{

ctx.reply(
`👤 Профиль

⭐ Рейтинг:
0/5

🏆 Победы:
0`
);

});





bot.action("play",(ctx)=>{

ctx.reply(
"🎮 Раздел игры подключим следующим этапом"
);

});





bot.launch();

console.log(
"🎭 Mafiai запущен"
);