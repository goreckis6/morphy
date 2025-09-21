import React, { useState } from 'react';
import { SupportedFormat, ConversionOptions, FileConversionJob } from '../types';
import { FileProcessor } from '../utils/fileProcessing';
import { ConversionEngine } from '../utils/conversionEngine';
import { RefreshCw, Download, Settings, CheckCircle, XCircle } from 'lucide-react';

interface ConversionPanelProps {
  files: File[];
}

export const ConversionPanel: React.FC<ConversionPanelProps> = ({ files }) => {
  const [outputFormat, setOutputFormat] = useState<SupportedFormat>('jpg');
  const [conversionOptions, setConversionOptions] = useState<ConversionOptions>({
    quality: 0.9,
    maintainAspectRatio: true,
  });
  const [jobs, setJobs] = useState<FileConversionJob[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  const imageFormats: SupportedFormat[] = ['jpg', 'png', 'webp', 'gif', 'bmp', 'tiff', 'ico', 'svg'];
  const documentFormats: SupportedFormat[] = ['pdf', 'docx', 'doc', 'txt'];
  const spreadsheetFormats: SupportedFormat[] = ['xlsx', 'csv', 'ods'];
  const vectorFormats: SupportedFormat[] = ['eps', 'ps', 'ai'];
  const specialFormats: SupportedFormat[] = ['psd', 'tga'];

  const startConversion = async () => {
    const newJobs: FileConversionJob[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      filename: file.name,
      inputFormat: FileProcessor.getFileType(file),
      outputFormat,
      status: 'pending',
      progress: 0,
    }));

    setJobs(newJobs);

    // Process each file
    for (const job of newJobs) {
      const file = files.find(f => f.name === job.filename);
      if (!file) continue;

      try {
        // Update status to processing
        setJobs(prev => prev.map(j => 
          j.id === job.id ? { ...j, status: 'processing', progress: 50 } : j
        ));

        let result: Blob;
        
        // Handle different conversion types
        switch (outputFormat) {
          case 'txt':
            result = new Blob([await ConversionEngine.convertImageToText(file, (progress) => {
              setJobs(prev => prev.map(j => 
                j.id === job.id ? { ...j, progress: Math.round(progress) } : j
              ));
            })], { type: 'text/plain' });
            break;
            
          case 'pdf':
            result = await ConversionEngine.convertImageToPDF(file, (progress) => {
              setJobs(prev => prev.map(j => 
                j.id === job.id ? { ...j, progress: Math.round(progress) } : j
              ));
            });
            break;
            
          case 'svg':
            result = await ConversionEngine.convertImageToSVG(file, (progress) => {
              setJobs(prev => prev.map(j => 
                j.id === job.id ? { ...j, progress: Math.round(progress) } : j
              ));
            });
            break;
            
          case 'eps':
            result = await ConversionEngine.convertImageToEPS(file, (progress) => {
              setJobs(prev => prev.map(j => 
                j.id === job.id ? { ...j, progress: Math.round(progress) } : j
              ));
            });
            break;
            
          case 'ps':
            result = await ConversionEngine.convertImageToPS(file, (progress) => {
              setJobs(prev => prev.map(j => 
                j.id === job.id ? { ...j, progress: Math.round(progress) } : j
              ));
            });
            break;
            
          case 'ico':
            result = await ConversionEngine.convertImageToICO(file, (progress) => {
              setJobs(prev => prev.map(j => 
                j.id === job.id ? { ...j, progress: Math.round(progress) } : j
              ));
            });
            break;
            
          case 'tga':
            result = await ConversionEngine.convertImageToTGA(file, (progress) => {
              setJobs(prev => prev.map(j => 
                j.id === job.id ? { ...j, progress: Math.round(progress) } : j
              ));
            });
            break;
            
          case 'psd':
            result = await ConversionEngine.convertImageToPSD(file, (progress) => {
              setJobs(prev => prev.map(j => 
                j.id === job.id ? { ...j, progress: Math.round(progress) } : j
              ));
            });
            break;
            
          case 'docx':
            result = await ConversionEngine.convertImageToDOCX(file, (progress) => {
              setJobs(prev => prev.map(j => 
                j.id === job.id ? { ...j, progress: Math.round(progress) } : j
              ));
            });
            break;
            
          default:
            // Standard image format conversion
            if (FileProcessor.isImageFormat(job.inputFormat) && FileProcessor.isImageFormat(outputFormat)) {
              result = await FileProcessor.convertImage(file, outputFormat, conversionOptions);
            } else {
              result = await ConversionEngine.convertImageFormat(
                file, 
                ConversionEngine.getMimeType(outputFormat), 
                conversionOptions.quality,
                (progress) => {
                  setJobs(prev => prev.map(j => 
                    j.id === job.id ? { ...j, progress: Math.round(progress) } : j
                  ));
                }
              );
            }
        }

        // Create download URL
        const downloadUrl = URL.createObjectURL(result);

        // Update status to completed
        setJobs(prev => prev.map(j => 
          j.id === job.id 
            ? { ...j, status: 'completed', progress: 100, downloadUrl }
            : j
        ));
      } catch (error) {
        // Update status to failed
        setJobs(prev => prev.map(j => 
          j.id === job.id 
            ? { ...j, status: 'failed', progress: 0, error: error instanceof Error ? error.message : 'Conversion failed' }
            : j
        ));
      }
    }
  };

  const downloadFile = (job: FileConversionJob) => {
    if (job.downloadUrl) {
      const a = document.createElement('a');
      a.href = job.downloadUrl;
      a.download = `${job.filename.split('.')[0]}.${ConversionEngine.getFileExtension(ConversionEngine.getMimeType(job.outputFormat))}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const getStatusIcon = (status: FileConversionJob['status']) => {
    switch (status) {
      case 'pending':
        return <RefreshCw className="w-4 h-4 text-gray-500" />;
      case 'processing':
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  if (files.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        <RefreshCw className="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <p>Select files to begin conversion</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Conversion Settings */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Conversion Settings
          </h3>
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="p-2 text-gray-500 hover:text-blue-500 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Output Format
            </label>
            <select
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value as SupportedFormat)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <optgroup label="Image Formats">
                {imageFormats.map(format => (
                  <option key={format} value={format}>
                    {format.toUpperCase()}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Vector Graphics">
                {vectorFormats.map(format => (
                  <option key={format} value={format}>
                    {format.toUpperCase()}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Document Formats">
                {documentFormats.map(format => (
                  <option key={format} value={format}>
                    {format.toUpperCase()}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Spreadsheet Formats">
                {spreadsheetFormats.map(format => (
                  <option key={format} value={format}>
                    {format.toUpperCase()}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Professional Formats">
                {specialFormats.map(format => (
                  <option key={format} value={format}>
                    {format.toUpperCase()}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {showOptions && FileProcessor.isImageFormat(outputFormat) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quality ({Math.round((conversionOptions.quality || 0.9) * 100)}%)
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={conversionOptions.quality || 0.9}
                  onChange={(e) => setConversionOptions(prev => ({
                    ...prev,
                    quality: parseFloat(e.target.value)
                  }))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={conversionOptions.maintainAspectRatio !== false}
                    onChange={(e) => setConversionOptions(prev => ({
                      ...prev,
                      maintainAspectRatio: e.target.checked
                    }))}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Maintain aspect ratio
                  </span>
                </label>
              </div>
            </div>
          )}

          <button
            onClick={startConversion}
            disabled={jobs.some(job => job.status === 'processing')}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <RefreshCw className={`w-5 h-5 ${jobs.some(job => job.status === 'processing') ? 'animate-spin' : ''}`} />
            <span>
              {jobs.some(job => job.status === 'processing') ? 'Converting...' : 'Start Conversion'}
            </span>
          </button>
        </div>
      </div>

      {/* Conversion Jobs */}
      {jobs.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Conversion Progress
          </h3>
          
          <div className="space-y-3">
            {jobs.map(job => (
              <div key={job.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(job.status)}
                  <div>
                    <div className="text-sm font-medium text-gray-700">
                      {job.filename} → {job.outputFormat.toUpperCase()}
                    </div>
                    {job.error && (
                      <div className="text-xs text-red-500">{job.error}</div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {job.status === 'processing' && (
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${job.progress}%` }}
                      ></div>
                    </div>
                  )}
                  
                  {job.status === 'completed' && job.downloadUrl && (
                    <button
                      onClick={() => downloadFile(job)}
                      className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};