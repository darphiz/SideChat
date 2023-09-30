import React from "react";
import {PlusIcon} from '@heroicons/react/24/outline'
import { useGpt, useChat, useCurrentChat } from '../sidepanel/store'

export const NavHeader = () => {
    const setChatId = useCurrentChat((state) => state.setChatId)
    const setChats = useChat((state) => state.setChats)
    const gpt_version = useGpt((state) => state.gpt)
        

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
    }

  return (
    <nav>
      <div className="px-5 border-b py-3">
        <div className="flex items-center justify-between">
          <a href="#">
            <span className="self-center text-2xl font-bold whitespace-nowrap">
              Side Chat
            </span>
          </a>
          <button 
            onClick={resetChat}
            className="flex items-center space-x-2 bg-[#F7F7F8] rounded-full p-2">
            <PlusIcon className="w-5 h-5"/>
            <span>New Chat</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
