import React from 'react';
import { RefreshCw, ArrowLeft, FileText, Image, Database, Code, Download } from 'lucide-react';
import { Header } from './Header';

export const ConverterHub: React.FC = () => {
  const conversions = [
    {
      category: 'Developer Tools',
      icon: <Code className="w-6 h-6 text-blue-600" />,
      color: 'bg-blue-50 border-blue-200',
      items: [
        {
          title: 'AVRO to CSV',
          description: 'Convert Apache AVRO files to CSV format for data analysis',
          url: '/convert/avro-to-csv',
          inputFormat: 'AVRO',
          outputFormat: 'CSV'
        },
        {
          title: 'AVRO to JSON',
          description: 'Convert AVRO files to JSON format for web applications',
          url: '/convert/avro-to-json',
          inputFormat: 'AVRO',
          outputFormat: 'JSON'
        },
        {
          title: 'AVRO to NDJSON',
          description: 'Convert AVRO to Newline Delimited JSON for streaming',
          url: '/convert/avro-to-ndjson',
          inputFormat: 'AVRO',
          outputFormat: 'NDJSON'
        },
        {
          title: 'CSV to AVRO',
          description: 'Convert CSV files to AVRO format for big data processing',
          url: '/convert/csv-to-avro',
          inputFormat: 'CSV',
          outputFormat: 'AVRO'
        }
      ]
    },
    {
      category: 'Image Converters',
      icon: <Image className="w-6 h-6 text-green-600" />,
      color: 'bg-green-50 border-green-200',
      items: [
        {
          title: 'BMP to ICO',
          description: 'Convert BMP images to ICO format for Windows icons',
          url: '/convert/bmp-to-ico',
          inputFormat: 'BMP',
          outputFormat: 'ICO'
        },
        {
          title: 'BMP to WebP',
          description: 'Convert BMP images to WebP for better web performance',
          url: '/convert/bmp-to-webp',
          inputFormat: 'BMP',
          outputFormat: 'WebP'
        },
        {
          title: 'CR2 to ICO',
          description: 'Convert Canon CR2 raw images to ICO format',
          url: '/convert/cr2-to-ico',
          inputFormat: 'CR2',
          outputFormat: 'ICO'
        },
        {
          title: 'CR2 to WebP',
          description: 'Convert Canon CR2 raw images to WebP format',
          url: '/convert/cr2-to-webp',
          inputFormat: 'CR2',
          outputFormat: 'WebP'
        }
      ]
    },
    {
      category: 'Document Converters',
      icon: <FileText className="w-6 h-6 text-purple-600" />,
      color: 'bg-purple-50 border-purple-200',
      items: [
        {
          title: 'CSV to DOC',
          description: 'Convert CSV files to Microsoft Word DOC format',
          url: '/convert/csv-to-doc',
          inputFormat: 'CSV',
          outputFormat: 'DOC'
        }
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
              <RefreshCw className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">File Converters</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Convert files between different formats with our specialized converters. 
            Each converter is optimized for specific use cases and file types.
          </p>
        </div>

        {/* Universal Converter */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-200">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl">
                <Database className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Universal Converter</h2>
                <p className="text-gray-600">Convert between any supported formats</p>
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              Our universal converter supports 50+ file formats and can convert between any compatible types. 
              Perfect for general file conversion needs.
            </p>
            <a
              href="/#converter"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Open Universal Converter</span>
            </a>
          </div>
        </div>

        {/* Specialized Converters */}
        <div className="space-y-12">
          {conversions.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="flex items-center space-x-3 mb-6">
                {category.icon}
                <h2 className="text-2xl font-bold text-gray-900">{category.category}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((converter, index) => (
                  <div
                    key={index}
                    className={`${category.color} rounded-xl p-6 border-2 hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900">{converter.title}</h3>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <span className="font-medium">{converter.inputFormat}</span>
                        <ArrowLeft className="w-4 h-4 rotate-180" />
                        <span className="font-medium">{converter.outputFormat}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4 text-sm">
                      {converter.description}
                    </p>
                    
                    <a
                      href={converter.url}
                      className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Convert Now</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Choose Our Converters?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Fast & Reliable</h3>
              <p className="text-gray-600">Convert files quickly with our optimized conversion engines</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600">Your files are processed locally and never stored on our servers</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">High Quality</h3>
              <p className="text-gray-600">Maintain file quality and integrity during conversion</p>
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
