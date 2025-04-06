import type { Metadata } from "next";
import { QueryClientProvider } from "@tanstack/react-query";
import { Manrope } from "next/font/google";
import "./globals.css";
import { queryClient } from "@/lib/react-query";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/AuthContext";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WenLock",
  description: "A users management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <body className={`${manrope.variable} antialiased`}>
            {children}
            <Toaster closeButton />
          </body>
        </AuthProvider>
      </QueryClientProvider>
    </html>
  );
}
