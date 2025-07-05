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
    <div className="p-4 border border-[var(--text-color)] border-opacity-20 rounded-lg bg-[color-mix(in srgb, var(--background-color) 50%, transparent)] relative">
      <div className="absolute top-2 right-2">
        <button
          onClick={onRemove}
          className="p-1.5 text-[var(--text-color)] text-opacity-60 hover:text-red-600 hover:bg-[color-mix(in srgb, red 10%, transparent)] rounded-full transition-colors"
          aria-label="Eliminar entrada"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
};