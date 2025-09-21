import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Header } from '../Header';
import { 
  Upload, 
  FileText, 
  Download, 
  Share2, 
  Code, 
  Zap,
  Shield,
  Globe,
  CheckCircle,
  X,
  ArrowLeft
} from 'lucide-react';

interface JSFile {
  file: File;
  content: string;
  preview: string;
}

export function JSViewer() {
  const [jsFiles, setJsFiles] = useState<JSFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<JSFile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsLoading(true);
    
    const jsFilePromises = acceptedFiles.map(async (file) => {
      const content = await file.text();
      const preview = content.substring(0, 500) + (content.length > 500 ? '...' : '');
      
      return {
        file,
        content,
        preview
      };
    });

    const newJsFiles = await Promise.all(jsFilePromises);
    setJsFiles(prev => [...prev, ...newJsFiles]);
    setIsLoading(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/javascript': ['.js'],
      'text/javascript': ['.js'],
      'application/x-javascript': ['.js'],
      'text/x-javascript': ['.js'],
      'application/ecmascript': ['.js'],
      'text/ecmascript': ['.js']
    },
    multiple: true
  });

  const handleDownload = (jsFile: JSFile) => {
    const blob = new Blob([jsFile.content], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = jsFile.file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async (jsFile: JSFile) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `JavaScript File: ${jsFile.file.name}`,
          text: `Check out this JavaScript file: ${jsFile.file.name}`,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(jsFile.content);
      alert('JavaScript content copied to clipboard!');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-600 via-orange-600 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <button
            onClick={() => window.location.href = '/viewer'}
            className="absolute left-0 top-0 p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Code className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              JavaScript File Viewer
            </h1>
          </div>
          <p className="text-xl text-yellow-100 max-w-3xl mx-auto mb-8">
            View, analyze, and manage JavaScript files with syntax highlighting and code analysis tools.
            Perfect for developers working with JS applications and libraries.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 backdrop-blur-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Syntax Highlighting</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 backdrop-blur-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Code Analysis</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 backdrop-blur-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Multiple Files</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Upload Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload JavaScript Files</h2>
            
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
                isDragActive 
                  ? 'border-yellow-400 bg-yellow-50' 
                  : 'border-gray-300 hover:border-yellow-400 hover:bg-yellow-50'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {isDragActive ? 'Drop JavaScript files here' : 'Upload JavaScript Files'}
              </h3>
              <p className="text-gray-500 mb-4">
                Drag and drop your .js files here, or click to browse
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-400">
                <span className="bg-gray-100 px-2 py-1 rounded">.js</span>
                <span className="bg-gray-100 px-2 py-1 rounded">JavaScript</span>
                <span className="bg-gray-100 px-2 py-1 rounded">ECMAScript</span>
              </div>
            </div>

            {isLoading && (
              <div className="mt-4 text-center">
                <div className="inline-flex items-center space-x-2 text-yellow-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600"></div>
                  <span>Processing JavaScript files...</span>
                </div>
              </div>
            )}
          </div>

          {/* File List */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">JavaScript Files</h2>
            
            {jsFiles.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No JavaScript files uploaded</h3>
                <p className="text-gray-500">Upload some .js files to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {jsFiles.map((jsFile, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                          <Code className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{jsFile.file.name}</h3>
                          <p className="text-sm text-gray-500">
                            {formatFileSize(jsFile.file.size)} • JavaScript
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleDownload(jsFile)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleShare(jsFile)}
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Share"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setSelectedFile(jsFile)}
                          className="px-3 py-1 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700 transition-colors"
                        >
                          View Code
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Code Preview:</h4>
                      <pre className="text-xs text-gray-600 font-mono whitespace-pre-wrap overflow-hidden">
                        {jsFile.preview}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Professional JavaScript File Viewer
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to view, analyze, and work with JavaScript files efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-3 bg-yellow-100 rounded-xl w-fit mx-auto mb-4">
                <Zap className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Fast Processing</h3>
              <p className="text-gray-600">
                Instantly view and analyze JavaScript files with lightning-fast processing and syntax highlighting.
              </p>
            </div>

            <div className="text-center">
              <div className="p-3 bg-green-100 rounded-xl w-fit mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your JavaScript files are processed locally in your browser. No data is sent to external servers.
              </p>
            </div>

            <div className="text-center">
              <div className="p-3 bg-blue-100 rounded-xl w-fit mx-auto mb-4">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Universal Access</h3>
              <p className="text-gray-600">
                Works in any modern web browser. No software installation required for viewing JavaScript files.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="mt-20 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">JavaScript Format Specifications</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Property</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-600">File Extension</td>
                  <td className="py-3 px-4 text-gray-800">.js</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-600">MIME Type</td>
                  <td className="py-3 px-4 text-gray-800">application/javascript, text/javascript</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-600">Language Standard</td>
                  <td className="py-3 px-4 text-gray-800">ECMAScript (ES5, ES6+, ES2015-2023)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-600">Character Encoding</td>
                  <td className="py-3 px-4 text-gray-800">UTF-8, UTF-16, ASCII</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-600">Runtime Environment</td>
                  <td className="py-3 px-4 text-gray-800">Browser, Node.js, Deno, Bun</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-600">Syntax Features</td>
                  <td className="py-3 px-4 text-gray-800">Functions, Classes, Modules, Async/Await</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-600">Use Cases</td>
                  <td className="py-3 px-4 text-gray-800">Web development, Server-side programming, Mobile apps</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Back to Home Section */}
        <section className="mt-20 bg-white rounded-xl shadow-lg p-8">
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
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Back to Home
            </a>
          </div>
        </section>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">MorphyIMG</h2>
            </div>
            
            <p className="text-gray-300 mb-6">
              Professional JavaScript viewer and converter for all your development needs.
            </p>
            
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
              <span>© 2025 MorphyIMG. Built for JavaScript professionals.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* File Viewer Modal */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Code className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{selectedFile.file.name}</h3>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(selectedFile.file.size)} • JavaScript File
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedFile(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
              <div className="bg-gray-900 rounded-lg p-4 overflow-auto">
                <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                  {selectedFile.content}
                </pre>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => handleDownload(selectedFile)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              <button
                onClick={() => handleShare(selectedFile)}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}