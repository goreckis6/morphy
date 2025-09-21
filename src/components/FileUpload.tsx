import React, { useCallback, useState } from 'react';
import { Upload, X, FileText, Image, BarChart3 } from 'lucide-react';
import { FileProcessor } from '../utils/fileProcessing';

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
  acceptedFormats?: string[];
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFilesSelected,
  maxFiles = 10,
  maxSize = 100 * 1024 * 1024, // 100MB
  acceptedFormats
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFiles = useCallback((files: FileList) => {
    const fileArray = Array.from(files).slice(0, maxFiles);
    let validFiles = fileArray.filter(file => file.size <= maxSize);
    
    // Filter by accepted formats if specified
    if (acceptedFormats && acceptedFormats.length > 0) {
      validFiles = validFiles.filter(file => {
        const extension = file.name.split('.').pop()?.toLowerCase();
        return acceptedFormats.includes(extension || '');
      });
    }

    setSelectedFiles(validFiles);
    onFilesSelected(validFiles);
  }, [maxFiles, maxSize, acceptedFormats, onFilesSelected]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  }, [handleFiles]);

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    onFilesSelected(newFiles);
  };

  const getFileIcon = (file: File) => {
    const format = FileProcessor.getFileType(file);
    if (FileProcessor.isImageFormat(format)) {
      return <Image className="w-5 h-5 text-blue-500" />;
    } else if (FileProcessor.isSpreadsheetFormat(format)) {
      return <BarChart3 className="w-5 h-5 text-green-500" />;
    } else {
      return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="w-full">
      <div
        className={`
          border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
          ${dragActive 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-blue-400'
          }
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Drop any files here or click to browse
        </h3>
        <p className="text-gray-500 mb-4">
          {acceptedFormats && acceptedFormats.length > 0 
            ? `Supports: ${acceptedFormats.map(f => f.toUpperCase()).join(', ')} files`
            : 'Supports all file formats - images, documents, code, spreadsheets, and more'
          }
        </p>
        <input
          type="file"
          multiple
          onChange={handleFileInput}
          accept={acceptedFormats ? acceptedFormats.map(f => `.${f}`).join(',') : undefined}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg cursor-pointer transition-colors"
        >
          Choose Files
        </label>
        <div className="text-sm text-gray-500 mt-2">
          Max {maxFiles} files, up to {FileProcessor.formatFileSize(maxSize)} each • {acceptedFormats && acceptedFormats.length > 0 
            ? `${acceptedFormats.map(f => f.toUpperCase()).join(', ')} supported`
            : 'All formats supported'
          }
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-700 mb-3">
            Selected Files ({selectedFiles.length})
          </h4>
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {getFileIcon(file)}
                  <div>
                    <div className="text-sm font-medium text-gray-700">
                      {file.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {FileProcessor.formatFileSize(file.size)}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};