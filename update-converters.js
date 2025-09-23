import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Template for the new converter layout
const createConverterTemplate = (inputFormat, outputFormat, colorScheme = 'blue') => {
  const colors = {
    blue: {
      primary: 'blue-600',
      secondary: 'purple-600',
      accent: 'indigo-700',
      bg: 'blue-50',
      text: 'blue-100',
      textSecondary: 'blue-200'
    },
    green: {
      primary: 'green-600',
      secondary: 'blue-600',
      accent: 'purple-600',
      bg: 'green-50',
      text: 'green-100',
      textSecondary: 'green-200'
    },
    purple: {
      primary: 'purple-600',
      secondary: 'blue-600',
      accent: 'indigo-700',
      bg: 'purple-50',
      text: 'purple-100',
      textSecondary: 'purple-200'
    },
    orange: {
      primary: 'orange-600',
      secondary: 'red-600',
      accent: 'pink-700',
      bg: 'orange-50',
      text: 'orange-100',
      textSecondary: 'orange-200'
    }
  };

  const color = colors[colorScheme] || colors.blue;
  const formatLower = inputFormat.toLowerCase();
  const outputLower = outputFormat.toLowerCase();

  return `import React, { useState, useRef } from 'react';
import { Header } from '../Header';
import { 
  Upload, 
  Download, 
  Settings, 
  FileText,
  FileImage,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Zap,
  Shield,
  Clock,
  Star,
  Database,
  BarChart3,
  Image as ImageIcon,
  File,
  Camera
} from 'lucide-react';

export const ${inputFormat}To${outputFormat}Converter: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [convertedFile, setConvertedFile] = useState<Blob | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState<'high' | 'medium' | 'low'>('high');
  const [batchMode, setBatchMode] = useState(false);
  const [batchFiles, setBatchFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.name.toLowerCase().endsWith('.${formatLower}')) {
        setSelectedFile(file);
        setError(null);
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        setError('Please select a valid ${inputFormat} file');
      }
    }
  };

  const handleBatchFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => 
      file.name.toLowerCase().endsWith('.${formatLower}')
    );
    setBatchFiles(validFiles);
    setError(null);
  };

  const handleConvert = async (file: File): Promise<Blob> => {
    // Mock conversion - in a real implementation, you would use appropriate libraries
    const content = \`Mock ${outputFormat} content for \${file.name} - Quality: \${quality}\`;
    return new Blob([content], { type: 'application/octet-stream' });
  };

  const handleSingleConvert = async () => {
    if (!selectedFile) return;
    
    setIsConverting(true);
    setError(null);
    
    try {
      const converted = await handleConvert(selectedFile);
      setConvertedFile(converted);
    } catch (err) {
      setError('Conversion failed. Please try again.');
    } finally {
      setIsConverting(false);
    }
  };

  const handleBatchConvert = async () => {
    if (batchFiles.length === 0) return;
    
    setIsConverting(true);
    setError(null);
    
    try {
      // Mock batch conversion - process each file
      for (const file of batchFiles) {
        await handleConvert(file);
      }
      setError(null);
    } catch (err) {
      setError('Batch conversion failed. Please try again.');
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (convertedFile) {
      const url = URL.createObjectURL(convertedFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = selectedFile ? selectedFile.name.replace('.${formatLower}', '.${outputLower}') : 'converted.${outputLower}';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleBack = () => {
    window.location.href = '/';
  };

  const resetForm = () => {
    setSelectedFile(null);
    setConvertedFile(null);
    setError(null);
    setPreviewUrl(null);
    setBatchFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-${color.bg} via-white to-purple-50">
      <Header />
      
      {/* Hero Section - Narrowed */}
      <div className="relative overflow-hidden bg-gradient-to-r from-${color.primary} via-${color.secondary} to-${color.accent}">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              ${inputFormat} to ${outputFormat} Converter
            </h1>
            <p className="text-lg sm:text-xl text-${color.text} mb-6 max-w-2xl mx-auto">
              Convert ${inputFormat} files to ${outputFormat} format quickly and easily. Professional conversion with advanced features.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-${color.textSecondary}">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Lightning Fast</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>No Registration</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Conversion Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              
              {/* Mode Toggle */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={() => setBatchMode(false)}
                  className={\`flex-1 px-6 py-3 rounded-lg font-medium transition-all \${
                    !batchMode 
                      ? 'bg-${color.primary} text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }\`}
                >
                  <FileText className="w-5 h-5 inline mr-2" />
                  Single File
                </button>
                <button
                  onClick={() => setBatchMode(true)}
                  className={\`flex-1 px-6 py-3 rounded-lg font-medium transition-all \${
                    batchMode 
                      ? 'bg-${color.primary} text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }\`}
                >
                  <FileImage className="w-5 h-5 inline mr-2" />
                  Batch Convert
                </button>
              </div>

              {/* File Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-${color.primary.replace('-600', '-400')} transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {batchMode ? \`Upload Multiple ${inputFormat} Files\` : \`Upload ${inputFormat} File\`}
                </h3>
                <p className="text-gray-600 mb-4">
                  {batchMode 
                    ? \`Select multiple ${inputFormat} files to convert them all at once\` 
                    : \`Drag and drop your ${inputFormat} file here or click to browse\`
                  }
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".${formatLower}"
                  multiple={batchMode}
                  onChange={batchMode ? handleBatchFileSelect : handleFileSelect}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-${color.primary} text-white px-6 py-3 rounded-lg font-medium hover:bg-${color.primary.replace('-600', '-700')} transition-colors"
                >
                  Choose Files
                </button>
              </div>

              {/* File Preview */}
              {previewUrl && !batchMode && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-4">Preview</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-center h-32 bg-gray-100 rounded">
                      <Database className="w-12 h-12 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600 mt-2 text-center">
                      {selectedFile?.name} ({(selectedFile?.size || 0) / 1024} KB)
                    </p>
                  </div>
                </div>
              )}

              {/* Batch Files List */}
              {batchMode && batchFiles.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-4">Selected Files ({batchFiles.length})</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {batchFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                        <span className="text-sm font-medium">{file.name}</span>
                        <span className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                  <span className="text-red-700">{error}</span>
                </div>
              )}

              {/* Convert Button */}
              <div className="mt-8">
                <button
                  onClick={batchMode ? handleBatchConvert : handleSingleConvert}
                  disabled={isConverting || (batchMode ? batchFiles.length === 0 : !selectedFile)}
                  className={\`w-full bg-gradient-to-r from-${color.primary} to-${color.secondary} text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-${color.primary.replace('-600', '-700')} hover:to-${color.secondary.replace('-600', '-700')} disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl\`}
                >
                  {isConverting ? (
                    <div className="flex items-center justify-center">
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                      Converting...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Zap className="w-5 h-5 mr-2" />
                      {batchMode ? \`Convert \${batchFiles.length} Files\` : \`Convert to ${outputFormat}\`}
                    </div>
                  )}
                </button>
              </div>

              {/* Success Message & Download */}
              {convertedFile && !batchMode && (
                <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                    <h4 className="text-lg font-semibold text-green-800">Conversion Complete!</h4>
                  </div>
                  <p className="text-green-700 mb-4">
                    Your ${inputFormat} file has been successfully converted to ${outputFormat} format.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleDownload}
                      className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download ${outputFormat} File
                    </button>
                    <button
                      onClick={resetForm}
                      className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center"
                    >
                      <RefreshCw className="w-5 h-5 mr-2" />
                      Convert Another
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Settings & Info Panel */}
          <div className="space-y-6">
            
            {/* Conversion Settings */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-${color.primary}" />
                ${outputFormat} Settings
              </h3>
              
              {/* Quality */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Quality
                </label>
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value as 'high' | 'medium' | 'low')}
                  className={\`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-${color.primary} focus:border-${color.primary}\`}
                >
                  <option value="high">High Quality</option>
                  <option value="medium">Medium Quality</option>
                  <option value="low">Low Quality</option>
                </select>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                Why Choose Our Converter?
              </h3>
              <div className="space-y-4">
                {[
                  "High-quality conversion",
                  "Batch processing support",
                  "No file size limits",
                  "100% free to use",
                  "Instant download",
                  "Secure processing"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Use Cases */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-${color.primary}" />
                Perfect For
              </h3>
              <div className="space-y-3">
                {[
                  "Professional workflows",
                  "Data processing",
                  "File format migration",
                  "Business applications",
                  "Development projects",
                  "Content management"
                ].map((useCase, index) => (
                  <div key={index} className="flex items-center">
                    <div className={\`w-2 h-2 bg-${color.primary} rounded-full mr-3 flex-shrink-0\`}></div>
                    <span className="text-sm text-gray-700">{useCase}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <button
            onClick={handleBack}
            className="bg-gray-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            ← Back to Home
          </button>
        </div>

        {/* SEO Content Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 sm:p-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
            Why Convert ${inputFormat} to ${outputFormat}?
          </h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Converting ${inputFormat} files to ${outputFormat} format is essential for modern workflows, compatibility, and professional results. While ${inputFormat} is excellent for specific use cases, ${outputFormat} provides broader compatibility and enhanced features for your projects.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Key Benefits of ${outputFormat} Format</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className={\`bg-${color.bg} p-6 rounded-lg\`}>
                <h4 className={\`text-xl font-semibold text-${color.primary.replace('-600', '-900')} mb-3\`}>Universal Compatibility</h4>
                <p className="text-gray-700">
                  ${outputFormat} files are supported by virtually all modern applications and platforms, ensuring your files work everywhere.
                </p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-blue-900 mb-3">Enhanced Features</h4>
                <p className="text-gray-700">
                  ${outputFormat} format offers advanced features and capabilities that make it ideal for professional use cases.
                </p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-green-900 mb-3">Better Performance</h4>
                <p className="text-gray-700">
                  ${outputFormat} files are optimized for performance, providing faster processing and better resource utilization.
                </p>
              </div>
              
              <div className="bg-orange-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-orange-900 mb-3">Future-Proof</h4>
                <p className="text-gray-700">
                  ${outputFormat} is a modern, well-supported format that ensures your files remain accessible for years to come.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Common Use Cases</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className={\`w-2 h-2 bg-${color.primary} rounded-full mt-3 mr-4 flex-shrink-0\`}></div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Professional Workflows</h4>
                  <p className="text-gray-700">Integrate ${outputFormat} files into your professional workflows for better collaboration and efficiency.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Data Processing</h4>
                  <p className="text-gray-700">Process and analyze data more effectively with ${outputFormat} format's enhanced capabilities.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">File Format Migration</h4>
                  <p className="text-gray-700">Migrate from legacy ${inputFormat} format to modern ${outputFormat} for better compatibility and features.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Business Applications</h4>
                  <p className="text-gray-700">Use ${outputFormat} files in business applications for improved functionality and user experience.</p>
                </div>
              </div>
            </div>

            <div className={\`bg-gradient-to-r from-${color.primary} to-${color.secondary} text-white p-8 rounded-xl text-center\`}>
              <h3 className="text-2xl font-bold mb-4">Ready to Convert Your ${inputFormat} Files?</h3>
              <p className="text-lg mb-6 opacity-90">
                Use our free online ${inputFormat} to ${outputFormat} converter to transform your files with professional quality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-white text-${color.primary} px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Start Converting Now
                </button>
                <button
                  onClick={handleBack}
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-${color.primary} transition-colors"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">MorphyIMG</h3>
            <p className="text-gray-400 mb-6">
              Convert and view files online for free. Support for 50+ formats.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <span>© 2024 MorphyIMG</span>
              <span>•</span>
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};`;
};

