"use client";

import { Button } from "@/components/ui/button";
import { User } from "@/contexts/AuthContext";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

export function UpdateUserButton({ user }: { user: User }) {
  const router = useRouter();
  
  return (
    <Button
      variant={"secondary"}
      onClick={() => {
        router.push(`/users/update/${user.id}`);
      }}
    >
      <Pencil size={4} />
    </Button>
  );
}
