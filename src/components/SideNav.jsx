import React from "react";
import { ChatIcon, HistoryIcon, SettingsIcon, HamburgerIcon } from "./Icons";
import { usePage } from "../sidepanel/store";

export const SideNav = () => {
    const setCurrentPage = usePage((state) => state.setCurrentPage)
    const currentPage = usePage((state) => state.currentPage)
    const activePageClass = (page) => {
        return page === currentPage  ? 'p-4 border-r-2 cursor-pointer bg-white border-[#202123;]' 
        : 'border-y p-4 cursor-pointer border-gray-300'
    }

    return (
    <ul className="font-medium">
      <li 
        onClick={() => setCurrentPage('ham')}
        className={activePageClass('ham') }>
          <HamburgerIcon />
      </li>
      <li 
            onClick={() => setCurrentPage('chat')}
            className={activePageClass('chat')}>
            <ChatIcon />
      </li>
      <li 
            onClick={() => setCurrentPage('history')}
            className={activePageClass('history')}>
            <HistoryIcon />
      </li>

      <li 
        onClick={() => setCurrentPage('settings')}
        className={activePageClass('settings')}>
          <SettingsIcon />
      </li>
    </ul>
  );
};
