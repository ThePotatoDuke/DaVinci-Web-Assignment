import { Link, useLocation } from "react-router-dom";
import LogoImage from "../assets/Hy8uge6SCowHNV4QUwQ1_abBLok08iS03jz2W.png";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Users", href: "/users" },
  { name: "Posts", href: "/posts" },
];

export default function NavBar() {
  const location = useLocation();

  return (
    <Disclosure
      as="nav"
      className="bg-gradient-to-r from-indigo-600 to-indigo-800 shadow-md w-full"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="inline-flex items-center justify-center p-2 rounded-md text-indigo-100 hover:bg-indigo-700 hover:text-white focus:outline-none">
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon className="hidden h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>

          {/* Logo + nav links */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img alt="Logo" src={LogoImage} className="h-8 w-auto" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={
                        isActive
                          ? "bg-white text-indigo-700 font-semibold px-4 py-2 rounded-full shadow"
                          : "text-white/80 hover:text-white hover:bg-white/20 px-4 py-2 rounded-full"
                      }
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <DisclosurePanel className="sm:hidden bg-indigo-700">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={
                  isActive
                    ? "bg-white text-indigo-700 font-semibold px-4 py-2 rounded-full shadow"
                    : "text-white text-opacity-95 hover:text-white hover:bg-white/ px-4 py-2 rounded-full transition-colors"
                }
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
