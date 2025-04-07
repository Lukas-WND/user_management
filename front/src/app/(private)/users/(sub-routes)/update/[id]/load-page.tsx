"use client";

import { useQuery } from "@tanstack/react-query";
import { CreateUserForm } from "../../../components/UserForm";
import { getUserByID } from "../../../data/queries";
import { User } from "@/contexts/AuthContext";
import { toast } from "sonner";

export function UpdateUserClientPage({ id }: { id: string }) {
  const { data: user, isError } = useQuery<User>({
    queryKey: ["get-user", id],
    queryFn: () => getUserByID(id),
  });

  if (isError) {
    toast.error("Erro ao buscar usuário.");
  }

  return (
    <section className="m-8">
      <h1 className="text-4xl font-bold">Atualização de usuário</h1>
      <CreateUserForm userData={user} />
    </section>
  );
}
