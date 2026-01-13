import { api } from "./api";
import { Machine } from "@/types/machine";

export async function getAllMachines(): Promise<Machine[]> {
  const response = await api.get("/machines/all");
  return response.data;
}

export const saveMachine = async (data: Partial<Machine>) => {
  const response = await api.post(`/machines/save`, data);
  return response.data;
};
export const updateMachine = async (id: string, data: Partial<Machine>) => {
  const response = await api.put(`/machines/update/${id}`, data);
  return response.data;
};
export const deleteMachine = async (id: string) => {
  const response = await api.delete(`/machines/delete/${id}`);
  return response.data;
};
