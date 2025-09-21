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
import { jsPDF } from 'jspdf';

interface ConversionJob {
  id: string;
  file: File;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  result?: Blob;
  error?: string;
}

export function JPGToPDFConverter() {
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
      const imageUrl = URL.createObjectURL(job.file);
      
      // Create new image to get dimensions
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });

      setJobs(prev => prev.map(j => 
        j.id === job.id ? { ...j, progress: 50 } : j
      ));

      // Create PDF
      const pdf = new jsPDF({
        orientation: img.width > img.height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [img.width, img.height]
      });

      setJobs(prev => prev.map(j => 
        j.id === job.id ? { ...j, progress: 75 } : j
      ));

      // Add image to PDF
      pdf.addImage(imageUrl, 'JPEG', 0, 0, img.width, img.height);
      
      // Generate PDF blob
      const pdfBlob = pdf.output('blob');
      
      URL.revokeObjectURL(imageUrl);

      setJobs(prev => prev.map(j => 
        j.id === job.id 
          ? { ...j, status: 'completed', progress: 100, result: pdfBlob }
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

  const downloadPDF = (job: ConversionJob) => {
    if (!job.result) return;
    
    const url = URL.createObjectURL(job.result);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${job.file.name.split('.')[0]}.pdf`;
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
            <div className="p-3 bg-red-100 rounded-xl">
              <FileText className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">JPG to PDF Converter</h1>
              <p className="text-lg text-gray-600 mt-2">
                Convert JPG images to PDF documents with professional quality
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Images for PDF Conversion</h2>
          
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
              isDragActive 
                ? 'border-red-400 bg-red-50' 
                : 'border-gray-300 hover:border-red-400 hover:bg-red-50'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {isDragActive ? 'Drop images here' : 'Upload Images for PDF Conversion'}
            </h3>
            <p className="text-gray-500 mb-4">
              Drag and drop JPG, PNG, BMP, TIFF, or WebP images here
            </p>
          </div>
        </div>

        {/* Conversion Jobs */}
        {jobs.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">PDF Conversion Progress</h2>
            
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {job.status === 'pending' && <Loader className="w-5 h-5 text-gray-500" />}
                      {job.status === 'processing' && <Loader className="w-5 h-5 text-red-500 animate-spin" />}
                      {job.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-500" />}
                      {job.status === 'failed' && <AlertCircle className="w-5 h-5 text-red-500" />}
                      
                      <div>
                        <h3 className="font-semibold text-gray-800">{job.file.name}</h3>
                        <p className="text-sm text-gray-500">
                          {job.status === 'pending' && 'Waiting to process...'}
                          {job.status === 'processing' && `Converting to PDF... ${job.progress}%`}
                          {job.status === 'completed' && 'PDF conversion completed'}
                          {job.status === 'failed' && `Failed: ${job.error}`}
                        </p>
                      </div>
                    </div>
                    
                    {job.status === 'completed' && (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => downloadPDF(job)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download PDF</span>
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {job.status === 'processing' && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${job.progress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* About PDF Conversion */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">About JPG to PDF Conversion</h2>
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              Convert your JPG images into professional PDF documents. Perfect for creating 
              document archives, combining multiple images into a single file, or preparing 
              images for printing and sharing.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Features</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Maintains original image quality</li>
                  <li>• Automatic page orientation detection</li>
                  <li>• Batch conversion support</li>
                  <li>• Professional PDF output</li>
                  <li>• Optimized file sizes</li>
                  <li>• Cross-platform compatibility</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Use Cases</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Document archiving</li>
                  <li>• Photo albums</li>
                  <li>• Presentation materials</li>
                  <li>• Print preparation</li>
                  <li>• Email attachments</li>
                  <li>• Digital portfolios</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}