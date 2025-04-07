"use client";

import { api } from "@/api/api";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  employee_id: string;
  created_at: Date;
  updated_at: Date;
};

type AuthContextType = {
  user: User | null;
  login: (data: { register: string; password: string }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async ({
      register,
      password,
    }: {
      register: string;
      password: string;
    }) => {
      const response = await api.post("/auth/login", { register, password });
      return response.data; // {usuário enviado como resposta ao login }
    },
    onSuccess: ({ user }) => {
      setUser(user); // pega os dados do usuário autenticado
      router.push("/home");
    },
  });

  const login = (data: { register: string; password: string }) => {
    loginMutation.mutate(data);
  };

  const logout = async () => {
    await api.post("/auth/logout"); // o backend deve apagar o cookie
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth precisa estar dentro do AuthProvider");
  return context;
};
