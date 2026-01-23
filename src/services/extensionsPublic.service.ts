import { api } from "./api";
import { Extension } from "@/types/extension";

// buscar todas as extensões públicas (acessível para todos os usuários autenticados)
export async function getAllExtensions(): Promise<Extension[]> {
  const response = await api.get("/extensions/public");
  return response.data;
}
