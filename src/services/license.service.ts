import { api } from "./api";
import { cadLicense } from "@/types/cadLicense";

export async function getAllLicenses(): Promise<cadLicense[]> {
  const response = await api.get("/licenses/all");
  return response.data;
}

export const saveLicense = async (data: Partial<cadLicense>) => {
  const response = await api.post(`/licenses/save`, data);
  return response.data;
};

export const updateLicense = async (id: string, data: Partial<cadLicense>) => {
  const response = await api.put(`/licenses/update/${id}`, data);
  return response.data;
};

export const deleteLicense = async (id: string) => {
  const response = await api.delete(`/licenses/delete/${id}`);
  return response.data;
};

export const getLicenseWithMachines = async (id: string) => {
  const response = await api.get(`/licenses/with-machines/${id}`);
  return response.data;
};
