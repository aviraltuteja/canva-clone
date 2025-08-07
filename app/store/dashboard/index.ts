import { DesignWithElements } from "@/app/lib/types/design";
import { atom } from "jotai";
import { loggedInUserAtom } from "../user";

export const ownedDesignsAtom = atom<DesignWithElements[]>([]);
export const sharedDesignsAtom = atom<DesignWithElements[]>([]);
export const templateDesignsAtom = atom<DesignWithElements[]>([]);

export const fetchDashboardDesignsAtom = atom(null, async (get, set) => {
  const user = get(loggedInUserAtom);

  const res = await fetch("/api/design/dashboard", {
    method: "POST",
    body: JSON.stringify({ userId: user.id }),
  });

  if (!res.ok) throw new Error("Failed to fetch dashboard designs");

  const { owned, sharedWithMe, templates } = await res.json();

  set(ownedDesignsAtom, owned);
  set(sharedDesignsAtom, sharedWithMe);
  set(templateDesignsAtom, templates);
});
