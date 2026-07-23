// Telegram Mini App

const tg = window.Telegram.WebApp;


tg.ready();

tg.expand();



// данные игрока

const user = tg.initDataUnsafe?.user;



function openGame(){

    document.body.innerHTML = `

    <div class="app">

        <h1>🎭 Лобби</h1>


        <div class="card">

            <p>
            Игрок:
            ${user ? user.first_name : "Игрок"}
            </p>


            <p class="gray">
            Ожидание игроков...
            </p>


            <h2>
            👥 1 / 10
            </h2>


        </div>


        <button onclick="createRoom()">
        🌐 Создать комнату
        </button>


        <button>
        🔗 Войти по коду
        </button>


    </div>

    `;

}




function createRoom(){

    document.body.innerHTML = `

    <div class="app">

        <h1>🎮 Комната создана</h1>


        <div class="card">

            <h2>
            Код:
            583921
            </h2>


            <p>
            Ждём игроков
            </p>


        </div>


        <button>
        ▶ Начать игру
        </button>


    </div>

    `;

}