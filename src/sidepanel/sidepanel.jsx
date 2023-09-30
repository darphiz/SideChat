import React from "react";
import { NavHeader } from "../components/NavHeader";
import { SideNav } from "../components/SideNav";
import { ChatPage } from "../components/ChatPage";

export const Sidepanel = () => {
  return (
    <div className="flex h-screen">
      <div className="bg-[#E8E8E8] w-[4.4rem]">
          <SideNav />
      </div>
      <div className="flex flex-col bg-white">
        <NavHeader />
        <div className="flex-grow">
            <ChatPage />
        </div>
      </div>
    </div>
  );
};
