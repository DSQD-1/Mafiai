const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();

const { isAdmin } = require("./admin");

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


// ===== ИГРЫ =====

const rooms = {};




// ===== СОХРАНЕНИЕ ПОЛЬЗОВАТЕЛЯ =====


function saveUser(ctx){

addUser({

id:ctx.from.id,
name:ctx.from.first_name,
username:ctx.from.username

});

}





// ===== START =====


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
🔴 Red only death/vote`,
Markup.inlineKeyboard(buttons)
);


});





// ===== ИГРА =====


bot.action("play",(ctx)=>{


ctx.reply(
"🎮 Игровое меню",

Markup.inlineKeyboard([

[
Markup.button.callback(
"➕ Создать игру",
"create_game"
)
],

[
Markup.button.callback(
"🔑 Войти по коду",
"join_game"
)
]

])

);


});





// создать игру


bot.action("create_game",(ctx)=>{


const code = Math.floor(
100000 + Math.random()*900000
).toString();



rooms[code]={

owner:ctx.from.id,

players:[

{

id:ctx.from.id,

name:ctx.from.first_name

}

],

status:"waiting"

};



ctx.reply(
`🎭 Комната создана!

Код игры:

${code}

Отправь этот код друзьям`
);


});





// вход по коду


bot.action("join_game",(ctx)=>{


ctx.reply(
"🔑 Отправь код комнаты"
);


});





// обработка кода


bot.on("text",(ctx)=>{


const text = ctx.message.text;


// админ выдача ролей


if(ctx.from.id === ADMIN_ID){


const data=text.split("\n");


if(data.length>=2){


giveRole(
data[0],
data[1]
);


ctx.reply(
"✅ Роль выдана"
);


return;

}

}




// вход в комнату


if(
rooms[text]
){


rooms[text].players.push({

id:ctx.from.id,

name:ctx.from.first_name

});



let list="👥 Игроки:\n\n";


rooms[text].players.forEach(p=>{

list += "• " + p.name + "\n";

});



ctx.reply(
`🎭 Вы в комнате

Код:
${text}

${list}`
);


return;

}


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
"👁 Все роли",
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
"user_list"
)
]

])

);


});





bot.action("roles",(ctx)=>{


if(!isAdmin(ctx.from.id))
return;


let text="🎭 Роли:\n\n";


getRolesList().forEach(r=>{


text +=
`${r.name}
${r.enabled?"✅":"❌"}

`;

});


ctx.reply(text);


});






bot.action("all_roles",(ctx)=>{


if(!isAdmin(ctx.from.id))
return;


const roles=getRoleChanges();


let text="👁 Роли игроков:\n\n";


roles.forEach(r=>{


text +=
`Игрок: ${r.playerId}
Роль: ${r.role}
Раунд: ${r.round}

`;

});


ctx.reply(
text || "Нет ролей"
);


});





bot.action("give_role",(ctx)=>{


if(!isAdmin(ctx.from.id))
return;


ctx.reply(
`Напиши:

ID игрока
роль`
);


});






bot.action("user_list",(ctx)=>{


if(!isAdmin(ctx.from.id))
return;


let text="👥 Пользователи:\n\n";


getUsers().forEach(u=>{


text+=
`${u.name}
${u.id}

`;

});


ctx.reply(text);


});





// профиль


bot.action("profile",(ctx)=>{


saveUser(ctx);


ctx.reply(
`👤 Профиль

⭐ 0/5
🏆 Победы: 0`
);


});





bot.launch();


console.log(
"🎭 Mafiai запущен"
);