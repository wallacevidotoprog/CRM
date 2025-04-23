import dotenv from "dotenv";
import { Op } from "sequelize";
import clientModel from "../../models/client.entity.js";
import ResponseApi from "../../utils/response.js";
import { clienteDtoCreate, clienteDtoUpdate } from "./client.dto.js";
dotenv.config();

class ClientService {
  async createClient(req, res) {
    try {
      const { error, value } = clienteDtoCreate.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const mensagens = error.details.map((d) => d.message);
        return res.status(400).json(ResponseApi.response(mensagens));
      }

      if (await clientModel.findOne({ where: { email: value.email } })) {
        return res.status(400).json(ResponseApi.response("Email already exists"));
        
      }

      await clientModel.create(value);
      return res.status(201).json(ResponseApi.response(null, value));
    } catch (error) {
      res.status(500).json(ResponseApi.response(error.message));
    }
  }
  async getClientById(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json(ResponseApi.response("Invalid ID"));
      }

      const result = await clientModel.findByPk(userId, {
        raw: true,
      });

      if (!result) {
        throw new Error("Client not found");
      }

      return res.status(200).json(ResponseApi(result).response());
    } catch (error) {
      res.status(500).json(ResponseApi.response(error.message));
    }
  }
  async updateClient(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json(ResponseApi.response("Invalid ID"));
      }
      const { error, value } = clienteDtoUpdate.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const mensagens = error.details.map((d) => d.message);
        return res.status(400).json(ResponseApi.response(mensagens));
      }
      const client = await clientModel.findByPk(id);
      if (!client) {
        return res.status(404).json(ResponseApi.response("Client not found"));
      }
      await client.update(value);
      return res.status(200).json(ResponseApi.response(null, req.body));
    } catch (error) {
      res.status(500).json(ResponseApi.response(error.message));
    }
  }
  async deleteClient(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json(ResponseApi.response("Invalid ID"));
      }
      const client = await clientModel.findByPk(id);
      if (!client) {
        throw new Error("Client not found");
      }
      await clientModel.destroy({
        where: { id: client.id },
      });
      return res.status(200).json(ResponseApi.response(null, "Client deleted"));
    } catch (error) {
      res.status(500).json(ResponseApi.response(error.message));
    }
  }
  async getAllClient(req, res) {
    try {
      const queryParams = req.query;
      const { name, email, phone, address } = queryParams;

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
      if (address) {
        where.address = {
          [Op.like]: `%${address}%`,
        };
      }
      if (phone) {
        where.phone = {
          [Op.like]: `%${phone}%`,
        };
      }

      const result = await clientModel.findAll({
        where: where,
        raw: true,
      });

      return res.status(200).json(ResponseApi.response(null, result));
    } catch (error) {
      res.status(500).json(ResponseApi.response(error.message));
    }
  }
}

export default new ClientService();
