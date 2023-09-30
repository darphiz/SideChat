import React from "react";
import {PlusIcon} from '@heroicons/react/24/outline'

export const NavHeader = () => {
  return (
    <nav>
      <div className="px-5 border-b py-3">
        <div className="flex items-center justify-between">
          <a href="#">
            <span className="self-center text-2xl font-bold whitespace-nowrap">
              Side Chat
            </span>
          </a>
          <button className="flex items-center space-x-2 bg-[#F7F7F8] rounded-full p-2">
            <PlusIcon className="w-5 h-5"/>
            <span>New Chat</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
