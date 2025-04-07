"use client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export function CreateUserButton() {
  const router = useRouter();

  return (
    <Button
      className="bg-primary"
      onClick={() => {
        router.push("user/create");
      }}
    >
      <PlusCircle className="size-5" />
      <span>Cadastrar Usuário</span>
    </Button>
  );
}
