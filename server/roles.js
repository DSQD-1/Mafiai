const roles = [

{
name:"🔫 Мафия",
team:"mafia"
},

{
name:"🕵️ Комиссар",
team:"city"
},

{
name:"👨‍⚕️ Доктор",
team:"city"
},

{
name:"👤 Мирный",
team:"city"
}

];



function generateRoles(playerCount){


let result=[];


// минимум одна мафия

result.push({
name:"🔫 Мафия",
team:"mafia"
});


// остальные

while(result.length < playerCount){


result.push({

name:"👤 Мирный",

team:"city"

});


}



return result.sort(
()=>Math.random()-0.5
);

}



function giveRoles(players){


const gameRoles =
generateRoles(players.length);



return players.map(
(player,index)=>{


return {

...player,

role:
gameRoles[index],

alive:true

};


});

}



module.exports={

giveRoles

};