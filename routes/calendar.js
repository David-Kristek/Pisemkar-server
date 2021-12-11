import router from "express";
import { createTask, deleteTask, getData } from "../controllers/CalendarController.js";
import isAuth from "../lib/middleware/isAuthenticated.js";
const Router = router.Router();
Router.get("/get_data", isAuth, getData);
Router.post("/add_task", isAuth, createTask);
Router.get("/delete_task", isAuth, deleteTask)
export default Router;
