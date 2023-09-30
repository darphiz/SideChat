import React from "react";
import { NavHeader } from "../components/NavHeader";
import { SideNav } from "../components/SideNav";
import { ChatPage } from "../components/ChatPage";
import {UserCircleIcon} from '@heroicons/react/24/outline'

export const Sidepanel = () => {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col bg-white w-full">
        <NavHeader />
        <div className="flex-grow">
            <ChatPage />
        </div>
      </div>
      <div className="bg-[#F7F7F8] w-[4.4rem] flex flex-col justify-between">
            <SideNav />
            <div className="p-3">
                <UserCircleIcon className="w-7 h-7"/>
            </div>
      </div>
    </div>
  );
};
