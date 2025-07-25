"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { AlertTriangle, CctvIcon, ChevronDown, ChevronUp, LayoutDashboard, LogOut, Settings, Users2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const navLinks = [
    { name: "Dashboard", href: "/", icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: "3D Model", href: "/model", icon: <CctvIcon className="w-4 h-4" /> },
    { name: "Cameras", href: "/", icon: <CctvIcon className="w-4 h-4" /> },
    { name: "Scenes", href: "/", icon: <Settings className="w-4 h-4" /> },
    { name: "Incidents", href: "/", icon: <AlertTriangle className="w-4 h-4" /> },
    { name: "Users", href: "/", icon: <Users2 className="w-4 h-4" /> },
  ];

  const [open, setOpen] = useState(false);


  return (
    <div className="relative z-10 bg-black text-white shadow-lg rounded-lg ">
      {/* Golden blob */}
      <div className="absolute z-20 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px] bg-yellow-400/50 blur-[120px] rounded-full pointer-events-none" />

      {/* Navbar */}
      <nav className="relative w-full px-8 py-4 flex items-center justify-between ">

        {/* Left - Logo & Name */}
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="Logo" className=" h-6" />
          <span className="text-xl text-white">MANDLAC<p className="font-bold inline">X</p></span>
        </div>

        {/* Center - Navigation */}
        <div className="space-x-6 text-sm font-medium text-white hidden md:flex">
          {navLinks.map(link => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-2 px-3 py-2 rounded hover:text-yellow-400 transition-colors"
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </div>

        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center space-x-3 cursor-pointer">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>ST</AvatarFallback>
              </Avatar>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-white">Shobhit Tiwari</p>
                <p className="text-xs text-gray-300">@shobhit</p>
              </div>
              <div className="text-white">
                {open ? (
                  <ChevronUp className="w-4 h-4 transition-transform" />
                ) : (
                  <ChevronDown className="w-4 h-4 transition-transform" />
                )}
              </div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-40 mt-2 rounded-lg animate-in fade-in zoom-in border-none bg-[#191919] px-4 py-2 shadow-lg "
          >
            <DropdownMenuItem className="flex cursor-pointer items-center border-none hover:border-none focus:border-none">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="flex cursor-pointer items-center text-red-600 border-none hover:border-none focus:border-none">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </div>
  );
}