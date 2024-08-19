"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { fetchUser } from "@/lib/helpers/user";
import { useState } from "react";

export default function SignInForm() {
  let router = useRouter();
  let [loading, setLoading] = useState(false);
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().max(8, {
      message: "password cannot be greater than 8",
    }),
    // department: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    let { email, password } = values;
    setLoading(true);
    fetchUser(email)
      .then((data) => {
        if (data) {
          Cookies.set("name", data.name);
          Cookies.set("department", data.department);
          Cookies.set("ID", data.id);
          router.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full p-10 text-gray-500">
        <div className="flex justify-center">
          <Image src={"/logo.png"} height="50" width="50" alt="logo" />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="capitalize w-full" disabled={loading}>
          {loading ? "logging in ...." : "log in"}
        </Button>

        <div className="capitalize text-sm">
          don't have an account yet ?
          <Button variant={"link"}>
            <Link href={"/signup"}>sign up</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
