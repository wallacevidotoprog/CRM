import { DataTypes } from "sequelize";
import connection from "../../lib/db.js";

const UserRoles = {
  ADMIN: "admin",
  USER: "user",
};

const userModel = connection.define(
  "user",
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
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(Object.values(UserRoles)),
      defaultValue: UserRoles.USER,
    },
  },
  {
    timestamps: true,
  }
);

userModel.sync({ alter: true }).then(() => {
  console.log("🟢 User model synchronized");
});

export default userModel;
export { UserRoles };
