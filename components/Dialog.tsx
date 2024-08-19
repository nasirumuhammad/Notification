"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ReactNode } from "react";
import { LuFileEdit } from "react-icons/lu";

type Tdialog = {
  Trigger: string | typeof LuFileEdit;
  children: ReactNode;
  className?: string;
};
export default function DialogComponent({ Trigger, children, className }: Tdialog) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="capitalize">{typeof Trigger === "string" ? Trigger : <Trigger />}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" aria-description="test">
        {children}
      </DialogContent>
    </Dialog>
  );
}
