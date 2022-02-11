import User from "../../modules/User.js";
import jwt from "jsonwebtoken";
import { validateData } from "../validation.js";
// io pro všechny, socket pouze pro tu ktera je tu pripojena -  "connection" (socket) =>

export default (io) => {
  io.on("connection", (socket) => {
    const { groupname, _id } = validateToken(socket.handshake.query["token"]);
    if (!groupname) return;
    socket.join(groupname);
    console.log(socket.rooms);
    console.log(
      "New client connected to group " + groupname,
      _id,
      " socket room: ",
      io.sockets.adapter.rooms.get(groupname).size
    );
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
    // const tasks = new Tasks(socket, groupname);
    // socketAddTask = tasks.broadcastTaskAdded;
    // socketAddingTask = tasks.broadcastAddingTask;
    // socketDeleteTask = tasks.broadcastTaskDeleted;
    socket.on("ADD_TASK", (task) => {
      socket.broadcast.to(groupname).emit("TASK_ADDED", task);
    });
    socket.on("DELETE_TASK", (taskId) => {
      socket.broadcast.to(groupname).emit("TASK_DELETED", taskId);
    });
    socket.on("UPDATE_TASK", (task) => {
      socket.broadcast.to(groupname).emit("TASK_UPDATED", task);
    });
    // const socketAddTask = (task) => {
    // };
    // const  socketDeleteTask = (taskId) => {
    //   console.log(taskId, "delete");

    // };
  });
};
const validateToken = (token) => {
  if (!token) return;
  const tokenRes = jwt.verify(token, process.env.TOKEN_SECRET);
  if (validateData(["_id", "groupname"], tokenRes)) return null;
  return tokenRes;
};
const decryptToken = async (user) => {
  if (user.email) return user;
  const tokenRes = jwt.verify(user.token, process.env.TOKEN_SECRET);
  if (tokenRes._id) {
    var user;
    user = await User.findOne({ _id: tokenRes._id });
    return user;
  }
};

// export { socketAddTask, socketAddingTask, socketDeleteTask };
