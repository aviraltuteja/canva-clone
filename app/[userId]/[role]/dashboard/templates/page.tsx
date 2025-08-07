"use client";

import AddDesignIcon from "@/app/components/dashboard/add-design";
import DesignInfoIcon from "@/app/components/dashboard/display-design";
import {
  fetchDashboardDesignsAtom,
  templateDesignsAtom,
} from "@/app/store/dashboard";
import { loggedInUserAtom } from "@/app/store/user";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";

export default function Templates(): React.ReactElement {
  const [, fetchDesigns] = useAtom(fetchDashboardDesignsAtom);
  const user = useAtomValue(loggedInUserAtom);
  const templates = useAtomValue(templateDesignsAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDesigns = async () => {
      setLoading(true);
      try {
        await fetchDesigns();
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) loadDesigns();
  }, [user, fetchDesigns]);

  if (loading) {
    return (
      <div className="p-8 text-lg text-primary">Loading your templates...</div>
    );
  }

  return (
    <div className="p-8">
      {" "}
      <div id="designs" className="grid grid-cols-6 gap-4">
        <AddDesignIcon template />
        {templates.map((design, key) => (
          <div key={key}>
            <DesignInfoIcon design={design} template />
          </div>
        ))}
      </div>
    </div>
  );
}
