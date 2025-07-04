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
    <label className="block text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>
    <input
      type="text"
      {...props}
      className={`w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${props.className}`}
    />
  </div>
);

export const NumberInput: React.FC<
  BaseInputProps & { min?: number; max?: number }
> = ({ label, ...props }) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>
    <input
      type="number"
      {...props}
      className={`w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${props.className}`}
    />
  </div>
);

export const TextareaInput: React.FC<
  BaseInputProps & { maxLength?: number; rows?: number }
> = ({ label, maxLength, ...props }) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>
    <textarea
      {...props}
      maxLength={maxLength}
      className={`w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${props.className}`}
    />
    {maxLength && (
      <p className="text-xs text-right text-gray-500 mt-1">{`${(props.value as string)?.length || 0} / ${maxLength}`}</p>
    )}
  </div>
);

interface FileInputProps {
  label: string;
  fileName?: string;
  onFileChange: (fileName: string) => void;
}

export const FileUpload: React.FC<FileInputProps> = ({
  label,
  fileName,
  onFileChange,
}) => {
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0].name);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <UploadIcon className="mx-auto h-10 w-10 text-gray-400" />
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor={`file-upload-${label}`}
              className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
            >
              <span>Subir un archivo</span>
              <input
                id={`file-upload-${label}`}
                name={`file-upload-${label}`}
                type="file"
                className="sr-only"
                onChange={handleFile}
              />
            </label>
            <p className="pl-1">o arrastrar y soltar</p>
          </div>
          <p className="text-xs text-gray-500">PDF, DOCX, JPG, PNG</p>
        </div>
      </div>
      {fileName && (
        <p className="text-sm text-green-700 mt-2">
          Archivo seleccionado: {fileName}
        </p>
      )}
      <p className="text-xs text-gray-500 mt-2">
        <strong>Nota:</strong> Esta función es solo para tu control. Los
        archivos no se guardan en el servidor; solo se registra el nombre.
      </p>
    </div>
  );
};
