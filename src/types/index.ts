// Database types temporarily disabled
// These will be re-enabled when database is needed

export interface User {
  id: string;
  email: string;
  username: string;
}

export interface FileConversionJob {
  id: string;
  filename: string;
  inputFormat: string;
  outputFormat: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  downloadUrl?: string;
  error?: string;
}

export interface ConversionOptions {
  quality?: number;
  width?: number;
  height?: number;
  maintainAspectRatio?: boolean;
  compress?: boolean;
}

export type SupportedFormat = 
  | 'jpg' | 'jpeg' | 'png' | 'webp' | 'gif' | 'bmp' | 'tiff' | 'ico' | 'svg'
  | 'pdf' | 'docx' | 'doc' | 'txt' | 'xlsx' | 'csv' | 'ods'
  | 'eps' | 'ps' | 'ai' | 'psd' | 'tga';

export interface FileViewerData {
  type: 'image' | 'pdf' | 'spreadsheet' | 'text' | 'binary' | 'unknown';
  content: any;
  metadata?: {
    size: number;
    lastModified: number;
    type: string;
  };
}