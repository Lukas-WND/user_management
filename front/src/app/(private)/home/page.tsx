"use client";
import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <section className="m-8 h-full">
      <h1 className="text-4xl font-bold">Home</h1>

      <div className="mt-10 rounded-2xl bg-white p-8 w-full h-[70%]">
        <h2>Olá {user ? `, ${user.name}` : ""}!</h2>
      </div>
    </section>
  );
}
