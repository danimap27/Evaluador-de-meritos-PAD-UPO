import React from "react";
import { TrashIcon } from "../Icons";

interface EntryCardProps {
  title: string;
  onRemove: () => void;
  children: React.ReactNode;
}

export const EntryCard: React.FC<EntryCardProps> = ({
  title,
  onRemove,
  children,
}) => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50/50 relative">
      <div className="absolute top-2 right-2">
        <button
          onClick={onRemove}
          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-100 rounded-full transition-colors"
          aria-label="Eliminar entrada"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
};
