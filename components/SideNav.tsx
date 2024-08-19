"use client";
import { LuBuilding, LuGraduationCap, LuBellRing } from "react-icons/lu";
import { usePathname } from "next/navigation";
import Link from "next/link";
type route = {
  pathname: string;
  label: string;
};
let Navigations: route[] = [
  { label: "faculty", pathname: "/admin" },
  { label: "department", pathname: "/admin/department" },
  { label: "notification", pathname: "/admin/notification" },
];
let icons: any = {
  faculty: LuBuilding,
  department: LuGraduationCap,
  notification: LuBellRing,
};
export default function () {
  let path = usePathname();
  console.log(path);
  return (
    <div className="sidenav">
      {Navigations.map((navigation) => {
        let Icon = icons[navigation.label];
        return (
          <div className="mb-10 text-stone-700" key={navigation.label}>
            <Link href={navigation.pathname}>
              <div className={path === navigation.pathname ? "nav bg-green-500 text-white" : "nav"}>
                <div className="text-yellow-300 mr-5">
                  <Icon size="25px" />
                </div>
                <div>{navigation.label}</div>
              </div>
            </Link>
          </div>
        );
      })}
      <div className="flex"></div>
    </div>
  );
}
