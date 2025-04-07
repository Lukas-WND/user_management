"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input-password";
import { User } from "@/contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { createUser } from "../data/queries";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function CreateUserForm({ userData }: { userData?: User }) {
  const router = useRouter();

  const UserSchema = z
    .object({
      name: z.string().min(1, { message: "O nome é obrigatório." }),
      email: z
        .string()
        .email({ message: "Informe um e-mail válido" })
        .min(1, { message: "O e-mail é obrigatório." }),
      employee_id: z
        .string()
        .min(1, { message: "A matrícula é obrigatória" })
        .regex(/^\d+$/, { message: "A matrícula deve conter apenas números" }),
      password: z.string().min(1, { message: "A senha é obrigatória" }),
      confirmPassword: z.string().min(1, { message: "Confirme sua senha" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "As senhas devem ser iguais",
      path: ["confirmPassword"],
    });

  type UserDto = z.infer<typeof UserSchema>;

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      console.log(data);
      toast.success("Usuário criado com sucesso!");
      router.push('/users')
    },
    onError: (data) => {
      console.log(data);
      toast.error("Erro ao cadastrar usuário!");
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDto>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: userData?.name,
      email: userData?.email,
      employee_id: userData?.employee_id,
    },
  });

  const handleCreate: SubmitHandler<UserDto> = (data) => {
    createUserMutation.mutate(data);
  };

  return (
    <Card className="w-full mt-10">
      <CardHeader>
        <CardTitle>Dados do usuário</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(handleCreate)}>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col w-full">
              <Label>Nome completo</Label>
              <Input
                placeholder="Insira o nome completo *"
                className="mt-1"
                {...register("name", { required: "O nome é obrigatório!" })}
              />
              {errors.name && (
                <p className="mt-1 text-red-500 text-end">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="flex flex-col w-full">
              <Label>Matrícula</Label>
              <Input
                placeholder="Insira a matrícula *"
                className="mt-1"
                {...register("employee_id", {
                  required: "A matrícula é obrigatória!",
                })}
              />
              {errors.employee_id && (
                <p className="mt-1 text-red-500 text-end">
                  {errors.employee_id.message}
                </p>
              )}
            </div>
            <div className="flex flex-col w-full">
              <Label>E-mail</Label>
              <Input
                placeholder="Insira o email *"
                className="mt-1"
                {...register("email", { required: "O email é obrigatório!" })}
              />
              {errors.email && (
                <p className="mt-1 text-red-500 text-end">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <p className=" leading-none font-semibold mt-4">Dados de Acesso</p>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="flex flex-col w-full">
              <Label>Senha</Label>
              <InputPassword
                placeholder="Insira a senha *"
                className="mt-1"
                {...register("password", {
                  required: "A senha é obrigatória!",
                })}
              />
              {errors.password && (
                <p className="mt-1 text-red-500 text-end">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex flex-col w-full">
              <Label>Confirmação de Senha</Label>
              <InputPassword
                placeholder="Confirme a senha *"
                className="mt-1"
                {...register("confirmPassword", {
                  required: "A confirmação é obrigatória!",
                })}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-red-500 text-end">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="w-full mt-10">
          <Button variant={"outline"}>Cancelar</Button>
          <Button variant={"default"} className="ml-2">
            Confirmar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
