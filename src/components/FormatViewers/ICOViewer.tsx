import React, { useState } from 'react';
import { Image, Upload, Eye, Download, Share2, ArrowLeft } from 'lucide-react';
import { FileUpload } from '../FileUpload';
import { FileViewer } from '../FileViewer';
import { Header } from '../Header';

export const ICOViewer: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [viewerFile, setViewerFile] = useState<File | null>(null);

  const handleFilesSelected = (files: File[]) => {
    // Filter only ICO files
    const icoFiles = files.filter(file => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      return ['ico', 'cur'].includes(extension || '');
    });
    setSelectedFiles(icoFiles);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.history.back()}
              className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="p-3 bg-orange-100 rounded-xl">
              <Image className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                ICO Viewer
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Upload and preview ICO icon files online
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Upload ICO Files
          </h2>
          <FileUpload 
            onFilesSelected={handleFilesSelected}
            acceptedFormats={['ico', 'cur']}
            maxFiles={20}
          />
        </div>

        {/* Preview Section */}
        {selectedFiles.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Preview ICO Files ({selectedFiles.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {selectedFiles.map((file, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-3 overflow-hidden flex items-center justify-center">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="text-sm font-medium text-gray-700 truncate mb-2">
                    {file.name}
                  </div>
                  <div className="text-xs text-gray-500 mb-3">
                    {(file.size / 1024).toFixed(1)} KB
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setViewerFile(file)}
                      className="flex-1 bg-orange-600 hover:bg-orange-700 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center space-x-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>View</span>
                    </button>
                    <button className="p-2 text-gray-500 hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors">
                      <Download className="w-3 h-3" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-purple-500 hover:bg-purple-50 rounded-lg transition-colors">
                      <Share2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Format Information */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            About ICO Format
          </h2>
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              ICO is a file format for computer icons in Microsoft Windows. ICO files contain one or more 
              small images at multiple sizes and color depths, such that they may be scaled appropriately. 
              In Windows, all executables that display an icon to the user, on the desktop, in the Start Menu, 
              or in Windows Explorer, must carry the icon in ICO format.
            </p>
            
            {/* Technical Specifications */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Technical Specifications</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-2 text-sm font-medium text-gray-500">File Extensions</td>
                      <td className="py-2 text-sm text-gray-900">.ico, .cur</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-sm font-medium text-gray-500">MIME Type</td>
                      <td className="py-2 text-sm text-gray-900">image/x-icon, image/vnd.microsoft.icon</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-sm font-medium text-gray-500">Developed By</td>
                      <td className="py-2 text-sm text-gray-900">Microsoft</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-sm font-medium text-gray-500">First Released</td>
                      <td className="py-2 text-sm text-gray-900">1985</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-sm font-medium text-gray-500">Color Depth</td>
                      <td className="py-2 text-sm text-gray-900">1, 4, 8, 16, 24, 32 bits</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-sm font-medium text-gray-500">Max Dimensions</td>
                      <td className="py-2 text-sm text-gray-900">256×256 pixels</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-sm font-medium text-gray-500">Transparency</td>
                      <td className="py-2 text-sm text-gray-900">Yes (Alpha channel)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Advantages</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Multiple sizes in one file</li>
                  <li>• Native Windows support</li>
                  <li>• Transparency support</li>
                  <li>• Small file sizes</li>
                  <li>• Wide compatibility</li>
                  <li>• Professional appearance</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Best Use Cases</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Application icons</li>
                  <li>• Website favicons</li>
                  <li>• Desktop shortcuts</li>
                  <li>• System icons</li>
                  <li>• Toolbar buttons</li>
                  <li>• Menu items</li>
                </ul>
              </div>
            </div>

            {/* Professional Features */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
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
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl">
                <Image className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">MorphyIMG</h2>
            </div>
            
            <p className="text-gray-300 mb-6">
              Professional ICO viewer and converter for all your icon processing needs.
            </p>
            
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
              <span>© 2025 MorphyIMG. Built for ICO professionals.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* File Viewer Modal */}
      {viewerFile && (
        <FileViewer
          file={viewerFile}
          onClose={() => setViewerFile(null)}
        />
      )}
    </div>
  );
};