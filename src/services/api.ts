// API service for backend communication
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export interface ConversionOptions {
  quality?: 'high' | 'medium' | 'low';
  lossless?: boolean;
  format?: 'webp' | 'png' | 'jpeg' | 'ico';
  width?: number;
  height?: number;
  iconSize?: number;
}

export interface ConversionResult {
  blob: Blob;
  filename: string;
  size: number;
}

export interface BatchConversionResult {
  success: boolean;
  processed: number;
  results: Array<{
    originalName: string;
    outputFilename?: string;
    size?: number;
    success: boolean;
    error?: string;
  }>;
}

class ApiService {
  private async makeRequest(
    endpoint: string, 
    method: 'GET' | 'POST' = 'GET', 
    body?: FormData | any
  ): Promise<Response> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const options: RequestInit = {
      method,
      headers: {},
    };

    if (body instanceof FormData) {
      // Don't set Content-Type for FormData, let browser set it with boundary
      options.body = body;
    } else if (body) {
      options.headers = {
        'Content-Type': 'application/json',
      };
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response;
  }

  async convertFile(file: File, options: ConversionOptions = {}): Promise<ConversionResult> {
    const formData = new FormData();
    formData.append('file', file);
    
    // Add conversion options
    if (options.quality) formData.append('quality', options.quality);
    if (options.lossless !== undefined) formData.append('lossless', options.lossless.toString());
    if (options.format) formData.append('format', options.format);
    if (options.width) formData.append('width', options.width.toString());
    if (options.height) formData.append('height', options.height.toString());
    if (options.iconSize) formData.append('iconSize', options.iconSize.toString());

    const response = await this.makeRequest('/api/convert', 'POST', formData);
    
    const blob = await response.blob();
    const contentDisposition = response.headers.get('Content-Disposition');
    const filename = this.extractFilename(contentDisposition) || 
                   `${file.name.replace(/\.[^.]+$/, '')}.${options.format || 'webp'}`;

    return {
      blob,
      filename,
      size: blob.size
    };
  }

  async convertBatch(files: File[], options: ConversionOptions = {}): Promise<BatchConversionResult> {
    const formData = new FormData();
    
    // Add files
    files.forEach(file => {
      formData.append('files', file);
    });
    
    // Add conversion options
    if (options.quality) formData.append('quality', options.quality);
    if (options.lossless !== undefined) formData.append('lossless', options.lossless.toString());
    if (options.format) formData.append('format', options.format);

    const response = await this.makeRequest('/api/convert/batch', 'POST', formData);
    return await response.json();
  }

  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    const response = await this.makeRequest('/health');
    return await response.json();
  }

  private extractFilename(contentDisposition: string | null): string | null {
    if (!contentDisposition) return null;
    
    const matches = contentDisposition.match(/filename="([^"]+)"/);
    return matches ? matches[1] : null;
  }

  // Utility method to download a blob
  downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

export const apiService = new ApiService();
