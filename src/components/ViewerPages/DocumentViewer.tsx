import React from 'react';
import { FileText, File, BookOpen, FileCode } from 'lucide-react';
import { Header } from '../Header';

export const DocumentViewer: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-100 rounded-xl">
              <FileText className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Document Viewer & Converter
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                View and convert PDF, Word, Pages, and all document formats online
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <FileText className="w-8 h-8 text-red-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              PDF Documents
            </h3>
            <p className="text-gray-600">
              View, merge, split and convert PDF files with full text rendering
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <File className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Word Documents
            </h3>
            <p className="text-gray-600">
              Microsoft Word DOC, DOCX and OpenDocument ODT support
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <BookOpen className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Apple Pages
            </h3>
            <p className="text-gray-600">
              Native Apple Pages document viewing and conversion
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <FileCode className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Text & Code
            </h3>
            <p className="text-gray-600">
              Plain text, RTF, LaTeX, and programming language files
            </p>
          </div>
        </div>

        {/* Supported Document Formats */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Supported Document Formats
          </h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Format
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Extensions
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    Portable Document Format
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    pdf
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    Universal document format with full layout preservation
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    Microsoft Word
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    doc, docx
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    Industry standard word processing documents
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    Apple Pages
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    pages
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    Apple's native document format
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    OpenDocument Text
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    odt
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    Open standard document format
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    Rich Text Format
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    rtf
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    Cross-platform formatted text documents
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Professional Document Processing
          </h2>
          
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              Our comprehensive document viewer and converter supports all major document formats including 
              PDF, Microsoft Word (DOC, DOCX), Apple Pages, OpenDocument (ODT), Rich Text Format (RTF), 
              and many specialized formats. Whether you're working with business documents, academic papers, 
              or technical manuals, our platform provides professional-grade viewing and conversion capabilities.
            </p>
            
            <p className="mb-4">
              The document viewer maintains original formatting, fonts, and layout while providing features 
              like text search, zoom controls, and page navigation. PDF documents are rendered with high 
              fidelity, and Word documents preserve complex formatting including tables, images, and styles.
            </p>
            
            <p>
              Convert between document formats while preserving content structure, formatting, and embedded 
              media. Perfect for document standardization, format migration, and cross-platform compatibility 
              in professional workflows.
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">MorphyIMG</h2>
            </div>
            
            <p className="text-gray-300 mb-6">
              Professional document viewer and converter for all your document processing needs.
            </p>
            
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
              <span>© 2025 MorphyIMG. Built for document professionals.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};