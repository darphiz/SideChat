import React from "react";
import { UserIcon, PlusIcon } from "./Icons";

export const NavHeader = () => {
  return (
    <nav>
      <div className="px-3 border-b py-3">
        <div className="flex items-center justify-between">
          <a href="#">
            <span className="self-center text-xxl font-bold sm:text-2xl whitespace-nowrap">
              Side Chat
            </span>
          </a>

          <div className="flex items-center">
            <div className="flex items-center ml-3">
              <div className="flex space-x-2 items-center">
                <button
                  type="button"
                  className="flex text-sm bg-[#E8E8E8] p-3 rounded-full focus:ring-4 focus:ring-gray-300"
                >
                  <span className="sr-only">Add User</span>
                  <PlusIcon />
                </button>

                <button
                  type="button"
                  className="flex text-sm  rounded-full focus:ring-4 focus:ring-gray-300"
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown-user"
                >
                  <span className="sr-only">Open user menu</span>
                  <UserIcon />
                </button>
              </div>
              <div
                className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow"
                id="dropdown-user"
              >
                <div className="px-4 py-3" role="none">
                  <p className="text-sm text-gray-900" role="none">
                    Signed in as Guest
                  </p>
                </div>
                <ul className="py-1" role="none">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Log in
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
