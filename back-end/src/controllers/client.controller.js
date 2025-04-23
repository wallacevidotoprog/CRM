import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import clientService from "../service/cliente/client.service.js";

const routerClient = express.Router();

routerClient.post("/client", authMiddleware, clientService.createClient);

routerClient.get("/client", authMiddleware, clientService.getAllClient);

routerClient.get("/client/:id", authMiddleware, clientService.getClientById);

routerClient.patch("/client/:id", authMiddleware, clientService.updateClient);

routerClient.delete("/client/:id", authMiddleware, clientService.deleteClient);

export default routerClient;
