import { DataTypes } from "sequelize";
import connection from "../../lib/db.js";

const clientModel = connection.define(
  "client",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

clientModel.sync({ alter: true }).then(() => {
  console.log("🟢 Client model synchronized");
});

export default clientModel;
