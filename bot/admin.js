const ADMIN_ID = 5082864281;


// проверка администратора
function isAdmin(userId) {
  return userId === ADMIN_ID;
}


// хранение сообщений администратора
let adminMessages = [];


// добавить сообщение всем
function createAnnouncement(text) {

  const message = {
    id: Date.now(),
    text: text,
    date: new Date()
  };

  adminMessages.push(message);

  return message;
}


// получить сообщения
function getAnnouncements() {
  return adminMessages;
}


// выдать роль игроку
function giveRole(player, role) {

  player.role = role;

  return player;
}


// посмотреть роли игроков
function getAllRoles(players) {

  return players.map(player => ({
    name: player.name,
    role: player.role
  }));

}



module.exports = {

  isAdmin,
  createAnnouncement,
  getAnnouncements,
  giveRole,
  getAllRoles

};