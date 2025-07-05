import React from "react";
import { PlusIcon, CheckCircleIcon, InfoIcon } from "../Icons";

interface SectionWrapperProps {
  title: string;
  description?: string;
  infoText?: string;
  maxEntries?: number;
  currentEntries?: number;
  onAddEntry?: () => void;
  children: React.ReactNode;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  title,
  description,
  infoText,
  maxEntries,
  currentEntries,
  onAddEntry,
  children,
}) => {
  const isSaturated =
    maxEntries !== undefined &&
    currentEntries !== undefined &&
    currentEntries >= maxEntries;

  return (
    <div className="p-4 border-l-4 border-[var(--primary-color)] bg-[color-mix(in srgb, var(--primary-color) 10%, transparent)] rounded-r-lg">
      <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-[var(--text-color)]">{title}</h3>
            {infoText && (
              <div className="relative group flex items-center">
                <InfoIcon className="h-5 w-5 text-[var(--text-color)] text-opacity-60 cursor-pointer hover:text-[var(--primary-color)] transition" />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-72 z-10 p-3 text-sm text-[var(--background-color)] bg-[var(--text-color)] rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none text-left">
                  {infoText}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-[var(--text-color)]"></div>
                </div>
              </div>
            )}
          </div>
          {description && (
            <p className="text-sm text-[var(--text-color)] mt-1">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          {maxEntries !== undefined && (
            <div
              className={`flex items-center gap-1 px-3 py-1 text-sm rounded-full ${isSaturated ? "bg-[color-mix(in srgb, var(--secondary-color) 20%, transparent)] text-[var(--text-color)]" : "bg-[color-mix(in srgb, var(--text-color) 10%, transparent)] text-[var(--text-color)]"}`}
            >
              {isSaturated && <CheckCircleIcon className="h-4 w-4" />}
              <span>
                {currentEntries} / {maxEntries}{" "}
                {isSaturated ? " (Máx)" : "aportaciones"}
              </span>
            </div>
          )}
          {onAddEntry && (
            <button
              onClick={onAddEntry}
              disabled={isSaturated}
              className="flex items-center gap-1 bg-[var(--primary-color)] text-[var(--background-color)] font-semibold px-3 py-1.5 rounded-md hover:brightness-90 transition disabled:bg-[color-mix(in srgb, var(--text-color) 30%, transparent)] disabled:cursor-not-allowed"
            >
              <PlusIcon className="h-4 w-4" />
              Añadir
            </button>
          )}
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
};