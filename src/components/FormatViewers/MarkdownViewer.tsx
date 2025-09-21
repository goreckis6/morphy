import React, { useState } from 'react';
import { FileText, Upload, Eye, Download, Share2, ArrowLeft, Code, BookOpen, Edit } from 'lucide-react';
import { FileUpload } from '../FileUpload';
import { FileViewer } from '../FileViewer';

export const MarkdownViewer: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [viewerFile, setViewerFile] = useState<File | null>(null);

  const handleFilesSelected = (files: File[]) => {
    // Filter only Markdown files
    const markdownFiles = files.filter(file => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      return ['md', 'markdown', 'mdown', 'mkd', 'mdx'].includes(extension || '');
    });
    setSelectedFiles(markdownFiles);
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
            <div className="p-3 bg-gray-100 rounded-xl">
              <FileText className="w-8 h-8 text-gray-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Markdown Viewer & Editor
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Upload, view, and analyze Markdown (.md) files
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
            Upload Markdown Files
          </h2>
          <FileUpload 
            onFilesSelected={handleFilesSelected}
            acceptedFormats={['md', 'markdown', 'mdown', 'mkd', 'mdx']}
            maxFiles={40}
          />
        </div>

        {/* Preview Section */}
        {selectedFiles.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Preview Markdown Files ({selectedFiles.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {selectedFiles.map((file, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-gradient-to-br from-gray-500 to-gray-700 border-2 border-gray-200 rounded-lg mb-3 overflow-hidden flex items-center justify-center">
                    <FileText className="w-16 h-16 text-white" />
                  </div>
                  <div className="text-sm font-medium text-gray-700 truncate mb-2">
                    {file.name}
                  </div>
                  <div className="text-xs text-gray-500 mb-3">
                    {(file.size / 1024).toFixed(1)} KB • Markdown
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setViewerFile(file)}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center space-x-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>View</span>
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
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
            <BookOpen className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Rich Formatting
            </h3>
            <p className="text-gray-600">
              View Markdown with proper formatting including headers, lists, links, and code blocks
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <Code className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Syntax Highlighting
            </h3>
            <p className="text-gray-600">
              Code blocks within Markdown are highlighted with proper syntax coloring
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <Edit className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Live Preview
            </h3>
            <p className="text-gray-600">
              See how Markdown renders in real-time with our advanced preview engine
            </p>
          </div>
        </div>

        {/* Markdown Information */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            About Markdown Format
          </h2>
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              Markdown is a lightweight markup language with plain text formatting syntax. 
              Its design allows it to be converted to many output formats, but the original 
              tool by the same name only supports HTML. Markdown is often used to format 
              readme files, for writing messages in online discussion forums, and to create 
              rich text using a plain text editor.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Features</h3>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Simple syntax</strong> - Easy to learn and write</li>
                  <li>• <strong>Plain text</strong> - Human-readable in any editor</li>
                  <li>• <strong>Version control friendly</strong> - Works great with Git</li>
                  <li>• <strong>Cross-platform</strong> - Supported everywhere</li>
                  <li>• <strong>Extensible</strong> - Many flavors and extensions available</li>
                  <li>• <strong>Fast rendering</strong> - Quick conversion to HTML</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Best Use Cases</h3>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Documentation</strong> - README files and project docs</li>
                  <li>• <strong>Blog posts</strong> - Content creation and publishing</li>
                  <li>• <strong>Note-taking</strong> - Structured personal notes</li>
                  <li>• <strong>Technical writing</strong> - API documentation and guides</li>
                  <li>• <strong>Static sites</strong> - Content for static site generators</li>
                  <li>• <strong>Forums</strong> - Rich text in discussion platforms</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Markdown Technical Specifications
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
                  <td className="px-6 py-4 text-sm text-gray-600">.md, .markdown, .mdown, .mkd, .mdx</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">MIME Type</td>
                  <td className="px-6 py-4 text-sm text-gray-600">text/markdown, text/x-markdown</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">Format Type</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Lightweight markup language</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">Character Encoding</td>
                  <td className="px-6 py-4 text-sm text-gray-600">UTF-8, ASCII</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">Created By</td>
                  <td className="px-6 py-4 text-sm text-gray-600">John Gruber (2004)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">Flavors</td>
                  <td className="px-6 py-4 text-sm text-gray-600">CommonMark, GitHub Flavored, MultiMarkdown</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">Output Formats</td>
                  <td className="px-6 py-4 text-sm text-gray-600">HTML, PDF, LaTeX, DOCX</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">Syntax Elements</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Headers, Lists, Links, Code, Tables, Images</td>
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
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
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
                <div className="p-2 bg-gradient-to-br from-gray-500 to-gray-700 rounded-xl">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">MorphyIMG</h2>
              </div>
              
              <p className="text-gray-300 mb-6">
                Professional Markdown viewer and converter for all your documentation needs.
              </p>
              
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
                <span>© 2025 MorphyIMG. Built for Markdown professionals.</span>
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