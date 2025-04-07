"use client";

import { api } from "@/api/api";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export type User = {
  id: string;
  name: string;
  email: string;
  employee_id: string;
  created_at: Date;
  updated_at?: Date;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (data: { register: string; password: string }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  const {
    mutate: loginMutation,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: async ({
      register,
      password,
    }: {
      register: string;
      password: string;
    }) => {
      const response = await api.post("/auth/login", { register, password });
      return response.data;
    },
    onSuccess: ({ user }: { user: User }) => {
      const formattedUser: User = {
        ...user,
        created_at: new Date(user.created_at),
        updated_at: user.updated_at ? new Date(user.updated_at) : undefined,
      };

      toast.success("Usuário logado com sucesso!");
      setUser(formattedUser);
      setIsAuthenticated(true);
      router.push("/home");
    },
    onError: ({message}) => {
      toast.error("Usuário/Senha inválido(a)");
      setUser(null);
      setIsAuthenticated(true);
    },
  });

  const fetchUser = async () => {
    try {
      const { data } = await api.get("/auth/me");
      const formattedUser: User = {
        ...data,
        created_at: new Date(data.created_at),
        updated_at: data.updated_at ? new Date(data.updated_at) : undefined,
      };
      setUser(formattedUser);
      setIsAuthenticated(true);
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
      router.push("/login");
    }
  };

  const login = (data: { register: string; password: string }) => {
    loginMutation(data);
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    setIsAuthenticated(false);
    router.push("/login");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth precisa estar dentro do AuthProvider");
  return context;
};
