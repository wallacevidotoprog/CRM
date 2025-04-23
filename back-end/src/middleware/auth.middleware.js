import cookie from "cookie";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import ResponseApi from "../utils/response.js";
import { UserRoles } from "./../models/user.entity.js";
dotenv.config();
///
// cria logica se auterar o role do user delogarou renova a role
//

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
  const token = authHeader.token;
  if (!token)
    return res.status(401).json(ResponseApi.response("No token provided"));
  if (token === "undefined")
    return res.status(401).json(ResponseApi.response("No token provided"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json(ResponseApi.response("Invalid token"));
    req.auth = user;
    next();
  });
}

authMiddleware.requereRole = (requereRole) => {
  return (req, res, next) => {
    if (!req.auth)
      return res.status(401).json(ResponseApi.response("No token provided"));
    if (req.auth.role !== requereRole)
      return res.status(403).json(ResponseApi.response("Access denied"));
    next();
  };
};

authMiddleware.isAdmin = authMiddleware.requereRole(UserRoles.ADMIN);
authMiddleware.isUser = authMiddleware.requereRole(UserRoles.USER);
