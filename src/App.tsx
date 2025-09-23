import React, { useState } from 'react';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { ConversionPanel } from './components/ConversionPanel';
import { FileViewer } from './components/FileViewer';
import { SupportedFormats } from './components/SupportedFormats';
import { JPGToTEXTConverter } from './components/ConversionPages/JPGToTEXTConverter';
import { JPGToPDFConverter } from './components/ConversionPages/JPGToPDFConverter';
import { JPGToPNGConverter } from './components/ConversionPages/JPGToPNGConverter';
import { AVROToCSVConverter } from './components/ConversionPages/AVROToCSVConverter';
import { AVROToJSONConverter } from './components/ConversionPages/AVROToJSONConverter';
import { AVROToNDJSONConverter } from './components/ConversionPages/AVROToNDJSONConverter';
import { BMPToICOConverter } from './components/ConversionPages/BMPToICOConverter';
import { BMPToWebPConverter } from './components/ConversionPages/BMPToWebPConverter';
import { CR2ToICOConverter } from './components/ConversionPages/CR2ToICOConverter';
import { CR2ToWebPConverter } from './components/ConversionPages/CR2ToWebPConverter';
import { CSVToAVROConverter } from './components/ConversionPages/CSVToAVROConverter';
import { CSVToDOCConverter } from './components/ConversionPages/CSVToDOCConverter';
import { CSVToDOCXConverter } from './components/ConversionPages/CSVToDOCXConverter';
import { CSVToEPUBConverter } from './components/ConversionPages/CSVToEPUBConverter';
import { CSVToHTMLConverter } from './components/ConversionPages/CSVToHTMLConverter';
import { CSVToJSONConverter } from './components/ConversionPages/CSVToJSONConverter';
import { CSVToMDConverter } from './components/ConversionPages/CSVToMDConverter';
import { CSVToMOBIConverter } from './components/ConversionPages/CSVToMOBIConverter';
import { CSVToNDJSONConverter } from './components/ConversionPages/CSVToNDJSONConverter';
import { CSVToODPConverter } from './components/ConversionPages/CSVToODPConverter';
import { CSVToODTConverter } from './components/ConversionPages/CSVToODTConverter';
import { CSVToParquetConverter } from './components/ConversionPages/CSVToParquetConverter';
import { CSVToPDFConverter } from './components/ConversionPages/CSVToPDFConverter';
import { CSVToPPTConverter } from './components/ConversionPages/CSVToPPTConverter';
import { CSVToPPTXConverter } from './components/ConversionPages/CSVToPPTXConverter';
import { CSVToRTFConverter } from './components/ConversionPages/CSVToRTFConverter';
import { CSVToSQLConverter } from './components/ConversionPages/CSVToSQLConverter';
import { CSVToTOMLConverter } from './components/ConversionPages/CSVToTOMLConverter';
import { CSVToTXTConverter } from './components/ConversionPages/CSVToTXTConverter';
import { CSVToXLSConverter } from './components/ConversionPages/CSVToXLSConverter';
import { CSVToXLSXConverter } from './components/ConversionPages/CSVToXLSXConverter';
import { CSVToXMLConverter } from './components/ConversionPages/CSVToXMLConverter';
import { CSVToYAMLConverter } from './components/ConversionPages/CSVToYAMLConverter';
import { DNGToICOConverter } from './components/ConversionPages/DNGToICOConverter';
import { DNGToWebPConverter } from './components/ConversionPages/DNGToWebPConverter';
import { DOCToCSVConverter } from './components/ConversionPages/DOCToCSVConverter';
import { DOCToEPUBConverter } from './components/ConversionPages/DOCToEPUBConverter';
import { DOCToMOBIConverter } from './components/ConversionPages/DOCToMOBIConverter';
import { DOCToODTConverter } from './components/ConversionPages/DOCToODTConverter';
import { DOCToTXTConverter } from './components/ConversionPages/DOCToTXTConverter';
import { DOCXToCSVConverter } from './components/ConversionPages/DOCXToCSVConverter';
import { DOCXToEPUBConverter } from './components/ConversionPages/DOCXToEPUBConverter';
import { DOCXToMOBIConverter } from './components/ConversionPages/DOCXToMOBIConverter';
import { DOCXToODTConverter } from './components/ConversionPages/DOCXToODTConverter';
import { DOCXToTXTConverter } from './components/ConversionPages/DOCXToTXTConverter';
import { EPSToICOConverter } from './components/ConversionPages/EPSToICOConverter';
import { EPSToWebPConverter } from './components/ConversionPages/EPSToWebPConverter';
import { EPUBToCSVConverter } from './components/ConversionPages/EPUBToCSVConverter';
import { EPUBToDOCConverter } from './components/ConversionPages/EPUBToDOCConverter';
import { EPUBToDOCXConverter } from './components/ConversionPages/EPUBToDOCXConverter';
import { EPUBToHTMLConverter } from './components/ConversionPages/EPUBToHTMLConverter';
import { EPUBToMDConverter } from './components/ConversionPages/EPUBToMDConverter';
import { EPUBToMOBIConverter } from './components/ConversionPages/EPUBToMOBIConverter';
import { EPUBToODPConverter } from './components/ConversionPages/EPUBToODPConverter';
import { EPUBToODTConverter } from './components/ConversionPages/EPUBToODTConverter';
import { EPUBToPDFConverter } from './components/ConversionPages/EPUBToPDFConverter';
import { EPUBToPPTConverter } from './components/ConversionPages/EPUBToPPTConverter';
import { EPUBToPPTXConverter } from './components/ConversionPages/EPUBToPPTXConverter';
import { EPUBToRTFConverter } from './components/ConversionPages/EPUBToRTFConverter';
import { EPUBToTXTConverter } from './components/ConversionPages/EPUBToTXTConverter';
import { EPUBToXLSXConverter } from './components/ConversionPages/EPUBToXLSXConverter';
import { GIFToICOConverter } from './components/ConversionPages/GIFToICOConverter';
import { ConversionHub } from './components/ConversionHub';
import { ConverterHub } from './components/ConverterHub';
import { ViewersHub } from './components/ViewersHub';
import { AuthProvider } from './contexts/AuthContext';
import { 
  RefreshCw, 
  Eye, 
  FileText, 
  Image, 
  BarChart3, 
  Zap, 
  Shield, 
  Globe,
  Star,
  Users,
  TrendingUp
} from 'lucide-react';

