const { createRoles } = require("./roles");

const games = {};

function createGame(hostId, maxPlayers = 10) {
  const id = Date.now().toString();

  games[id] = {
    id,
    host: hostId,
    players: [],
    maxPlayers,
    status: "waiting",
    roles: []
  };

  return games[id];
}


function joinGame(gameId, player) {
  const game = games[gameId];

  if (!game) {
    return {
      error: "Игра не найдена"
    };
  }

  if (game.players.length >= game.maxPlayers) {
    return {
      error: "Комната заполнена"
    };
  }

  game.players.push(player);

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

  game.roles = createRoles(
    game.players.length
  );


  game.players = game.players.map(
    (player, index) => ({
      ...player,
      role: game.roles[index]
    })
  );


  return game;
}


function getGames() {
  return Object.values(games);
}


module.exports = {
  createGame,
  joinGame,
  startGame,
  getGames
};