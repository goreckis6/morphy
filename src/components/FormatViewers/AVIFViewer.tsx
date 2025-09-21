import React, { useState, useCallback } from 'react';
import { ArrowLeft, Upload, Download, Share2, Eye, X, ZoomIn, ZoomOut } from 'lucide-react';
import { Header } from '../Header';

export function AVIFViewer() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

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

    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type === 'image/avif' || file.name.toLowerCase().endsWith('.avif')
    );
    
    if (files.length > 0) {
      setUploadedFiles(prev => [...prev, ...files]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(file => 
      file.type === 'image/avif' || file.name.toLowerCase().endsWith('.avif')
    );
    
    if (files.length > 0) {
      setUploadedFiles(prev => [...prev, ...files]);
    }
  };

  const getImageUrl = (file: File) => {
    return URL.createObjectURL(file);
  };

  const handleImageClick = (file: File) => {
    const url = getImageUrl(file);
    setSelectedImage(url);
  };

  const handleDownload = (file: File) => {
    const url = getImageUrl(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
  };

  const handleShare = async (file: File) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `AVIF Image: ${file.name}`,
          text: 'Check out this AVIF image',
          files: [file]
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <button 
            onClick={() => window.location.href = '/viewer'}
            className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Viewer</span>
          </button>
          <span>/</span>
          <span className="text-gray-800 font-medium">AVIF Viewer</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            AVIF Image Viewer
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            View and manage AVIF (AV1 Image File Format) images with our professional viewer. 
            Experience next-generation image compression with superior quality and smaller file sizes.
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload AVIF Images</h2>
          
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
              dragActive 
                ? 'border-blue-400 bg-blue-50' 
                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Drop AVIF files here or click to browse
            </h3>
            <p className="text-gray-500 mb-6">
              Supports .avif files with advanced AV1 compression
            </p>
            <input
              type="file"
              multiple
              accept=".avif,image/avif"
              onChange={handleFileInput}
              className="hidden"
              id="avif-upload"
            />
            <label
              htmlFor="avif-upload"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer inline-block"
            >
              Choose AVIF Files
            </label>
          </div>
        </div>

        {/* Image Grid */}
        {uploadedFiles.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Uploaded AVIF Images ({uploadedFiles.length})
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-white rounded-lg mb-4 overflow-hidden">
                    <img
                      src={getImageUrl(file)}
                      alt={file.name}
                      className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => handleImageClick(file)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-800 truncate" title={file.name}>
                      {file.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleImageClick(file)}
                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center space-x-1"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                      <button
                        onClick={() => handleDownload(file)}
                        className="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleShare(file)}
                        className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* About AVIF Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About AVIF Format</h2>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              AVIF (AV1 Image File Format) is a modern image format based on the AV1 video codec. 
              It offers superior compression efficiency compared to JPEG, PNG, and WebP, delivering 
              smaller file sizes while maintaining excellent image quality.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Advantages</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Up to 50% smaller file sizes than JPEG</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Superior image quality at low bitrates</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Support for HDR and wide color gamut</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Alpha channel transparency support</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Animation support (similar to GIF)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Best Use Cases</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Modern web applications</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>High-quality image storage</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Bandwidth-sensitive applications</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>HDR and wide color gamut images</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Next-generation image workflows</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Technical Specifications</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <tbody className="space-y-2">
                    <tr className="border-b border-gray-200">
                      <td className="font-medium text-gray-700 py-2">File Extension</td>
                      <td className="text-gray-600 py-2">.avif</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="font-medium text-gray-700 py-2">MIME Type</td>
                      <td className="text-gray-600 py-2">image/avif</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="font-medium text-gray-700 py-2">Compression</td>
                      <td className="text-gray-600 py-2">AV1 codec-based, lossy and lossless</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="font-medium text-gray-700 py-2">Color Depth</td>
                      <td className="text-gray-600 py-2">8, 10, 12 bits per channel</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="font-medium text-gray-700 py-2">Color Space</td>
                      <td className="text-gray-600 py-2">sRGB, Rec. 2020, P3</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="font-medium text-gray-700 py-2">Transparency</td>
                      <td className="text-gray-600 py-2">Yes (alpha channel)</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="font-medium text-gray-700 py-2">Animation</td>
                      <td className="text-gray-600 py-2">Yes</td>
                    </tr>
                    <tr>
                      <td className="font-medium text-gray-700 py-2">Browser Support</td>
                      <td className="text-gray-600 py-2">Chrome 85+, Firefox 93+, Safari 16+</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Features */}
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
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Back to Home
            </a>
            </div>
          </div>
        </div>

      {/* Full Image Viewer Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-full max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>
            
            <img
              src={selectedImage}
              alt="Full size AVIF"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}