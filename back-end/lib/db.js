import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const connection = new Sequelize(process.env.B_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "mysql",
  logging: false,
});

connection
  .authenticate()
  .then(() => {
    console.log("✅ Connected to the database");
  })
  .catch((err) => {
    console.error("❌ Unable to connect to the database:", err);
  });


export default connection;
