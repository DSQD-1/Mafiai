const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();


let currentPhase = "lobby";
let myRole = "";



function showRole(role){

    myRole = role;

    document.body.innerHTML = `

    <div class="app">

        <h1>🎭 Mafiai</h1>


        <div class="card">

            <h2>Твоя роль:</h2>

            <h1>${role}</h1>


            <p class="gray">
            Не показывай её другим
            </p>

        </div>


        <button onclick="night()">
            🌙 Начать ночь
        </button>


    </div>

    `;

}




function night(){


currentPhase="night";


document.body.innerHTML = `

<div class="app">


<h1>🌙 Ночь</h1>


<div class="card">

<p>
Все игроки спят...
</p>

<p class="gray">
Выбери действие
</p>

</div>



<button>
🔫 Убить игрока
</button>


<button>
🕵️ Проверить игрока
</button>


<button>
👨‍⚕️ Лечить игрока
</button>



</div>

`;

}





function voting(players){


currentPhase="vote";


document.body.innerHTML = `

<div class="app">


<h1>🗳 Голосование</h1>



<div class="card">


Кого выгнать?


</div>


${players.map(p=>`

<button>
${p}
</button>

`).join("")}



</div>

`;

}





function deathScreen(){


document.body.innerHTML = `

<div class="app death">


<h1>
🟥 ТЫ УМЕР
</h1>


<p>
Твои последние слова?
</p>



<button>
Написать
</button>


</div>

`;

}