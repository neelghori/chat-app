import { ChatLayout } from "@ChatApp/components/Chat/chat-layout";
import { cookies } from "next/headers";
import Image from "next/image";

export default function Home() {
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  return (
    <main>
      <div className="z-10 border rounded-lg w-full h-screen text-sm lg:flex">
        <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />
      </div>
    </main>
  );
}
