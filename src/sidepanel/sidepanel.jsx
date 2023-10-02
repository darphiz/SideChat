import React from "react";
import { NavHeader } from "../components/NavHeader";
import { SideNav } from "../components/SideNav";
import { ChatPage } from "../components/ChatPage";
import { HistoryPage } from "../components/HistoryPage";
import {UserCircleIcon} from '@heroicons/react/24/outline'
import { usePage, useNavBar, useUserSettings } from "./store";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";

const pageMap = {
    chat: <ChatPage />,
    history: <HistoryPage />
};


export const Sidepanel = () => {
    const page = usePage((state) => state.currentPage)
    const showNavbar = useNavBar((state) => state.showNavBar)
    const setSettings = useUserSettings((state) => state.setSettings)
    const settings = useUserSettings((state) => state.settings)
    const isDarkMode = !!(settings?.theme === 'dark')
    const isNavLeft = !!(settings?.sidebarLocation === 'left')
    
    useEffect(() => {
        
       // TODO: Move guest_cid to service worker on install
         //get the client id from local storage
        const clientId = localStorage.getItem('guest_cid');
        
        if (!clientId) {
            //create a client id
            const newClientId = uuidv4();
            localStorage.setItem('guest_cid', newClientId);
        } 

        // load settings from local storage

        chrome?.storage?.local?.get(['settings'], function(result) {
            const {settings} = result;
            console.log('Retrieved settings from local:', settings);
            if (settings){
                setSettings(settings)
            }
        });


        // eslint-disable-next-line no-unused-vars
        const serviceWorkerAction = (request, sender, sendResponse)=>{
            if (request.action === "updateSettings") {
                const {data} = request
                setSettings(data)
                console.log('Settings updated from service worker:', data);
            }
        }

        const listenForMessages = () => {
            // Listen for messages from the service worker
            chrome?.runtime?.onMessage.addListener(serviceWorkerAction);
        }

        // listen to message from service worker 
        listenForMessages();
        return () => {
            chrome?.runtime?.onMessage.removeListener(serviceWorkerAction);
        }


    }, [page, setSettings]);

    return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "dark" : "light" }`}>
      <NavHeader />
      <div className="flex flex-grow w-full overflow-x-hidden bg-white dark:bg-gray-700">
        <div className="w-full">
            {pageMap[page]}
        </div>
            <div 
                className={`bg-[#F7F7F8] top-[3rem] ${isNavLeft ? "left-0": "right-0"} fixed h-screen ease-in-out duration-300 ${showNavbar ? "translate-x-0": isNavLeft ? "-translate-x-full" : "translate-x-full" }`}>
                <div className="flex flex-col justify-between h-full w-[3.9rem] dark:bg-gray-500">
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
