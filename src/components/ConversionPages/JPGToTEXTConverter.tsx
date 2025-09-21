import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Header } from '../Header';
import { 
  Upload, 
  FileText, 
  Download, 
  Share2, 
  Eye, 
  X,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react';
import Tesseract from 'tesseract.js';

interface ConversionJob {
  id: string;
  file: File;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  result?: string;
  error?: string;
}

export function JPGToTEXTConverter() {
  const [jobs, setJobs] = useState<ConversionJob[]>([]);
  const [selectedResult, setSelectedResult] = useState<ConversionJob | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newJobs = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      status: 'pending' as const,
      progress: 0
    }));

    setJobs(prev => [...prev, ...newJobs]);

    // Process each file
    for (const job of newJobs) {
      await processFile(job);
    }
  }, []);

  const processFile = async (job: ConversionJob) => {
    setJobs(prev => prev.map(j => 
      j.id === job.id ? { ...j, status: 'processing', progress: 10 } : j
    ));

    try {
      const imageUrl = URL.createObjectURL(job.file);
      
      const result = await Tesseract.recognize(imageUrl, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            const progress = Math.round(m.progress * 90) + 10;
            setJobs(prev => prev.map(j => 
              j.id === job.id ? { ...j, progress } : j
            ));
          }
        }
      });

      URL.revokeObjectURL(imageUrl);

      setJobs(prev => prev.map(j => 
        j.id === job.id 
          ? { ...j, status: 'completed', progress: 100, result: result.data.text }
          : j
      ));
    } catch (error) {
      setJobs(prev => prev.map(j => 
        j.id === job.id 
          ? { ...j, status: 'failed', progress: 0, error: error instanceof Error ? error.message : 'Conversion failed' }
          : j
      ));
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/bmp': ['.bmp'],
      'image/tiff': ['.tiff', '.tif'],
      'image/webp': ['.webp']
    },
    multiple: true
  });

  const downloadText = (job: ConversionJob) => {
    if (!job.result) return;
    
    const blob = new Blob([job.result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${job.file.name.split('.')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareText = async (job: ConversionJob) => {
    if (!job.result) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Extracted text from ${job.file.name}`,
          text: job.result,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(job.result);
      alert('Text copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.location.href = '/'}
              className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="p-3 bg-blue-100 rounded-xl">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">JPG to TEXT Converter</h1>
              <p className="text-lg text-gray-600 mt-2">
                Extract text from JPG images using advanced OCR technology
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Images for Text Extraction</h2>
          
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
              {isDragActive ? 'Drop images here' : 'Upload Images with Text'}
            </h3>
            <p className="text-gray-500 mb-4">
              Drag and drop JPG, PNG, BMP, TIFF, or WebP images here
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-400">
              <span className="bg-gray-100 px-2 py-1 rounded">JPG</span>
              <span className="bg-gray-100 px-2 py-1 rounded">PNG</span>
              <span className="bg-gray-100 px-2 py-1 rounded">BMP</span>
              <span className="bg-gray-100 px-2 py-1 rounded">TIFF</span>
              <span className="bg-gray-100 px-2 py-1 rounded">WebP</span>
            </div>
          </div>
        </div>

        {/* Conversion Jobs */}
        {jobs.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Text Extraction Progress</h2>
            
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {job.status === 'pending' && <Loader className="w-5 h-5 text-gray-500" />}
                      {job.status === 'processing' && <Loader className="w-5 h-5 text-blue-500 animate-spin" />}
                      {job.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-500" />}
                      {job.status === 'failed' && <AlertCircle className="w-5 h-5 text-red-500" />}
                      
                      <div>
                        <h3 className="font-semibold text-gray-800">{job.file.name}</h3>
                        <p className="text-sm text-gray-500">
                          {job.status === 'pending' && 'Waiting to process...'}
                          {job.status === 'processing' && `Extracting text... ${job.progress}%`}
                          {job.status === 'completed' && 'Text extraction completed'}
                          {job.status === 'failed' && `Failed: ${job.error}`}
                        </p>
                      </div>
                    </div>
                    
                    {job.status === 'completed' && (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedResult(job)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          View Text
                        </button>
                        <button
                          onClick={() => downloadText(job)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => shareText(job)}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {job.status === 'processing' && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${job.progress}%` }}
                      ></div>
                    </div>
                  )}
                  
                  {job.status === 'completed' && job.result && (
                    <div className="mt-4 bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Extracted Text Preview:</h4>
                      <p className="text-sm text-gray-600 max-h-20 overflow-hidden">
                        {job.result.substring(0, 200)}
                        {job.result.length > 200 && '...'}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* About OCR */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">About OCR Text Extraction</h2>
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              Our advanced Optical Character Recognition (OCR) technology can extract text from images 
              with high accuracy. This is perfect for digitizing documents, extracting text from screenshots, 
              or converting scanned documents into editable text.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Supported Features</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Multiple image formats (JPG, PNG, BMP, TIFF, WebP)</li>
                  <li>• High accuracy text recognition</li>
                  <li>• Batch processing support</li>
                  <li>• Real-time progress tracking</li>
                  <li>• Download as TXT files</li>
                  <li>• Copy to clipboard functionality</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Best Results Tips</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Use high-resolution images</li>
                  <li>• Ensure good contrast between text and background</li>
                  <li>• Avoid blurry or distorted images</li>
                  <li>• Straight, non-rotated text works best</li>
                  <li>• Clean, clear fonts are more accurate</li>
                  <li>• Good lighting in original photos</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">MorphyIMG</h2>
            </div>
            
            <p className="text-gray-300 mb-6">
              Professional JPG to TEXT converter with advanced OCR technology.
            </p>
            
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
              <span>© 2025 MorphyIMG. Built for OCR professionals.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Text Viewer Modal */}
      {selectedResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Extracted Text: {selectedResult.file.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedResult.result?.length || 0} characters extracted
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedResult(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
              <div className="bg-gray-50 rounded-lg p-4">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                  {selectedResult.result}
                </pre>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => downloadText(selectedResult)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download TXT</span>
              </button>
              <button
                onClick={() => shareText(selectedResult)}
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