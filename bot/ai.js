const BOT_NAME = "Бот";


function createAIPlayers(count) {

  let bots = [];

  for (let i = 1; i <= count; i++) {

    bots.push({
      id: "bot_" + i,
      name: `${BOT_NAME} ${i}`,
      isBot: true,
      alive: true,
      role: null
    });

  }

  return bots;
}


function aiVote(players) {

  const alivePlayers = players.filter(
    player => player.alive
  );


  const target =
    alivePlayers[
      Math.floor(
        Math.random() * alivePlayers.length
      )
    ];


  return target;
}



function aiNightAction(player, players) {

  const targets = players.filter(
    p =>
      p.id !== player.id &&
      p.alive
  );


  return targets[
    Math.floor(
      Math.random() * targets.length
    )
  ];

}


module.exports = {
  createAIPlayers,
  aiVote,
  aiNightAction
};