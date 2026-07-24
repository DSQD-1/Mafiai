const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const { giveRoles } = require("./roles");
const {
  createGame,
  nightAction,
  startDay,
  vote,
  getWinner
} = require("./game");

const app = express();

app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

const rooms = {};

// Проверка, что сервер работает
app.get("/", (req, res) => {
  res.send("🎭 Mafiai Server Online");
});

// Создание комнаты
app.post("/create-room", (req, res) => {
  try {
    console.log("POST /create-room");
    console.log(req.body);

    const name = req.body?.name || "Игрок";

    const code = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    rooms[code] = {
      players: [
        {
          id: null,
          name,
          role: null,
          alive: true
        }
      ],
      status: "waiting"
    };

    res.status(200).json({
      success: true,
      code
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

io.on("connection", (socket) => {

  console.log("Игрок подключился", socket.id);

  socket.on("joinRoom", (data) => {

    const room = data.room;

    if (!rooms[room]) {
      rooms[room] = {
        players: [],
        status: "waiting"
      };
    }

    rooms[room].players.push({
      id: socket.id,
      name: data.name,
      role: null,
      alive: true
    });

    socket.join(room);

    io.to(room).emit(
      "players",
      rooms[room].players.map(p => p.name)
    );

  });

  socket.on("startGame", (room) => {

    const gameRoom = rooms[room];

    if (!gameRoom) return;

    gameRoom.players = giveRoles(gameRoom.players);

    createGame(room, gameRoom.players);

    gameRoom.players.forEach(player => {
      if (player.id) {
        io.to(player.id).emit("yourRole", {
          role: player.role.name
        });
      }
    });

    io.to(room).emit("phase", "night");

  });

  socket.on("nightAction", (data) => {
    nightAction(data.room, socket.id, data.action);
  });

  socket.on("startDay", (room) => {
    startDay(room);
    io.to(room).emit("phase", "day");
  });

  socket.on("vote", (data) => {
    vote(data.room, socket.id, data.target);
  });

  socket.on("endVote", (room) => {
    const loser = getWinner(room);
    io.to(room).emit("votedOut", loser);
  });

  socket.on("disconnect", () => {
    console.log("Игрок вышел", socket.id);
  });

});

server.listen(process.env.PORT || 3000, () => {
  console.log("🎭 Mafiai server online");
});