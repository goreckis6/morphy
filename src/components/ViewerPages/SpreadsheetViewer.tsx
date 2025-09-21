import React from 'react';
import { BarChart3, FileSpreadsheet, Download, Share2 } from 'lucide-react';
import { Header } from '../Header';

export const SpreadsheetViewer: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <BarChart3 className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Spreadsheet Viewer & Converter
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                View and convert Excel, CSV, and OpenDocument spreadsheets online
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">MorphyIMG</h2>
            </div>
            
            <p className="text-gray-300 mb-6">
              Professional spreadsheet viewer and converter for all your data processing needs.
            </p>
            
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
              <span>© 2025 MorphyIMG. Built for spreadsheet professionals.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <FileSpreadsheet className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Universal Support
            </h3>
            <p className="text-gray-600">
              Support for Excel (XLS, XLSX), CSV, OpenDocument (ODS), and more spreadsheet formats
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <Download className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Format Conversion
            </h3>
            <p className="text-gray-600">
              Convert between different spreadsheet formats while preserving data integrity
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <Share2 className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Online Viewing
            </h3>
            <p className="text-gray-600">
              View spreadsheets directly in your browser with full table formatting
            </p>
          </div>
        </div>

        {/* Supported Formats */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Supported Spreadsheet Formats
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
                    Microsoft Excel
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    xls, xlsx, xlsm, xlsb
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    Industry standard spreadsheet format
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    Comma-Separated Values
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    csv
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    Universal data exchange format
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    OpenDocument Spreadsheet
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    ods
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    Open standard spreadsheet format
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Professional Spreadsheet Processing
          </h2>
          
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              Our advanced spreadsheet viewer and converter supports all major spreadsheet formats including 
              Microsoft Excel (XLS, XLSX, XLSM, XLSB), CSV files, and OpenDocument Spreadsheets (ODS). 
              Whether you need to view complex financial models, data analysis reports, or simple data tables, 
              our platform provides professional-grade viewing and conversion capabilities.
            </p>
            
            <p className="mb-4">
              The spreadsheet viewer maintains full formatting, formulas, and data integrity while providing 
              an intuitive interface with Excel-like column headers (A, B, C...) and row numbers. Large 
              spreadsheets are handled efficiently with scrollable views and responsive design that works 
              on all devices.
            </p>
            
            <p>
              Convert between different spreadsheet formats seamlessly while preserving data structure, 
              cell formatting, and mathematical formulas. Perfect for data migration, format standardization, 
              and cross-platform compatibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};