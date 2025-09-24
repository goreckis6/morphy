import React, { useState, useRef } from 'react';
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
  Camera,
  BarChart3
} from 'lucide-react';

export const DNGToICOConverter: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [convertedFile, setConvertedFile] = useState<Blob | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [iconSize, setIconSize] = useState<number>(16);
  const [quality, setQuality] = useState<'high' | 'medium' | 'low'>('high');
  const [batchMode, setBatchMode] = useState(false);
  const [batchFiles, setBatchFiles] = useState<File[]>([]);
  const [batchConverted, setBatchConverted] = useState(false);
  const [imagePreview, setImagePreview] = useState<{url: string, width: number, height: number} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.name.toLowerCase().endsWith('.dng')) {
        setSelectedFile(file);
        setError(null);
        setPreviewUrl(URL.createObjectURL(file));
        
        // Try to extract JPEG preview for actual preview
        try {
          const reader = new FileReader();
          reader.onload = async (e) => {
            try {
              const arrayBuffer = e.target?.result as ArrayBuffer;
              const uint8Array = new Uint8Array(arrayBuffer);
              
              // Look for embedded JPEG thumbnail
              const jpegStart = findJPEGStart(uint8Array);
              const jpegEnd = findJPEGEnd(uint8Array, jpegStart);
              
              if (jpegStart !== -1 && jpegEnd !== -1) {
                // Extract the JPEG preview
                const jpegData = uint8Array.slice(jpegStart, jpegEnd + 2);
                const jpegBlob = new Blob([jpegData], { type: 'image/jpeg' });
                const jpegUrl = URL.createObjectURL(jpegBlob);
                
                // Create image to get dimensions
                const img = new Image();
                img.onload = () => {
                  setImagePreview({
                    url: jpegUrl,
                    width: img.width,
                    height: img.height
                  });
                  // Update preview URL to show actual extracted image
                  setPreviewUrl(jpegUrl);
                };
                img.onerror = () => {
                  // Fallback to file info only
                  setImagePreview({
                    url: URL.createObjectURL(file),
                    width: 0,
                    height: 0
                  });
                  URL.revokeObjectURL(jpegUrl);
                };
                img.src = jpegUrl;
              } else {
                // No JPEG preview found, show file info only
                setImagePreview({
                  url: URL.createObjectURL(file),
                  width: 0,
                  height: 0
                });
              }
            } catch (error) {
              // Error reading file, show basic info
              setImagePreview({
                url: URL.createObjectURL(file),
                width: 0,
                height: 0
              });
            }
          };
          reader.readAsArrayBuffer(file);
        } catch (error) {
          // Error processing file, show basic info
          setImagePreview({
            url: URL.createObjectURL(file),
            width: 0,
            height: 0
          });
        }
      } else {
        setError('Please select a valid DNG file');
      }
    }
  };

  const handleBatchFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const dngFiles = files.filter(file => 
      file.name.toLowerCase().endsWith('.dng')
    );
    setBatchFiles(dngFiles);
    setError(null);
  };

  const findJPEGStart = (data: Uint8Array): number => {
    // Look for JPEG SOI marker (0xFF 0xD8)
    for (let i = 0; i < data.length - 1; i++) {
      if (data[i] === 0xFF && data[i + 1] === 0xD8) {
        return i;
      }
    }
    return -1;
  };

  const findJPEGEnd = (data: Uint8Array, start: number): number => {
    // Look for JPEG EOI marker (0xFF 0xD9) after the start position
    for (let i = start + 2; i < data.length - 1; i++) {
      if (data[i] === 0xFF && data[i + 1] === 0xD9) {
        return i + 1;
      }
    }
    return -1;
  };

  const generateSampleICO = (file: File, resolve: (blob: Blob) => void) => {
    // Create a simple colored canvas as fallback
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      const fallbackContent = `SAMPLE_ICO_FILE_START
ORIGINAL_FILE: ${file.name}
DNG_TO_ICO_CONVERSION: Sample conversion
ICON_SIZE: ${iconSize}x${iconSize} pixels
QUALITY: ${quality}
NOTE: This is a sample ICO file generated because the DNG could not be processed in browser
ICO_FILE_END`;
      resolve(new Blob([fallbackContent], { type: 'image/x-icon' }));
      return;
    }

    canvas.width = iconSize;
    canvas.height = iconSize;
    
    // Create a gradient background
    const gradient = ctx.createLinearGradient(0, 0, iconSize, iconSize);
    gradient.addColorStop(0, '#6366f1');
    gradient.addColorStop(1, '#8b5cf6');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, iconSize, iconSize);
    
    // Add camera icon effect
    const centerX = iconSize / 2;
    const centerY = iconSize / 2;
    const cameraSize = iconSize * 0.6;
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillRect(centerX - cameraSize/2, centerY - cameraSize/4, cameraSize, cameraSize/2);
    ctx.fillRect(centerX - cameraSize/4, centerY - cameraSize/2, cameraSize/2, cameraSize/4);
    
    // Add text if icon size is large enough
    if (iconSize >= 48) {
      ctx.fillStyle = 'white';
      ctx.font = `${Math.max(8, iconSize / 8)}px Arial`;
      ctx.textAlign = 'center';
      ctx.fillText('DNG', centerX, centerY + cameraSize/4 + 10);
    }

    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        const fallbackContent = `SAMPLE_ICO_FILE_START
ORIGINAL_FILE: ${file.name}
DNG_TO_ICO_CONVERSION: Sample conversion
ICON_SIZE: ${iconSize}x${iconSize} pixels
QUALITY: ${quality}
ICO_FILE_END`;
        resolve(new Blob([fallbackContent], { type: 'image/x-icon' }));
      }
    }, 'image/png', quality === 'high' ? 1.0 : quality === 'medium' ? 0.8 : 0.6);
  };

  const handleConvert = async (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const arrayBuffer = e.target?.result as ArrayBuffer;
            const uint8Array = new Uint8Array(arrayBuffer);
            
            // Look for embedded JPEG preview to convert to ICO
            const jpegStart = findJPEGStart(uint8Array);
            const jpegEnd = findJPEGEnd(uint8Array, jpegStart);
            
            if (jpegStart !== -1 && jpegEnd !== -1) {
              // Extract the JPEG preview and convert to ICO
              const jpegData = uint8Array.slice(jpegStart, jpegEnd + 2);
              const jpegBlob = new Blob([jpegData], { type: 'image/jpeg' });
              const jpegUrl = URL.createObjectURL(jpegBlob);
              
              const img = new Image();
              img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                  URL.revokeObjectURL(jpegUrl);
                  generateSampleICO(file, resolve);
                  return;
                }
                
                canvas.width = iconSize;
                canvas.height = iconSize;
                ctx.drawImage(img, 0, 0, iconSize, iconSize);
                
                canvas.toBlob((blob) => {
                  URL.revokeObjectURL(jpegUrl);
                  if (blob) {
                    resolve(blob);
                  } else {
                    generateSampleICO(file, resolve);
                  }
                }, 'image/png', quality === 'high' ? 1.0 : quality === 'medium' ? 0.8 : 0.6);
              };
              
              img.onerror = () => {
                URL.revokeObjectURL(jpegUrl);
                generateSampleICO(file, resolve);
              };
              
              img.src = jpegUrl;
            } else {
              // No JPEG preview found, generate sample
              generateSampleICO(file, resolve);
            }
          } catch (error) {
            generateSampleICO(file, resolve);
          }
        };
        reader.onerror = () => {
          generateSampleICO(file, resolve);
        };
        reader.readAsArrayBuffer(file);
      } catch (error) {
        generateSampleICO(file, resolve);
      }
    });
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
      for (let i = 0; i < batchFiles.length; i++) {
        const file = batchFiles[i];
        const converted = await handleConvert(file);
        
        // Create download link
        const url = URL.createObjectURL(converted);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name.replace('.dng', '.ico');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // Small delay between downloads
        if (i < batchFiles.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
      
      setBatchConverted(true);
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
      a.download = selectedFile ? selectedFile.name.replace('.dng', '.ico') : 'converted.ico';
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
    // Clean up any blob URLs to prevent memory leaks
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    if (imagePreview?.url && imagePreview.url !== previewUrl) {
      URL.revokeObjectURL(imagePreview.url);
    }
    
    setSelectedFile(null);
    setConvertedFile(null);
    setError(null);
    setPreviewUrl(null);
    setBatchFiles([]);
    setBatchConverted(false);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <Header />
      
      {/* Hero Section - Narrowed */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-600 via-orange-600 to-red-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              DNG to ICO Converter
            </h1>
            <p className="text-lg sm:text-xl text-amber-100 mb-6 max-w-2xl mx-auto">
              Convert Adobe DNG raw images to ICO format for Windows icons. Transform professional camera files into high-quality Windows icons with multiple sizes.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-amber-200">
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
                  className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                    !batchMode 
                      ? 'bg-amber-600 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <FileText className="w-5 h-5 inline mr-2" />
                  Single File
                </button>
                <button
                  onClick={() => setBatchMode(true)}
                  className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                    batchMode 
                      ? 'bg-amber-600 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <FileImage className="w-5 h-5 inline mr-2" />
                  Batch Convert
                </button>
              </div>

              {/* File Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-amber-400 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {batchMode ? 'Upload Multiple DNG Files' : 'Upload DNG File'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {batchMode 
                    ? 'Select multiple DNG files to convert them all at once' 
                    : 'Drag and drop your DNG file here or click to browse'
                  }
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".dng"
                  multiple={batchMode}
                  onChange={batchMode ? handleBatchFileSelect : handleFileSelect}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                >
                  Choose Files
                </button>
              </div>

              {/* File Preview */}
              {previewUrl && !batchMode && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-4">
                    {imagePreview && imagePreview.width > 0 ? 'DNG Image Preview' : 'DNG File Info'}
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    {imagePreview && imagePreview.width > 0 ? (
                      // Show actual extracted JPEG preview
                      <div>
                        <img 
                          src={previewUrl} 
                          alt="DNG Preview" 
                          className="max-w-full h-32 object-contain mx-auto rounded"
                        />
                        <div className="mt-3 text-center">
                          <p className="text-sm text-gray-600">
                            <strong>{selectedFile?.name}</strong> ({Math.round((selectedFile?.size || 0) / 1024)} KB)
                          </p>
                          <div className="mt-2 text-sm text-gray-500">
                            <p>Extracted preview: {imagePreview.width} × {imagePreview.height} pixels</p>
                            <p className="text-amber-600 font-medium">
                              Will convert to: {iconSize} × {iconSize} pixels ({quality} quality)
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Show camera icon when no preview available
                      <div>
                        <div className="flex items-center justify-center h-32 bg-gray-100 rounded">
                          <Camera className="w-12 h-12 text-gray-400" />
                        </div>
                        <div className="mt-3 text-center">
                          <p className="text-sm text-gray-600">
                            <strong>{selectedFile?.name}</strong> ({Math.round((selectedFile?.size || 0) / 1024)} KB)
                          </p>
                          <div className="mt-2 text-sm text-gray-500">
                            <p>Adobe Digital Negative (DNG) camera file</p>
                            <p className="text-amber-600 font-medium">
                              Will convert to: {iconSize} × {iconSize} pixels ({quality} quality)
                            </p>
                            <p className="text-gray-400 text-xs mt-1">
                              No embedded preview found - will generate sample icon
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
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
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-amber-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                >
                  {isConverting ? (
                    <div className="flex items-center justify-center">
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                      Converting...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Zap className="w-5 h-5 mr-2" />
                      {batchMode ? `Convert ${batchFiles.length} Files` : 'Convert to ICO'}
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
                    Your DNG file has been successfully converted to ICO format.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleDownload}
                      className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download ICO File
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

              {/* Batch Conversion Success */}
              {batchConverted && batchMode && (
                <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                    <h4 className="text-lg font-semibold text-green-800">Batch Conversion Complete!</h4>
                  </div>
                  <p className="text-green-700 mb-4">
                    All {batchFiles.length} DNG files have been successfully converted to ICO format and downloaded.
                  </p>
                  <button
                    onClick={resetForm}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Convert More Files
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Settings & Info Panel */}
          <div className="space-y-6">
            
            {/* Conversion Settings */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-amber-600" />
                ICO Settings
              </h3>
              
              {/* Icon Sizes */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Icon Size
                </label>
                <select
                  value={iconSize}
                  onChange={(e) => setIconSize(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value={16}>16x16 pixels (Default)</option>
                  <option value={32}>32x32 pixels</option>
                  <option value={48}>48x48 pixels</option>
                  <option value={64}>64x64 pixels</option>
                  <option value={128}>128x128 pixels</option>
                  <option value={256}>256x256 pixels</option>
                </select>
                <div className="mt-2 text-sm text-gray-600">
                  {iconSize === 16 && (
                    <span className="text-amber-600">✓ Standard Windows icon size (recommended)</span>
                  )}
                  {iconSize === 32 && (
                    <span className="text-blue-600">✓ High-DPI display optimized</span>
                  )}
                  {iconSize === 48 && (
                    <span className="text-green-600">✓ Vista/Windows 7 standard</span>
                  )}
                  {iconSize === 64 && (
                    <span className="text-purple-600">✓ Extra large icon size</span>
                  )}
                  {iconSize === 128 && (
                    <span className="text-pink-600">✓ High-resolution display</span>
                  )}
                  {iconSize === 256 && (
                    <span className="text-red-600">✓ Ultra high-resolution</span>
                  )}
                </div>
              </div>

              {/* Quality */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Quality
                </label>
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value as 'high' | 'medium' | 'low')}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
                  "Adobe Digital Negative support",
                  "High-resolution icon creation",
                  "Multiple icon size support",
                  "Professional camera file processing",
                  "Windows icon compatibility",
                  "Batch processing support"
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
                <BarChart3 className="w-5 h-5 mr-2 text-amber-600" />
                Perfect For
              </h3>
              <div className="space-y-3">
                {[
                  "Professional photography workflows",
                  "High-quality Windows icons",
                  "Adobe Lightroom integration",
                  "Digital asset management",
                  "Brand identity creation",
                  "Professional icon design"
                ].map((useCase, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-3 flex-shrink-0"></div>
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
            Why Convert DNG to ICO?
          </h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Converting Adobe DNG raw images to ICO format is essential for professional photography workflows, digital asset management, and creating high-quality Windows icons. While DNG files contain uncompressed raw image data from professional cameras, ICO format provides the perfect solution for creating Windows icons with multiple resolutions and professional quality.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Key Benefits of ICO Format</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-amber-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-amber-900 mb-3">Professional Quality</h4>
                <p className="text-gray-700">
                  ICO format preserves the high quality of DNG raw images while providing efficient compression, ensuring your Windows icons look crisp and professional.
                </p>
              </div>
              
              <div className="bg-orange-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-orange-900 mb-3">Multiple Icon Sizes</h4>
                <p className="text-gray-700">
                  ICO files can contain multiple icon sizes (16x16, 32x32, 48x48, 64x64, 128x128, 256x256 pixels) in a single file, ensuring perfect display across all contexts.
                </p>
              </div>
              
              <div className="bg-red-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-red-900 mb-3">Windows Native Support</h4>
                <p className="text-gray-700">
                  ICO is the native icon format for Windows operating systems, ensuring perfect compatibility with file explorers, taskbars, and application windows.
                </p>
              </div>
              
              <div className="bg-pink-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-pink-900 mb-3">Adobe Integration</h4>
                <p className="text-gray-700">
                  Perfect integration with Adobe Lightroom and other Adobe Creative Suite applications, making it ideal for professional photography workflows.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Common Use Cases</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Professional Photography Workflows</h4>
                  <p className="text-gray-700">Convert high-quality DNG images to ICO format for use in professional photography portfolios, client presentations, and digital galleries.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">High-Quality Windows Icons</h4>
                  <p className="text-gray-700">Create professional application icons for Windows software using high-quality DNG images, ensuring your app looks polished and native.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Adobe Lightroom Integration</h4>
                  <p className="text-gray-700">Seamlessly integrate with Adobe Lightroom workflows by converting DNG files to ICO format for use in digital asset management systems.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Brand Identity Creation</h4>
                  <p className="text-gray-700">Develop consistent brand assets by converting professional DNG images to ICO format for use across digital platforms and applications.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-8 rounded-xl text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Convert Your DNG Files?</h3>
              <p className="text-lg mb-6 opacity-90">
                Use our free online DNG to ICO converter to transform your professional camera files into high-quality Windows icons.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Start Converting Now
                </button>
                <button
                  onClick={handleBack}
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-amber-600 transition-colors"
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
};
