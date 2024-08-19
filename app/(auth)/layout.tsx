import React from "react";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <main className="flex items-center h-fit justify-center">{children}</main>;
}
