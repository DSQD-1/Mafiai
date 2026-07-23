const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();

const {
  isAdmin
} = require("./admin");

const {
  addUser,
  getUsers
} = require("./users");

const {
  getRolesList,
  enableRole,
  disableRole
} = require("./roleAdmin");


const bot = new Telegraf(process.env.BOT_TOKEN);

const ADMIN_ID = 5082864281;



function saveUser(ctx){

addUser({

id:ctx.from.id,

name:ctx.from.first_name,

username:ctx.from.username

});

}




bot.start((ctx)=>{

saveUser(ctx);


let buttons=[

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

⚫ Тёмная тема
⚪ Белый текст
🔴 Красные акценты`,
Markup.inlineKeyboard(buttons)
);

});





// ===== АДМИНКА =====


bot.action("admin",(ctx)=>{

if(!isAdmin(ctx.from.id))
return;


ctx.reply(

"👑 Админ-панель",

Markup.inlineKeyboard([

[
Markup.button.callback(
"🎭 Роли",
"roles"
)
],

[
Markup.button.callback(
"👥 Пользователи",
"users"
)
],

[
Markup.button.callback(
"📢 Сообщение всем",
"broadcast"
)
]

])

);

});





// ===== РОЛИ =====


bot.action("roles",(ctx)=>{

if(!isAdmin(ctx.from.id))
return;


const roles=getRolesList();


let text="🎭 Роли:\n\n";


roles.forEach(r=>{

text+=
`${r.name}

Команда: ${r.team}

Статус:
${r.enabled ? "✅ Включена":"❌ Выключена"}

`;

});


ctx.reply(text);

});





// ===== ПОЛЬЗОВАТЕЛИ =====


bot.action("users",(ctx)=>{

if(!isAdmin(ctx.from.id))
return;


const users=getUsers();


let text="👥 Игроки:\n\n";


users.forEach(u=>{

text+=
`👤 ${u.name}
🆔 ${u.id}

`;

});


ctx.reply(text || "Пока пусто");

});





// ===== ПРОФИЛЬ =====


bot.action("profile",(ctx)=>{

saveUser(ctx);


ctx.reply(

`👤 Профиль

⭐ Рейтинг: 0/5

🏆 Победы: 0`

);

});





// ===== ИГРА =====


bot.action("play",(ctx)=>{

ctx.reply(

`🎮 Режимы:

🌐 Онлайн
🤖 ИИ
📱 Один телефон`

);

});





bot.launch();

console.log(
"🎭 Mafiai работает"
);