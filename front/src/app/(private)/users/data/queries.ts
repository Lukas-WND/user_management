import { api } from "@/api/api";

export async function getAllUsers() {
  const { data } = await api.get("user");

  return data;
}
