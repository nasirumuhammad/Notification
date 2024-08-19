"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { facultyType, updateFaculty } from "@/lib/helpers/faculty";

let formSchema = z.object({
  name: z.string().min(1, { message: "please enter a valid faculty name" }),
});
type Tfaculty = z.infer<typeof formSchema>;
export default function FacultyForm({ name, id }: facultyType) {
  function submitHandler(data: Tfaculty) {
    updateFaculty({ id: id, name: data.name }).then(() => {
      window.location.reload();
    });
    // console.log(data);
  }
  let {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<Tfaculty>({
    defaultValues: {
      name: name,
    },
    resolver: zodResolver(formSchema),
  });
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className=" mb-5">
        <Label htmlFor="faculty" className="my-5 capitalize">
          faculty
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
