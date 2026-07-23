const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();

const {
  isAdmin
} = require("./admin");

const {
  addUser,
  getUsers
} = require("./users");


const bot = new Telegraf(process.env.BOT_TOKEN);

const ADMIN_ID = 5082864281;


// сохраняем пользователя

function saveUser(ctx){

  addUser({

    id: ctx.from.id,

    name: ctx.from.first_name,

    username: ctx.from.username

  });

}




bot.start((ctx)=>{

saveUser(ctx);


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


if(isAdmin(ctx.from.id)){

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

⚫ Тёмная тема
⚪ Белый текст
🔴 Красные акценты`,

Markup.inlineKeyboard(buttons)

);

});





// админка

bot.action("admin",(ctx)=>{

if(!isAdmin(ctx.from.id))
return;


ctx.reply(

`👑 Админ-панель

📢 Сообщение всем
👥 Пользователи
🎭 Роли
🎮 Игры`,

Markup.inlineKeyboard([

[
Markup.button.callback(
"📢 Сообщение всем",
"broadcast"
)
],

[
Markup.button.callback(
"👥 Пользователи",
"users_list"
)
],

[
Markup.button.callback(
"🎭 Роли",
"roles_admin"
)
]

])

);

});





// список пользователей

bot.action("users_list",(ctx)=>{

if(!isAdmin(ctx.from.id))
return;


const users = getUsers();


let text =
"👥 Пользователи:\n\n";


users.forEach((user)=>{

text +=
`👤 ${user.name}
🆔 ${user.id}

`;

});


ctx.reply(text || "Пользователей нет");

});





// рассылка

bot.action("broadcast",(ctx)=>{

if(!isAdmin(ctx.from.id))
return;


ctx.reply(
"📢 Напиши сообщение для всех игроков:"
);


});





// профиль

bot.action("profile",(ctx)=>{

saveUser(ctx);


ctx.reply(

`👤 Профиль

⭐ Рейтинг: 0/5
🏆 Победы: 0`

);

});





// игра

bot.action("play",(ctx)=>{

ctx.reply(
"🎮 Игровой раздел подключим дальше"
);

});





// обработка сообщений админа

bot.on("text",(ctx)=>{

if(ctx.from.id !== ADMIN_ID)
return;


const text = ctx.message.text;


const users = getUsers();


users.forEach((user)=>{

bot.telegram.sendMessage(

user.id,

`📢 Сообщение от Mafiai:

${text}`

).catch(()=>{});

});


ctx.reply(
"✅ Сообщение отправлено"
);


});





bot.launch();

console.log(
"🎭 Mafiai запущен"
);