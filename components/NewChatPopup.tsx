"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ChatApp/components/ui/dialog";
import { Button } from "./ui/button";
import { SquarePen } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import useUserList from "@ChatApp/hooks/useUserList";
const NewChatPopup = () => {
  const { userlist, loading } = useUserList();
  return (
    <Dialog>
      <DialogTrigger>
        <SquarePen className="mr-2 h-5 w-5" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Chat</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {loading ? (
            <div>Loading...</div>
          ) : (
            userlist &&
            userlist.length > 0 &&
            userlist.map((element: any, index) => {
              return (
                <div
                  key={index}
                  className="flex gap-5 items-center pr-2 py-3 cursor-pointer"
                >
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={element.profile_photo}
                      alt={element.profile_photo}
                      width={6}
                      height={6}
                      className="w-10 h-10 "
                    />
                  </Avatar>
                  <div className="flex flex-col max-w-28">
                    <span>{element.name}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewChatPopup;
