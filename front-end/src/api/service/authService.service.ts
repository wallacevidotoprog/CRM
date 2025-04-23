import { ApiResponse } from "@/types/response.api";
import { userDtoAuth } from "../model/user.model";

export interface LoginPayload {
  email: string;
  password: string;
}

export async function login(payload: LoginPayload): Promise<ApiResponse> {
  const { error, value } = userDtoAuth.validate(payload);
  if (error) {
    return {
      message: error.details[0].message,
      ok: false,
    } as ApiResponse;
  }
  const res = await fetch(process.env.NEXT_PUBLIC_API + "auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    cache: "no-store",
    body: JSON.stringify(value),
  });

  if (!res.ok) {
    const data = await res.json();
    return {
      message: data.message || "Erro ao fazer login",
    } as ApiResponse;
  }

  return {
    ...res.body,
    ok: res.ok,
  } as ApiResponse;
}
export async function logout(): Promise<ApiResponse> {
  const res = await fetch(process.env.NEXT_PUBLIC_API + "auth/logout", {
    method: "POST",
    credentials: "include",
    cache: "no-store",
  });
  return {
    ...res.body,
    ok: res.ok,
  } as ApiResponse;
}

export async function me(): Promise<boolean> {
  const res = await fetch(process.env.NEXT_PUBLIC_API + "auth/me", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  return res.ok ? true : false;
}
