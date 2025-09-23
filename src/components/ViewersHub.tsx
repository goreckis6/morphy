import React from 'react';
import { Eye, ArrowLeft, FileText, Image, BarChart3, Code, RefreshCw } from 'lucide-react';
import { Header } from './Header';

interface ViewerFormat {
  name: string;
  description: string;
  path: string;
  category: string;
  icon: React.ReactNode;
}

export const ViewersHub: React.FC = () => {
  const viewerCategories = [
    {
      title: "STANDARD IMAGE FORMATS",
      icon: <Image className="w-6 h-6 text-blue-600" />,
      formats: [
        { name: "JPEG Viewer", description: "View JPEG images with zoom and pan controls", path: "/viewer/jpg", category: "Image", icon: <Image className="w-5 h-5" /> },
        { name: "PNG Viewer", description: "View PNG images with transparency support", path: "/viewer/png", category: "Image", icon: <Image className="w-5 h-5" /> },
        { name: "WebP Viewer", description: "View WebP images with modern compression", path: "/viewer/webp", category: "Image", icon: <Image className="w-5 h-5" /> },
        { name: "GIF Viewer", description: "View animated GIF images with playback controls", path: "/viewer/gif", category: "Image", icon: <Image className="w-5 h-5" /> },
        { name: "SVG Viewer", description: "View scalable vector graphics with zoom", path: "/viewer/svg", category: "Image", icon: <Image className="w-5 h-5" /> },
        { name: "TIFF Viewer", description: "View TIFF images with multi-page support", path: "/viewer/tiff", category: "Image", icon: <Image className="w-5 h-5" /> },
        { name: "BMP Viewer", description: "View bitmap images with color depth support", path: "/viewer/bmp", category: "Image", icon: <Image className="w-5 h-5" /> },
        { name: "ICO Viewer", description: "View Windows icon files with multiple sizes", path: "/viewer/ico", category: "Image", icon: <Image className="w-5 h-5" /> },
        { name: "HEIC Viewer", description: "View HEIC images from modern cameras", path: "/viewer/heic", category: "Image", icon: <Image className="w-5 h-5" /> },
        { name: "AVIF Viewer", description: "View AVIF images with next-gen compression", path: "/viewer/avif", category: "Image", icon: <Image className="w-5 h-5" /> }
      ]
    },
    {
      title: "DOCUMENT FORMATS",
      icon: <FileText className="w-6 h-6 text-green-600" />,
      formats: [
        { name: "PDF Viewer", description: "View PDF documents with page navigation", path: "/viewer/pdf", category: "Document", icon: <FileText className="w-5 h-5" /> },
        { name: "DOCX Viewer", description: "View Microsoft Word documents", path: "/viewer/docx", category: "Document", icon: <FileText className="w-5 h-5" /> },
        { name: "RTF Viewer", description: "View Rich Text Format documents", path: "/viewer/rtf", category: "Document", icon: <FileText className="w-5 h-5" /> },
        { name: "ODT Viewer", description: "View OpenDocument Text files", path: "/viewer/odt", category: "Document", icon: <FileText className="w-5 h-5" /> },
        { name: "TXT Viewer", description: "View plain text files with syntax highlighting", path: "/viewer/txt", category: "Document", icon: <FileText className="w-5 h-5" /> },
        { name: "Markdown Viewer", description: "View Markdown files with rendered formatting", path: "/viewer/md", category: "Document", icon: <FileText className="w-5 h-5" /> }
      ]
    },
    {
      title: "SPREADSHEET FORMATS",
      icon: <BarChart3 className="w-6 h-6 text-purple-600" />,
      formats: [
        { name: "Excel Viewer", description: "View Excel spreadsheets with formula support", path: "/viewer/xlsx", category: "Spreadsheet", icon: <BarChart3 className="w-5 h-5" /> },
        { name: "CSV Viewer", description: "View CSV files with table formatting", path: "/viewer/csv", category: "Spreadsheet", icon: <BarChart3 className="w-5 h-5" /> },
        { name: "ODS Viewer", description: "View OpenDocument Spreadsheet files", path: "/viewer/ods", category: "Spreadsheet", icon: <BarChart3 className="w-5 h-5" /> }
      ]
    },
    {
      title: "CODE & DATA FORMATS",
      icon: <Code className="w-6 h-6 text-orange-600" />,
      formats: [
        { name: "JSON Viewer", description: "View JSON files with syntax highlighting and formatting", path: "/viewer/json", category: "Code", icon: <Code className="w-5 h-5" /> },
        { name: "XML Viewer", description: "View XML files with tree structure", path: "/viewer/xml", category: "Code", icon: <Code className="w-5 h-5" /> },
        { name: "HTML Viewer", description: "View HTML files with rendered content", path: "/viewer/html", category: "Code", icon: <Code className="w-5 h-5" /> },
        { name: "CSS Viewer", description: "View CSS files with syntax highlighting", path: "/viewer/css", category: "Code", icon: <Code className="w-5 h-5" /> },
        { name: "JavaScript Viewer", description: "View JS files with syntax highlighting", path: "/viewer/js", category: "Code", icon: <Code className="w-5 h-5" /> },
        { name: "Python Viewer", description: "View Python files with syntax highlighting", path: "/viewer/py", category: "Code", icon: <Code className="w-5 h-5" /> }
      ]
    },
    {
      title: "RAW CAMERA FORMATS",
      icon: <Image className="w-6 h-6 text-red-600" />,
      formats: [
        { name: "NEF Viewer", description: "View Nikon raw camera files", path: "/viewer/nef", category: "Raw", icon: <Image className="w-5 h-5" /> },
        { name: "CR2 Viewer", description: "View Canon raw camera files", path: "/viewer/cr2", category: "Raw", icon: <Image className="w-5 h-5" /> },
        { name: "DCR Viewer", description: "View Kodak raw camera files", path: "/viewer/dcr", category: "Raw", icon: <Image className="w-5 h-5" /> },
        { name: "X3F Viewer", description: "View Sigma raw camera files", path: "/viewer/x3f", category: "Raw", icon: <Image className="w-5 h-5" /> },
        { name: "ARW Viewer", description: "View Sony raw camera files", path: "/viewer/arw", category: "Raw", icon: <Image className="w-5 h-5" /> },
        { name: "RAF Viewer", description: "View Fuji raw camera files", path: "/viewer/raf", category: "Raw", icon: <Image className="w-5 h-5" /> },
        { name: "ORF Viewer", description: "View Olympus raw camera files", path: "/viewer/orf", category: "Raw", icon: <Image className="w-5 h-5" /> },
        { name: "DNG Viewer", description: "View Adobe Digital Negative files", path: "/viewer/dng", category: "Raw", icon: <Image className="w-5 h-5" /> },
        { name: "PEF Viewer", description: "View Pentax raw camera files", path: "/viewer/pef", category: "Raw", icon: <Image className="w-5 h-5" /> }
      ]
    }
  ];

  const handleBack = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">File Viewers</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            View and preview files in your browser without downloading. 
            Support for images, documents, spreadsheets, and more.
          </p>
        </div>

        {/* Viewer Categories */}
        <div className="space-y-12">
          {viewerCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="flex items-center space-x-3 mb-6">
                {category.icon}
                <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {category.formats.map((viewer, formatIndex) => (
                  <div
                    key={formatIndex}
                    className={`px-6 py-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors ${
                      formatIndex === 0 ? 'rounded-t-lg' : ''
                    } ${formatIndex === category.formats.length - 1 ? 'rounded-b-lg' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {viewer.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className="text-lg font-semibold text-gray-900">{viewer.name}</h3>
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                              {viewer.category}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm">{viewer.description}</p>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="inline-flex items-center space-x-2 bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed">
                          <Eye className="w-4 h-4" />
                          <span>Coming Soon</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Choose Our Viewers?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Instant Preview</h3>
              <p className="text-gray-600">View files instantly without downloading or installing software</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600">Files are processed locally and never stored on our servers</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Universal Support</h3>
              <p className="text-gray-600">Support for 50+ file formats across all categories</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl">
                <RefreshCw className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">MorphyIMG</h2>
            </div>
            
            <p className="text-gray-300 mb-6">
              The ultimate file conversion and viewing platform for professionals and everyday users.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
