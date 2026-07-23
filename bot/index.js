const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();

const {
  createGame
} = require("./game");


const bot = new Telegraf(process.env.BOT_TOKEN);

const ADMIN_ID = 5082864281;



bot.start((ctx)=>{

  let buttons = [
    [
      Markup.button.callback(
        "🎮 Играть",
        "play"
      )
    ],
    [
      Markup.button.callback(
        "👤 Профиль",
        "profile"
      )
    ]
  ];


  if(ctx.from.id === ADMIN_ID){

    buttons.push([
      Markup.button.callback(
        "👑 Админка",
        "admin"
      )
    ]);

  }


  ctx.reply(
`🎭 Mafiai

Добро пожаловать!

Игра в мафию:
🌐 онлайн
🤖 с ИИ
📱 один телефон`,
    Markup.inlineKeyboard(buttons)
  );

});





bot.action("play",(ctx)=>{

ctx.reply(
"🎭 Выбери режим:",
Markup.inlineKeyboard([

[
Markup.button.callback(
"🌐 Онлайн",
"online"
)
],

[
Markup.button.callback(
"🤖 С ботами",
"ai"
)
],

[
Markup.button.callback(
"📱 Один телефон",
"local"
)
],

[
Markup.button.callback(
"🤝 Смешанная",
"mix"
)
]

])
);

});





bot.action("online",(ctx)=>{

const game = createGame(
ctx.from.id,
{
mode:"online",
maxPlayers:10,
playersPerDevice:1
}
);


ctx.reply(
`🌐 Онлайн лобби создано

ID:
${game.id}

Игроков:
0/${game.settings.maxPlayers}

Каждый игрок со своего Telegram`
);

});





bot.action("ai",(ctx)=>{

ctx.reply(
`🤖 Игра с ИИ

Выбери количество:

5 игроков
10 игроков
20 игроков
40 игроков`
);

});





bot.action("local",(ctx)=>{

ctx.reply(
`📱 Один телефон

Настройки:

Игроков:
5-40

На одном телефоне:
1-5 человек

Игрок вводит имя →
открывает роль 🔒`
);

});





bot.action("mix",(ctx)=>{

ctx.reply(
`🤝 Смешанная игра

Можно:

👤 Игроки онлайн
+
📱 Игроки на одном телефоне

Настраивается создателем`
);

});





bot.action("profile",(ctx)=>{

ctx.reply(
`👤 Профиль

Имя:
${ctx.from.first_name}

ID:
${ctx.from.id}

⭐ Рейтинг:
0/5`
);

});





bot.action("admin",(ctx)=>{

if(ctx.from.id !== ADMIN_ID){
return ctx.answerCbQuery(
"Нет доступа"
);
}


ctx.reply(
`👑 Админ-панель Mafiai

Управление:

👥 Пользователи
🎭 Роли
🎮 Игры
⭐ Stars
⚙️ Настройки`
);

});





bot.launch();

console.log(
"🎭 Mafiai запущен"
);