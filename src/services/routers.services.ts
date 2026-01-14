import { api } from "./api";
import { Router } from "@/types/router";

// 🔹 INTEGRAÇÃO COM API - LISTAR TODOS OS ROTEADORES
export async function getAllRouters(): Promise<Router[]> {
  const response = await api.get("/routers/all");
  return response.data;
}
// 🔹 INTEGRAÇÃO COM API - CRIAR ROTEADOR
export const saveRouter = async (data : Partial<Router>) => {
  const response =  await api.post(`/routers/save`, data);
  return response.data;
}
// 🔹 INTEGRAÇÃO COM API - ATUALIZAR ROTEADOR
export const updateRouter = async (id: string, data : Partial<Router>) => {
  const response =  await api.put(`/routers/update/${id}`, data);
  return response.data;
}
// 🔹 INTEGRAÇÃO COM API - DELETAR ROTEADOR
export const deleteRouter = async (id: string) => {
  const response =  await api.delete(`/routers/delete/${id}`);
  return response.data;
}