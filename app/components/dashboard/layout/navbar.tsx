"use client";

import { useRouter } from "next/navigation";
import { Home, Users, Settings, UserRoundPlus, UserCog } from "lucide-react";
import { UserRoles } from "@/app/generated/prisma";

const restrictedRoutes: Record<UserRoles, string[]> = {
  [UserRoles.admin]: [],
  [UserRoles.client]: [],
};

export default function Navbar({ role, id }: { role: string; id: string }) {
  const router = useRouter();

  const validRole = (role: string): UserRoles => {
    return Object.values(role).includes(role as UserRoles)
      ? (role as UserRoles)
      : UserRoles.client;
  };

  const userRole = validRole(role);

  const handleNavigate = (route: string) => () => {
    router.push(`/${id}/${role}/dashboard/${route}`);
  };

  // Define navigation items
  const navItems = [
    { icon: <Home size={20} />, label: "Home", route: "" },
    {
      icon: <UserRoundPlus size={20} />,
      label: "Templates",
      route: "templates",
    },
    { icon: <Settings size={20} />, label: "Settings", route: "settings" },
  ];

  const allowedNavItems = navItems.filter(
    (item) => !restrictedRoutes[userRole].includes(item.route)
  );

  return (
    <div className="h-full bg-gradient-to-b from-blue-700 to bg-blue-950 flex flex-col items-center py-6 px-2 gap-4 text-whiteshade">
      {allowedNavItems.map((item) => (
        <NavItem
          key={item.route}
          icon={item.icon}
          label={item.label}
          onClick={handleNavigate(item.route)}
        />
      ))}
    </div>
  );
}

function NavItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full rounded-md items-center px-4 py-2 gap-2 text-whiteshade hover:text-blue-700 transition hover:bg-whiteshade cursor-pointer">
      {icon}
      <span>{label}</span>
    </button>
  );
}
