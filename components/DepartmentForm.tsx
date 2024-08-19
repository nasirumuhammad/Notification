"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { facultyType, fetchFaculties } from "@/lib/helpers/faculty";
import { createDepartment } from "@/lib/helpers/department";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";

let formSchema = z.object({
  name: z.string().min(1, { message: "please enter a valid department name" }),
  id: z.string(),
});
type Tfaculty = z.infer<typeof formSchema>;
function submitHandler(data: Tfaculty) {
  createDepartment({ name: data.name, faculty: data.id });
  window.location.reload();
  console.log(data);
}
export default function FacultyForm() {
  let [faculties, setFaculties] = useState<facultyType[]>();
  useEffect(() => {
    fetchFaculties().then((data) => {
      setFaculties(data as any);
    });
  }, []);
  let {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm<Tfaculty>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(formSchema),
  });
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className=" mb-5">
        <Label htmlFor="faculty" className="my-5 capitalize">
          department
        </Label>
        <Input id="faculty" {...register("name")} />
        <p className="text-red-500">{errors && errors.name?.message}</p>
      </div>
      <Select
        onValueChange={(value) => {
          setValue("id", value);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select faculty" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {faculties?.map((faculty) => {
              return (
                <SelectItem className="capitalize" value={faculty.id} key={faculty.id}>
                  {faculty.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <p className="text-red-500">{errors && errors.id?.message}</p>
      <Button type="submit" className="capitalize mt-5">
        create faculty
      </Button>
    </form>
  );
}
