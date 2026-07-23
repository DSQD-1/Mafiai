const SERVER = "https://mafiai-2hcj.onrender.com";


function createGame(){

let name = document.getElementById("playerName").value;


if(!name){

alert("Введите имя");

return;

}


fetch(SERVER + "/create-room", {

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

name:name

})

})


.then(res=>res.json())

.then(data=>{


alert(
"Комната создана!\nКод: " + data.code
);


})

.catch(err=>{

alert("Ошибка сервера");

console.log(err);

});


}



function joinGame(){

let code = prompt("Введите код комнаты");


if(code){

alert("Вход в комнату: " + code);

}

}