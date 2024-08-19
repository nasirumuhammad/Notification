"use client";
import FacultyForm from "@/components/FacultyForm";
import Dialog from "@/components/Dialog";
import Card from "@/components/Card";
// import { deleteFaculty, facultyType, fetchFaculties } from "@/lib/helpers/faculty";
import { LuFileEdit, LuTrash } from "react-icons/lu";
import { useEffect, useState } from "react";
import DepartmentForm from "@/components/DepartmentForm";
import { deleteDepartment, department, fetchDepartment } from "@/lib/helpers/department";
import UpdateDepartment from "@/components/UpdateDepartment";
export default function Home() {
  let [departments, setDepartments] = useState<department[]>();
  useEffect(() => {
    fetchDepartment().then((data) => {
      setDepartments(data as any);
    });
  }, []);
  function hanldeDelete(id: string) {
    deleteDepartment(id);
    window.location.reload();
  }
  return (
    <>
      <Card className="capitalize w-full flex justify-between items-center">
        <h1 className="text-xl">department</h1>
        <div>
          <Dialog Trigger="create department">
            <DepartmentForm />
          </Dialog>
        </div>
      </Card>
      <div className="mt-5 capitalize">
        <Card>
          <table className="w-full">
            <thead>
              <tr>
                <th>name</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {departments?.map((data) => {
                return (
                  <tr key={data.id}>
                    <td>{data.name}</td>
                    <td>
                      <Dialog Trigger={LuFileEdit}>
                        <UpdateDepartment faculty={data.faculty} name={data.name} id={data.id} />
                      </Dialog>
                    </td>
                    <td>
                      <LuTrash
                        className="cursor-pointer"
                        onClick={() => {
                          hanldeDelete(data.id!);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </>
  );
}
