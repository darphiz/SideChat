import React from "react";
import { NavHeader } from "../components/NavHeader";
import { SideNav } from "../components/SideNav";
import { ChatPage } from "../components/ChatPage";
import { HistoryPage } from "../components/HistoryPage";
import {UserCircleIcon} from '@heroicons/react/24/outline'
import { SettingsPage } from "../components/SettingsPage";
import { usePage } from "./store";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";

const pageMap = {
    ham : <ChatPage />,
    chat: <ChatPage />,
    history: <HistoryPage />,
    settings: <SettingsPage />
};


export const Sidepanel = () => {
    const page = usePage((state) => state.currentPage)
    

    useEffect(() => {
       //set or create a client id on local storage

         //get the client id from local storage
        const clientId = localStorage.getItem('guest_cid');
        if (!clientId) {
            //create a client id
            const newClientId = uuidv4();
            localStorage.setItem('guest_cid', newClientId);
        } 

    }, [page]);

    return (
    <div className="flex h-screen">
      <div className="flex flex-col bg-white w-full">
        <NavHeader />
        <div className="flex-grow">
            {pageMap[page]}
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
