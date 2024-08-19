"use client";
import Cookies from "js-cookie";
import { createNotification, fetchNotification } from "@/lib/helpers/notification";
import { LuCircleEllipsis } from "react-icons/lu";
import Navbar from "@/components/nav";
import Scrool from "@/components/Scrool";
import { useState, useEffect } from "react";
import Link from "next/link";
type notification = {
  id: string;
  text: string;
  title: string;
  date: string;
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  let [height, setHeight] = useState(0);
  let [notification, setNotification] = useState<notification[]>();
  useEffect(() => {
    let height = window.screen.height;
    setHeight(height);

    fetchNotification(Cookies.get("ID") as string).then((notification) => {
      console.log(notification);
      setNotification(notification as any);
    });
  }, []);

  return (
    <div className="mx-5">
      <Navbar className="fixed top-0 w-[92%]" />
      <Scrool className="scroll">
        <div className="header text-center border-b sticky top-0">Notifications</div>
        {notification &&
          notification.map((data) => {
            return (
              <Link href={data.id}>
                <div className="notification">
                  <LuCircleEllipsis className="text-yellow-400" />
                  <div className="text ml-5 w-[90%]">
                    <h1 className="capitalize font-">{data.title}</h1>
                    <div className="time">
                      <div className="date ">{data.date}</div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
      </Scrool>
      <div className="w-[70%] bg-white absolute top-20">{children}</div>
    </div>
  );
}
