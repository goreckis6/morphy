import React, { useState } from 'react';
import { RefreshCw, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './AuthModal';

export const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
    setShowMobileMenu(false);
  };

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl">
                <RefreshCw className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  MorphyIMG
                </h1>
                <p className="text-xs text-gray-500">File Conversion & Viewer</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <nav className="flex items-center space-x-6">
                <div className="relative group">
                  <button className="text-gray-700 hover:text-blue-600 transition-colors">
                    Converter
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <a href="/converters" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg font-medium">
                      All Converters
                    </a>
                    <div className="border-t border-gray-200 my-1"></div>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Developer Tools</div>
                    <a href="/convert/avro-to-csv" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      AVRO to CSV
                    </a>
                    <a href="/convert/avro-to-json" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      AVRO to JSON
                    </a>
                    <a href="/convert/avro-to-ndjson" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      AVRO to NDJSON
                    </a>
                    <a href="/convert/csv-to-avro" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      CSV to AVRO
                    </a>
                    <div className="border-t border-gray-200 my-1"></div>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Image Converters</div>
                    <a href="/convert/bmp-to-ico" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      BMP to ICO
                    </a>
                    <a href="/convert/bmp-to-webp" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      BMP to WebP
                    </a>
                    <a href="/convert/cr2-to-ico" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      CR2 to ICO
                    </a>
                    <a href="/convert/cr2-to-webp" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      CR2 to WebP
                    </a>
                    <a href="/convert/dng-to-ico" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      DNG to ICO
                    </a>
                    <a href="/convert/dng-to-webp" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      DNG to WebP
                    </a>
                    <a href="/convert/eps-to-ico" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      EPS to ICO
                    </a>
                    <a href="/convert/eps-to-webp" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      EPS to WebP
                    </a>
                    <a href="/convert/gif-to-ico" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      GIF to ICO
                    </a>
                    <div className="border-t border-gray-200 my-1"></div>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Document Converters</div>
                    <a href="/convert/csv-to-doc" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      CSV to DOC
                    </a>
                    <a href="/convert/csv-to-docx" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      CSV to DOCX
                    </a>
                    <a href="/convert/csv-to-epub" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      CSV to EPUB
                    </a>
                    <a href="/convert/csv-to-html" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      CSV to HTML
                    </a>
                    <a href="/convert/csv-to-md" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      CSV to MD
                    </a>
                    <a href="/convert/csv-to-mobi" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      CSV to MOBI
                    </a>
                    <a href="/convert/csv-to-odp" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      CSV to ODP
                    </a>
                    <a href="/convert/csv-to-odt" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      CSV to ODT
                    </a>
                    <a href="/convert/csv-to-pdf" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      CSV to PDF
                    </a>
                    <a href="/convert/csv-to-ppt" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      CSV to PPT
                    </a>
                    <a href="/convert/csv-to-pptx" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      CSV to PPTX
                    </a>
                    <a href="/convert/csv-to-rtf" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      CSV to RTF
                    </a>
                    <a href="/convert/csv-to-txt" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      CSV to TXT
                    </a>
                    <a href="/convert/csv-to-xls" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      CSV to XLS
                    </a>
                    <a href="/convert/csv-to-xlsx" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      CSV to XLSX
                    </a>
                    <div className="border-t border-gray-200 my-1"></div>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">DOC Converters</div>
                    <a href="/convert/doc-to-csv" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      DOC to CSV
                    </a>
                    <a href="/convert/doc-to-epub" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      DOC to EPUB
                    </a>
                    <a href="/convert/doc-to-mobi" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      DOC to MOBI
                    </a>
                    <a href="/convert/doc-to-odt" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      DOC to ODT
                    </a>
                    <a href="/convert/doc-to-txt" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      DOC to TXT
                    </a>
                    <div className="border-t border-gray-200 my-1"></div>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">DOCX Converters</div>
                    <a href="/convert/docx-to-csv" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      DOCX to CSV
                    </a>
                    <a href="/convert/docx-to-epub" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      DOCX to EPUB
                    </a>
                    <a href="/convert/docx-to-mobi" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      DOCX to MOBI
                    </a>
                    <a href="/convert/docx-to-odt" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      DOCX to ODT
                    </a>
                    <a href="/convert/docx-to-txt" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      DOCX to TXT
                    </a>
                    <div className="border-t border-gray-200 my-1"></div>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">E-book Converters (EPUB)</div>
                    <a href="/convert/epub-to-csv" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      EPUB to CSV
                    </a>
                    <a href="/convert/epub-to-doc" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      EPUB to DOC
                    </a>
                    <a href="/convert/epub-to-docx" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      EPUB to DOCX
                    </a>
                    <a href="/convert/epub-to-html" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      EPUB to HTML
                    </a>
                    <a href="/convert/epub-to-md" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      EPUB to MD
                    </a>
                    <a href="/convert/epub-to-mobi" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      EPUB to MOBI
                    </a>
                    <a href="/convert/epub-to-odp" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      EPUB to ODP
                    </a>
                    <a href="/convert/epub-to-odt" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      EPUB to ODT
                    </a>
                    <a href="/convert/epub-to-pdf" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      EPUB to PDF
                    </a>
                    <a href="/convert/epub-to-ppt" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      EPUB to PPT
                    </a>
                    <a href="/convert/epub-to-pptx" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      EPUB to PPTX
                    </a>
                    <a href="/convert/epub-to-rtf" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      EPUB to RTF
                    </a>
                    <a href="/convert/epub-to-txt" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      EPUB to TXT
                    </a>
                    <a href="/convert/epub-to-xlsx" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      EPUB to XLSX
                    </a>
                    <div className="border-t border-gray-200 my-1"></div>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Developer Tools (CSV)</div>
                    <a href="/convert/csv-to-json" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      CSV to JSON
                    </a>
                    <a href="/convert/csv-to-ndjson" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      CSV to NDJSON
                    </a>
                    <a href="/convert/csv-to-parquet" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      CSV to Parquet
                    </a>
                    <a href="/convert/csv-to-sql" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      CSV to SQL
                    </a>
                    <a href="/convert/csv-to-toml" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      CSV to TOML
                    </a>
                    <a href="/convert/csv-to-xml" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      CSV to XML
                    </a>
                    <a href="/convert/csv-to-yaml" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-lg">
                      CSV to YAML
                    </a>
                  </div>
                </div>
                <a href="/viewers" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Viewers
                </a>
                <a href="/#supported-formats" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Formats
                </a>
              </nav>

              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {user.user_metadata?.username || user.email?.split('@')[0]}
                    </span>
                  </div>
                  <button
                    onClick={signOut}
                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleAuthClick('signin')}
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleAuthClick('signup')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-gray-500 hover:text-gray-700 rounded-lg transition-colors"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <nav className="flex flex-col space-y-4">
                <div>
                  <a href="/converters" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                    All Converters
                  </a>
                  <div className="ml-4 mt-2 space-y-1">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Developer Tools</div>
                    <a href="/convert/avro-to-csv" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      AVRO to CSV
                    </a>
                    <a href="/convert/avro-to-json" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      AVRO to JSON
                    </a>
                    <a href="/convert/avro-to-ndjson" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      AVRO to NDJSON
                    </a>
                    <a href="/convert/csv-to-avro" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      CSV to AVRO
                    </a>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-2">Image Converters</div>
                    <a href="/convert/bmp-to-ico" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      BMP to ICO
                    </a>
                    <a href="/convert/bmp-to-webp" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      BMP to WebP
                    </a>
                    <a href="/convert/cr2-to-ico" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      CR2 to ICO
                    </a>
                    <a href="/convert/cr2-to-webp" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      CR2 to WebP
                    </a>
                    <a href="/convert/dng-to-ico" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      DNG to ICO
                    </a>
                    <a href="/convert/dng-to-webp" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      DNG to WebP
                    </a>
                    <a href="/convert/eps-to-ico" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      EPS to ICO
                    </a>
                    <a href="/convert/eps-to-webp" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      EPS to WebP
                    </a>
                    <a href="/convert/gif-to-ico" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      GIF to ICO
                    </a>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-2">Document Converters</div>
                    <a href="/convert/csv-to-doc" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      CSV to DOC
                    </a>
                    <a href="/convert/csv-to-docx" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      CSV to DOCX
                    </a>
                    <a href="/convert/csv-to-epub" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      CSV to EPUB
                    </a>
                    <a href="/convert/csv-to-html" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      CSV to HTML
                    </a>
                    <a href="/convert/csv-to-md" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      CSV to MD
                    </a>
                    <a href="/convert/csv-to-mobi" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      CSV to MOBI
                    </a>
                    <a href="/convert/csv-to-odp" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      CSV to ODP
                    </a>
                    <a href="/convert/csv-to-odt" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      CSV to ODT
                    </a>
                    <a href="/convert/csv-to-pdf" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      CSV to PDF
                    </a>
                    <a href="/convert/csv-to-ppt" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      CSV to PPT
                    </a>
                    <a href="/convert/csv-to-pptx" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      CSV to PPTX
                    </a>
                    <a href="/convert/csv-to-rtf" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      CSV to RTF
                    </a>
                    <a href="/convert/csv-to-txt" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      CSV to TXT
                    </a>
                    <a href="/convert/csv-to-xls" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      CSV to XLS
                    </a>
                    <a href="/convert/csv-to-xlsx" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      CSV to XLSX
                    </a>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-2">DOC Converters</div>
                    <a href="/convert/doc-to-csv" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      DOC to CSV
                    </a>
                    <a href="/convert/doc-to-epub" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      DOC to EPUB
                    </a>
                    <a href="/convert/doc-to-mobi" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      DOC to MOBI
                    </a>
                    <a href="/convert/doc-to-odt" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      DOC to ODT
                    </a>
                    <a href="/convert/doc-to-txt" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      DOC to TXT
                    </a>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-2">DOCX Converters</div>
                    <a href="/convert/docx-to-csv" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      DOCX to CSV
                    </a>
                    <a href="/convert/docx-to-epub" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      DOCX to EPUB
                    </a>
                    <a href="/convert/docx-to-mobi" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      DOCX to MOBI
                    </a>
                    <a href="/convert/docx-to-odt" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      DOCX to ODT
                    </a>
                    <a href="/convert/docx-to-txt" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      DOCX to TXT
                    </a>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-2">E-book Converters (EPUB)</div>
                    <a href="/convert/epub-to-csv" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      EPUB to CSV
                    </a>
                    <a href="/convert/epub-to-doc" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      EPUB to DOC
                    </a>
                    <a href="/convert/epub-to-docx" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      EPUB to DOCX
                    </a>
                    <a href="/convert/epub-to-html" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      EPUB to HTML
                    </a>
                    <a href="/convert/epub-to-md" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      EPUB to MD
                    </a>
                    <a href="/convert/epub-to-mobi" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      EPUB to MOBI
                    </a>
                    <a href="/convert/epub-to-odp" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      EPUB to ODP
                    </a>
                    <a href="/convert/epub-to-odt" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      EPUB to ODT
                    </a>
                    <a href="/convert/epub-to-pdf" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      EPUB to PDF
                    </a>
                    <a href="/convert/epub-to-ppt" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      EPUB to PPT
                    </a>
                    <a href="/convert/epub-to-pptx" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      EPUB to PPTX
                    </a>
                    <a href="/convert/epub-to-rtf" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      EPUB to RTF
                    </a>
                    <a href="/convert/epub-to-txt" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      EPUB to TXT
                    </a>
                    <a href="/convert/epub-to-xlsx" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      EPUB to XLSX
                    </a>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-2">Developer Tools (CSV)</div>
                    <a href="/convert/csv-to-json" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      CSV to JSON
                    </a>
                    <a href="/convert/csv-to-ndjson" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      CSV to NDJSON
                    </a>
                    <a href="/convert/csv-to-parquet" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      CSV to Parquet
                    </a>
                    <a href="/convert/csv-to-sql" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      CSV to SQL
                    </a>
                    <a href="/convert/csv-to-toml" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      CSV to TOML
                    </a>
                    <a href="/convert/csv-to-xml" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      CSV to XML
                    </a>
                    <a href="/convert/csv-to-yaml" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      CSV to YAML
                    </a>
                  </div>
                </div>
                <a href="/viewers" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Viewers
                </a>
                <a href="/#supported-formats" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Formats
                </a>
                
                <div className="pt-4 border-t border-gray-200">
                  {user ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {user.user_metadata?.username || user.email?.split('@')[0]}
                        </span>
                      </div>
                      <button
                        onClick={signOut}
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-3">
                      <button
                        onClick={() => handleAuthClick('signin')}
                        className="text-left text-gray-700 hover:text-blue-600 font-medium transition-colors"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => handleAuthClick('signup')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        Sign Up
                      </button>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
};