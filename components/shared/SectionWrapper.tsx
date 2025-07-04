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
    <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
      <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            {infoText && (
              <div className="relative group flex items-center">
                <InfoIcon className="h-5 w-5 text-gray-400 cursor-pointer hover:text-blue-500 transition" />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-72 z-10 p-3 text-sm text-white bg-gray-900 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none text-left">
                  {infoText}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-gray-900"></div>
                </div>
              </div>
            )}
          </div>
          {description && (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          {maxEntries !== undefined && (
            <div
              className={`flex items-center gap-1 px-3 py-1 text-sm rounded-full ${isSaturated ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-700"}`}
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
              className="flex items-center gap-1 bg-blue-600 text-white font-semibold px-3 py-1.5 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
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
