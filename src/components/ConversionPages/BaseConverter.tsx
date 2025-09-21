import React, { useState } from 'react';
import { Upload, Download, RefreshCw, ArrowLeft, CheckCircle, AlertCircle, Star } from 'lucide-react';
import { Header } from '../Header';

interface BaseConverterProps {
  title: string;
  description: string;
  inputFormat: string;
  outputFormat: string;
  inputExtensions: string[];
  outputExtensions: string[];
  onConvert: (file: File) => Promise<Blob>;
  seoTitle: string;
  seoDescription: string;
  features: string[];
  useCases: string[];
}

export const BaseConverter: React.FC<BaseConverterProps> = ({
  title,
  description,
  inputFormat,
  outputFormat,
  inputExtensions,
  outputExtensions,
  onConvert,
  seoTitle,
  seoDescription,
  features,
  useCases
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [convertedFile, setConvertedFile] = useState<Blob | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update page title and meta description
  React.useEffect(() => {
    document.title = seoTitle;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', seoDescription);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = seoDescription;
      document.head.appendChild(meta);
    }
  }, [seoTitle, seoDescription]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      setConvertedFile(null);
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) return;

    setIsConverting(true);
    setError(null);

    try {
      const result = await onConvert(selectedFile);
      setConvertedFile(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!convertedFile) return;

    const url = URL.createObjectURL(convertedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedFile?.name.split('.')[0] || 'converted'}.${outputFormat.toLowerCase()}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleBack = () => {
    // Always go to home page for consistency
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Converter */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Convert {inputFormat.toUpperCase()} to {outputFormat.toUpperCase()}
                </h2>
                <p className="text-lg text-gray-600">{description}</p>
              </div>

              {/* File Upload */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select {inputFormat.toUpperCase()} File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept={inputExtensions.map(ext => `.${ext}`).join(',')}
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center space-y-4"
                  >
                    <Upload className="w-12 h-12 text-gray-400" />
                    <div>
                      <p className="text-lg font-medium text-gray-900">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-sm text-gray-500">
                        {inputExtensions.map(ext => `.${ext}`).join(', ')} files
                      </p>
                    </div>
                  </label>
                </div>
                {selectedFile && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  </div>
                )}
              </div>

              {/* Convert Button */}
              <div className="text-center mb-8">
                <button
                  onClick={handleConvert}
                  disabled={!selectedFile || isConverting}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2 mx-auto"
                >
                  {isConverting ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Converting...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-5 h-5" />
                      <span>Convert to {outputFormat.toUpperCase()}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Error Display */}
              {error && (
                <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              {/* Download Button */}
              {convertedFile && (
                <div className="text-center">
                  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <p className="text-green-700 font-medium">Conversion completed successfully!</p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      onClick={handleDownload}
                      className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download {outputFormat.toUpperCase()}</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedFile(null);
                        setConvertedFile(null);
                        setError(null);
                        // Reset file input
                        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
                        if (fileInput) fileInput.value = '';
                      }}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <RefreshCw className="w-5 h-5" />
                      <span>Convert Another File</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Features */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Key Features</h3>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Use Cases */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Common Use Cases</h3>
              <ul className="space-y-2">
                {useCases.map((useCase, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Format Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Format Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">Input Format</p>
                  <p className="text-sm text-gray-600">{inputFormat.toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Output Format</p>
                  <p className="text-sm text-gray-600">{outputFormat.toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Supported Extensions</p>
                  <p className="text-sm text-gray-600">
                    {inputExtensions.map(ext => `.${ext}`).join(', ')}
                  </p>
                </div>
              </div>
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
            
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
              <span>© 2025 MorphyIMG. Built with</span>
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>by developers who care about quality.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
