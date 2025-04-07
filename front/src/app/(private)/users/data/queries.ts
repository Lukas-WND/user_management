import { api } from "@/api/api";
import { User } from "@/contexts/AuthContext";

export async function getAllUsers() {
  const { data } = await api.get("user");

  return data;
}

export async function createUser(user: Partial<User>) {
  const { data } = await api.post("user", user);

  return data;
}
