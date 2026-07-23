const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();

const {
  createGame,
  addPlayer,
  getGame
} = require("./game");


const bot = new Telegraf(process.env.BOT_TOKEN);

const ADMIN_ID = 5082864281;


// ожидание своего количества игроков
const customPlayers = {};


// ================= START =================

bot.start((ctx)=>{

let buttons = [

[
Markup.button.callback("🎮 Играть","play")
],

[
Markup.button.callback("👤 Профиль","profile")
]

];


if(ctx.from.id === ADMIN_ID){

buttons.push([
Markup.button.callback("👑 Админка","admin")
]);

}


ctx.reply(
`🎭 Mafiai

Добро пожаловать!

Выбери режим игры.`,
Markup.inlineKeyboard(buttons)
);

});



// ================= РЕЖИМЫ =================


bot.action("play",(ctx)=>{

ctx.reply(
"🎭 Выбери режим:",
Markup.inlineKeyboard([

[
Markup.button.callback("🌐 Онлайн","online")
],

[
Markup.button.callback("🤖 С ИИ","ai")
],

[
Markup.button.callback("📱 Один телефон","local")
]

])
);

});



// ================= ОНЛАЙН =================


bot.action("online",(ctx)=>{

ctx.reply(
"🌐 Онлайн игра\n\nВыбери количество игроков:",
Markup.inlineKeyboard([

[
Markup.button.callback("5","count_5"),
Markup.button.callback("10","count_10")
],

[
Markup.button.callback("20","count_20"),
Markup.button.callback("40","count_40")
],

[
Markup.button.callback("✏️ Своё число","custom_count")
]

])
);

});



function createLobby(ctx,count){

const game = createGame(
ctx.from.id,
{
mode:"online",
maxPlayers:count,
playersPerDevice:1
}
);


addPlayer(
game.id,
{
id:ctx.from.id,
name:ctx.from.first_name
}
);


ctx.reply(
`🎭 Лобби создано!

🌐 Онлайн

Игроки:
1/${count}

ID комнаты:
${game.id}

Ждём игроков 👥`,
Markup.inlineKeyboard([
[
Markup.button.callback(
"🔗 Войти в комнату",
"join_"+game.id
)
]
])
);

}



// готовые числа

bot.action("count_5",(ctx)=>createLobby(ctx,5));
bot.action("count_10",(ctx)=>createLobby(ctx,10));
bot.action("count_20",(ctx)=>createLobby(ctx,20));
bot.action("count_40",(ctx)=>createLobby(ctx,40));



// своё количество

bot.action("custom_count",(ctx)=>{

customPlayers[ctx.from.id]=true;

ctx.reply(
"✏️ Напиши количество игроков\n\nОт 5 до 40"
);

});



bot.on("text",(ctx)=>{

if(!customPlayers[ctx.from.id])
return;


const count = Number(ctx.message.text);


if(
isNaN(count) ||
count < 5 ||
count > 40
){

ctx.reply(
"❌ Можно от 5 до 40 игроков"
);

return;

}


delete customPlayers[ctx.from.id];


createLobby(ctx,count);

});



// ================= ВХОД =================


bot.action(/^join_(.+)$/,(ctx)=>{

const gameId = ctx.match[1];

const game = getGame(gameId);


if(!game){

return ctx.reply(
"❌ Комната не найдена"
);

}


addPlayer(
gameId,
{
id:ctx.from.id,
name:ctx.from.first_name
}
);


let list = game.players
.map(
p=>"👤 "+p.name
)
.join("\n");


ctx.reply(
`🎭 Комната

Игроки:

${list}

${game.players.length}/${game.settings.maxPlayers}`
);

});



// ================= ПРОФИЛЬ =================


bot.action("profile",(ctx)=>{

ctx.reply(
`👤 Профиль

Имя:
${ctx.from.first_name}

⭐ Рейтинг:
0/5`
);

});



// ================= ИИ =================


bot.action("ai",(ctx)=>{

ctx.reply(
"🤖 Режим с ИИ скоро будет подключён"
);

});



// ================= ОДИН ТЕЛЕФОН =================


bot.action("local",(ctx)=>{

ctx.reply(
`📱 Один телефон

Игроки вводят имена по очереди.

Игрок:
🔒 Открыть роль

Потом следующий игрок.`
);

});



// ================= АДМИН =================


bot.action("admin",(ctx)=>{

if(ctx.from.id !== ADMIN_ID)
return;


ctx.reply(
`👑 Админ-панель

🎭 Роли
👥 Пользователи
🎮 Игры
⚙️ Настройки`
);

});



bot.launch();

console.log("🎭 Mafiai запущен");