import { DataTypes } from "sequelize";
import connection from "../../lib/db.js";

const interactionModel = connection.define(
  "interaction",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

// interactionModel.sync({ alter: true }).then(() => {
//   console.log("🟢 Interaction model synchronized");
// });

export default interactionModel;
