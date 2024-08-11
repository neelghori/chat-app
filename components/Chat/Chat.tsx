import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import React, { useEffect } from "react";

export function Chat({ messages, selectedUser, isMobile }: any) {
  const [messagesState, setMessages] = React.useState<any[]>(messages ?? []);

  useEffect(() => {
    setMessages(messages as any);
  }, [messages]);

  const sendMessage = (newMessage: any) => {
    setMessages([...messagesState, newMessage]);
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar selectedUser={selectedUser} />

      <ChatList
        messages={messagesState}
        selectedUser={selectedUser}
        sendMessage={sendMessage}
        isMobile={isMobile}
      />
    </div>
  );
}
