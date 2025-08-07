import { UserRoles } from "@/app/generated/prisma";
import { LoggedInUser } from "@/app/lib/types/user";
import { atom } from "jotai";

const loggedInUserAtom = atom<LoggedInUser>({
  id: "",
  name: "",
  role: UserRoles.client,
  email: "",
});

export { loggedInUserAtom };
