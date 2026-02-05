"use client";

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileCode, CheckCircle2 } from 'lucide-react';
import { ACCEPTED_FILES } from '@/utils/file-utils';

interface DropzoneProps {
  onFilesAdded: (files: File[]) => void;
}

export default function Dropzone({ onFilesAdded }: DropzoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesAdded(acceptedFiles);
  }, [onFilesAdded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILES,
  });

  return (
    <div
      {...getRootProps()}
      className={`relative group cursor-pointer border-2 border-dashed rounded-2xl p-12 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-4
        ${isDragActive 
          ? 'border-blue-500 bg-blue-50/50 scale-[0.99]' 
          : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        }`}
    >
      <input {...getInputProps()} />
      <div className={`p-4 rounded-full transition-transform duration-300 ${isDragActive ? 'scale-110 bg-blue-100' : 'bg-gray-100 group-hover:bg-blue-50'}`}>
        <Upload className={`w-10 h-10 ${isDragActive ? 'text-blue-600' : 'text-gray-500'}`} />
      </div>
      <div className="text-center">
        <p className="text-lg font-semibold text-gray-700">
          {isDragActive ? 'Drop files here' : 'Click or drag files to upload'}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Support for Images, Video, and Audio (Max 1GB)
        </p>
      </div>
      
      <div className="mt-4 flex gap-3 text-xs text-gray-400 font-medium">
        <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Local Processing</span>
        <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> No Uploads</span>
        <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Fast & Free</span>
      </div>
    </div>
  );
}
