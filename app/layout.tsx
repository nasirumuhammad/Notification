import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Scrool from "@/components/Scrool";
import Navbar from "@/components/nav";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Student Notification System",
  description: "",
  icons: ["/favicon.ico"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} m-5 overflow-hidden`}>{children}</body>
    </html>
  );
}
