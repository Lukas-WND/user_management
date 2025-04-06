"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export function LoginForm() {
  // Defines a schema to user fill the form fields
  const { login } = useAuth();
  const loginSchema = z.object({
    register: z
      .string()
      .min(1, { message: "Este campo é obrigatório." })
      .refine(
        (value) => {
          const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          const isMatricula = /^\d+$/.test(value);
          return isEmail || isMatricula;
        },
        { message: "Informe um e-mail ou matrícula válida" }
      ),
    password: z.string().min(1, { message: "A senha é obrigatória." }),
  });

  type LoginSchemaType = z.infer<typeof loginSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin: SubmitHandler<LoginSchemaType> = (data) => {
    login(data);
  };

  return (
    <Card className="w-4/5 h-[800px] px-[57px] py-[61px]">
      <CardHeader>
        <CardTitle className="text-[64px] font-bold text-primary">
          Bem-Vindo!
        </CardTitle>
        <CardDescription className="text-2xl mt-7 text-custom-dark-green font-medium">
          Entre com sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="flex flex-col gap-2">
            {/* <Label>E-mail</Label> */}
            <Input
              className="mt-2 h-16 text-lg placeholder:text-lg"
              placeholder="E-mail ou Nº matrícula"
              {...register("register", { required: "O e-mail é obrigatório!" })}
            />
            {errors.register && (
              <p className="mt-1 text-red-500 text-end">
                {errors.register.message}
              </p>
            )}
          </div>
          <div className="mt-9">
            {/* <Label>Senha</Label> */}
            <Input
              className="mt-2 h-16 text-lg placeholder:text-lg"
              placeholder="Senha"
              type="password"
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
          <div className="mt-9 flex flex-col gap-6 items-center">
            <Button type="submit" className="w-full h-16 text-2xl">
              Entrar
            </Button>
            <Link
              href={"/forgot-password"}
              className="text-lg text-primary font-semibold"
            >
              Esqueci minha senha
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
