import React, { ChangeEvent } from "react";
import { UploadIcon } from "../Icons";

interface BaseInputProps {
  label: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const TextInput: React.FC<BaseInputProps> = ({ label, ...props }) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
      {label}
    </label>
    <input
      type="text"
      {...props}
      className={`w-full px-3 py-2 bg-[var(--background-color)] border border-[var(--text-color)] border-opacity-30 rounded-md shadow-sm focus:outline-none focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] sm:text-sm ${props.className}`}
    />
  </div>
);

export const NumberInput: React.FC<
  BaseInputProps & { min?: number; max?: number }
> = ({ label, ...props }) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
      {label}
    </label>
    <input
      type="number"
      {...props}
      className={`w-full px-3 py-2 bg-[var(--background-color)] border border-[var(--text-color)] border-opacity-30 rounded-md shadow-sm focus:outline-none focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] sm:text-sm ${props.className}`}
    />
  </div>
);

export const TextareaInput: React.FC<
  BaseInputProps & { maxLength?: number; rows?: number }
> = ({ label, maxLength, ...props }) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
      {label}
    </label>
    <textarea
      {...props}
      maxLength={maxLength}
      className={`w-full px-3 py-2 bg-[var(--background-color)] border border-[var(--text-color)] border-opacity-30 rounded-md shadow-sm focus:outline-none focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] sm:text-sm ${props.className}`}
    />
    {maxLength && (
      <p className="text-xs text-right text-[var(--text-color)] text-opacity-70 mt-1">{`${(props.value as string)?.length || 0} / ${maxLength}`}</p>
    )}
  </div>
);

interface FileInputProps {
  label: string;
  file?: File;
  onFileChange: (file: File) => void;
  htmlId: string; // New prop for unique HTML ID
}

export const FileUpload: React.FC<FileInputProps> = ({
  label,
  file,
  onFileChange,
  htmlId,
}) => {
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0]);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
        {label}
      </label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-[var(--text-color)] border-opacity-30 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <UploadIcon className="mx-auto h-10 w-10 text-[var(--text-color)] text-opacity-60" />
          <div className="flex text-sm text-[var(--text-color)]">
            <label
              htmlFor={`file-upload-${htmlId}`}
              className="relative cursor-pointer bg-[var(--background-color)] rounded-md font-medium text-[var(--primary-color)] hover:brightness-90 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[var(--primary-color)]"
            >
              <span>Subir un archivo</span>
              <input
                id={`file-upload-${htmlId}`}
                name={`file-upload-${htmlId}`}
                type="file"
                className="sr-only"
                onChange={handleFile}
              />
            </label>
            <p className="pl-1">o arrastrar y soltar</p>
          </div>
          <p className="text-xs text-[var(--text-color)] text-opacity-70">PDF, DOCX, JPG, PNG</p>
        </div>
      </div>
      {file && (
        <p className="text-sm text-[var(--primary-color)] mt-2">
          Archivo seleccionado: {file.name}
        </p>
      )}
    </div>
  );
};