// List of all converters to update
const converters = [
  // AVRO converters
  { input: 'AVRO', output: 'JSON', color: 'purple' },
  { input: 'AVRO', output: 'NDJSON', color: 'purple' },
  
  // BMP converters
  { input: 'BMP', output: 'WebP', color: 'blue' },
  
  // CR2 converters
  { input: 'CR2', output: 'ICO', color: 'orange' },
  { input: 'CR2', output: 'WebP', color: 'orange' },
  
  // CSV converters
  { input: 'CSV', output: 'AVRO', color: 'blue' },
  { input: 'CSV', output: 'DOC', color: 'blue' },
  { input: 'CSV', output: 'DOCX', color: 'blue' },
  { input: 'CSV', output: 'EPUB', color: 'blue' },
  { input: 'CSV', output: 'HTML', color: 'blue' },
  { input: 'CSV', output: 'JSON', color: 'blue' },
  { input: 'CSV', output: 'MD', color: 'blue' },
  { input: 'CSV', output: 'MOBI', color: 'blue' },
  { input: 'CSV', output: 'NDJSON', color: 'blue' },
  { input: 'CSV', output: 'ODP', color: 'blue' },
  { input: 'CSV', output: 'ODT', color: 'blue' },
  { input: 'CSV', output: 'Parquet', color: 'blue' },
  { input: 'CSV', output: 'PPT', color: 'blue' },
  { input: 'CSV', output: 'PPTX', color: 'blue' },
  { input: 'CSV', output: 'RTF', color: 'blue' },
  { input: 'CSV', output: 'SQL', color: 'blue' },
  { input: 'CSV', output: 'TOML', color: 'blue' },
  { input: 'CSV', output: 'TXT', color: 'blue' },
  { input: 'CSV', output: 'XLS', color: 'blue' },
  { input: 'CSV', output: 'XLSX', color: 'blue' },
  { input: 'CSV', output: 'XML', color: 'blue' },
  { input: 'CSV', output: 'YAML', color: 'blue' },
  
  // DNG converters
  { input: 'DNG', output: 'ICO', color: 'orange' },
  { input: 'DNG', output: 'WebP', color: 'orange' },
  
  // DOC converters
  { input: 'DOC', output: 'CSV', color: 'green' },
  { input: 'DOC', output: 'EPUB', color: 'green' },
  { input: 'DOC', output: 'MOBI', color: 'green' },
  { input: 'DOC', output: 'ODT', color: 'green' },
  { input: 'DOC', output: 'TXT', color: 'green' },
  
  // DOCX converters
  { input: 'DOCX', output: 'CSV', color: 'green' },
  { input: 'DOCX', output: 'EPUB', color: 'green' },
  { input: 'DOCX', output: 'MOBI', color: 'green' },
  { input: 'DOCX', output: 'ODT', color: 'green' },
  { input: 'DOCX', output: 'TXT', color: 'green' },
  
  // EPS converters
  { input: 'EPS', output: 'ICO', color: 'purple' },
  { input: 'EPS', output: 'WebP', color: 'purple' },
  
  // EPUB converters
  { input: 'EPUB', output: 'CSV', color: 'purple' },
  { input: 'EPUB', output: 'DOC', color: 'purple' },
  { input: 'EPUB', output: 'DOCX', color: 'purple' },
  { input: 'EPUB', output: 'HTML', color: 'purple' },
  { input: 'EPUB', output: 'MD', color: 'purple' },
  { input: 'EPUB', output: 'MOBI', color: 'purple' },
  { input: 'EPUB', output: 'ODP', color: 'purple' },
  { input: 'EPUB', output: 'ODT', color: 'purple' },
  { input: 'EPUB', output: 'PDF', color: 'purple' },
  { input: 'EPUB', output: 'PPT', color: 'purple' },
  { input: 'EPUB', output: 'PPTX', color: 'purple' },
  { input: 'EPUB', output: 'RTF', color: 'purple' },
  { input: 'EPUB', output: 'TXT', color: 'purple' },
  { input: 'EPUB', output: 'XLSX', color: 'purple' },
  
  // GIF converters
  { input: 'GIF', output: 'ICO', color: 'green' }
];

