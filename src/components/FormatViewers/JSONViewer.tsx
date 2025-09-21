import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Header } from '../Header';
import { 
  Upload, 
  FileText, 
  Download, 
  Share2, 
  Code2, 
  Zap,
  Shield,
  Globe,
  CheckCircle,
  X
} from 'lucide-react';

interface JSONFile {
  file: File;
  content: string;
  parsedContent: any;
  preview: string;
  isValid: boolean;
  error?: string;
}

export function JSONViewer() {
  const [jsonFiles, setJsonFiles] = useState<JSONFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<JSONFile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsLoading(true);
    
    const jsonFilePromises = acceptedFiles.map(async (file) => {
      const content = await file.text();
      let parsedContent = null;
      let isValid = true;
      let error = undefined;
      
      try {
        parsedContent = JSON.parse(content);
      } catch (e) {
        isValid = false;
        error = e instanceof Error ? e.message : 'Invalid JSON format';
      }
      
      const preview = content.substring(0, 500) + (content.length > 500 ? '...' : '');
      
      return {
        file,
        content,
        parsedContent,
        preview,
        isValid,
        error
      };
    });

    const newJsonFiles = await Promise.all(jsonFilePromises);
    setJsonFiles(prev => [...prev, ...newJsonFiles]);
    setIsLoading(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json'],
      'text/json': ['.json'],
      'application/ld+json': ['.json'],
      'application/vnd.api+json': ['.json']
    },
    multiple: true
  });

  const handleDownload = (jsonFile: JSONFile) => {
    const blob = new Blob([jsonFile.content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = jsonFile.file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async (jsonFile: JSONFile) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `JSON File: ${jsonFile.file.name}`,
          text: `Check out this JSON file: ${jsonFile.file.name}`,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(jsonFile.content);
      alert('JSON content copied to clipboard!');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatJSON = (obj: any, indent = 0) => {
    const spaces = '  '.repeat(indent);
    
    if (obj === null) return 'null';
    if (typeof obj === 'boolean') return obj.toString();
    if (typeof obj === 'number') return obj.toString();
    if (typeof obj === 'string') return `"${obj}"`;
    
    if (Array.isArray(obj)) {
      if (obj.length === 0) return '[]';
      const items = obj.map(item => `${spaces}  ${formatJSON(item, indent + 1)}`).join(',\n');
      return `[\n${items}\n${spaces}]`;
    }
    
    if (typeof obj === 'object') {
      const keys = Object.keys(obj);
      if (keys.length === 0) return '{}';
      const items = keys.map(key => `${spaces}  "${key}": ${formatJSON(obj[key], indent + 1)}`).join(',\n');
      return `{\n${items}\n${spaces}}`;
    }
    
    return String(obj);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <button
              onClick={() => window.location.href = '/viewer'}
              className="absolute left-8 top-8 p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Code2 className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              JSON File Viewer
            </h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            View, validate, and format JSON files with syntax highlighting and error detection.
            Perfect for developers working with APIs, configuration files, and data exchange.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 backdrop-blur-sm">
              <CheckCircle className="w-4 h-4" />
              <span>JSON Validation</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 backdrop-blur-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Pretty Formatting</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 backdrop-blur-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Error Detection</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Upload Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload JSON Files</h2>
            
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
                isDragActive 
                  ? 'border-blue-400 bg-blue-50' 
                  : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {isDragActive ? 'Drop JSON files here' : 'Upload JSON Files'}
              </h3>
              <p className="text-gray-500 mb-4">
                Drag and drop your .json files here, or click to browse
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-400">
                <span className="bg-gray-100 px-2 py-1 rounded">.json</span>
                <span className="bg-gray-100 px-2 py-1 rounded">JSON</span>
                <span className="bg-gray-100 px-2 py-1 rounded">API Data</span>
              </div>
            </div>

            {isLoading && (
              <div className="mt-4 text-center">
                <div className="inline-flex items-center space-x-2 text-blue-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span>Processing JSON files...</span>
                </div>
              </div>
            )}
          </div>

          {/* File List */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">JSON Files</h2>
            
            {jsonFiles.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No JSON files uploaded</h3>
                <p className="text-gray-500">Upload some .json files to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {jsonFiles.map((jsonFile, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${jsonFile.isValid ? 'bg-blue-100' : 'bg-red-100'}`}>
                          <Code2 className={`w-5 h-5 ${jsonFile.isValid ? 'text-blue-600' : 'text-red-600'}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{jsonFile.file.name}</h3>
                          <p className="text-sm text-gray-500">
                            {formatFileSize(jsonFile.file.size)} • JSON {jsonFile.isValid ? '✓ Valid' : '✗ Invalid'}
                          </p>
                          {!jsonFile.isValid && jsonFile.error && (
                            <p className="text-sm text-red-600 mt-1">Error: {jsonFile.error}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleDownload(jsonFile)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleShare(jsonFile)}
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Share"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setSelectedFile(jsonFile)}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          View JSON
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Content Preview:</h4>
                      <pre className="text-xs text-gray-600 font-mono whitespace-pre-wrap overflow-hidden">
                        {jsonFile.preview}
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
              Professional JSON File Viewer
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to view, validate, and work with JSON files efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-3 bg-blue-100 rounded-xl w-fit mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Fast Validation</h3>
              <p className="text-gray-600">
                Instantly validate JSON files and detect syntax errors with detailed error messages.
              </p>
            </div>

            <div className="text-center">
              <div className="p-3 bg-green-100 rounded-xl w-fit mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your JSON files are processed locally in your browser. No data is sent to external servers.
              </p>
            </div>

            <div className="text-center">
              <div className="p-3 bg-purple-100 rounded-xl w-fit mx-auto mb-4">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Universal Access</h3>
              <p className="text-gray-600">
                Works in any modern web browser. No software installation required for viewing JSON files.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="mt-20 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">JSON Format Specifications</h2>
          
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
                  <td className="py-3 px-4 text-gray-800">.json</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-600">MIME Type</td>
                  <td className="py-3 px-4 text-gray-800">application/json</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-600">Standard</td>
                  <td className="py-3 px-4 text-gray-800">RFC 7159, ECMA-404</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-600">Character Encoding</td>
                  <td className="py-3 px-4 text-gray-800">UTF-8 (default), UTF-16, UTF-32</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-600">Data Types</td>
                  <td className="py-3 px-4 text-gray-800">String, Number, Boolean, Array, Object, null</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-600">Syntax</td>
                  <td className="py-3 px-4 text-gray-800">&#123;"key": "value"&#125;</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-600">Use Cases</td>
                  <td className="py-3 px-4 text-gray-800">APIs, Configuration files, Data exchange</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* About JSON */}
        <section className="mt-20 bg-white rounded-xl shadow-lg p-8 mb-8">
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
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Back to Home
            </a>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="bg-gray-800 text-white py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">MorphyIMG</h2>
              </div>
              
              <p className="text-gray-300 mb-6">
                Professional JSON viewer and converter for all your data processing needs.
              </p>
              
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
                <span>© 2025 MorphyIMG. Built for JSON professionals.</span>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* File Viewer Modal */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${selectedFile.isValid ? 'bg-blue-100' : 'bg-red-100'}`}>
                  <Code2 className={`w-5 h-5 ${selectedFile.isValid ? 'text-blue-600' : 'text-red-600'}`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{selectedFile.file.name}</h3>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(selectedFile.file.size)} • JSON File {selectedFile.isValid ? '(Valid)' : '(Invalid)'}
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
              {selectedFile.isValid ? (
                <div className="bg-gray-900 rounded-lg p-4 overflow-auto">
                  <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                    {formatJSON(selectedFile.parsedContent)}
                  </pre>
                </div>
              ) : (
                <div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <h4 className="text-red-800 font-semibold mb-2">JSON Validation Error</h4>
                    <p className="text-red-700">{selectedFile.error}</p>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-auto">
                    <pre className="text-sm text-red-400 font-mono whitespace-pre-wrap">
                      {selectedFile.content}
                    </pre>
                  </div>
                </div>
              )}
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