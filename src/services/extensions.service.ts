import { api } from "./api";
import { Extension } from "@/types/extension";

// buscar todas as extensões
export async function getAllExtensions(): Promise<Extension[]> {
  const response = await api.get("/extensions/all");
  return response.data;
}
// salvar extensão
export const saveExtensions = async (data: Partial<Extension>) => {
  const response = await api.post(`/extensions/save`, data);
  return response.data;
}
// atualizar extensão
export const updateExtensions = async (id: string, data: Partial<Extension>) => {
  const response = await api.put(`/extensions/update/${id}`, data);
  return response.data;
}
// deletar extensão
export const deleteExtensions = async (id: string, data: Partial<Extension>) => {
  const response = await api.delete(`/extensions/delete/${id}`, data ? { data } : {});
  return response.data;
}