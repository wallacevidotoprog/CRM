import { Client } from "@/types/client";
import { ApiResponse } from "@/types/response.api";
import { clienteDtoCreate, clienteDtoUpdate } from "../model/client.model";

export async function GetAll(): Promise<Client[]> {
  const res = await fetch(process.env.NEXT_PUBLIC_API + "client", {
    cache: "no-store",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Erro ao buscar clientes");

  const data: ApiResponse = await res.json();
  return data.data as Client[];
}

export async function createClient(client: Omit<Client, "id">): Promise<ApiResponse> {
  const { error, value } = clienteDtoCreate.validate(client);
  if (error) {
    return {
      message: error.details[0].message,
      ok: false,
    } as ApiResponse;
  }
  const res = await fetch(process.env.NEXT_PUBLIC_API + "client", {
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

export async function updateClient( client: Partial<Client> ): Promise<ApiResponse> { 
  
  const { id,  createdAt, updatedAt, ...rest } = client;
  const { error, value } = clienteDtoUpdate.validate(rest);
  if (error) {
    return {
      message: error.details[0].message,
      ok: false,
    } as ApiResponse;
  }
  console.log("Cliente id =>", id);
  const res = await fetch(process.env.NEXT_PUBLIC_API+'client/'+id, {
    method: "PATCH",
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

export async function deleteClient(id: string): Promise<ApiResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}client/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  const result: ApiResponse = await res.json();
  return {
    ...result,
    ok: res.ok,
  } as ApiResponse;
}

export async function getClientById(id: string): Promise<ApiResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}client/${id}`, {
    cache: "no-store",
    credentials: "include",
  });

  const data: ApiResponse = await res.json();
  return {
    ...data,
    data: data.data as Client,
    ok: res.ok,
  } as ApiResponse;
}
