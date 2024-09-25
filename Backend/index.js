const express = require('express');
const connectDB = require('./dbConnect');
const app = express();
const http = require('http'); // Import http for Socket.IO
const cors = require('cors');
const authRouter = require("./routes/authRouter");
const todoRouter = require("./routes/todoRouter");
const socketIo = require('socket.io'); // Import Socket.IO
require('dotenv').config();

const server = http.createServer(app); // Create HTTP server for Socket.IO
const io = socketIo(server, {
  cors: {
    origin: "https://task-manager-frontend-6tvw.onrender.com", // Frontend origin
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(express.json({ limit: "10mb" }));
app.use(
  cors({
    credentials: true,
    origin: "https://task-manager-frontend-6tvw.onrender.com/"
  })
);

// Routes
app.use("/auth", authRouter);
app.use("/todo", todoRouter);

// Connect to MongoDB and start the server
connectDB().then(() => {
  server.listen(4000, () => console.log("Server is listening on port 4000"));
});

// Handle Socket.IO connection
io.on('connection', (socket) => {
  console.log('New client connected');

  // You can listen for any event, but for now we’ll keep it simple
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Export Socket.IO instance to use in your controllers
module.exports = io;
