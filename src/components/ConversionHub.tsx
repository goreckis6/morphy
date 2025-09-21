import React from 'react';
import { RefreshCw, ArrowRight, FileText, Image, File } from 'lucide-react';

interface ConversionOption {
  from: string;
  to: string;
  title: string;
  description: string;
  path: string;
  category: 'text' | 'image' | 'document';
  icon: React.ReactNode;
}

export const ConversionHub: React.FC = () => {
  const conversions: ConversionOption[] = [
    // Text Conversions
    {
      from: 'JPG',
      to: 'TEXT',
      title: 'JPG to TEXT',
      description: 'Extract text from images using OCR',
      path: '/convert/jpg-to-text',
      category: 'text',
      icon: <FileText className="w-6 h-6 text-blue-600" />
    },
    {
      from: 'JPG',
      to: 'TXT',
      title: 'JPG to TXT',
      description: 'Convert images to plain text files',
      path: '/convert/jpg-to-txt',
      category: 'text',
      icon: <FileText className="w-6 h-6 text-blue-600" />
    },
    
    // Image Conversions
    {
      from: 'JPG',
      to: 'PNG',
      title: 'JPG to PNG',
      description: 'Convert to PNG with transparency support',
      path: '/convert/jpg-to-png',
      category: 'image',
      icon: <Image className="w-6 h-6 text-green-600" />
    },
    {
      from: 'JPG',
      to: 'WebP',
      title: 'JPG to WebP',
      description: 'Modern web format with better compression',
      path: '/convert/jpg-to-webp',
      category: 'image',
      icon: <Image className="w-6 h-6 text-green-600" />
    },
    {
      from: 'JPG',
      to: 'GIF',
      title: 'JPG to GIF',
      description: 'Convert to GIF format',
      path: '/convert/jpg-to-gif',
      category: 'image',
      icon: <Image className="w-6 h-6 text-green-600" />
    },
    {
      from: 'JPG',
      to: 'BMP',
      title: 'JPG to BMP',
      description: 'Convert to uncompressed bitmap',
      path: '/convert/jpg-to-bmp',
      category: 'image',
      icon: <Image className="w-6 h-6 text-green-600" />
    },
    {
      from: 'JPG',
      to: 'TIFF',
      title: 'JPG to TIFF',
      description: 'Professional quality TIFF format',
      path: '/convert/jpg-to-tiff',
      category: 'image',
      icon: <Image className="w-6 h-6 text-green-600" />
    },
    {
      from: 'JPG',
      to: 'ICO',
      title: 'JPG to ICO',
      description: 'Create Windows icon files',
      path: '/convert/jpg-to-ico',
      category: 'image',
      icon: <Image className="w-6 h-6 text-green-600" />
    },
    {
      from: 'JPG',
      to: 'SVG',
      title: 'JPG to SVG',
      description: 'Convert to scalable vector graphics',
      path: '/convert/jpg-to-svg',
      category: 'image',
      icon: <Image className="w-6 h-6 text-green-600" />
    },
    {
      from: 'JPG',
      to: 'EPS',
      title: 'JPG to EPS',
      description: 'Professional PostScript format',
      path: '/convert/jpg-to-eps',
      category: 'image',
      icon: <Image className="w-6 h-6 text-green-600" />
    },
    {
      from: 'JPG',
      to: 'PS',
      title: 'JPG to PS',
      description: 'PostScript document format',
      path: '/convert/jpg-to-ps',
      category: 'image',
      icon: <Image className="w-6 h-6 text-green-600" />
    },
    {
      from: 'JPG',
      to: 'TGA',
      title: 'JPG to TGA',
      description: 'Truevision TGA format',
      path: '/convert/jpg-to-tga',
      category: 'image',
      icon: <Image className="w-6 h-6 text-green-600" />
    },
    
    // Document Conversions
    {
      from: 'JPG',
      to: 'PDF',
      title: 'JPG to PDF',
      description: 'Create PDF documents from images',
      path: '/convert/jpg-to-pdf',
      category: 'document',
      icon: <File className="w-6 h-6 text-red-600" />
    },
    {
      from: 'JPG',
      to: 'DOCX',
      title: 'JPG to DOCX',
      description: 'Embed images in Word documents',
      path: '/convert/jpg-to-docx',
      category: 'document',
      icon: <File className="w-6 h-6 text-red-600" />
    },
    {
      from: 'JPG',
      to: 'DOC',
      title: 'JPG to DOC',
      description: 'Legacy Word document format',
      path: '/convert/jpg-to-doc',
      category: 'document',
      icon: <File className="w-6 h-6 text-red-600" />
    },
    {
      from: 'JPG',
      to: 'ODD',
      title: 'JPG to ODD',
      description: 'OpenDocument Drawing format',
      path: '/convert/jpg-to-odd',
      category: 'document',
      icon: <File className="w-6 h-6 text-red-600" />
    },
    {
      from: 'JPG',
      to: 'PSD',
      title: 'JPG to PSD',
      description: 'Photoshop document format',
      path: '/convert/jpg-to-psd',
      category: 'image',
      icon: <Image className="w-6 h-6 text-green-600" />
    }
  ];

  const categories = {
    text: { title: 'Text Extraction', color: 'blue' },
    image: { title: 'Image Formats', color: 'green' },
    document: { title: 'Document Formats', color: 'red' }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <RefreshCw className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800">
              JPG Conversion Hub
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Convert JPG images to any format you need. From text extraction to document creation, 
            we support all major conversion types with professional quality results.
          </p>
        </div>

        {Object.entries(categories).map(([categoryKey, category]) => (
          <div key={categoryKey} className="mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <div className={`w-4 h-4 rounded-full bg-${category.color}-500 mr-3`}></div>
              {category.title}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {conversions
                .filter(conv => conv.category === categoryKey)
                .map((conversion, index) => (
                  <a
                    key={index}
                    href={conversion.path}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      {conversion.icon}
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      {conversion.title}
                    </h4>
                    
                    <p className="text-gray-600 text-sm mb-4">
                      {conversion.description}
                    </p>
                    
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {conversion.from}
                      </span>
                      <ArrowRight className="w-3 h-3 text-gray-400" />
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                        {conversion.to}
                      </span>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        ))}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-8 text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Need a Different Conversion?
          </h3>
          <p className="text-gray-600 mb-6">
            We support hundreds of conversion combinations. Try our universal converter for more options.
          </p>
          <button
            onClick={() => document.getElementById('converter')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Try Universal Converter
          </button>
        </div>
      </div>
    </section>
  );
};