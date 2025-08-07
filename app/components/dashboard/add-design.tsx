"use client";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useAtom } from "jotai";
import { createDesignAtom, createTemplateAtom } from "@/app/store/design";
import Modal from "./layout/modal";
import toast from "react-hot-toast";

export default function AddDesignIcon({
  template = false,
}: {
  template?: boolean;
}): React.ReactElement {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [designName, setDesignName] = useState("");
  const [, createDesign] = useAtom(createDesignAtom);
  const [, createTemplate] = useAtom(createTemplateAtom);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Creating design...", {
      position: "top-right",
      duration: Infinity,
    });
    try {
      console.log(template);
      const design = template
        ? await createTemplate(designName)
        : await createDesign(designName);
      setIsModalOpen(false);
      setDesignName("");
      setError(null);
      toast.success("Design created successfully!", {
        id: toastId,
        position: "top-right",
        duration: 3000,
      });
      // Open new tab with the design route
      window.open(`/design/${design.id}`, "_blank");
    } catch (err) {
      setError("Failed to create design. Please try again.");
      toast.error("Failed to create design. Please try again.", {
        id: toastId,
        position: "top-right",
        duration: 4000,
      });
    }
  };

  return (
    <>
      <div
        className="w-40 h-40 flex flex-col items-center justify-center p-2 bg-gray-200 rounded-md shadow-md cursor-pointer text-slate-700"
        onClick={() => setIsModalOpen(true)}>
        <Plus size={50} />
        Add
      </div>

      <Modal
        isOpen={isModalOpen}
        title="Create New Design"
        onClose={() => {
          setIsModalOpen(false);
          setDesignName("");
          setError(null);
        }}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="designName"
              className="block text-sm font-medium text-gray-700">
              Design Name
            </label>
            <input
              id="designName"
              type="text"
              value={designName}
              onChange={(e) => setDesignName(e.target.value)}
              className="mt-1 block w-full rounded-md text-gray-800 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              placeholder="Enter design name"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setDesignName("");
                setError(null);
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
              Create
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
