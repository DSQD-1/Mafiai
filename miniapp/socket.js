const socket = io("https://ТВОЙ_СЕРВЕР.com");


let roomId = null;



function connectRoom(room,name){


roomId = room;


socket.emit(
"joinRoom",
{
room,
name
}
);


}




socket.on(
"players",
(players)=>{


console.log(
"Игроки:",
players
);


});





socket.on(
"yourRole",
(data)=>{


showRole(
data.role
);


});





socket.on(
"phase",
(phase)=>{


if(phase==="night"){

night();

}


if(phase==="day"){

document.body.innerHTML=`

<div class="app">

<h1>☀️ День</h1>


<div class="card">

Обсуждение игроков

</div>


<button onclick="voting([])">
🗳 Голосование
</button>


</div>

`;

}


});





socket.on(
"votedOut",
()=>{


deathScreen();


});