const roles = [
  // 🔴 Мафия
  {
    id: "mafia",
    name: "🔫 Мафия",
    team: "mafia",
    description: "Каждую ночь выбирает игрока для устранения.",
    enabled: true
  },
  {
    id: "don",
    name: "👑 Дон",
    team: "mafia",
    description: "Главарь мафии. Может проверять игроков.",
    enabled: true
  },

  // 🟢 Мирные
  {
    id: "citizen",
    name: "👤 Мирный житель",
    team: "peace",
    description: "Ищет мафию и голосует днём.",
    enabled: true
  },
  {
    id: "detective",
    name: "🕵️ Комиссар",
    team: "peace",
    description: "Ночью проверяет одного игрока.",
    enabled: true
  },
  {
    id: "doctor",
    name: "👨‍⚕️ Доктор",
    team: "peace",
    description: "Может спасти игрока ночью.",
    enabled: true
  },
  {
    id: "bodyguard",
    name: "🛡 Телохранитель",
    team: "peace",
    description: "Защищает выбранного игрока.",
    enabled: true
  },

  // 🟣 Особые
  {
    id: "maniac",
    name: "🔪 Маньяк",
    team: "solo",
    description: "Играет сам за себя и убивает ночью.",
    enabled: true
  },
  {
    id: "joker",
    name: "🃏 Шут",
    team: "solo",
    description: "Побеждает, если его изгнали голосованием.",
    enabled: true
  },
  {
    id: "lawyer",
    name: "🎭 Адвокат",
    team: "solo",
    description: "Может изменить результат проверки.",
    enabled: true
  },
  {
    id: "ghost",
    name: "👻 Призрак",
    team: "dead",
    description: "Продолжает влиять на игру после смерти.",
    enabled: true
  }
];


function getAvailableRoles() {
  return roles.filter(role => role.enabled);
}


function createRoles(playersCount) {
  const available = getAvailableRoles();

  let selected = [];

  // базовый баланс
  selected.push(
    available.find(r => r.id === "mafia")
  );

  if (playersCount >= 6) {
    selected.push(
      available.find(r => r.id === "detective")
    );
  }

  if (playersCount >= 7) {
    selected.push(
      available.find(r => r.id === "doctor")
    );
  }

  while (selected.length < playersCount) {
    const randomRole =
      available[Math.floor(Math.random() * available.length)];

    selected.push(randomRole);
  }

  return selected.sort(() => Math.random() - 0.5);
}


module.exports = {
  roles,
  getAvailableRoles,
  createRoles
};