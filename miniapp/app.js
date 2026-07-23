const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();


const user = tg.initDataUnsafe?.user;



function showRole(role){


document.body.innerHTML = `

<div class="app">


<h1>🎭 Mafiai</h1>


<div class="card">


<h2>
Твоя роль:
</h2>


<h1>
${role}
</h1>


<p class="gray">
Не показывай её другим игрокам
</p>


</div>


<button onclick="continueGame()">

Продолжить

</button>


</div>

`;

}





function continueGame(){


document.body.innerHTML = `

<div class="app">


<h1>
🌙 Ночь
</h1>


<div class="card">

<p>
Все игроки спят...
</p>


<p class="gray">
Ожидание действий ролей
</p>


</div>


</div>

`;

}




function openGame(){


document.body.innerHTML = `

<div class="app">


<h1>
🎭 Лобби
</h1>



<div class="card">

Игрок:

${user ? user.first_name : "Игрок"}


<br><br>

👥 Ожидание игроков


</div>



<button onclick="createRoom()">

🌐 Создать комнату

</button>


</div>

`;

}




function createRoom(){


document.body.innerHTML = `

<div class="app">


<h1>
🎮 Комната
</h1>


<div class="card">


Код:

583921


<br><br>


Игроков:

1 / 10


</div>



<button>

▶ Начать игру

</button>



</div>

`;

}