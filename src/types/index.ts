export interface User {
  id: string;
  email: string;
  username: string;
  created_at: string;
  is_active: boolean;
}

export interface UserActivity {
  id: string;
  user_id: string;
  activity_type: string;
  input_format: string;
  output_format: string;
  file_size: number;
  success: boolean;
  timestamp: string;
}

export interface SharedFile {
  id: string;
  file_id: string;
  user_id: string;
  original_filename: string;
  file_type: string;
  file_size: number;
  expires_at: string;
  created_at: string;
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