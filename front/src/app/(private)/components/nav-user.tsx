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
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";

export function NavUser() {
  const { isMobile } = useSidebar();
  const {user} = useAuth();

  return (
    <Avatar className="h-8 w-8 rounded-lg">
      {/* <AvatarImage src={user.avatar} alt={user?.name} /> */}
      <AvatarFallback className="rounded-lg">
        {user?.name.split(" ").map((word, idx) => {
          if (idx <= 1) {
            return word[0].toLocaleUpperCase();
          }
        })}
      </AvatarFallback>
    </Avatar>
  );
}
