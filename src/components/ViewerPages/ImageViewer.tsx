import React from 'react';
import { Image, Camera, Palette, FileImage } from 'lucide-react';
import { Header } from '../Header';

export const ImageViewer: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Image className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Image Viewer & Converter
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                View and convert images in all formats - JPEG, PNG, WebP, HEIF, RAW, and more
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <Image className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Standard Formats
            </h3>
            <p className="text-gray-600">
              JPEG, PNG, GIF, BMP, TIFF, WebP, AVIF and all common image formats
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <Camera className="w-8 h-8 text-orange-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              RAW Camera Files
            </h3>
            <p className="text-gray-600">
              Canon CR2, Nikon NEF, Sony ARW, DNG and all professional RAW formats
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <Palette className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Vector Graphics
            </h3>
            <p className="text-gray-600">
              SVG, EPS, AI, PostScript and scalable vector graphics formats
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <FileImage className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Professional Formats
            </h3>
            <p className="text-gray-600">
              PSD, XCF, HEIC, HEIF and professional editing formats
            </p>
          </div>
        </div>

        {/* Supported Image Formats */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Comprehensive Image Format Support
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Standard Web Formats</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>JPEG/JPG</span>
                  <span className="font-mono">jpg, jpeg, jpe</span>
                </div>
                <div className="flex justify-between">
                  <span>PNG</span>
                  <span className="font-mono">png</span>
                </div>
                <div className="flex justify-between">
                  <span>WebP</span>
                  <span className="font-mono">webp</span>
                </div>
                <div className="flex justify-between">
                  <span>AVIF</span>
                  <span className="font-mono">avif</span>
                </div>
                <div className="flex justify-between">
                  <span>GIF</span>
                  <span className="font-mono">gif</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Professional Formats</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>TIFF</span>
                  <span className="font-mono">tif, tiff</span>
                </div>
                <div className="flex justify-between">
                  <span>BMP</span>
                  <span className="font-mono">bmp</span>
                </div>
                <div className="flex justify-between">
                  <span>HEIC/HEIF</span>
                  <span className="font-mono">heic, heif</span>
                </div>
                <div className="flex justify-between">
                  <span>PSD</span>
                  <span className="font-mono">psd</span>
                </div>
                <div className="flex justify-between">
                  <span>SVG</span>
                  <span className="font-mono">svg</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Professional Image Processing
          </h2>
          
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              Our advanced image viewer and converter supports over 50 image formats including all standard 
              web formats (JPEG, PNG, WebP, AVIF, GIF), professional camera RAW files (CR2, NEF, ARW, DNG), 
              vector graphics (SVG, EPS, AI), and specialized formats (HEIC, PSD, TIFF). Whether you're a 
              photographer, designer, or web developer, our platform handles all your image processing needs.
            </p>
            
            <p className="mb-4">
              The image viewer provides high-quality rendering with zoom capabilities, metadata display, 
              and format conversion with customizable quality settings. RAW camera files are processed 
              with professional-grade algorithms to maintain color accuracy and detail.
            </p>
            
            <p>
              Convert between any image formats while preserving quality, adjusting compression settings, 
              and resizing images for web optimization or print preparation. Perfect for batch processing, 
              format standardization, and workflow automation.
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
                <Image className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">MorphyIMG</h2>
            </div>
            
            <p className="text-gray-300 mb-6">
              Professional image viewer and converter for all your image processing needs.
            </p>
            
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
              <span>© 2025 MorphyIMG. Built for image professionals.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};