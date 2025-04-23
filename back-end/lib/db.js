import { Sequelize } from "sequelize";

const connection = new Sequelize("ceopag", "root", "", {
  host: "localhost",
  port: 3306,
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

connection.sync({ force: false }).then(() => {
  console.log("🟢 Database synchronized");
});
export default connection;
