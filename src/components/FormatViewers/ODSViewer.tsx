import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Header } from '../Header';
import { 
  Upload, 
  FileSpreadsheet, 
  Download, 
  Share2, 
  Eye, 
  X,
  CheckCircle,
  Info,
  BarChart3
} from 'lucide-react';

interface UploadedFile {
  file: File;
  preview?: string;
  id: string;
}

export function ODSViewer() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9)
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.oasis.opendocument.spreadsheet': ['.ods'],
      'application/vnd.oasis.opendocument.text': ['.odt'],
      'application/vnd.oasis.opendocument.presentation': ['.odp']
    },
    multiple: true
  });

  const handleDownload = (file: File) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async (file: File) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `ODS File: ${file.name}`,
          text: `Check out this ODS spreadsheet file: ${file.name}`,
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">
              ODS Spreadsheet Viewer
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            View and manage OpenDocument Spreadsheet files with our professional ODS viewer. 
            Perfect for LibreOffice Calc and other open-source spreadsheet applications.
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
              isDragActive 
                ? 'border-green-400 bg-green-50' 
                : 'border-gray-300 hover:border-green-400 hover:bg-gray-50'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {isDragActive ? 'Drop your ODS files here' : 'Upload ODS Spreadsheets'}
            </h3>
            <p className="text-gray-500 mb-4">
              Drag and drop your .ods, .odt, or .odp files here, or click to browse
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                ODS Support
              </span>
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                Batch Upload
              </span>
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                Secure Processing
              </span>
            </div>
          </div>
        </div>

        {/* Uploaded Files Grid */}
        {uploadedFiles.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Uploaded Files</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {uploadedFiles.map((uploadedFile) => (
                <div key={uploadedFile.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <FileSpreadsheet className="w-12 h-12 text-green-600 flex-shrink-0" />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedFile(uploadedFile)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View file"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownload(uploadedFile.file)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Download file"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleShare(uploadedFile.file)}
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        title="Share file"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2 truncate" title={uploadedFile.file.name}>
                    {uploadedFile.file.name}
                  </h3>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>Size: {formatFileSize(uploadedFile.file.size)}</p>
                    <p>Type: {uploadedFile.file.type || 'OpenDocument Spreadsheet'}</p>
                    <p>Modified: {new Date(uploadedFile.file.lastModified).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Format Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* About ODS Format */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">About ODS Format</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong>OpenDocument Spreadsheet (ODS)</strong> is an open standard file format for spreadsheets, 
                part of the OpenDocument Format (ODF) family. It's the native format for LibreOffice Calc and 
                Apache OpenOffice Calc.
              </p>
              <p>
                ODS files are XML-based and compressed, making them both human-readable and space-efficient. 
                They support advanced spreadsheet features including formulas, charts, pivot tables, and macros.
              </p>
              <p>
                As an open standard, ODS ensures long-term accessibility and interoperability across different 
                platforms and applications, making it ideal for organizations prioritizing open-source solutions.
              </p>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Technical Specifications</h2>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-700">File Extension</span>
                <span className="text-gray-600">.ods</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-700">MIME Type</span>
                <span className="text-gray-600">application/vnd.oasis.opendocument.spreadsheet</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-700">Standard</span>
                <span className="text-gray-600">ISO/IEC 26300</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-700">Compression</span>
                <span className="text-gray-600">ZIP-based</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-700">Structure</span>
                <span className="text-gray-600">XML-based</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium text-gray-700">Max Sheets</span>
                <span className="text-gray-600">1,024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
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
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Back to Home
            </a>
            </div>
          </div>
        </div>

      {/* File Viewer Modal */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <FileSpreadsheet className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {selectedFile.file.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedFile(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="text-center py-12">
                <FileSpreadsheet className="w-24 h-24 text-green-300 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  ODS Spreadsheet Preview
                </h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  This is an OpenDocument Spreadsheet file. To view the full content with formatting, 
                  formulas, and charts, please download and open with LibreOffice Calc or a compatible application.
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={() => handleDownload(selectedFile.file)}
                    className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download File</span>
                  </button>
                  <button
                    onClick={() => handleShare(selectedFile.file)}
                    className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
              
              {/* File Information */}
              <div className="mt-8 bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  File Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Filename:</span>
                    <p className="text-gray-800 break-all">{selectedFile.file.name}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">File Size:</span>
                    <p className="text-gray-800">{formatFileSize(selectedFile.file.size)}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">File Type:</span>
                    <p className="text-gray-800">{selectedFile.file.type || 'OpenDocument Spreadsheet'}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Last Modified:</span>
                    <p className="text-gray-800">{new Date(selectedFile.file.lastModified).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}