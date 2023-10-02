import React from "react";
import { ChatIcon, HistoryIcon, SettingsIcon} from "./Icons";
import { usePage } from "../sidepanel/store";

export const SideNav = () => {
    const setCurrentPage = usePage((state) => state.setCurrentPage)
    const currentPage = usePage((state) => state.currentPage)
    const activePageClass = (page) => {
        return page === currentPage  ? 'p-4 border-r-2 cursor-pointer bg-white dark:bg-gray-200 dark:border-0  border-[#202123;]' 
        : 'border-b p-4 cursor-pointer border-gray-300 dark:bg-gray-500'
    }

    const moveToSettings = () => {
        chrome.tabs.create({
            url: "settings.html"
          });
    }


    return (
    <ul className="font-medium dark:bg-gray-500">
      <li 
            onClick={() => setCurrentPage('chat')}
            className={activePageClass('chat')}>
            <ChatIcon className="w-5 h-5" />
      </li>
      <li 
            onClick={() => setCurrentPage('history')}
            className={activePageClass('history')}>
            <HistoryIcon className="w-5 h-5"/>
      </li>

      <li 
        onClick={moveToSettings}
        className={activePageClass('settings')}>
          <SettingsIcon className="w-5 h-5" />
      </li>
    </ul>
  );
};
