"use client";

import { useEffect, useState } from "react";
import Home from "./design";
import { DesignWithElements } from "@/app/lib/types/design";
import Loader from "../dashboard/layout/loader";

export default function TemplateWrapper({
  id,
  templateId,
}: {
  id: string;
  templateId: string;
}): React.ReactElement | null {
  const [data, setData] = useState<DesignWithElements | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/designs/${templateId}`);
        if (!res.ok) throw new Error("Failed to fetch design");

        const json = await res.json();
        if (json) {
          setData(json);
        }
        console.log(json);
      } catch (error) {
        console.error("Error fetching design:", error);
      }
    };

    fetchData();
  }, [templateId]);

  if (!data) return <Loader />;

  return <Home initialCanvas={data} id={id} />;
}
