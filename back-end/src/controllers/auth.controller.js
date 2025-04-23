import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { userDtoAuth } from "../service/user/user.dto.js";
import userService from "../service/user/user.service.js";
import ResponseApi from "../utils/response.js";

const routerAuth = express.Router();

routerAuth.post("/auth/login", async (req, res) => {
  try {
    const { error, value } = userDtoAuth.validate(req.body, { abortEarly: false });
    if (error) {
      const mensagens = error.details.map((d) => d.message);
      return res.status(400).json(ResponseApi.response(mensagens));
    }
    const result = await userService.authenticateUser(value, res);
    return res.status(200);
  } catch (error) {
    res.status(500).json(ResponseApi.response(error.message));
  }
});
routerAuth.post("/auth/logout", async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return res.status(200).json(ResponseApi.response("Logout realizado com sucesso!"));
});
routerAuth.get("/auth/me", authMiddleware, (req, res) => {
  res.json(ResponseApi.response("Acesso autorizado!",req.user));
});

export default routerAuth;
