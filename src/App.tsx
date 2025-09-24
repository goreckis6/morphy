import React, { useState } from 'react';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { ConversionPanel } from './components/ConversionPanel';
import { FileViewer } from './components/FileViewer';
import { SupportedFormats } from './components/SupportedFormats';
import { SpreadsheetViewer } from './components/ViewerPages/SpreadsheetViewer';
import { ImageViewer } from './components/ViewerPages/ImageViewer';
import { DocumentViewer } from './components/ViewerPages/DocumentViewer';
import { MainViewer } from './components/ViewerPages/MainViewer';
import { JPGViewer } from './components/FormatViewers/JPGViewer';
import { PNGViewer } from './components/FormatViewers/PNGViewer';
import { XLSXViewer } from './components/FormatViewers/XLSXViewer';
import { PDFViewer } from './components/FormatViewers/PDFViewer';
import { JPEGViewer } from './components/FormatViewers/JPEGViewer';
import { WebPViewer } from './components/FormatViewers/WebPViewer';
import { GIFViewer } from './components/FormatViewers/GIFViewer';
import { SVGViewer } from './components/FormatViewers/SVGViewer';
import { TIFFViewer } from './components/FormatViewers/TIFFViewer';
import { BMPViewer } from './components/FormatViewers/BMPViewer';
import { ICOViewer } from './components/FormatViewers/ICOViewer';
import { HEICViewer } from './components/FormatViewers/HEICViewer';
import { AVIFViewer } from './components/FormatViewers/AVIFViewer';
import { CURViewer } from './components/FormatViewers/CURViewer';
import { EPSViewer } from './components/FormatViewers/EPSViewer';
import { AIViewer } from './components/FormatViewers/AIViewer';
import { PSViewer } from './components/FormatViewers/PSViewer';
import { DOCXViewer } from './components/FormatViewers/DOCXViewer';
import { RTFViewer } from './components/FormatViewers/RTFViewer';
import { ODTViewer } from './components/FormatViewers/ODTViewer';
import { TXTViewer } from './components/FormatViewers/TXTViewer';
import { CSVViewer } from './components/FormatViewers/CSVViewer';
import { ODSViewer } from './components/FormatViewers/ODSViewer';
import { JSViewer } from './components/FormatViewers/JSViewer';
import { PythonViewer } from './components/FormatViewers/PythonViewer';
import { CSSViewer } from './components/FormatViewers/CSSViewer';
import { HTMLViewer } from './components/FormatViewers/HTMLViewer';
import { JSONViewer } from './components/FormatViewers/JSONViewer';
import { XMLViewer } from './components/FormatViewers/XMLViewer';
import { MarkdownViewer } from './components/FormatViewers/MarkdownViewer';
import { NEFViewer } from './components/FormatViewers/NEFViewer';
import { CR2Viewer } from './components/FormatViewers/CR2Viewer';
import { DCRViewer } from './components/FormatViewers/DCRViewer';
import { X3FViewer } from './components/FormatViewers/X3FViewer';
import { ARWViewer } from './components/FormatViewers/ARWViewer';
import { ERFViewer } from './components/FormatViewers/ERFViewer';
import { RAFViewer } from './components/FormatViewers/RAFViewer';
import { ThreeFRViewer } from './components/FormatViewers/ThreeFRViewer';
import { ORFViewer } from './components/FormatViewers/ORFViewer';
import { DNGViewer } from './components/FormatViewers/DNGViewer';
import { PEFViewer } from './components/FormatViewers/PEFViewer';
import { JPGToTEXTConverter } from './components/ConversionPages/JPGToTEXTConverter';
import { JPGToPDFConverter } from './components/ConversionPages/JPGToPDFConverter';
import { JPGToPNGConverter } from './components/ConversionPages/JPGToPNGConverter';
import { ConversionHub } from './components/ConversionHub';
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
  if (currentPath === '/viewer') {
    return (
      <AuthProvider>
        <MainViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/jpeg') {
    return (
      <AuthProvider>
        <JPEGViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/jpg') {
    return (
      <AuthProvider>
        <JPGViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/png') {
    return (
      <AuthProvider>
        <PNGViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/webp') {
    return (
      <AuthProvider>
        <WebPViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/gif') {
    return (
      <AuthProvider>
        <GIFViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/svg') {
    return (
      <AuthProvider>
        <SVGViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/tiff') {
    return (
      <AuthProvider>
        <TIFFViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/bmp') {
    return (
      <AuthProvider>
        <BMPViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/ico') {
    return (
      <AuthProvider>
        <ICOViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/heic') {
    return (
      <AuthProvider>
        <HEICViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/avif') {
    return (
      <AuthProvider>
        <AVIFViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/cur') {
    return (
      <AuthProvider>
        <CURViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/eps') {
    return (
      <AuthProvider>
        <EPSViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/ai') {
    return (
      <AuthProvider>
        <AIViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/ps') {
    return (
      <AuthProvider>
        <PSViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/ptif') {
    return (
      <AuthProvider>
        <TIFFViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/jp2') {
    return (
      <AuthProvider>
        <JPEGViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/jpf') {
    return (
      <AuthProvider>
        <JPEGViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/pdf') {
    return (
      <AuthProvider>
        <PDFViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/docx') {
    return (
      <AuthProvider>
        <DOCXViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/rtf') {
    return (
      <AuthProvider>
        <RTFViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/odt') {
    return (
      <AuthProvider>
        <ODTViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/txt') {
    return (
      <AuthProvider>
        <TXTViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/xlsx') {
    return (
      <AuthProvider>
        <XLSXViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/csv') {
    return (
      <AuthProvider>
        <CSVViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/ods') {
    return (
      <AuthProvider>
        <ODSViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/js') {
    return (
      <AuthProvider>
        <JSViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/py') {
    return (
      <AuthProvider>
        <PythonViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/css') {
    return (
      <AuthProvider>
        <CSSViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/html') {
    return (
      <AuthProvider>
        <HTMLViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/json') {
    return (
      <AuthProvider>
        <JSONViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/xml') {
    return (
      <AuthProvider>
        <XMLViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/md') {
    return (
      <AuthProvider>
        <MarkdownViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/nef') {
    return (
      <AuthProvider>
        <NEFViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/cr2') {
    return (
      <AuthProvider>
        <CR2Viewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/dcr') {
    return (
      <AuthProvider>
        <DCRViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/x3f') {
    return (
      <AuthProvider>
        <X3FViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/arw') {
    return (
      <AuthProvider>
        <ARWViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/sr2') {
    return (
      <AuthProvider>
        <ARWViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/srf') {
    return (
      <AuthProvider>
        <ARWViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/crw') {
    return (
      <AuthProvider>
        <CR2Viewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/kdc') {
    return (
      <AuthProvider>
        <DCRViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/k25') {
    return (
      <AuthProvider>
        <DCRViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/erf') {
    return (
      <AuthProvider>
        <ERFViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/raf') {
    return (
      <AuthProvider>
        <RAFViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/3fr') {
    return (
      <AuthProvider>
        <ThreeFRViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/orf') {
    return (
      <AuthProvider>
        <ORFViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/dng') {
    return (
      <AuthProvider>
        <DNGViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/viewer/pef') {
    return (
      <AuthProvider>
        <PEFViewer />
      </AuthProvider>
    );
  }

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

  if (currentPath === '/spreadsheet-viewer') {
    return (
      <AuthProvider>
        <SpreadsheetViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/image-viewer') {
    return (
      <AuthProvider>
        <ImageViewer />
      </AuthProvider>
    );
  }

  if (currentPath === '/document-viewer') {
    return (
      <AuthProvider>
        <DocumentViewer />
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