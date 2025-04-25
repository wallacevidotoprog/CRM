import { BaseTypeApi } from "./baseTypeApi";

export type RegisterUser = BaseTypeApi & {
  name: string;
  email: string;
  password: string;
};
