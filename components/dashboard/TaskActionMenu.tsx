"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreVertical, PencilLine, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TaskActionMenuProps {
  taskId: string;
  editUrl: string;
  onDelete: (taskId: string) => Promise<void>;
  colors: {
    bgCard: string;
    border: string;
    hover: string;
  };
  index: number;
  taskLength: number;
}

export default function TaskActionMenu({
  taskId,
  editUrl,
  onDelete,
  colors,
  index,
  taskLength,
}: TaskActionMenuProps) {
  const [open, setOpen] = useState<string | null>(null);
  const router = useRouter();

  const isLastItems = index >= taskLength - 2;

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(null);

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?",
    );
    if (!confirmDelete) return;

    await onDelete(taskId);
  };

  return (
    <div className="relative flex justify-end">
      {/* Trigger */}
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(open === taskId ? null : taskId);
        }}
        className={`h-8 w-8 flex items-center justify-center rounded-md ${colors.hover} transition-all duration-200 hover:scale-105`}
      >
        <MoreVertical size={16} />
      </Button>

      {/* Menu */}
      {open === taskId && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-30"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(null);
            }}
          />

          {/* Dropdown */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={`absolute right-0 z-40 w-44 ${
              isLastItems ? "bottom-10" : "top-10"
            } ${colors.bgCard} border ${colors.border} rounded-xl shadow-2xl p-1`}
          >
            <Button
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(null);
                router.push(editUrl);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${colors.hover} transition-colors`}
            >
              <PencilLine size={16} className="opacity-70" />
              Edit Task
            </Button>

            <Button
              variant="ghost"
              onClick={handleDelete}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors"
            >
              <Trash size={16} />
              Delete Task
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
