const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const { giveRoles } = require("./roles");


const app = express();

const server = http.createServer(app);


const io = new Server(server,{
    cors:{
        origin:"*"
    }
});


app.use(express.json());



const rooms = {};





io.on("connection",(socket)=>{


console.log(
"Игрок подключился:",
socket.id
);




// вход в комнату

socket.on("joinRoom",(data)=>{


const room = data.room;



if(!rooms[room]){

rooms[room]={

players:[],

status:"waiting"

};

}



rooms[room].players.push({

id:socket.id,

name:data.name,

role:null,

alive:true

});



socket.join(room);



io.to(room).emit(
"players",
rooms[room].players.map(p=>({

name:p.name

}))

);



});






// чат

socket.on("chat",(data)=>{


io.to(data.room).emit(
"chat",
{

name:data.name,

text:data.text

}

);


});







// старт игры

socket.on("startGame",(room)=>{


const game =
rooms[room];


if(!game)
return;



game.status="playing";




// выдаём роли

game.players =
giveRoles(game.players);





// каждому отправляем только его роль

game.players.forEach(player=>{


io.to(player.id).emit(
"yourRole",
{

role:player.role.name

}

);


});




// админ/система видит запуск

io.to(room).emit(
"gameStarted"
);



});







socket.on("disconnect",()=>{


for(const room in rooms){


rooms[room].players =
rooms[room].players.filter(
p=>p.id !== socket.id
);


}


});


});







server.listen(3000,()=>{


console.log(
"🎭 Mafiai server started"
);


});