import { RegisterUser } from "@/types/user";
import { userDtoCreate } from "../model/user.model";
import { ApiResponse } from "@/types/response.api";

export async function createUser(register: RegisterUser): Promise<ApiResponse> {
  const { error, value } = userDtoCreate.validate(register);
  if (error) {
    return {
      message: error.details[0].message,
      ok: false,
    } as ApiResponse;
  }
  const res = await fetch(process.env.NEXT_PUBLIC_API + "user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(value),
  });

  const result: ApiResponse = await res.json();
  return {
    ...result,
    ok: res.ok,
  } as ApiResponse;
}