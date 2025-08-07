import Topbar from "@/app/components/dashboard/layout/top-bar";
import Navbar from "@/app/components/dashboard/layout/navbar";
import { ReactNode } from "react";
import AutoLogin from "@/app/components/auth/auto-login";

interface DashboardPageProps {
  params: {
    role: string;
    userId: string;
  };
}

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<DashboardPageProps["params"]>;
}): Promise<React.ReactElement> {
  const { role, userId } = await params;

  return (
    <div className="bg-gray-50 w-screen h-screen flex">
      <AutoLogin />
      <div className="h-screen w-[15%]" id="nav-bar">
        <Navbar role={role} id={userId} />
      </div>
      <div className="min-h-screen w-[85%] flex flex-col">
        <div id="top-bar" className="w-full h-20">
          <Topbar />
        </div>
        <div id="main-space " className="w-full h-full">
          {children}
        </div>
      </div>
    </div>
  );
}
