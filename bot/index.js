const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();

const { createGame } = require("./game");

const bot = new Telegraf(process.env.BOT_TOKEN);

const ADMIN_ID = 5082864281;


// временное хранение ожиданий
const waitingPlayersCount = {};



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

Выбери режим игры:
🌐 Онлайн
🤖 ИИ
📱 Один телефон`,
Markup.inlineKeyboard(buttons)
);

});




// меню игры

bot.action("play",(ctx)=>{

ctx.reply(
"🎭 Выбери режим:",
Markup.inlineKeyboard([

[
Markup.button.callback("🌐 Онлайн","online")
],

[
Markup.button.callback("🤖 С ботами","ai")
],

[
Markup.button.callback("📱 Один телефон","local")
]

])
);

});




// онлайн

bot.action("online",(ctx)=>{

ctx.reply(
"🌐 Онлайн игра\n\nСколько игроков?",
Markup.inlineKeyboard([

[
Markup.button.callback("5","players_5"),
Markup.button.callback("10","players_10")
],

[
Markup.button.callback("20","players_20"),
Markup.button.callback("40","players_40")
],

[
Markup.button.callback("✏️ Своё количество","custom_players")
]

])
);

});




// создание игры

function makeGame(ctx,count){

const game = createGame(
ctx.from.id,
{
mode:"online",
maxPlayers:count,
playersPerDevice:1
}
);


ctx.reply(
`🎭 Лобби создано!

🌐 Онлайн

Игроков:
0/${count}

ID комнаты:
${game.id}

Ждём игроков...`
);

}



// готовые кнопки

bot.action("players_5",(ctx)=>{
makeGame(ctx,5);
});


bot.action("players_10",(ctx)=>{
makeGame(ctx,10);
});


bot.action("players_20",(ctx)=>{
makeGame(ctx,20);
});


bot.action("players_40",(ctx)=>{
makeGame(ctx,40);
});




// своё количество

bot.action("custom_players",(ctx)=>{

waitingPlayersCount[ctx.from.id] = true;


ctx.reply(
"✏️ Введи количество игроков\n\nМинимум: 5\nМаксимум: 40"
);

});




// обработка числа

bot.on("text",(ctx)=>{

const userId = ctx.from.id;


if(!waitingPlayersCount[userId])
return;


const count = Number(ctx.message.text);


if(
isNaN(count) ||
count < 5 ||
count > 40
){

ctx.reply(
"❌ Можно выбрать только от 5 до 40 игроков"
);

return;

}


delete waitingPlayersCount[userId];


makeGame(ctx,count);

});




// ИИ

bot.action("ai",(ctx)=>{

ctx.reply(
`🤖 Игра с ботами

Выбери:

5
10
20
40 игроков`
);

});




// один телефон

bot.action("local",(ctx)=>{

ctx.reply(
`📱 Один телефон

Настройки:

Игроков: 5-40

На одном телефоне:
1-5 человек

Игрок вводит имя →
Открывает роль 🔒`
);

});




// профиль

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




// админ

bot.action("admin",(ctx)=>{

if(ctx.from.id !== ADMIN_ID)
return;


ctx.reply(
`👑 Админ-панель

🎭 Роли
👥 Пользователи
🎮 Игры
⭐ Stars
⚙️ Настройки`
);

});



bot.launch();

console.log("Mafiai запущен");