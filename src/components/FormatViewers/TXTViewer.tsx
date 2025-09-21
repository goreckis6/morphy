import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Header } from '../Header';
import { 
  Upload, 
  FileText, 
  Download, 
  Share2, 
  Eye, 
  X,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

interface UploadedFile extends File {
  id: string;
  preview?: string;
}

export function TXTViewer() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [fileContent, setFileContent] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      ...file,
      id: Math.random().toString(36).substr(2, 9)
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'text/csv': ['.csv'],
      'text/tab-separated-values': ['.tsv'],
      'application/octet-stream': ['.log']
    },
    multiple: true
  });

  const handleFileView = async (file: UploadedFile) => {
    setSelectedFile(file);
    
    try {
      const text = await file.text();
      setFileContent(text);
    } catch (error) {
      setFileContent(`Error reading file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleDownload = (file: UploadedFile) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async (file: UploadedFile) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Text File: ${file.name}`,
          text: `Check out this text file: ${file.name}`,
          files: [file]
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy filename to clipboard
      navigator.clipboard.writeText(file.name);
      alert('Filename copied to clipboard!');
    }
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    if (selectedFile?.id === fileId) {
      setSelectedFile(null);
      setFileContent('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.location.href = '/viewer'}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <FileText className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">TXT Viewer</h1>
                  <p className="text-sm text-gray-600">Plain Text Format</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Text Files</h2>
              
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive 
                    ? 'border-gray-400 bg-gray-50' 
                    : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  {isDragActive ? 'Drop text files here' : 'Upload Text Files'}
                </p>
                <p className="text-gray-500">
                  Drag & drop text files here, or click to browse
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Supports .txt, .csv, .tsv, .log files
                </p>
              </div>
            </div>

            {/* Uploaded Files */}
            {files.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Uploaded Files ({files.length})
                </h3>
                <div className="space-y-3">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="w-8 h-8 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-900 truncate max-w-xs">
                            {file.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {(file.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleFileView(file)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDownload(file)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleShare(file)}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Share"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Text Preview</h2>
              
              {selectedFile ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-6 h-6 text-gray-600" />
                      <span className="font-medium text-gray-900">{selectedFile.name}</span>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-white max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                      {fileContent}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">
                    No File Selected
                  </h3>
                  <p className="text-gray-500">
                    Upload and select a text file to preview its content
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Format Information */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Back to Home - All Supported Formats
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Standard Image Formats</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• JPEG (Joint Photographic Experts Group)</li>
                  <li>• JPEG 2000 Core Image File</li>
                  <li>• JPEG 2000 Image</li>
                  <li>• PNG (Portable Network Graphics)</li>
                  <li>• Web Picture Format</li>
                  <li>• AV1 Image File Format</li>
                  <li>• GIF (Graphics Interchange Format)</li>
                  <li>• TIFF (Tagged Image File Format)</li>
                  <li>• Pyramid encoded TIFF</li>
                  <li>• Bitmap Image</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Professional & Specialized</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• High Efficiency Image Container</li>
                  <li>• Scalable Vector Graphics</li>
                  <li>• Icon formats (ICO, CUR)</li>
                  <li>• RAW Camera formats</li>
                  <li>• Professional editing formats</li>
                  <li>• Document formats (PDF, DOCX, ODT)</li>
                  <li>• Spreadsheet formats (XLSX, CSV, ODS)</li>
                  <li>• Code formats (JS, Python, CSS, HTML)</li>
                </ul>
              </div>
            </div>
            <div className="text-center mt-6">
              <a
                href="/"
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-gray-500 to-gray-700 rounded-xl">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">MorphyIMG</h2>
            </div>
            
            <p className="text-gray-300 mb-6">
              Professional TXT viewer and converter for all your text processing needs.
            </p>
            
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
              <span>© 2025 MorphyIMG. Built for TXT professionals.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}