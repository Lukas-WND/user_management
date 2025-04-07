import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "@/contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { deleteUser } from "../data/queries";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";
import { useState } from "react";

export function DeleteUser({ user }: { user: User }) {
  const [open, setOpen] = useState(false);

  const deteleUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("Usuário deletado com sucesso.");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      setOpen(false);
    },
    onError: () => {
      toast.error("Erro ao deletar usuário.");
    },
  });

  const handleDeleteUser = () => {
    deteleUserMutation.mutate(user.id);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>
          <Trash2 size={4} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir Usuário</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir este registro? Esta ação não poderá
            ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-4">
          <DialogClose asChild>
            <Button variant={"outline"}>Cancelar</Button>
          </DialogClose>
          <Button variant={"default"} onClick={handleDeleteUser}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
