"use client";
import NotificationForm from "@/components/NotificationForm";
import Dialog from "@/components/Dialog";
import Card from "@/components/Card";
// import { deleteFaculty, facultyType, fetchFaculties } from "@/lib/helpers/faculty";
import { LuFileEdit, LuTrash } from "react-icons/lu";
import { useEffect, useState } from "react";
import DepartmentForm from "@/components/DepartmentForm";
import { deleteDepartment, department, fetchDepartment } from "@/lib/helpers/department";
import UpdateDepartment from "@/components/UpdateDepartment";
import { notification } from "@/lib/schemas/notification";
import { deleteNotification, fetchALLNotification } from "@/lib/helpers/notification";
import { useRouter } from "next/navigation";
type composite = notification & { id: string };
export default function Home() {
  let [notifications, setNotifications] = useState<composite[]>();
  let router = useRouter();
  useEffect(() => {
    fetchALLNotification().then((data) => {
      setNotifications(data as any);
    });
  }, []);
  function hanldeDelete(id: string) {
    deleteNotification(id).then(() => {
      fetchALLNotification().then((data) => {
        setNotifications(data as any);
        router.refresh();
      });
    });
    // window.location.reload();
  }
  return (
    <>
      <Card className="capitalize w-full flex justify-between items-center">
        <h1 className="text-xl">notification</h1>
        <div>
          <Dialog Trigger="create notification">
            <NotificationForm
              router={router}
              setNotification={setNotifications}
              fetchNotification={fetchALLNotification}
            />
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
              {notifications?.map((data) => {
                return (
                  <tr key={data.title}>
                    <td>{data.title}</td>
                    <td></td>
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
