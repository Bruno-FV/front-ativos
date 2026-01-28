import { api } from "./api";
import { Printers } from "@/types/printers";

export async function getAllPrinters(): Promise<Printers[]> {
  const response = await api.get("/printers/all");
  return response.data;
}
export const savePrinters = async (data: Partial<Printers>) => {
  const response = await api.post(`/printers/save`, data);
  return response.data;
}
export const updatePrinters = async (id: string, data: Partial<Printers>) => {
  const response = await api.put(`/printers/update/${id}`, data);
  return response.data;
}
export const deletePrinters = async (id: string) => {
  const response = await api.delete(`/printers/delete/${id}`);
  return response.data;
}