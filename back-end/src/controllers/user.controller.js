import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { userDtoCreate, userDtoUpdate } from "../service/user/user.dto.js";
import userService from "../service/user/user.service.js";
import ResponseApi from "../utils/response.js";

const routerUser = express.Router();

routerUser.post("/user", async (req, res) => {
  try {
    const { error, value } = userDtoCreate.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const mensagens = error.details.map((d) => d.message);
      return res.status(400).json(ResponseApi.response(mensagens));
    }
    await userService.createUser(value);
    res.status(201).json(ResponseApi.response(null, null));
  } catch (error) {
    res.status(500).json(ResponseApi.response(error.message));
  }
});

routerUser.get(
  "/user",
  authMiddleware,
  authMiddleware.isAdmin,
  async (req, res) => {
    try {
      const users = await userService.getAllUsers(req.query, {
        abortEarly: false,
      });
      if (error) {
        const mensagens = error.details.map((d) => d.message);
        return res.status(400).json(ResponseApi.response(mensagens));
      }
      res.status(200).json(ResponseApi.response(null, users));
    } catch (error) {
      res.status(500).json(ResponseApi.response(error.message));
    }
  }
);

routerUser.get("/user/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId, req, res);
    res.status(200).json(ResponseApi(user).response());
  } catch (error) {
    res.status(500).json(ResponseApi.response(error.message));
  }
});

routerUser.patch("/user/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;
    const { error, value } = userDtoUpdate.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const mensagens = error.details.map((d) => d.message);
      return res.status(400).json(ResponseApi.response(mensagens));
    }
    await userService.updateUser(userId, value, req, res);
    res.status(200).json(ResponseApi.response(null, req.body));
  } catch (error) {
    res.status(500).json(ResponseApi.response(error.message));
  }
});

routerUser.delete(
  "/user/:id",
  authMiddleware,
  authMiddleware.isAdmin,
  async (req, res) => {
    try {
      const userId = req.params.id;
      const deletedUser = await userService.deleteUser(userId);
      res.status(200).json(ResponseApi.response(null, deletedUser));
    } catch (error) {
      res.status(500).json(ResponseApi.response(error.message));
    }
  }
);

export default routerUser;
