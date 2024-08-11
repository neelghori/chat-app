"use client";

import Link from "next/link";
import { LogOut, MoreHorizontal, SquarePen, User } from "lucide-react";
import { cn } from "@ChatApp/lib/utils";
import { Button, buttonVariants } from "@ChatApp/components/ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Message } from "@ChatApp/data/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Input } from "./ui/input";
import { Label } from "@ChatApp/components/ui/label";
import UpdateProfile from "./UpdateProfile";
import NewChatPopup from "./NewChatPopup";

interface SidebarProps {
  isCollapsed: boolean;
  links: {
    name: string;
    messages: Message[];
    avatar: string;
    variant: "grey" | "ghost";
  }[];
  onClick?: () => void;
  isMobile: boolean;
}

export function Sidebar({ links, isCollapsed, isMobile }: SidebarProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 "
    >
      {!isCollapsed && (
        <div className="flex justify-between p-2 items-center">
          <div className="flex gap-2 items-center text-2xl">
            <p className="font-medium">Chats</p>
            <span className="text-zinc-300">({links.length})</span>
          </div>

          <div className="flex gap-3 items-center">
            <UpdateProfile />
            <NewChatPopup />
            <LogOut className="mr-2 h-5 w-5 text-red-500" />
          </div>
        </div>
      )}
      <nav className="grid px-2 gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) => {
          return (
            <div
              key={index}
              className="flex gap-5 items-center pr-2 py-3 cursor-pointer"
            >
              <Avatar className="flex justify-center items-center">
                <AvatarImage
                  src={link.avatar}
                  alt={link.avatar}
                  width={6}
                  height={6}
                  className="w-10 h-10 "
                />
              </Avatar>
              <div className="flex flex-col max-w-28">
                <span>{link.name}</span>
                {link.messages.length > 0 && (
                  <span className="text-zinc-300 text-xs truncate ">
                    {link.messages[link.messages.length - 1].name.split(" ")[0]}
                    : {link.messages[link.messages.length - 1].message}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
