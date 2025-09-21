import React, { useState, useCallback } from 'react';
import { ArrowLeft, Upload, FileText, Download, Share2, Eye, X } from 'lucide-react';
import { Header } from '../Header';

interface RTFFile {
  file: File;
  preview: string;
}

export function RTFViewer() {
  const [files, setFiles] = useState<RTFFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<RTFFile | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      file => file.name.toLowerCase().endsWith('.rtf')
    );
    
    droppedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const rtfFile: RTFFile = {
          file,
          preview: e.target?.result as string || ''
        };
        setFiles(prev => [...prev, rtfFile]);
      };
      reader.readAsText(file);
    });
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []).filter(
      file => file.name.toLowerCase().endsWith('.rtf')
    );
    
    selectedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const rtfFile: RTFFile = {
          file,
          preview: e.target?.result as string || ''
        };
        setFiles(prev => [...prev, rtfFile]);
      };
      reader.readAsText(file);
    });
  };

  const downloadFile = (rtfFile: RTFFile) => {
    const url = URL.createObjectURL(rtfFile.file);
    const a = document.createElement('a');
    a.href = url;
    a.download = rtfFile.file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareFile = async (rtfFile: RTFFile) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: rtfFile.file.name,
          text: `Check out this RTF document: ${rtfFile.file.name}`,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
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
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Viewer</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-800">RTF Viewer</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Area */}
        <div className="mb-8">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Upload RTF Documents
            </h3>
            <p className="text-gray-500 mb-4">
              Drag and drop your RTF files here, or click to browse
            </p>
            <input
              type="file"
              accept=".rtf"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="rtf-upload"
            />
            <label
              htmlFor="rtf-upload"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose Files
            </label>
          </div>
        </div>

        {/* File Grid */}
        {files.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Uploaded RTF Documents ({files.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {files.map((rtfFile, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start space-x-3">
                    <FileText className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-800 truncate">
                        {rtfFile.file.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {(rtfFile.file.size / 1024).toFixed(1)} KB
                      </p>
                      <div className="flex items-center space-x-2 mt-3">
                        <button
                          onClick={() => setSelectedFile(rtfFile)}
                          className="flex items-center space-x-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                        >
                          <Eye className="w-3 h-3" />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => downloadFile(rtfFile)}
                          className="flex items-center space-x-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition-colors"
                        >
                          <Download className="w-3 h-3" />
                          <span>Download</span>
                        </button>
                        <button
                          onClick={() => shareFile(rtfFile)}
                          className="flex items-center space-x-1 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded hover:bg-purple-200 transition-colors"
                        >
                          <Share2 className="w-3 h-3" />
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* About RTF Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">About RTF Format</h2>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              Rich Text Format (RTF) is a proprietary document file format developed by Microsoft in 1987 
              for cross-platform document interchange. RTF files can contain formatted text, images, and 
              other document elements while maintaining compatibility across different word processors and platforms.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Advantages</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Cross-platform compatibility</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Preserves text formatting</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Smaller file sizes than DOCX</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Wide application support</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Best Use Cases</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Document exchange between platforms</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Legacy system compatibility</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Email attachments</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Simple formatted documents</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Technical Specifications</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-2 text-sm font-medium text-gray-500">File Extension</td>
                      <td className="py-2 text-sm text-gray-900">.rtf</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-sm font-medium text-gray-500">MIME Type</td>
                      <td className="py-2 text-sm text-gray-900">application/rtf, text/rtf</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-sm font-medium text-gray-500">Developer</td>
                      <td className="py-2 text-sm text-gray-900">Microsoft Corporation</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-sm font-medium text-gray-500">First Release</td>
                      <td className="py-2 text-sm text-gray-900">1987</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-sm font-medium text-gray-500">Format Type</td>
                      <td className="py-2 text-sm text-gray-900">Document format</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-sm font-medium text-gray-500">Encoding</td>
                      <td className="py-2 text-sm text-gray-900">ASCII with control words</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

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
              <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">MorphyIMG</h2>
            </div>
            
            <p className="text-gray-300 mb-6">
              Professional RTF viewer and converter for all your document processing needs.
            </p>
            
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
              <span>© 2025 MorphyIMG. Built for RTF professionals.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* File Viewer Modal */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">
                {selectedFile.file.name}
              </h3>
              <button
                onClick={() => setSelectedFile(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 overflow-auto max-h-[calc(90vh-120px)]">
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                  {selectedFile.preview}
                </pre>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 p-4 border-t bg-gray-50">
              <button
                onClick={() => downloadFile(selectedFile)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              <button
                onClick={() => shareFile(selectedFile)}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}