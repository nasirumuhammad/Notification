"use client";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createNotification } from "@/lib/helpers/notification";
import { useEffect, useState } from "react";
import { facultyType, fetchFaculties } from "@/lib/helpers/faculty";
import { department, fetchDepartment } from "@/lib/helpers/department";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

let formSchema = z.object({
  title: z.string().nonempty("required"),
  text: z.string().nonempty("required"),
  facultyID: z.string().nonempty("required"),
  departmentID: z.string().nonempty("required"),
});
type Tnotification = z.infer<typeof formSchema>;
export default function NotificationForm({
  router,
  fetchNotification,
  setNotification,
}: {
  router: any;
  fetchNotification: any;
  setNotification: any;
}) {
  let [faculties, setFaculties] = useState<facultyType[]>();
  let [departments, setDepartments] = useState<department[]>();
  useEffect(() => {
    fetchFaculties().then((data) => {
      setFaculties(data as any);
    });
    fetchDepartment().then((data) => {
      setDepartments(data as any);
    });
  }, []);
  function submitHandler(data: Tnotification) {
    let { title, departmentID, facultyID, text } = data;
    createNotification({ title, departmentID, facultyID, text }).then((data) => {
      window.location.reload();
    });

    // window.location.reload();

    // console.log(data);
  }
  let {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm<Tnotification>({
    defaultValues: {
      title: "",
      text: "",
      departmentID: "",
      facultyID: "",
    },
    resolver: zodResolver(formSchema),
  });
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className=" mb-5">
        <Label htmlFor="faculty" className="my-5 capitalize">
          title
        </Label>
        <Input id="faculty" {...register("title")} />
        <p className="text-red-500">{errors && errors.title?.message}</p>
      </div>
      <div className="my-5">
        <Select
          onValueChange={(value) => {
            setValue("facultyID", value);
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
        <p className="text-red-500">{errors && errors.facultyID?.message}</p>
      </div>
      <div className="mb-5">
        <Select
          onValueChange={(value) => {
            setValue("departmentID", value);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {departments?.map((faculty) => {
                return (
                  <SelectItem className="capitalize" value={faculty.id as string} key={faculty.id}>
                    {faculty.name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <p className="text-red-500">{errors && errors.departmentID?.message}</p>
      </div>
      <div className="my-5">
        <Textarea {...register("text")} />
        <p className="text-red-500">{errors && errors.text?.message}</p>
      </div>
      <Button type="submit" className="capitalize">
        create notification
      </Button>
    </form>
  );
}
