import { SupportedFormat, ConversionOptions, FileViewerData } from '../types';
import * as XLSX from 'xlsx';

export class FileProcessor {
  private static canvas: HTMLCanvasElement | null = null;
  private static ctx: CanvasRenderingContext2D | null = null;

  private static getCanvas() {
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
    }
    return { canvas: this.canvas, ctx: this.ctx };
  }

  static async convertImage(
    file: File,
    outputFormat: SupportedFormat,
    options: ConversionOptions = {}
  ): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const { canvas, ctx } = this.getCanvas();
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Calculate dimensions
        let { width, height } = img;
        if (options.width || options.height) {
          if (options.maintainAspectRatio !== false) {
            const aspectRatio = width / height;
            if (options.width && options.height) {
              width = options.width;
              height = options.height;
            } else if (options.width) {
              width = options.width;
              height = width / aspectRatio;
            } else if (options.height) {
              height = options.height;
              width = height * aspectRatio;
            }
          } else {
            width = options.width || width;
            height = options.height || height;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and convert
        ctx.drawImage(img, 0, 0, width, height);
        
        const quality = options.quality || 0.9;
        const mimeType = this.getMimeType(outputFormat);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to convert image'));
            }
          },
          mimeType,
          quality
        );
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  }

  static async processSpreadsheet(file: File): Promise<FileViewerData> {
    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: 'array' });
      
      // Get the first worksheet
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      
      // Convert to array of arrays
      const data = XLSX.utils.sheet_to_json(worksheet, { 
        header: 1,
        defval: '',
        raw: false
      }) as string[][];
      
      // Ensure we have at least some data
      if (data.length === 0) {
        data.push(['No data found in spreadsheet']);
      }
      
      return {
        type: 'spreadsheet',
        content: {
          data,
          sheetName: firstSheetName,
          totalSheets: workbook.SheetNames.length,
          allSheets: workbook.SheetNames
        },
        metadata: {
          size: file.size,
          lastModified: file.lastModified,
          type: file.type,
        }
      };
    } catch (error) {
      console.error('Spreadsheet processing error:', error);
      throw new Error(`Failed to process spreadsheet: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static async processTextFile(file: File): Promise<FileViewerData> {
    try {
      const text = await file.text();
      const lines = text.split('\n');
      
      return {
        type: 'text',
        content: lines,
        metadata: {
          size: file.size,
          lastModified: file.lastModified,
          type: file.type,
        }
      };
    } catch (error) {
      throw new Error('Failed to process text file');
    }
  }

  static async processBinaryFile(file: File): Promise<FileViewerData> {
    try {
      const buffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(buffer);
      
      // Create hex dump
      const hexDump = [];
      for (let i = 0; i < Math.min(uint8Array.length, 1024); i += 16) {
        const offset = i.toString(16).padStart(8, '0').toUpperCase();
        const hex = [];
        const ascii = [];
        
        for (let j = 0; j < 16 && i + j < uint8Array.length; j++) {
          const byte = uint8Array[i + j];
          hex.push(byte.toString(16).padStart(2, '0').toUpperCase());
          ascii.push(byte >= 32 && byte <= 126 ? String.fromCharCode(byte) : '.');
        }
        
        hexDump.push({
          offset,
          hex: hex.join(' '),
          ascii: ascii.join('')
        });
      }
      
      return {
        type: 'binary',
        content: hexDump,
        metadata: {
          size: file.size,
          lastModified: file.lastModified,
          type: file.type,
        }
      };
    } catch (error) {
      throw new Error('Failed to process binary file');
    }
  }

  static getFileType(file: File): SupportedFormat {
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    
    // Handle RAW camera formats
    const rawFormats = ['nef', 'cr2', 'crw', 'dcr', 'kdc', 'k25', 'x3f', 'arw', 'sr2', 'srf', 'mrw', 'erf', 'raf', '3fr', 'orf', 'pef', 'dng'];
    if (rawFormats.includes(extension)) {
      return extension as SupportedFormat;
    }
    
    // Handle Excel files specifically
    if (['xls', 'xlsx', 'xlsm', 'xlsb', 'ods'].includes(extension)) {
      return extension as SupportedFormat;
    }
    
    // Handle CSV files
    if (extension === 'csv') {
      return 'csv';
    }
    
    // Handle image formats
    const imageFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'tiff', 'svg', 'ico', 'heic', 'heif', 'avif'];
    if (imageFormats.includes(extension)) {
      return extension as SupportedFormat;
    }
    
    // Handle document formats
    const documentFormats = ['pdf', 'doc', 'docx', 'rtf', 'odt', 'pages'];
    if (documentFormats.includes(extension)) {
      return extension as SupportedFormat;
    }
    
    // Handle code/text formats
    const textFormats = ['txt', 'js', 'css', 'html', 'xml', 'json', 'md', 'py', 'java', 'cpp', 'c', 'h'];
    if (textFormats.includes(extension)) {
      return 'txt';
    }
    
    // Default to binary for unknown formats
    return extension as SupportedFormat || 'txt';
  }

  static isImageFormat(format: string): boolean {
    const standardImages = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'tiff', 'svg', 'ico', 'heic', 'heif', 'avif'];
    return standardImages.includes(format.toLowerCase());
  }

  static isSpreadsheetFormat(format: string): boolean {
    return ['xlsx', 'xls', 'xlsm', 'xlsb', 'csv', 'ods'].includes(format.toLowerCase());
  }

  static isTextFormat(format: string): boolean {
    return ['txt', 'js', 'css', 'html', 'xml', 'json', 'md', 'py', 'java', 'cpp', 'c', 'h'].includes(format.toLowerCase());
  }

  private static getMimeType(format: SupportedFormat): string {
    const mimeTypes: Record<string, string> = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      webp: 'image/webp',
      gif: 'image/gif',
      bmp: 'image/bmp',
      tiff: 'image/tiff',
      svg: 'image/svg+xml',
      ico: 'image/x-icon',
    };
    return mimeTypes[format] || 'application/octet-stream';
  }

  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  static getFileIcon(format: string): string {
    const iconMap: Record<string, string> = {
      jpg: '🖼️', jpeg: '🖼️', png: '🖼️', webp: '🖼️', gif: '🖼️',
      bmp: '🖼️', tiff: '🖼️', svg: '🎨', ico: '🎯',
      pdf: '📄', docx: '📝', xlsx: '📊', csv: '📈', txt: '📄'
    };
    return iconMap[format.toLowerCase()] || '📄';
  }
}