const ADMIN_ID = 5082864281;


// хранилище админских команд
const adminData = {

  messages: [],

  roleChanges: [],

  settings: {
    maxPlayers: 40,
    minPlayers: 5
  }

};



// проверка админа

function isAdmin(userId){

  return userId === ADMIN_ID;

}



// добавить сообщение игрокам

function createAnnouncement(text){

  const message = {

    id: Date.now(),

    text,

    date: new Date()

  };


  adminData.messages.push(message);


  return message;

}



// выдать роль игроку

function giveRole(playerId, role){


  const change = {

    playerId,

    role,

    round: 1,

    date: new Date()

  };


  adminData.roleChanges.push(change);


  return change;

}




// получить настройки

function getSettings(){

  return adminData.settings;

}




// изменить настройку

function updateSetting(name,value){

  adminData.settings[name]=value;

}



// получить все действия

function getAdminData(){

  return adminData;

}



module.exports = {

  isAdmin,

  createAnnouncement,

  giveRole,

  getSettings,

  updateSetting,

  getAdminData

};