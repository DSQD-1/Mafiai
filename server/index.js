const express = require("express");
const http = require("http");
const { Server } = require("socket.io");


const app = express();

const server = http.createServer(app);


const io = new Server(server,{
    cors:{
        origin:"*"
    }
});



app.use(express.json());



const rooms = {};




// создать комнату

function createCode(){

    return Math.floor(
        100000 + Math.random()*900000
    ).toString();

}




io.on("connection",(socket)=>{


console.log(
"Игрок подключился:",
socket.id
);




// вход в комнату

socket.on("joinRoom",(data)=>{


let room = data.room;



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
rooms[room].players
);



});





// чат комнаты

socket.on("chat",(data)=>{


io.to(data.room).emit(
"chat",
{

name:data.name,

text:data.text

}

);


});





// начало игры

socket.on("startGame",(room)=>{


rooms[room].status="playing";



io.to(room).emit(
"gameStarted"
);



});





socket.on("disconnect",()=>{


console.log(
"Игрок вышел"
);


});


});





server.listen(3000,()=>{


console.log(
"Mafiai server started"
);


});