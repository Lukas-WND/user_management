import { api } from "@/api/api";
import { User } from "@/contexts/AuthContext";

export async function getAllUsers() {
  const { data } = await api.get("user");

  return data;
}

export async function getUserByID(id: string) {
  const { data } = await api.get(`user/${id}`);

  return data;
}

export async function createUser(user: Partial<User>) {
  const { data } = await api.post("user", user);

  return data;
}

export async function updateUser({id, user}: {id: string, user:any}) {
  console.log(user);
  const { data } = await api.patch(`user/${id}`, user);

  return data;
}

export async function deleteUser(id: string) {
  return await api.delete(`user/${id}`);
}
