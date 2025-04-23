import { BaseTypeApi } from "./baseTypeApi";

export type Client = BaseTypeApi & {
  name: string;
  email: string;
  phone: string;
  address: string;
};
