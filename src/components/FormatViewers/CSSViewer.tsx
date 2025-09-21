import React, { useState } from 'react';
import { Palette, Upload, Eye, Download, Share2, ArrowLeft, Code, Layers, Paintbrush } from 'lucide-react';
import { FileUpload } from '../FileUpload';
import { FileViewer } from '../FileViewer';

export const CSSViewer: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [viewerFile, setViewerFile] = useState<File | null>(null);

  const handleFilesSelected = (files: File[]) => {
    // Filter only CSS files
    const cssFiles = files.filter(file => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      return ['css', 'scss', 'sass', 'less'].includes(extension || '');
    });
    setSelectedFiles(cssFiles);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.location.href = '/viewer'}
              className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="p-3 bg-blue-100 rounded-xl">
              <Palette className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                CSS Viewer & Editor
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Upload, view, and analyze Cascading Style Sheets (CSS) files
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
            Upload CSS Files
          </h2>
          <FileUpload 
            onFilesSelected={handleFilesSelected}
            acceptedFormats={['css', 'scss', 'sass', 'less']}
            maxFiles={40}
          />
        </div>

        {/* Preview Section */}
        {selectedFiles.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Preview CSS Files ({selectedFiles.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {selectedFiles.map((file, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-gray-200 rounded-lg mb-3 overflow-hidden flex items-center justify-center">
                    <Palette className="w-16 h-16 text-white" />
                  </div>
                  <div className="text-sm font-medium text-gray-700 truncate mb-2">
                    {file.name}
                  </div>
                  <div className="text-xs text-gray-500 mb-3">
                    {(file.size / 1024).toFixed(1)} KB • CSS Stylesheet
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setViewerFile(file)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center space-x-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>View</span>
                    </button>
                    <button className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
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
            <Code className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Syntax Highlighting
            </h3>
            <p className="text-gray-600">
              View CSS with proper syntax highlighting for better readability and code analysis
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <Layers className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Style Analysis
            </h3>
            <p className="text-gray-600">
              Analyze CSS rules, selectors, and properties for optimization opportunities
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <Paintbrush className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Design Preview
            </h3>
            <p className="text-gray-600">
              Preview how CSS styles affect visual presentation and layout
            </p>
          </div>
        </div>

        {/* CSS Information */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            About CSS Format
          </h2>
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation 
              of a document written in HTML or XML. CSS describes how elements should be rendered on 
              screen, on paper, in speech, or on other media. It's one of the cornerstone technologies 
              of the World Wide Web, alongside HTML and JavaScript.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Features</h3>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Separation of concerns</strong> - Style separate from content</li>
                  <li>• <strong>Cascading rules</strong> - Hierarchical style application</li>
                  <li>• <strong>Responsive design</strong> - Media queries for different devices</li>
                  <li>• <strong>Animations</strong> - CSS transitions and keyframe animations</li>
                  <li>• <strong>Flexbox & Grid</strong> - Modern layout systems</li>
                  <li>• <strong>Custom properties</strong> - CSS variables for maintainability</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Best Use Cases</h3>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Web styling</strong> - Visual presentation of web pages</li>
                  <li>• <strong>Responsive design</strong> - Multi-device compatibility</li>
                  <li>• <strong>Print styles</strong> - Optimized printing layouts</li>
                  <li>• <strong>Animations</strong> - Interactive user experiences</li>
                  <li>• <strong>Component styling</strong> - Modern framework integration</li>
                  <li>• <strong>Design systems</strong> - Consistent visual branding</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            CSS Technical Specifications
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
                  <td className="px-6 py-4 text-sm text-gray-600">.css, .scss, .sass, .less</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">MIME Type</td>
                  <td className="px-6 py-4 text-sm text-gray-600">text/css</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">Format Type</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Plain text, stylesheet</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">Character Encoding</td>
                  <td className="px-6 py-4 text-sm text-gray-600">UTF-8, ASCII</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">CSS Version</td>
                  <td className="px-6 py-4 text-sm text-gray-600">CSS3 (current), CSS4 (in development)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">Preprocessors</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Sass, Less, Stylus, PostCSS</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">Browser Support</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Universal (all modern browsers)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">Syntax</td>
                  <td className="px-6 py-4 text-sm text-gray-600">selector &#123; property: value; &#125;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SEO Content */}
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
        
        {/* Footer */}
        <footer className="bg-gray-800 text-white py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">MorphyIMG</h2>
              </div>
              
              <p className="text-gray-300 mb-6">
                Professional CSS viewer and converter for all your styling needs.
              </p>
              
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
                <span>© 2025 MorphyIMG. Built for CSS professionals.</span>
              </div>
            </div>
          </div>
        </footer>
      </div>

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