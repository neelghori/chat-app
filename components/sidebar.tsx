"use client";

import { LogOut } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import UpdateProfile from "./UpdateProfile";
import NewChatPopup from "./NewChatPopup";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import useGetChatRoom from "@ChatApp/hooks/useGetChatRoom";

export function Sidebar({
  isCollapsed,
  isMobile,
  userlist,
  setSelectedUser,
}: any) {
  const router = useRouter();
  return (
    <div
      data-collapsed={isCollapsed}
      className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 "
    >
      {!isCollapsed && (
        <div className="flex justify-between p-2 items-center">
          <div className="flex gap-2 items-center text-2xl">
            <p className="font-medium">Chats</p>
            <span className="text-zinc-300">({userlist.length})</span>
          </div>

          <div className="flex gap-3 items-center">
            <UpdateProfile />
            <NewChatPopup />
            <LogOut
              className="mr-2 h-5 w-5 text-red-500 cursor-pointer"
              onClick={() => {
                const cookies = new Cookies();
                cookies.remove("token");
                router.push("/login");
              }}
            />
          </div>
        </div>
      )}
      <nav className="grid px-2 gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {userlist.map((link: any, index: number) => {
          return (
            <div
              key={index}
              className="flex gap-5 items-center pr-2 py-3 cursor-pointer"
              onClick={() => {
                setSelectedUser(link);
              }}
            >
              <Avatar className="flex justify-center items-center">
                <AvatarImage
                  src={link?.userDetails[0]?.profile_photo}
                  alt={link?.userDetails[0]?.profile_photo}
                  width={6}
                  height={6}
                  className="w-10 h-10 "
                />
              </Avatar>
              <div className="flex flex-col max-w-28">
                <span>{link?.userDetails[0]?.name}</span>
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
