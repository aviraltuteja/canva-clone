import { UserRoles } from "@/app/generated/prisma";

export interface LoggedInUser {
  id: string;
  name: string;
  role: UserRoles;
  email: string;
}
