import React from "react";
import { ChatIcon, HistoryIcon, SettingsIcon, HamburgerIcon } from "./Icons";
export const SideNav = () => {
  return (
    <ul className="font-medium">
      <li className="border-y p-4 py-5 border-gray-300">
        <a href="#" className="">
          <HamburgerIcon />
        </a>
      </li>
      <li className="p-4 border-l-2 py-5 bg-white border-[#14746F]">
        <a href="#" className="">
          <ChatIcon />
        </a>
      </li>
      <li className="border-y p-4 py-5 border-gray-300">
        <a href="#" className="">
          <HistoryIcon />
        </a>
      </li>

      <li className="border-y p-4 py-5 border-gray-300">
        <a href="#" className="">
          <SettingsIcon />
        </a>
      </li>
    </ul>
  );
};
