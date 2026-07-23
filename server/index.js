const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const { giveRoles } = require("./roles");

const {
createGame,
nightAction,
startDay,
vote,
getWinner
} = require("./game");


const app = express();

const server = http.createServer(app);


const io = new Server(server,{
cors:{
origin:"*"
}
});


const rooms = {};





io.on("connection",(socket)=>{


console.log(
"Игрок подключился",
socket.id
);





socket.on("joinRoom",(data)=>{


const room=data.room;


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
rooms[room].players.map(p=>p.name)
);


});







// начало игры


socket.on("startGame",(room)=>{


const gameRoom=rooms[room];


if(!gameRoom)
return;



gameRoom.players =
giveRoles(gameRoom.players);



createGame(
room,
gameRoom.players
);





gameRoom.players.forEach(player=>{


io.to(player.id).emit(
"yourRole",
{

role:player.role.name

}

);


});



io.to(room).emit(
"phase",
"night"
);


});








// действия ночью


socket.on("nightAction",(data)=>{


nightAction(

data.room,

socket.id,

data.action

);



});








// переход в день


socket.on("startDay",(room)=>{


startDay(room);


io.to(room).emit(
"phase",
"day"
);


});








// голосование


socket.on("vote",(data)=>{


vote(

data.room,

socket.id,

data.target

);



});








// закончить голосование


socket.on("endVote",(room)=>{


const loser =
getWinner(room);



io.to(room).emit(
"votedOut",
loser
);



});








socket.on("disconnect",()=>{


console.log(
"Игрок вышел",
socket.id
);


});



});







server.listen(3000,()=>{

console.log(
"🎭 Mafiai server online"
);

});