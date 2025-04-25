import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import userService from "../service/user/user.service.js";

const routerUser = express.Router();

routerUser.post("/user", userService.createUser);

routerUser.get("/user", authMiddleware, authMiddleware.isAdmin, userService.getAllUsers);

routerUser.get("/user/:id", authMiddleware, userService.getUserById);

routerUser.patch("/user/:id", authMiddleware, userService.updateUser);

routerUser.delete("/user/:id", authMiddleware, authMiddleware.isAdmin, userService.deleteUser);

export default routerUser;
