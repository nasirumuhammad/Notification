"use client";
import Navbar from "@/components/nav";
import { useEffect, useState } from "react";
import Scrool from "@/components/Scrool";
import Cookies from "js-cookie";
import { createNotification, fetchNotification } from "@/lib/helpers/notification";
type notification = {
  id: string;
  text: string;
  title: string;
  date: string;
};
export default function Home() {
  let [height, setHeight] = useState(0);
  let [notification, setNotification] = useState<notification[]>();
  useEffect(() => {
    let height = window.screen.height;
    setHeight(height);

    fetchNotification(Cookies.get("ID") as string).then((notification) => {
      setNotification(notification as any);
    });
  }, []);
  return (
    <>
      <Scrool>
        <h1 className="capitalize font-semibold text-xl mt-5">{notification && notification[0]?.title}</h1>
        <h3 className="text-sm my-3 text-stone-400">{notification && notification[0]?.date} </h3>
        <p>{notification && notification[0]?.text} </p>
      </Scrool>
    </>
  );
}
