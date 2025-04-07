"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function NavUser() {
  const { user } = useAuth();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        asChild
        onMouseOver={() => setOpen(true)}
        onMouseOut={() => setOpen(false)}
      >
        <Avatar className="h-8 w-8 rounded-lg">
          {/* <AvatarImage src={user.avatar} alt={user?.name} /> */}
          <AvatarFallback className="rounded-full">
            {user?.name?.split(" ").map((word, idx) => {
              if (idx <= 1) {
                return word[0].toLocaleUpperCase();
              }
            })}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="grid grid-rows-2 grid-cols-12 w-40">
          <Avatar className="col-span-3 row-span-2 h-8 w-8 rounded-lg">
            {/* <AvatarImage src={user.avatar} alt={user?.name} /> */}
            <AvatarFallback className="rounded-full">
              {user?.name?.split(" ").map((word, idx) => {
                if (idx <= 1) {
                  return word[0].toLocaleUpperCase();
                }
              })}
            </AvatarFallback>
          </Avatar>
          <div className="col-start-4 col-span-9 row-start-1 row-span-1 w-full">
            {user?.name}
          </div>
          <div className="col-start-4 col-span-9 row-start-2 row-span-1 w-full">
            {user?.email}
          </div>
        </div>
        <Button variant={"ghost"} className="w-full">
          <LogOut size={4} />
          <span className="ml-2">Sair</span>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
