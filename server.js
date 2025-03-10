// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// app.use(express.static("public")); // Serve frontend files

// io.on("connection", (socket) => {
//     console.log("New user connected");

//     socket.on("newMessage", (message) => {
//         io.emit("newMessage", message); // Broadcast to all users
//     });

//     socket.on("disconnect", () => {
//         console.log("User disconnected");
//     });
// });

// server.listen(3000, () => {
//     console.log("Server running on http://localhost:3000");
// });
// server.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' directory
// app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, "public")));
app.set("public", path.join(__dirname, "public"));
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "index.html"))
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
