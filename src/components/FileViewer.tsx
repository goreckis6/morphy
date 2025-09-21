import React, { useState, useEffect } from 'react';
import { FileViewerData } from '../types';
import { FileProcessor } from '../utils/fileProcessing';
import { RAWProcessor } from '../utils/rawProcessor';
import { Eye, Download, Share2, X } from 'lucide-react';

interface FileViewerProps {
  file: File;
  onClose: () => void;
}

export const FileViewer: React.FC<FileViewerProps> = ({ file, onClose }) => {
  const [viewerData, setViewerData] = useState<FileViewerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    processFile();
  }, [file]);

  const processFile = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const format = FileProcessor.getFileType(file);
      console.log('Processing file:', file.name, 'detected format:', format);
      
      if (FileProcessor.isImageFormat(format) || RAWProcessor.isRAWFormat(format)) {
        let url;
        if (RAWProcessor.isRAWFormat(format) || RAWProcessor.isHEICFormat(file.name)) {
          // For RAW files, try to get a processed preview
          url = await RAWProcessor.createRAWPreview(file);
        } else {
          // For standard image formats
          url = URL.createObjectURL(file);
        }
        setViewerData({
          type: 'image',
          content: url,
          metadata: {
            size: file.size,
            lastModified: file.lastModified,
            type: file.type,
          }
        });
      } else if (FileProcessor.isSpreadsheetFormat(format) || format === 'xlsx') {
        const data = await FileProcessor.processSpreadsheet(file);
        setViewerData(data);
      } else if (FileProcessor.isTextFormat(format)) {
        const data = await FileProcessor.processTextFile(file);
        setViewerData(data);
      } else {
        const data = await FileProcessor.processBinaryFile(file);
        setViewerData(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process file');
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (!viewerData) return null;

    switch (viewerData.type) {
      case 'image':
        return (
          <div className="flex justify-center">
            <img
              src={viewerData.content}
              alt={file.name}
              className="max-w-full max-h-96 rounded-lg shadow-lg"
            />
          </div>
        );

      case 'spreadsheet':
        const spreadsheetContent = viewerData.content as {
          data: string[][];
          sheetName: string;
          totalSheets: number;
          allSheets: string[];
        };
        const data = spreadsheetContent.data;
        
        return (
          <div className="space-y-4">
            {/* Sheet Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-blue-800">
                  Sheet: {spreadsheetContent.sheetName}
                </span>
                <span className="text-blue-600">
                  {spreadsheetContent.totalSheets} sheet{spreadsheetContent.totalSheets !== 1 ? 's' : ''} total
                </span>
              </div>
              {spreadsheetContent.allSheets.length > 1 && (
                <div className="mt-2 text-xs text-blue-600">
                  All sheets: {spreadsheetContent.allSheets.join(', ')}
                </div>
              )}
            </div>
            
            {/* Spreadsheet Table */}
            <div className="overflow-auto max-h-96 border border-gray-300 rounded-lg">
              <table className="min-w-full border-collapse bg-white">
                <thead className="sticky top-0 bg-gray-100">
                  <tr>
                    <th className="w-12 border-r border-gray-300 px-2 py-2 text-xs font-medium text-gray-500 bg-gray-200">
                      #
                    </th>
                    {data[0] && data[0].map((_, index) => (
                      <th
                        key={index}
                        className="border-r border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 bg-gray-100 min-w-[100px]"
                      >
                        {String.fromCharCode(65 + (index % 26))}
                        {index >= 26 ? Math.floor(index / 26) : ''}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, rowIndex) => (
                    <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border-r border-gray-300 px-2 py-2 text-xs text-gray-500 bg-gray-100 font-mono">
                        {rowIndex + 1}
                      </td>
                      {/* Ensure we render cells even if row is shorter than header */}
                      {Array.from({ length: Math.max(row.length, data[0]?.length || 0) }).map((_, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="border-r border-b border-gray-200 px-3 py-2 text-sm text-gray-700 max-w-[200px] truncate"
                          title={row[cellIndex] || ''}
                        >
                          {row[cellIndex] || ''}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Data Info */}
            <div className="text-xs text-gray-500 text-center">
              Showing {data.length} rows × {data[0]?.length || 0} columns
            </div>
          </div>
        );

      case 'text':
        const lines = viewerData.content as string[];
        return (
          <div className="overflow-auto max-h-96 bg-gray-800 rounded-lg p-4">
            <pre className="text-green-300 text-sm font-mono">
              {lines.map((line, index) => (
                <div key={index} className="flex">
                  <span className="text-gray-400 mr-4 select-none w-8 text-right">
                    {index + 1}
                  </span>
                  <span>{line}</span>
                </div>
              ))}
            </pre>
          </div>
        );

      case 'binary':
        const hexDump = viewerData.content as Array<{offset: string, hex: string, ascii: string}>;
        return (
          <div className="overflow-auto max-h-96 bg-gray-800 rounded-lg p-4">
            <div className="text-green-300 text-xs font-mono">
              <div className="border-b border-gray-600 pb-2 mb-2">
                <span className="w-20 inline-block">OFFSET</span>
                <span className="w-96 inline-block ml-4">HEX</span>
                <span className="ml-4">ASCII</span>
              </div>
              {hexDump.map((row, index) => (
                <div key={index} className="flex py-1">
                  <span className="text-gray-400 w-20">{row.offset}</span>
                  <span className="ml-4 w-96 font-mono">{row.hex}</span>
                  <span className="ml-4 text-yellow-300">{row.ascii}</span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center text-gray-500 py-8">
            <div className="mx-auto text-4xl mb-2">
              {FileProcessor.getFileIcon(FileProcessor.getFileType(file))}
            </div>
            <p>Preview not available for this file type</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Eye className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {file.name}
              </h2>
              <p className="text-sm text-gray-500">
                {FileProcessor.formatFileSize(file.size)} • {FileProcessor.getFileType(file).toUpperCase()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
              <Download className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Processing file...</span>
            </div>
          )}
          
          {error && (
            <div className="text-center py-12">
              <div className="text-red-600 text-lg mb-2">⚠️</div>
              <p className="text-red-600">{error}</p>
            </div>
          )}
          
          {!loading && !error && renderContent()}
        </div>
      </div>
    </div>
  );
};