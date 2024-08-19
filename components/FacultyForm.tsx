"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFaculty } from "@/lib/helpers/faculty";

let formSchema = z.object({
  name: z.string().min(1, { message: "please enter a valid faculty name" }),
});
type Tfaculty = z.infer<typeof formSchema>;
function submitHandler(data: Tfaculty) {
  createFaculty({ name: data.name });
  window.location.reload();
}
export default function FacultyForm() {
  let {
    handleSubmit,
    formState: { errors },
    register,
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
          faculty
        </Label>
        <Input id="faculty" {...register("name")} />
        <p className="text-red-500">{errors && errors.name?.message}</p>
      </div>
      <Button type="submit" className="capitalize">
        create faculty
      </Button>
    </form>
  );
}
