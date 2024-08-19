"use client";
import cookie from "js-cookie";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuChevronDown } from "react-icons/lu";
import Cookies from "js-cookie";
import Link from "next/link";
import { LuUser } from "react-icons/lu";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
export default function Nav({ className }: { className?: string }) {
  let [user, setUser] = useState<{ name: string; department: string } | null>();
  useEffect(() => {
    setUser({ name: cookie.get("name") as string, department: cookie.get("department") as string });
  }, []);
  return (
    <div className={cn("flex justify-between items-center w-full h-20", className)}>
      <div className="logo capitalize">
        <Link href="/" className="flex items-center ">
          <Image src={"/logo.png"} width="50" height={50} alt="logo" />
          <h1 className="ml-5 text-xl bold text-primary">kaduna state university</h1>
        </Link>
      </div>
      <div className="flex items-center capitalize">
        <LuUser size="25px" className="icon" />
        <div className="flex">
          <div className="mr-5">
            <h1>{user && user.name}</h1>
            <h2 className="text-sm text-gray-400">{user && user.department}</h2>
          </div>

          <Dropdown />
        </div>
      </div>
    </div>
  );
}

function Dropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <LuChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel
          onClick={() => {
            Cookies.remove("name");
            Cookies.remove("department");
            Cookies.remove("ID");
            window.location.reload();
          }}
          className="hover:bg-stone-300 cursor-default"
        >
          Log out
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
