import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";

interface ChatTopbarProps {
  selectedUser: any;
}

export default function ChatTopbar({ selectedUser }: ChatTopbarProps) {
  return (
    <div className="w-full h-20 flex p-4 justify-between items-center border-b">
      <div className="flex items-center gap-2">
        <Avatar className="flex justify-center items-center">
          <AvatarImage
            src={selectedUser?.userDetails[0]?.profile_photo}
            alt={selectedUser?.userDetails[0]?.name}
            width={6}
            height={6}
            className="w-10 h-10 "
          />
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">
            {selectedUser?.userDetails[0]?.name}
          </span>
        </div>
      </div>
    </div>
  );
}