// Function to update a single converter
function updateConverter(inputFormat, outputFormat, colorScheme) {
  const fileName = `${inputFormat}To${outputFormat}Converter.tsx`;
  const filePath = path.join(__dirname, 'components', 'ConversionPages', fileName);
  
  // Check if file exists first
  if (!fs.existsSync(filePath)) {
    console.log(`⏭️  Skipping ${fileName} (file doesn't exist)`);
    return false;
  }
  
  try {
    const newContent = createConverterTemplate(inputFormat, outputFormat, colorScheme);
    fs.writeFileSync(filePath, newContent);
    console.log(`✅ Updated ${fileName}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to update ${fileName}:`, error.message);
    return false;
  }
}

// Function to list existing converter files
function listExistingConverters() {
  const conversionPagesDir = path.join(__dirname, 'components', 'ConversionPages');
  console.log('📁 Checking existing converter files...\n');
  
  try {
    const files = fs.readdirSync(conversionPagesDir);
    const converterFiles = files.filter(file => file.endsWith('Converter.tsx') && file !== 'BaseConverter.tsx');
    
    console.log(`Found ${converterFiles.length} converter files:`);
    converterFiles.forEach(file => console.log(`  - ${file}`));
    console.log('');
    
    return converterFiles;
  } catch (error) {
    console.error('❌ Error reading ConversionPages directory:', error.message);
    return [];
  }
}

// Main execution
console.log('🚀 Starting converter updates...\n');

// First, list existing files
const existingFiles = listExistingConverters();

let successCount = 0;
let totalCount = converters.length;
let skippedCount = 0;

converters.forEach(({ input, output, color }) => {
  const result = updateConverter(input, output, color);
  if (result === true) {
    successCount++;
  } else if (result === false) {
    skippedCount++;
  }
});

console.log(`\n🎉 Update complete!`);
console.log(`✅ Successfully updated: ${successCount} converters`);
console.log(`⏭️  Skipped (file doesn't exist): ${skippedCount} converters`);
console.log(`❌ Failed updates: ${totalCount - successCount - skippedCount}`);

if (successCount > 0) {
  console.log('\n🎯 Updated converters now have the new feature-rich dashboard layout!');
  console.log('✨ Features included:');
  console.log('   - Single/Batch conversion modes');
  console.log('   - Advanced settings panel');
  console.log('   - File preview functionality');
  console.log('   - Professional UI with cards and shadows');
  console.log('   - Mobile-first responsive design');
  console.log('   - Comprehensive SEO content');
  console.log('   - Working batch conversion');
}
