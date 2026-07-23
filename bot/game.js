const { createRoles } = require("./roles");

const games = {};


function createGame(hostId, settings = {}) {

  const id = Date.now().toString();

  games[id] = {

    id,

    host: hostId,

    players: [],

    settings: {

      mode: settings.mode || "online",

      maxPlayers: settings.maxPlayers || 10,

      playersPerDevice:
        settings.playersPerDevice || 1

    },

    status: "waiting",

    roles: []

  };


  return games[id];

}



function addPlayer(gameId, player) {

  const game = games[gameId];

  if (!game) {
    return {
      error: "Игра не найдена"
    };
  }


  if (game.players.length >= game.settings.maxPlayers) {

    return {
      error: "Комната заполнена"
    };

  }


  game.players.push({

    id: player.id,

    name: player.name,

    device: player.device || "main",

    alive: true,

    role: null

  });


  return game;

}




function startGame(gameId) {

  const game = games[gameId];

  if (!game) return null;


  if (game.players.length < 5) {

    return {
      error: "Минимум 5 игроков"
    };

  }


  game.status = "started";


  const roles =
    createRoles(
      game.players.length
    );


  game.players =
    game.players.map(
      (player, index)=>({

        ...player,

        role: roles[index]

      })
    );


  return game;

}



function getGame(gameId){

  return games[gameId];

}


function getGames(){

  return Object.values(games);

}



module.exports = {

  createGame,

  addPlayer,

  startGame,

  getGame,

  getGames

};