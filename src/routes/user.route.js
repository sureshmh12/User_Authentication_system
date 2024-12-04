import express from "express";
import { userController } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.route("/register").post(userController.register);

userRouter.route("/login").post(userController.login);

userRouter.route("/reset").patch(userController.reset);

export { userRouter };
