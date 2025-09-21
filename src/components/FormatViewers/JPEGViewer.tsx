import React, { useState } from 'react';
import { Image, Upload, Eye, Download, Share2, ArrowLeft, Camera, Palette, Zap } from 'lucide-react';
import { FileUpload } from '../FileUpload';
import { FileViewer } from '../FileViewer';
import { Header } from '../Header';

export const JPEGViewer: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [viewerFile, setViewerFile] = useState<File | null>(null);

  const handleFilesSelected = (files: File[]) => {
    // Filter only JPEG files
    const jpegFiles = files.filter(file => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      return ['jpg', 'jpeg', 'jpe'].includes(extension || '');
    });
    setSelectedFiles(jpegFiles);
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
            <div className="p-3 bg-blue-100 rounded-xl">
              <Image className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                JPEG Viewer & Converter
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Upload, view, and convert JPEG image files online with professional quality
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
            Upload JPEG Files
          </h2>
          <FileUpload 
            onFilesSelected={handleFilesSelected}
            acceptedFormats={['jpg', 'jpeg', 'jpe']}
            maxFiles={50}
          />
        </div>

        {/* Preview Section */}
        {selectedFiles.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Preview JPEG Files ({selectedFiles.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {selectedFiles.map((file, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-3 overflow-hidden">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-sm font-medium text-gray-700 truncate mb-2">
                    {file.name}
                  </div>
                  <div className="text-xs text-gray-500 mb-3">
                    {(file.size / 1024).toFixed(1)} KB • JPEG
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setViewerFile(file)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center space-x-1"
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

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <Camera className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Professional Quality
            </h3>
            <p className="text-gray-600">
              View JPEG images with full quality preservation and zoom capabilities for detailed inspection
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <Zap className="w-8 h-8 text-yellow-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Fast Processing
            </h3>
            <p className="text-gray-600">
              Lightning-fast JPEG processing and conversion with optimized algorithms
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <Palette className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Format Conversion
            </h3>
            <p className="text-gray-600">
              Convert JPEG to PNG, WebP, AVIF, and other formats with quality control
            </p>
          </div>
        </div>

        {/* JPEG Information */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            About JPEG Format
          </h2>
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              JPEG (Joint Photographic Experts Group) is one of the most widely used image compression formats 
              in the world. Developed in 1992, JPEG uses lossy compression to significantly reduce file sizes 
              while maintaining acceptable image quality, making it perfect for digital photography, web images, 
              and storage-conscious applications.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Advantages</h3>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Small file sizes</strong> - Excellent compression ratios</li>
                  <li>• <strong>Universal support</strong> - Works on all devices and browsers</li>
                  <li>• <strong>Adjustable quality</strong> - Balance between size and quality</li>
                  <li>• <strong>Fast processing</strong> - Quick to encode and decode</li>
                  <li>• <strong>Wide compatibility</strong> - Supported by all image software</li>
                  <li>• <strong>EXIF metadata</strong> - Stores camera settings and information</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Best Use Cases</h3>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Digital photography</strong> - Perfect for photos with many colors</li>
                  <li>• <strong>Web images</strong> - Ideal for website backgrounds and photos</li>
                  <li>• <strong>Social media</strong> - Standard format for sharing images</li>
                  <li>• <strong>Email attachments</strong> - Small sizes for easy sharing</li>
                  <li>• <strong>Print media</strong> - High-quality printing when needed</li>
                  <li>• <strong>Mobile photography</strong> - Default format for most cameras</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            JPEG Technical Specifications
          </h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Specification</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">File Extensions</td>
                  <td className="px-6 py-4 text-sm text-gray-600">.jpg, .jpeg, .jpe</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">MIME Type</td>
                  <td className="px-6 py-4 text-sm text-gray-600">image/jpeg</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">Compression</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Lossy compression using DCT (Discrete Cosine Transform)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">Color Support</td>
                  <td className="px-6 py-4 text-sm text-gray-600">24-bit RGB, 8-bit Grayscale, CMYK</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">Maximum Resolution</td>
                  <td className="px-6 py-4 text-sm text-gray-600">65,535 × 65,535 pixels</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">Transparency</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Not supported</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">Animation</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Not supported</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">Metadata</td>
                  <td className="px-6 py-4 text-sm text-gray-600">EXIF, IPTC, XMP supported</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SEO Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            JPEG Viewer and Converter Features
          </h2>
          
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              Our professional JPEG viewer and converter provides comprehensive support for all JPEG variants 
              including standard JPEG (.jpg), JPEG 2000 (.jp2), and progressive JPEG files. Whether you're 
              a photographer, web developer, or graphic designer, our platform offers the tools you need for 
              professional JPEG processing.
            </p>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-6">Advanced Viewing Features</h3>
            <p className="mb-4">
              View JPEG images with pixel-perfect accuracy, zoom capabilities up to 500%, and detailed metadata 
              display including EXIF data from digital cameras. Our viewer supports all JPEG color spaces 
              including RGB, CMYK, and grayscale, ensuring accurate color representation across different devices.
            </p>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-6">Professional Conversion Tools</h3>
            <p className="mb-4">
              Convert JPEG files to PNG, WebP, AVIF, TIFF, and other formats while maintaining optimal quality. 
              Our conversion engine offers adjustable quality settings, resize options, and batch processing 
              capabilities for handling multiple files simultaneously.
            </p>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-6">Quality Optimization</h3>
            <p>
              Optimize JPEG files for web use with our smart compression algorithms that reduce file sizes 
              by up to 80% while preserving visual quality. Perfect for website optimization, email attachments, 
              and social media sharing where file size matters.
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl">
                <Image className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">MorphyIMG</h2>
            </div>
            
            <p className="text-gray-300 mb-6">
              Professional JPEG viewer and converter for all your image processing needs.
            </p>
            
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
              <span>© 2025 MorphyIMG. Built for JPEG professionals.</span>
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