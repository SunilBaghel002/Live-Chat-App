const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/views/index.html"))
);

io.on("connection", (socket) => {
  console.log("New user connected");

  // Listen for incoming messages and broadcast to all connected clients
  socket.on("newMessage", (data) => {
    // data is an object { username, message, timestamp }
    io.emit("newMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
