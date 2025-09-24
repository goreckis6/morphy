import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Header } from '../Header';
import { 
  Upload, 
  Image, 
  Download, 
  Share2, 
  Eye, 
  X,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react';

interface ConversionJob {
  id: string;
  file: File;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  result?: Blob;
  error?: string;
}

export function JPGToPNGConverter() {
  const [jobs, setJobs] = useState<ConversionJob[]>([]);

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
      j.id === job.id ? { ...j, status: 'processing', progress: 25 } : j
    ));

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) throw new Error('Could not get canvas context');

      const img = new Image();
      const imageUrl = URL.createObjectURL(job.file);
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });

      setJobs(prev => prev.map(j => 
        j.id === job.id ? { ...j, progress: 50 } : j
      ));

      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw image on canvas
      ctx.drawImage(img, 0, 0);
      
      setJobs(prev => prev.map(j => 
        j.id === job.id ? { ...j, progress: 75 } : j
      ));

      // Convert to PNG blob
      const pngBlob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create PNG blob'));
          }
        }, 'image/png');
      });

      URL.revokeObjectURL(imageUrl);

      setJobs(prev => prev.map(j => 
        j.id === job.id 
          ? { ...j, status: 'completed', progress: 100, result: pngBlob }
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
      'image/jpeg': ['.jpg', '.jpeg']
    },
    multiple: true
  });

  const downloadPNG = (job: ConversionJob) => {
    if (!job.result) return;
    
    const url = URL.createObjectURL(job.result);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${job.file.name.split('.')[0]}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
            <div className="p-3 bg-green-100 rounded-xl">
              <Image className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">JPG to PNG Converter</h1>
              <p className="text-lg text-gray-600 mt-2">
                Convert JPG images to PNG format with transparency support
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload JPG Images</h2>
          
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
              isDragActive 
                ? 'border-green-400 bg-green-50' 
                : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {isDragActive ? 'Drop JPG images here' : 'Upload JPG Images'}
            </h3>
            <p className="text-gray-500 mb-4">
              Drag and drop JPG/JPEG images here, or click to browse
            </p>
          </div>
        </div>

        {/* Conversion Jobs */}
        {jobs.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">PNG Conversion Progress</h2>
            
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {job.status === 'pending' && <Loader className="w-5 h-5 text-gray-500" />}
                      {job.status === 'processing' && <Loader className="w-5 h-5 text-green-500 animate-spin" />}
                      {job.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-500" />}
                      {job.status === 'failed' && <AlertCircle className="w-5 h-5 text-red-500" />}
                      
                      <div>
                        <h3 className="font-semibold text-gray-800">{job.file.name}</h3>
                        <p className="text-sm text-gray-500">
                          {job.status === 'pending' && 'Waiting to process...'}
                          {job.status === 'processing' && `Converting to PNG... ${job.progress}%`}
                          {job.status === 'completed' && 'PNG conversion completed'}
                          {job.status === 'failed' && `Failed: ${job.error}`}
                        </p>
                      </div>
                    </div>
                    
                    {job.status === 'completed' && (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => downloadPNG(job)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download PNG</span>
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {job.status === 'processing' && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${job.progress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* About PNG Conversion */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">About JPG to PNG Conversion</h2>
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              Convert JPG images to PNG format to add transparency support, achieve lossless quality, 
              or meet specific format requirements. PNG is ideal for images with text, logos, or when 
              you need transparent backgrounds.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">PNG Advantages</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Lossless compression</li>
                  <li>• Transparency support</li>
                  <li>• Better for text and graphics</li>
                  <li>• No compression artifacts</li>
                  <li>• Wide browser support</li>
                  <li>• Perfect for logos and icons</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Best Use Cases</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Images with transparency needs</li>
                  <li>• Screenshots and UI elements</li>
                  <li>• Logos and branding materials</li>
                  <li>• Images with text overlays</li>
                  <li>• Graphics with sharp edges</li>
                  <li>• Web graphics requiring quality</li>
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
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
                <Image className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">MorphyIMG</h2>
            </div>
            
            <p className="text-gray-300 mb-6">
              Professional JPG to PNG converter for all your image processing needs.
            </p>
            
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
              <span>© 2025 MorphyIMG. Built for image professionals.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}