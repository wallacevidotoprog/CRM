import express from "express";
import routerUser from "../controllers/user.controller.js";
import routerAuth from "../controllers/auth.controller.js";
import routerClient from "../controllers/client.controller.js";

const routers = express.Router();

routers.use(routerUser);
routers.use(routerAuth);
routers.use(routerClient);

export default routers;
