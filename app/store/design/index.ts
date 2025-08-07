import { CanvasElement, DesignWithElements } from "@/app/lib/types/design";
import { atom } from "jotai";
import { loggedInUserAtom } from "../user";

export const canvasElementsAtom = atom<CanvasElement[]>([]);

export const canvasAtom = atom<DesignWithElements>({
  id: "",
  name: "",
  height: 800,
  width: 600,
  backgroundColor: "#fff",
  privacy: "private",
  createdAt: "",
  updatedAt: "",
  elements: [],
});

export const createDesignAtom = atom(null, async (get, set, name: string) => {
  const user = get(loggedInUserAtom);

  const res = await fetch("/api/design/create", {
    method: "POST",
    body: JSON.stringify({
      name,
      userId: user.id,
      privacy: "private",
    }),
  });

  if (!res.ok) throw new Error("Failed to create design");
  const data = await res.json();
  return data;
});

export const createFromTemplateAtom = atom(
  null,
  async (get, set, templateId: string) => {
    const user = get(loggedInUserAtom);

    const res = await fetch("/api/design/from-template", {
      method: "POST",
      body: JSON.stringify({
        userId: user.id,
        designId: templateId,
      }),
    });

    if (!res.ok) throw new Error("Failed to create from template");
    const data = await res.json();
    return data;
  }
);

export const updateDesignAtom = atom(
  null,
  async (get, set, designId: string) => {
    const canvas = get(canvasAtom);

    const res = await fetch("/api/design/update", {
      method: "POST",
      body: JSON.stringify({
        designId,
        canvas,
      }),
    });

    if (!res.ok) throw new Error("Failed to update design");
    const data = await res.json();
    return data;
  }
);

export const shareDesignAtom = atom(
  null,
  async (get, set, { email }: { email: string }) => {
    const user = get(loggedInUserAtom);

    const res = await fetch("/api/design/share", {
      method: "POST",
      body: JSON.stringify({
        ownerId: user.id,
        email,
      }),
    });

    if (!res.ok) throw new Error("Failed to share design");
    const data = await res.json();
    return data;
  }
);

export const fetchDesignAtom = atom(
  null,
  async (get, set, designId: string) => {
    try {
      const res = await fetch(`/api/designs/${designId}`);
      if (!res.ok) throw new Error("Failed to fetch design");
      const data = await res.json();
      console.log(data);
      // Update canvas elements
      set(canvasAtom, data);
    } catch (err) {
      console.error("Error fetching design:", err);
    }
  }
);

export const createTemplateAtom = atom(null, async (get, set, name: string) => {
  const user = get(loggedInUserAtom);

  const res = await fetch("/api/design/create", {
    method: "POST",
    body: JSON.stringify({
      name,
      userId: user.id,
      privacy: "template",
    }),
  });

  if (!res.ok) throw new Error("Failed to create design");
  const data = await res.json();
  return data;
});
