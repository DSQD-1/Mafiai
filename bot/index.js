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
  getRolesList
} = require("./roleAdmin");

const {
  giveRole,
  getRoleChanges
} = require("./roundAdmin");


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

⚫ Dark theme
⚪ White text
🔴 Red style`,
Markup.inlineKeyboard(buttons)
);

});





// ===== АДМИН =====


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
"👁 Все выданные роли",
"all_roles"
)
],

[
Markup.button.callback(
"🎯 Выдать роль",
"give_role"
)
],

[
Markup.button.callback(
"👥 Пользователи",
"users"
)
]

])

);

});





// ===== СПИСОК РОЛЕЙ =====


bot.action("roles",(ctx)=>{

if(!isAdmin(ctx.from.id))
return;


let text="🎭 Роли:\n\n";


getRolesList()
.forEach(r=>{

text+=
`${r.name}
${r.enabled ? "✅":"❌"}

`;

});


ctx.reply(text);

});





// ===== ВСЕ РОЛИ =====


bot.action("all_roles",(ctx)=>{

if(!isAdmin(ctx.from.id))
return;


const roles=getRoleChanges();


let text="👁 Роли игроков:\n\n";


roles.forEach(r=>{

text+=
`Игрок:
${r.playerId}

Роль:
${r.role}

Раунд:
${r.round}

\n`;

});


ctx.reply(
text || "Ролей пока нет"
);

});





// ===== ВЫДАТЬ РОЛЬ =====


bot.action("give_role",(ctx)=>{

if(!isAdmin(ctx.from.id))
return;


ctx.reply(
`🎯 Выдача роли

Напиши:

ID игрока
роль

Пример:

123456789
🔫 Мафия`
);

});





// обработка выдачи роли

bot.on("text",(ctx)=>{

if(ctx.from.id !== ADMIN_ID)
return;


const data =
ctx.message.text.split("\n");


if(data.length < 2)
return;


const playerId=data[0];

const role=data[1];


giveRole(
playerId,
role
);


ctx.reply(
"✅ Роль выдана на раунд"
);

});





// ===== ПОЛЬЗОВАТЕЛИ =====


bot.action("users",(ctx)=>{

if(!isAdmin(ctx.from.id))
return;


let text="👥 Пользователи:\n\n";


getUsers()
.forEach(u=>{

text+=
`👤 ${u.name}
🆔 ${u.id}

`;

});


ctx.reply(text || "Пусто");

});





bot.action("profile",(ctx)=>{

saveUser(ctx);


ctx.reply(
`👤 Профиль

⭐ 0/5
🏆 Победы: 0`
);

});





bot.action("play",(ctx)=>{

ctx.reply(
"🎮 Игровой режим подключим дальше"
);

});





bot.launch();

console.log(
"🎭 Mafiai запущен"
);