function App() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [viewerFile, setViewerFile] = useState<File | null>(null);
  const [currentPath, setCurrentPath] = useState<string>('/');

  // Simple routing based on pathname
  React.useEffect(() => {
    const handlePathChange = () => {
      const path = window.location.pathname;
      setCurrentPath(path);
    };

    handlePathChange();
    window.addEventListener('popstate', handlePathChange);
    return () => window.removeEventListener('popstate', handlePathChange);
  }, []);

  // Route to specific viewer pages


  // Conversion routes
  if (currentPath === '/convert/jpg-to-text') {
    return (
      <AuthProvider>
        <JPGToTEXTConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/jpg-to-txt') {
    return (
      <AuthProvider>
        <JPGToTEXTConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/jpg-to-pdf') {
    return (
      <AuthProvider>
        <JPGToPDFConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/jpg-to-png') {
    return (
      <AuthProvider>
        <JPGToPNGConverter />
      </AuthProvider>
    );
  }

  // AVRO Conversion Routes
  if (currentPath === '/convert/avro-to-csv') {
    return (
      <AuthProvider>
        <AVROToCSVConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/avro-to-json') {
    return (
      <AuthProvider>
        <AVROToJSONConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/avro-to-ndjson') {
    return (
      <AuthProvider>
        <AVROToNDJSONConverter />
      </AuthProvider>
    );
  }

  // BMP Conversion Routes
  if (currentPath === '/convert/bmp-to-ico') {
    return (
      <AuthProvider>
        <BMPToICOConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/bmp-to-webp') {
    return (
      <AuthProvider>
        <BMPToWebPConverter />
      </AuthProvider>
    );
  }

  // CR2 Conversion Routes
  if (currentPath === '/convert/cr2-to-ico') {
    return (
      <AuthProvider>
        <CR2ToICOConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/cr2-to-webp') {
    return (
      <AuthProvider>
        <CR2ToWebPConverter />
      </AuthProvider>
    );
  }

  // CSV Conversion Routes
  if (currentPath === '/convert/csv-to-avro') {
    return (
      <AuthProvider>
        <CSVToAVROConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/csv-to-doc') {
    return (
      <AuthProvider>
        <CSVToDOCConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/csv-to-docx') {
    return (
      <AuthProvider>
        <CSVToDOCXConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/csv-to-epub') {
    return (
      <AuthProvider>
        <CSVToEPUBConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/csv-to-html') {
    return (
      <AuthProvider>
        <CSVToHTMLConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/csv-to-json') {
    return (
      <AuthProvider>
        <CSVToJSONConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/csv-to-md') {
    return (
      <AuthProvider>
        <CSVToMDConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/csv-to-mobi') {
    return (
      <AuthProvider>
        <CSVToMOBIConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/csv-to-ndjson') {
    return (
      <AuthProvider>
        <CSVToNDJSONConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/csv-to-odp') {
    return (
      <AuthProvider>
        <CSVToODPConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/csv-to-odt') {
    return (
      <AuthProvider>
        <CSVToODTConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/csv-to-parquet') {
    return (
      <AuthProvider>
        <CSVToParquetConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/csv-to-pdf') {
    return (
      <AuthProvider>
        <CSVToPDFConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/csv-to-ppt') {
    return (
      <AuthProvider>
        <CSVToPPTConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/csv-to-pptx') {
    return (
      <AuthProvider>
        <CSVToPPTXConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/csv-to-rtf') {
    return (
      <AuthProvider>
        <CSVToRTFConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/csv-to-sql') {
    return (
      <AuthProvider>
        <CSVToSQLConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/csv-to-toml') {
    return (
      <AuthProvider>
        <CSVToTOMLConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/csv-to-txt') {
    return (
      <AuthProvider>
        <CSVToTXTConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/csv-to-xls') {
    return (
      <AuthProvider>
        <CSVToXLSConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/csv-to-xlsx') {
    return (
      <AuthProvider>
        <CSVToXLSXConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/csv-to-xml') {
    return (
      <AuthProvider>
        <CSVToXMLConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/csv-to-yaml') {
    return (
      <AuthProvider>
        <CSVToYAMLConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/dng-to-ico') {
    return (
      <AuthProvider>
        <DNGToICOConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/dng-to-webp') {
    return (
      <AuthProvider>
        <DNGToWebPConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/doc-to-csv') {
    return (
      <AuthProvider>
        <DOCToCSVConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/doc-to-epub') {
    return (
      <AuthProvider>
        <DOCToEPUBConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/doc-to-mobi') {
    return (
      <AuthProvider>
        <DOCToMOBIConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/doc-to-odt') {
    return (
      <AuthProvider>
        <DOCToODTConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/doc-to-txt') {
    return (
      <AuthProvider>
        <DOCToTXTConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/docx-to-csv') {
    return (
      <AuthProvider>
        <DOCXToCSVConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/docx-to-epub') {
    return (
      <AuthProvider>
        <DOCXToEPUBConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/docx-to-mobi') {
    return (
      <AuthProvider>
        <DOCXToMOBIConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/docx-to-odt') {
    return (
      <AuthProvider>
        <DOCXToODTConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/docx-to-txt') {
    return (
      <AuthProvider>
        <DOCXToTXTConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/eps-to-ico') {
    return (
      <AuthProvider>
        <EPSToICOConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/eps-to-webp') {
    return (
      <AuthProvider>
        <EPSToWebPConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/epub-to-csv') {
    return (
      <AuthProvider>
        <EPUBToCSVConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/epub-to-doc') {
    return (
      <AuthProvider>
        <EPUBToDOCConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/epub-to-docx') {
    return (
      <AuthProvider>
        <EPUBToDOCXConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/epub-to-html') {
    return (
      <AuthProvider>
        <EPUBToHTMLConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/epub-to-md') {
    return (
      <AuthProvider>
        <EPUBToMDConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/epub-to-mobi') {
    return (
      <AuthProvider>
        <EPUBToMOBIConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/epub-to-odp') {
    return (
      <AuthProvider>
        <EPUBToODPConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/epub-to-odt') {
    return (
      <AuthProvider>
        <EPUBToODTConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/epub-to-pdf') {
    return (
      <AuthProvider>
        <EPUBToPDFConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/epub-to-ppt') {
    return (
      <AuthProvider>
        <EPUBToPPTConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/epub-to-pptx') {
    return (
      <AuthProvider>
        <EPUBToPPTXConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/epub-to-rtf') {
    return (
      <AuthProvider>
        <EPUBToRTFConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/epub-to-txt') {
    return (
      <AuthProvider>
        <EPUBToTXTConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/epub-to-xlsx') {
    return (
      <AuthProvider>
        <EPUBToXLSXConverter />
      </AuthProvider>
    );
  }

  if (currentPath === '/convert/gif-to-ico') {
    return (
      <AuthProvider>
        <GIFToICOConverter />
      </AuthProvider>
    );
  }

  // Converter Hub Route
  if (currentPath === '/converters') {
    return (
      <AuthProvider>
        <ConverterHub />
      </AuthProvider>
    );
  }

  // Viewers Hub Route
  if (currentPath === '/viewers') {
    return (
      <AuthProvider>
        <ViewersHub />
      </AuthProvider>
    );
  }


  const features = [
    { icon: <Zap className="w-6 h-6 text-yellow-600" />, title: 'Lightning Fast', description: 'Process files in seconds with our optimized conversion engine' },
    { icon: <Shield className="w-6 h-6 text-green-600" />, title: 'Secure & Private', description: 'Your files are processed locally and never stored on our servers' },
    { icon: <Globe className="w-6 h-6 text-blue-600" />, title: 'Universal Support', description: 'Support for 15+ file formats with more being added regularly' },
  ];

  const stats = [
    { icon: <Users className="w-8 h-8 text-blue-600" />, value: '50K+', label: 'Active Users' },
    { icon: <RefreshCw className="w-8 h-8 text-green-600" />, value: '1M+', label: 'Files Converted' },
    { icon: <TrendingUp className="w-8 h-8 text-purple-600" />, value: '99.9%', label: 'Success Rate' },
  ];

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-teal-600 text-white py-20">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Transform Your Files
              <span className="block text-yellow-300">Instantly</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              The most comprehensive file conversion and viewing platform. 
              Convert between formats, preview files, and manage your digital assets with ease.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => document.getElementById('converter')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-blue-600 font-bold py-4 px-8 rounded-full hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Converting Free
              </button>
              <button 
                onClick={() => document.getElementById('viewer')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Try File Viewer
              </button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Why Choose MorphyIMG?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Built for professionals and everyday users alike. Experience the difference with our cutting-edge technology.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* File Converter Section */}
        <section id="converter" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Universal File Converter
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Convert between formats with professional-grade quality controls and batch processing capabilities.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <FileUpload onFilesSelected={setSelectedFiles} />
              </div>
              <div>
                <ConversionPanel files={selectedFiles} />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-12">
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
              
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
                <span>© 2025 MorphyIMG. Built with</span>
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span>by developers who care about quality.</span>
              </div>
            </div>
          </div>
        </footer>

        {/* File Viewer Modal */}
        {viewerFile && (
          <FileViewer
            file={viewerFile}
            onClose={() => setViewerFile(null)}
          />
        )}
      </div>
    </AuthProvider>
  );
}

export default App;