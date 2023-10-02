import React from "react";
import {PlusIcon, XMarkIcon} from '@heroicons/react/24/outline'
import { useGpt, useChat, useCurrentChat, useNavBar, usePage, useUserSettings } from '../sidepanel/store'
import { HamburgerIcon } from "./Icons";



export const NavHeader = () => {
    const setChatId = useCurrentChat((state) => state.setChatId)
    const setChats = useChat((state) => state.setChats)
    const gpt_version = useGpt((state) => state.gpt)
        
    const setShowNavBar = useNavBar((state) => state.setShowNavBar)
    const showNavbar = useNavBar((state) => state.showNavBar)
    const setCurrentPage = usePage((state) => state.setCurrentPage)
    const settings = useUserSettings((state) => state.settings)
    const isNavLeft = !!(settings?.sidebarLocation === 'left')
    
    const  toggleNavbar = () => {
        setShowNavBar(!showNavbar)
    }
    const resetChat = () => {
        const initialchat = [
            {
                "chat_type": "gpt",
                "message": "HI there, how can I help you?", 
                "gpt_version": gpt_version   
            }
        ]
        setChats(initialchat)
        setChatId(null)
        setCurrentPage('chat')
    }

  return (
    <nav>
      <div 
        className={`flex items-center w-full dark:bg-gray-700 p-0 border-b ${isNavLeft ? 'flex-row-reverse' : ''}`}>
        <div className="flex items-center justify-between w-full px-5">
          <a href="#" className="self-center text-2xl font-bold dark:text-gray-200 whitespace-nowrap">
              Side Chat
          </a>
            <button 
                onClick={resetChat}
                className="flex items-center space-x-2 bg-[#F7F7F8] dark:bg-gray-500 rounded-full p-1 px-2">
                <PlusIcon className="w-4 h-4 dark:text-gray-200"/>
                <span className="text-sm dark:text-gray-200">New Chat</span>
            </button>
          
        </div>
        <button 
            onClick={toggleNavbar}
            className="w-[4.1rem] bg-[#F7F7F8] dark:bg-gray-500 justify-center flex items-center p-4">
            {
                showNavbar ?
                <XMarkIcon className="w-4 h-4" />:
                <HamburgerIcon className="w-4 h-4"/>
            }
        </button>
      </div>
    </nav>
  );
};
