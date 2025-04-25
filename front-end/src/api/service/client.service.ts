import { Client } from "@/types/client";
import { ApiResponse } from "@/types/response.api";
import { clienteDtoCreate, clienteDtoUpdate } from "../model/client.model";

type PaginationData = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};
export async function GetAll(params?: {
  page?: number;
  pageSize?: number;
  name?: string;
  email?: string;
}): Promise<{ message: string; success: boolean; data: Client[]; pagination: PaginationData }> {
  try {
    // Configura parâmetros padrão
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;

    // Constrói a URL com query params
    const url = new URL(process.env.NEXT_PUBLIC_API + "client");
    url.searchParams.append("page", page.toString());
    url.searchParams.append("pageSize", pageSize.toString());

    if (params?.name) url.searchParams.append("name", params.name);
    if (params?.email) url.searchParams.append("email", params.email);

    const res = await fetch(url.toString(), {
      cache: "no-store",
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Erro ao buscar clientes");
    }

    const data: ApiResponse = await res.json();

    if (!data.data || !data.pagination) {
      throw new Error("Estrutura de dados inválida na resposta");
    }

    return {
      success: true,
      message: data.message ?? "",
      data: data.data as Client[],
      pagination: {
        totalItems: data.pagination.totalItems,
        totalPages: data.pagination.totalPages,
        currentPage: page,
        pageSize: pageSize,
        hasNextPage: page < (data.pagination?.totalPages ?? 1),
        hasPreviousPage: page > 1,
      },
    };
  } catch (error) {
    console.error("Erro no serviço GetAll:", error);
    return {
      success: false,
      message: (error as Error).message || "Erro desconhecido",
      data: [],
      pagination: {
        totalItems: 0,
        totalPages: 1,
        currentPage: 1,
        pageSize: params?.pageSize || 10,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }
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

export async function updateClient(client: Partial<Client>): Promise<ApiResponse> {
  const { id, createdAt, updatedAt, ...rest } = client;
  const { error, value } = clienteDtoUpdate.validate(rest);
  if (error) {
    return {
      message: error.details[0].message,
      ok: false,
    } as ApiResponse;
  }
  console.log("Cliente id =>", id);
  const res = await fetch(process.env.NEXT_PUBLIC_API + "client/" + id, {
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
