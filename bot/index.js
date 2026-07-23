const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();

const {
  createGame,
  joinGame,
  startGame,
  getGames
} = require("./game");


const bot = new Telegraf(process.env.BOT_TOKEN);

const ADMIN_ID = 5082864281;


bot.start((ctx) => {

  const buttons = [
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


  if (ctx.from.id === ADMIN_ID) {
    buttons.push([
      Markup.button.callback(
        "👑 Админка",
        "admin"
      )
    ]);
  }


  ctx.reply(
`🎭 Mafiai

Добро пожаловать в игру мафия!

Создавай комнаты,
получай роли,
играй с друзьями.`,
    Markup.inlineKeyboard(buttons)
  );
});



bot.action("play", (ctx)=>{

  const game = createGame(
    ctx.from.id,
    10
  );

  joinGame(
    game.id,
    {
      id: ctx.from.id,
      name: ctx.from.first_name
    }
  );


  ctx.reply(
`🎮 Лобби создано!

ID игры:
${game.id}

Игроков:
1/${game.maxPlayers}

Ожидаем игроков...`
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

ctx.reply(
`👑 Админ-панель Mafiai

Доступно:
- Пользователи
- Игры
- Роли
- Режимы`
);

});



bot.launch();

console.log(
"🎭 Mafiai работает"
);