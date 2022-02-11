import router from "express";
import {
  createTask,
  deleteTask,
  getData,
  getSubjectColor,
  getTimetable,
  updateTask
} from "../controllers/TaskController.js";
import isAuth from "../lib/middleware/isAuthenticated.js";
const Router = router.Router();
Router.get("/", isAuth, getData);
Router.post("/", isAuth, createTask);
Router.put("/", isAuth, updateTask);
Router.delete("/", isAuth, deleteTask);
Router.get("/subject_color", isAuth, getSubjectColor);
Router.get("/timetable", isAuth, getTimetable);
export default Router;
