"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { department, updateDepartment } from "@/lib/helpers/department";

let formSchema = z.object({
  name: z.string().min(1, { message: "please enter a valid faculty name" }),
});
type Tdepartment = z.infer<typeof formSchema>;
export default function UpdateForm({ name, id, faculty }: department) {
  function submitHandler(data: Tdepartment) {
    updateDepartment({ id: id, faculty: faculty, name: data.name }).then(() => {
      window.location.reload();
    });
    // console.log(data);
  }
  let {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<{ name: string }>({
    defaultValues: {
      name: name,
    },
    resolver: zodResolver(formSchema),
  });
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className=" mb-5">
        <Label htmlFor="faculty" className="my-5 capitalize">
          department
        </Label>
        <Input id="faculty" {...register("name")} placeholder={name} />
        <p className="text-red-500">{errors && errors.name?.message}</p>
      </div>
      <Button type="submit" className="capitalize">
        update faculty
      </Button>
    </form>
  );
}
