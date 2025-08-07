"use client";

import { DesignWithElements } from "@/app/lib/types/design";
import { loggedInUserAtom } from "@/app/store/user";
import { createDesignAtom } from "@/app/store/design";
import { useAtom, useAtomValue } from "jotai";
import { File } from "lucide-react";
import toast from "react-hot-toast";

export default function DesignInfoIcon({
  design,
  template = false,
}: {
  design: DesignWithElements;
  template?: boolean;
}): React.ReactElement {
  const user = useAtomValue(loggedInUserAtom);
  const [, createDesign] = useAtom(createDesignAtom);

  const handleUseClick = async () => {
    const toastId = toast.loading("Creating design from template...", {
      position: "top-right",
      duration: Infinity,
    });

    try {
      const newDesign = await createDesign(design.name);
      toast.success("Design created!", {
        id: toastId,
        position: "top-right",
        duration: 3000,
      });

      // Open new tab with template route
      window.open(`/templates/${design.id}/${newDesign.id}`, "_blank");
    } catch (err) {
      toast.error("Failed to create design from template", {
        id: toastId,
        position: "top-right",
        duration: 4000,
      });
    }
  };

  return (
    <div className="w-40 h-40 flex flex-col gap-4 items-center justify-center p-2 bg-gray-200 rounded-md shadow-md cursor-pointer text-slate-700">
      <div className="flex flex-col gap-1 items-center">
        {" "}
        <File />
        <div className="mt-2 text-center text-sm font-medium">
          {design.name}
        </div>
      </div>

      {template && (
        <div className="w-full flex justify-center mt-2 gap-2">
          {user.role === "admin" && (
            <div
              className="p-2 bg-amber-400 text-blackshade rounded-sm"
              onClick={() => window.open(`/design/${design.id}`, "_blank")}>
              Edit
            </div>
          )}
          <div
            className="p-2 bg-green-400 text-blackshade rounded-sm cursor-pointer"
            onClick={handleUseClick}>
            Use
          </div>
        </div>
      )}
    </div>
  );
}
