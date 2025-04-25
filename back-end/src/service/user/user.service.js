import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import userModel from "../../models/user.entity.js";
import ResponseApi from "../../utils/response.js";
import { UserRoles } from "./../../models/user.entity.js";
dotenv.config();

class UserService {
  async createUser(req, res) {
    try {
      const { error, value } = userDtoCreate.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const mensagens = error.details.map((d) => d.message);
        return res.status(400).json(ResponseApi.response(mensagens));
      }

      const user = await userModel.count({ where: { email: userData.email } });
      if (user > 0) {
        res.status(400).json(ResponseApi.response("Email já cadastrado"));
        return;
      }

      value.password = bcrypt.hashSync(value.password, 10);
      await userModel.create(value);
      return res.status(201).json(ResponseApi.response(null, null));
    } catch (error) {
      res.status(500).json(ResponseApi.response(error.message));
    }
  }
  async getUserById(req, res) {
    try {
      const userId = req.params.id;
      if (!userId || !Number(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      const isAdmin = req.auth.role === UserRoles.ADMIN;
      const isOwnProfile = req.auth.id === Number(userId);

      if (!isAdmin && !isOwnProfile) {
        return res.status(403).json(ResponseApi.response("Acesso não autorizado"));
      }
      const user = await userModel.findByPk(userId, {
        raw: true,
        attributes: { exclude: ["password"] },
      });

      if (!user) {
        throw new Error("User not found");
      }

      //const {password, ...userWithoutPassword} = user.dataValues;
      return res.status(200).json(ResponseApi(user).response());
    } catch (error) {
      res.status(500).json(ResponseApi.response(error.message));
    }
  }
  async updateUser(req, res) {
    try {
      const userId = req.params.id;
      const { error, value } = userDtoUpdate.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const mensagens = error.details.map((d) => d.message);
        return res.status(400).json(ResponseApi.response(mensagens));
      }

      const isAdmin = req.auth.role === UserRoles.ADMIN;
      const isOwnProfile = req.auth.id === Number(userId);

      if (!isAdmin && !isOwnProfile) {
        return res.status(403).json(ResponseApi.response("Acesso não autorizado"));
      }
      const user = await userModel.findByPk(userId);
      if (!user) {
        throw new Error("User not found");
      }
      await user.update(value);
      return res.status(200).json(ResponseApi.response(null, req.body));
    } catch (error) {
      res.status(500).json(ResponseApi.response(error.message));
    }
  }
  async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      const user = await userModel.findByPk(userId);
      if (!user) {
        throw new Error("User not found");
      }
      await user.destroy();
      return res.status(200).json(ResponseApi.response(null, user));
    } catch (error) {
      res.status(500).json(ResponseApi.response(error.message));
    }
  }
  async getAllUsers(req, res) {
    try {
     
      const { name, email, role } = req.query;

      const where = {};

      if (name) {
        where.name = {
          [Op.like]: `%${name}%`,
        };
      }
      if (email) {
        where.email = {
          [Op.like]: `%${email}%`,
        };
      }
      if (role) {
        where.role = role;
      }

      const users = await userModel.findAll({
        where: where,
        raw: true,
        attributes: { exclude: ["password"] },
      });
      //const usersWithoutPasswords = users.map(({ password, ...user }) => user);

      return res.status(200).json(ResponseApi.response(null, users));;
    } catch (error) {
      res.status(500).json(ResponseApi.response(error.message));
    }
  }

  async authenticateUser(userDtoAuth, res) {
    try {
      const user = await userModel.findOne({
        where: { email: userDtoAuth.email },
        raw: true,
      });

      if (!user) {
        throw new Error("Invalid email or password");
      }
      const isPasswordValid = bcrypt.compareSync(userDtoAuth.password, user.password);

      if (!isPasswordValid) {
        throw new Error("Invalid email or password");
      }
      const token = jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3600000,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      return res.status(200).json(ResponseApi.response("Login realizado com sucesso!"));
    } catch (error) {
      res.status(500).send(ResponseApi.response(error.message));
    }
  }
}

export default new UserService();
