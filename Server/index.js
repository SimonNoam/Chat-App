const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const userRoutes = require('./routes/userRoutes');
const messageRoute = require('./routes/messagesRoute');
const socket = require('socket.io');

dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/message", messageRoute);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Successfully connected to MongoDB');
});

const server = app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT)
});

const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000',
        Credentials: true,
    },
});

global.gameUsers = new Map();
global.onlineUsers = new Map();
//
io.on("connection", (socket) => {
    global.chatSocket = socket;

    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
        gameUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieved", data.message, data.date);
        }
    });

    socket.on("game-request", (data) => {
        const sendGameSocket = onlineUsers.get(data.to);
        if (sendGameSocket) {
            socket.to(sendGameSocket).emit("game-request", { from: data.from, to: data.to });
        }
    });
    socket.on("game-request-response", (data) => {
        const fromSocketId = onlineUsers.get(data.from);
        if (fromSocketId) {
            socket.to(fromSocketId).emit("game-request-response", {
                to: data.to,
                accepted: data.accepted,
            });
        }
    });

    socket.on('gameState', (board) => {
        // Update game state with board data
        // Emit new game state to all clients except the sender
        console.log(bored);
        socket.broadcast.emit('gameState', board);
    });

    socket.on('players', (players) => {
        // Update players state with new player data
        // Set turn to 0
        // Emit new players state to all clients except the sender
        console.log(players);
        socket.emit('players', players);
    });
})



