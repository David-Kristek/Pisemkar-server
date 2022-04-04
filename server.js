import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import socket from "./lib/sockets/index.js";
import morgan from "morgan";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Database connected");
    server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    socket(io);
  })
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.get("/", (req, res) => {
  res.send("Hello");
});

import auth from "./routes/auth.js";
import task from "./routes/task.js";
app.use("/auth", auth);
app.use("/task", task);
app.get("/errorstatus", (req, res) => {
  res.status(500).json({ message: "Ahojda" });
});
