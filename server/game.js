const games = {};



function createGame(room, players){


games[room]={

room,

players,

phase:"night",

votes:{},

actions:{}

};


return games[room];

}





function nightAction(room, playerId, action){


const game = games[room];


if(!game)
return;


game.actions[playerId]=action;


}





function startDay(room){


const game = games[room];


if(!game)
return;


game.phase="day";


game.votes={};


}





function vote(room, from, target){


const game = games[room];


if(!game)
return;


if(!game.votes[target]){

game.votes[target]=0;

}


game.votes[target]++;


}





function getWinner(room){


const game = games[room];


if(!game)
return null;


let max=0;

let winner=null;



for(const id in game.votes){


if(game.votes[id]>max){

max=game.votes[id];

winner=id;

}


}


return winner;

}





function getGame(room){

return games[room];

}



module.exports={

createGame,

nightAction,

startDay,

vote,

getWinner,

getGame

};