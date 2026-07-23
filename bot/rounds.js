const activeGames = {};



function startRound(gameId, players, roles){

  const shuffledRoles =
    [...roles]
    .sort(()=>Math.random()-0.5);


  const gamePlayers =
    players.map((player,index)=>{

      return {

        id: player.id,

        name: player.name,

        alive: true,

        role: shuffledRoles[index]

      };

    });



  activeGames[gameId]={

    id: gameId,

    players: gamePlayers,

    day: 1,

    status:"night"

  };


  return activeGames[gameId];

}




function getGame(gameId){

  return activeGames[gameId];

}




function killPlayer(gameId,playerId){

 const game =
 activeGames[gameId];


 if(!game)
 return;


 const player =
 game.players.find(
 p=>p.id==playerId
 );


 if(player){

  player.alive=false;

 }

}




function getRolesForAdmin(gameId){

 const game =
 activeGames[gameId];


 if(!game)
 return [];


 return game.players.map(p=>({

  name:p.name,

  role:p.role.name,

  alive:p.alive

 }));

}



module.exports={

startRound,

getGame,

killPlayer,

getRolesForAdmin

};