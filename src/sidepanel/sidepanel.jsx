import React from "react";
import { NavHeader } from "../components/NavHeader";
import { SideNav } from "../components/SideNav";
import { ChatPage } from "../components/ChatPage";
import { HistoryPage } from "../components/HistoryPage";
import {UserCircleIcon} from '@heroicons/react/24/outline'
import { SettingsPage } from "../components/SettingsPage";
import { usePage, useNavBar } from "./store";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";

const pageMap = {
    chat: <ChatPage />,
    history: <HistoryPage />,
    settings: <SettingsPage />
};


export const Sidepanel = () => {
    const page = usePage((state) => state.currentPage)
    const showNavbar = useNavBar((state) => state.showNavBar)
    

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
    <div className="flex flex-col min-h-screen">
      <NavHeader />
      <div className="flex flex-grow w-full overflow-x-hidden bg-white">
        <div className="w-full">
            {pageMap[page]}
        </div>
            <div 
                className={`bg-[#F7F7F8] top-[3rem] right-0 fixed h-screen ease-in-out duration-300 ${showNavbar ? "translate-x-0": "translate-x-full"}`}>
                <div className="flex flex-col justify-between h-full w-[3.9rem]">
                    <SideNav />
                    <div className="p-4 mb-14">
                        <UserCircleIcon 
                            className="w-6 h-6 cursor-pointer opacity-95"    
                        />
                    </div>
                </div>
            </div>
      </div>
      
    </div>
  );
};
