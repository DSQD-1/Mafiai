const users = {};


function addUser(user){

  users[user.id] = {
    id: user.id,
    name: user.name || "Игрок",
    username: user.username || "",
    joined: new Date()
  };

}



function getUsers(){

  return Object.values(users);

}



function getUser(id){

  return users[id];

}



module.exports = {
  addUser,
  getUsers,
  getUser
};