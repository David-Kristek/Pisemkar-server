import router from "express";
import {
  loginToGroup,
  createGroup,
  loginEmailVerification,
  createGroupEmailVerification,
} from "../controllers/AuthController.js";
const Router = router.Router();
Router.post("/login", loginToGroup);
Router.post("/create_group", createGroup);
Router.get("/login_email_verification", loginEmailVerification);
Router.get("/create_group_email_verification", createGroupEmailVerification);

export default Router;
