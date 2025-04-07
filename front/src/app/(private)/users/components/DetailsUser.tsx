import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { User } from "@/contexts/AuthContext";
import { PencilIcon } from "lucide-react";

export function DetailsUser({ user }: { user: User }) {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant={"secondary"}>
          <PencilIcon size={4} />
        </Button>
      </SheetTrigger>
      <SheetContent className="text-md p-4">
        <SheetHeader>
          <SheetTitle className="text-lg">Visualizar Usuário</SheetTitle>
        </SheetHeader>
        <div>
          <SheetDescription>Dados do usuário</SheetDescription>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="flex flex-col">
              <p>Nome</p>
              <strong>{user.name}</strong>
            </div>

            <div className="flex flex-col">
              <p>Matrícula</p>
              <strong>{user.employee_id}</strong>
            </div>

            <div className="flex flex-col">
              <p>E-mail</p>
              <strong>{user.email}</strong>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <SheetDescription>Detalhes</SheetDescription>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <p>Criado em</p>
              <strong>
                {new Intl.DateTimeFormat("pt-BR", {
                  dateStyle: "short",
                  timeStyle: "short",
                }).format(new Date(user.created_at))}
              </strong>
            </div>

            <div className="flex flex-col">
              <p>Última atualização</p>
              <strong>
                {user.updated_at
                  ? new Intl.DateTimeFormat("pt-BR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    }).format(new Date(user.updated_at))
                  : "Nunca"}
              </strong>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
