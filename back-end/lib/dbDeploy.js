import dotenv from "dotenv";
import mysql from "mysql2/promise";
import { Sequelize } from "sequelize";
import clientModel from "../src/models/client.entity.js";
import interactionModel from "../src/models/interaction.entity.js";
import userModel from "../src/models/user.entity.js";

dotenv.config();

async function deploy() {
  try {
    console.log("🎉INIT");

    await mysql
      .createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
      })
      .then(async (db) => {
        const [rows] = await db.query("SELECT VERSION()");
        console.log("🧪 MySQL version:", rows[0]);
        await db
          .query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`)
          .then((x) => {
            console.log("🟢 Database created (if it didn't exist)");
          });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const connection = new Sequelize(
          process.env.DB_NAME,
          process.env.DB_USER,
          process.env.DB_PASS,
          {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            dialect: "mysql",
            logging: false,
          }
        );
        await connection.authenticate();
        console.log("✅ Sequelize connected");

        

        await clientModel.sync({ force: true });
        console.log("🟢 Client model synchronized");

        await userModel.sync({ force: true });
        console.log("🟢 User model synchronized");

        await interactionModel.sync({ force: true });
        console.log("🟢 Interaction model synchronized");

        console.log("✅ All models synchronized");
      });
  } catch (error) {
    console.error("❌ Error during deployment:", error);
  }
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
deploy();
