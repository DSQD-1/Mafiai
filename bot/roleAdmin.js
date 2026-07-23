const { roles } = require("./roles");


function getRolesList(){

  return roles.map((role)=>{

    return {
      id: role.id,
      name: role.name,
      team: role.team,
      enabled: role.enabled
    };

  });

}



function enableRole(id){

  const role = roles.find(
    r => r.id === id
  );

  if(role){

    role.enabled = true;

    return true;

  }

  return false;

}



function disableRole(id){

  const role = roles.find(
    r => r.id === id
  );

  if(role){

    role.enabled = false;

    return true;

  }

  return false;

}



function addRole(role){

  roles.push({

    id: role.id,

    name: role.name,

    team: role.team,

    description: role.description,

    enabled: true

  });

}



function removeRole(id){

  const index = roles.findIndex(
    r => r.id === id
  );


  if(index !== -1){

    roles.splice(index,1);

    return true;

  }


  return false;

}



module.exports = {

  getRolesList,

  enableRole,

  disableRole,

  addRole,

  removeRole

};