import { api } from "./api";
import { Extension } from "@/types/extension";

// buscar todas as extensões
export async function getAllExtensions(): Promise<Extension[]> {
  const response = await api.get("/extensions/all");
  return response.data;
}