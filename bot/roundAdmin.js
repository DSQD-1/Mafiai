const roleChanges = [];


function giveRole(playerId, role){

  const change = {

    playerId: playerId,

    role: role,

    round: 1,

    time: new Date()

  };


  roleChanges.push(change);


  return change;

}



function getRoleChanges(){

  return roleChanges;

}



function getPlayerRole(playerId){

  const result = roleChanges.find(
    r => r.playerId === playerId
  );


  return result || null;

}



module.exports = {

  giveRole,

  getRoleChanges,

  getPlayerRole

};