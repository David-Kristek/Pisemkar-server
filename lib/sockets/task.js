import User from "../../modules/User";
import jwt from "jsonwebtoken";
export default class Tasks {
  constructor(socket, groupName) {
    this.socket = socket;
    this.groupName = groupName;
    this.setSockets();
  }
  setSockets = () => {
    this.socket.on("addingTaskOver", (dateData, user) => {
      this.broadcastAddingTaskOver(dateData, user);
    });
  };
  broadcastAddingTask = (dateData, user) => {
    console.log("adding task", user.email);
    this.socket.broadcast.to(this.groupName).emit("addingTask", dateData, user);
  };
  broadcastAddingTaskOver = (dateData, user) => {
    // na frontendu chybi user.email !!!!!
    this.decryptToken(user).then((userData) => {
      console.log("adding task over", userData.email);
      this.socket.broadcast
        .to(this.groupName)
        .emit("addingTaskOver", dateData, userData);
    });
  };
  broadcastTaskAdded = (task) => {
    this.socket.broadcast.to(this.groupName).emit("TASK_ADDED", task);
  };
  broadcastTaskDeleted = (taskId) => {
    console.log(taskId, "delete");
    this.socket.broadcast.to(this.groupName).emit("TASK_DELETED", taskId);
  };
  decryptToken = async (user) => {
    if (user.email) return user;
    const tokenRes = jwt.verify(user.token, process.env.TOKEN_SECRET);
    if (tokenRes._id) {
      var user;
      user = await User.findOne({ _id: tokenRes._id });
      return user;
    }
  };
}
