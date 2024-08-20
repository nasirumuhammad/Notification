"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchFaculties } from "@/lib/helpers/faculty";
import Image from "next/image";
import { fetchDepartment, createDepartment } from "@/lib/helpers/department";
import { createUser } from "@/lib/helpers/user";
enum ROLE {
  admin = "admin",
  student = "student",
}
interface faculty {
  id: string;
  name: string;
}
interface department {
  id: string;
  name: string;
}
export default function RegistrationForm() {
  let [faculties, setFaculties] = useState<faculty[]>([]);
  let [departments, setdepartments] = useState<department[]>([]);
  let [selectedFaculty, setSelectedFaculty] = useState("");
  let [selectedDepartment, setSelectedDepartment] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let router = useRouter();
  useEffect(() => {
    async function faculties() {
      let faculties = await fetchFaculties();
      if (faculties) {
        setFaculties(faculties);
      }
    }
    faculties();
  }, []);
  function FetchDepartments() {
    fetchDepartment().then((department: any) => {
      setdepartments(department);
    });
  }
  const formSchema = z.object({
    name: z.string().min(1, {
      message: "please enter a valid name.",
    }),
    email: z.string().email(),
    password: z.string().max(8, {
      message: "password cannot be greater than 8",
    }),
    // department: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    createUser({
      name: values.name,
      email: values.email,
      password: values.password,
      department: selectedDepartment,
      role: ROLE.student,
    })
      .then(() => {
        router.push("/");
      })
      .finally(() => setIsLoading(false));
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full text-gray-500">
        <div className="flex justify-center">
          <Image src={"/logo.png"} height="50" width="50" alt="logo" />
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
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
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="my-5">
          <Select
            onValueChange={(value) => {
              setSelectedFaculty(value);
              FetchDepartments();
            }}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Faculty" />
            </SelectTrigger>
            <SelectContent>
              {faculties.map((faculty) => {
                return (
                  <SelectItem value={faculty.id} key={faculty.id}>
                    {faculty.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="my-5">
          <Select
            disabled={selectedFaculty ? false : true}
            onValueChange={(value) => {
              setSelectedDepartment(value);
            }}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((department) => {
                return (
                  <SelectItem value={department.id} key={department.id}>
                    {department.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="capitalize w-full" disabled={isLoading}>
          {isLoading ? "creating account..." : "create account"}
        </Button>
        <div className="capitalize text-sm">
          already have an account ?
          <Button variant={"link"}>
            <Link href={"/signin"}>sign in</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
