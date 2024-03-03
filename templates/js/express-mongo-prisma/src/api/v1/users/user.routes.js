import { Router } from "express";
import { UserController } from "./user.controller.js";

const usersRouter = Router();

usersRouter.get("/", UserController.getUsers);
usersRouter.post("/", UserController.createUser);

export default usersRouter;
