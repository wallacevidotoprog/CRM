import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import userModel from "../../models/user.entity.js";
import { UserRoles } from "./../../models/user.entity.js";
import ResponseApi from "../../utils/response.js";
dotenv.config();

class UserService {
  async createUser(userData) {
    try {
      userData.password = bcrypt.hashSync(userData.password, 10);
      const newUser = await userModel.create(userData);
      return;
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  }
  async getUserById(userId, req, res) {
    try {
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
      return user;
    } catch (error) {
      throw new Error("Error fetching user: " + error.message);
    }
  }
  async updateUser(userId, userData, req, res) {
    try {
      const isAdmin = req.auth.role === UserRoles.ADMIN;
      const isOwnProfile = req.auth.id === Number(userId);

      if (!isAdmin && !isOwnProfile) {
        return res.status(403).json(ResponseApi.response("Acesso não autorizado"));
      }
      const user = await userModel.findByPk(userId);
      if (!user) {
        throw new Error("User not found");
      }
      await user.update(userData);
      return ;
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  }
  async deleteUser(userId) {
    try {
      const user = await userModel.findByPk(userId);
      if (!user) {
        throw new Error("User not found");
      }
      await user.destroy();
      return { message: "User deleted successfully" };
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  }
  async getAllUsers(queryParams) {
    try {
      const { name, email, role } = queryParams;

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

      const users = await userModel.findAll({ where: where, raw: true,attributes: { exclude: ["password"] } });
      //const usersWithoutPasswords = users.map(({ password, ...user }) => user);

      return users;
    } catch (error) {
      throw new Error("Error fetching users: " + error.message);
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
      const isPasswordValid = bcrypt.compareSync(
        userDtoAuth.password,
        user.password
      );

      if (!isPasswordValid) {
        throw new Error("Invalid email or password");
      }
      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
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
