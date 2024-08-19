import Navbar from "@/components/nav";
import SideNav from "@/components/SideNav";

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Navbar />
      <div className="flex w-[100%] ">
        <div className="w-[20%] ">
          <SideNav />
        </div>
        <div className="ml-5 w-[80%]">{children}</div>
      </div>
    </main>
  );
}
