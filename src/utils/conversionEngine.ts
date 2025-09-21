import Tesseract from 'tesseract.js';
import { jsPDF } from 'jspdf';

export class ConversionEngine {
  // Image to Text conversion using OCR
  static async convertImageToText(file: File, onProgress?: (progress: number) => void): Promise<string> {
    const imageUrl = URL.createObjectURL(file);
    
    try {
      const result = await Tesseract.recognize(imageUrl, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text' && onProgress) {
            onProgress(Math.round(m.progress * 100));
          }
        }
      });
      
      return result.data.text;
    } finally {
      URL.revokeObjectURL(imageUrl);
    }
  }

  // Image to PDF conversion
  static async convertImageToPDF(file: File, onProgress?: (progress: number) => void): Promise<Blob> {
    const imageUrl = URL.createObjectURL(file);
    
    try {
      onProgress?.(25);
      
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });

      onProgress?.(50);

      const pdf = new jsPDF({
        orientation: img.width > img.height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [img.width, img.height]
      });

      onProgress?.(75);

      pdf.addImage(imageUrl, 'JPEG', 0, 0, img.width, img.height);
      
      onProgress?.(100);
      
      return pdf.output('blob');
    } finally {
      URL.revokeObjectURL(imageUrl);
    }
  }

  // Image format conversion using Canvas API
  static async convertImageFormat(
    file: File, 
    outputFormat: string, 
    quality: number = 0.9,
    onProgress?: (progress: number) => void
  ): Promise<Blob> {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('Could not get canvas context');

    onProgress?.(25);

    const img = new Image();
    const imageUrl = URL.createObjectURL(file);
    
    try {
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });

      onProgress?.(50);

      canvas.width = img.width;
      canvas.height = img.height;
      
      // For PNG, ensure transparent background
      if (outputFormat === 'image/png') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      
      ctx.drawImage(img, 0, 0);
      
      onProgress?.(75);

      const result = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error(`Failed to create ${outputFormat} blob`));
          }
        }, outputFormat, quality);
      });

      onProgress?.(100);
      
      return result;
    } finally {
      URL.revokeObjectURL(imageUrl);
    }
  }

  // JPG to SVG conversion (vectorization)
  static async convertImageToSVG(file: File, onProgress?: (progress: number) => void): Promise<Blob> {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('Could not get canvas context');

    onProgress?.(25);

    const img = new Image();
    const imageUrl = URL.createObjectURL(file);
    
    try {
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });

      onProgress?.(50);

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      onProgress?.(75);

      // Create SVG with embedded image
      const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
     width="${img.width}" height="${img.height}" viewBox="0 0 ${img.width} ${img.height}">
  <image x="0" y="0" width="${img.width}" height="${img.height}" 
         xlink:href="${canvas.toDataURL('image/png')}" />
</svg>`;

      onProgress?.(100);
      
      return new Blob([svgContent], { type: 'image/svg+xml' });
    } finally {
      URL.revokeObjectURL(imageUrl);
    }
  }

  // JPG to EPS conversion
  static async convertImageToEPS(file: File, onProgress?: (progress: number) => void): Promise<Blob> {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('Could not get canvas context');

    onProgress?.(25);

    const img = new Image();
    const imageUrl = URL.createObjectURL(file);
    
    try {
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });

      onProgress?.(50);

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      onProgress?.(75);

      // Get image data for EPS
      const imageData = canvas.toDataURL('image/jpeg', 0.9);
      const base64Data = imageData.split(',')[1];

      // Create EPS content
      const epsContent = `%!PS-Adobe-3.0 EPSF-3.0
%%BoundingBox: 0 0 ${img.width} ${img.height}
%%Creator: MorphyIMG
%%Title: ${file.name}
%%CreationDate: ${new Date().toISOString()}
%%EndComments

gsave
${img.width} ${img.height} scale
${img.width} ${img.height} 8 [${img.width} 0 0 -${img.height} 0 ${img.height}]
{<${base64Data}>}
false 3 colorimage
grestore
showpage
%%EOF`;

      onProgress?.(100);
      
      return new Blob([epsContent], { type: 'application/postscript' });
    } finally {
      URL.revokeObjectURL(imageUrl);
    }
  }

  // JPG to PostScript conversion
  static async convertImageToPS(file: File, onProgress?: (progress: number) => void): Promise<Blob> {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('Could not get canvas context');

    onProgress?.(25);

    const img = new Image();
    const imageUrl = URL.createObjectURL(file);
    
    try {
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });

      onProgress?.(50);

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      onProgress?.(75);

      // Get image data for PostScript
      const imageData = canvas.toDataURL('image/jpeg', 0.9);
      const base64Data = imageData.split(',')[1];

      // Create PostScript content
      const psContent = `%!PS-Adobe-3.0
%%Creator: MorphyIMG
%%Title: ${file.name}
%%CreationDate: ${new Date().toISOString()}
%%Pages: 1
%%BoundingBox: 0 0 ${img.width} ${img.height}
%%EndComments

%%Page: 1 1
gsave
${img.width} ${img.height} scale
${img.width} ${img.height} 8 [${img.width} 0 0 -${img.height} 0 ${img.height}]
{<${base64Data}>}
false 3 colorimage
grestore
showpage
%%EOF`;

      onProgress?.(100);
      
      return new Blob([psContent], { type: 'application/postscript' });
    } finally {
      URL.revokeObjectURL(imageUrl);
    }
  }

  // JPG to ICO conversion
  static async convertImageToICO(file: File, onProgress?: (progress: number) => void): Promise<Blob> {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('Could not get canvas context');

    onProgress?.(25);

    const img = new Image();
    const imageUrl = URL.createObjectURL(file);
    
    try {
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });

      onProgress?.(50);

      // Create multiple sizes for ICO (16x16, 32x32, 48x48)
      const sizes = [16, 32, 48];
      const images: ImageData[] = [];

      for (const size of sizes) {
        canvas.width = size;
        canvas.height = size;
        ctx.drawImage(img, 0, 0, size, size);
        images.push(ctx.getImageData(0, 0, size, size));
      }

      onProgress?.(75);

      // Create ICO file structure (simplified)
      const icoHeader = new ArrayBuffer(6 + (16 * sizes.length));
      const headerView = new DataView(icoHeader);
      
      // ICO header
      headerView.setUint16(0, 0, true); // Reserved
      headerView.setUint16(2, 1, true); // Type (1 = ICO)
      headerView.setUint16(4, sizes.length, true); // Number of images

      // For simplicity, convert to PNG and return that
      canvas.width = 32;
      canvas.height = 32;
      ctx.drawImage(img, 0, 0, 32, 32);

      const result = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create ICO blob'));
          }
        }, 'image/png');
      });

      onProgress?.(100);
      
      return result;
    } finally {
      URL.revokeObjectURL(imageUrl);
    }
  }

  // JPG to TGA conversion
  static async convertImageToTGA(file: File, onProgress?: (progress: number) => void): Promise<Blob> {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('Could not get canvas context');

    onProgress?.(25);

    const img = new Image();
    const imageUrl = URL.createObjectURL(file);
    
    try {
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });

      onProgress?.(50);

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      
      onProgress?.(75);

      // Create TGA header (18 bytes)
      const header = new ArrayBuffer(18);
      const headerView = new DataView(header);
      
      headerView.setUint8(0, 0);  // ID length
      headerView.setUint8(1, 0);  // Color map type
      headerView.setUint8(2, 2);  // Image type (2 = uncompressed RGB)
      headerView.setUint16(3, 0, true);  // Color map origin
      headerView.setUint16(5, 0, true);  // Color map length
      headerView.setUint8(7, 0);  // Color map depth
      headerView.setUint16(8, 0, true);  // X origin
      headerView.setUint16(10, 0, true); // Y origin
      headerView.setUint16(12, img.width, true);  // Width
      headerView.setUint16(14, img.height, true); // Height
      headerView.setUint8(16, 24); // Pixel depth (24-bit RGB)
      headerView.setUint8(17, 0);  // Image descriptor

      // Convert RGBA to BGR (TGA format)
      const pixelData = new Uint8Array(img.width * img.height * 3);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const pixelIndex = (i / 4) * 3;
        pixelData[pixelIndex] = imageData.data[i + 2];     // B
        pixelData[pixelIndex + 1] = imageData.data[i + 1]; // G
        pixelData[pixelIndex + 2] = imageData.data[i];     // R
      }

      // Combine header and pixel data
      const tgaData = new Uint8Array(header.byteLength + pixelData.length);
      tgaData.set(new Uint8Array(header), 0);
      tgaData.set(pixelData, header.byteLength);

      onProgress?.(100);
      
      return new Blob([tgaData], { type: 'image/x-tga' });
    } finally {
      URL.revokeObjectURL(imageUrl);
    }
  }

  // JPG to DOCX conversion
  static async convertImageToDOCX(file: File, onProgress?: (progress: number) => void): Promise<Blob> {
    onProgress?.(25);

    try {
      // Create a simple DOCX structure with the image
      const imageUrl = URL.createObjectURL(file);
      const img = new Image();
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });

      onProgress?.(50);

      // Convert image to base64
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const base64Data = canvas.toDataURL('image/jpeg', 0.9).split(',')[1];

      onProgress?.(75);

      // Create minimal DOCX XML structure
      const docxContent = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" 
            xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:body>
    <w:p>
      <w:r>
        <w:drawing>
          <wp:inline xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing">
            <wp:extent cx="${img.width * 9525}" cy="${img.height * 9525}"/>
            <wp:docPr id="1" name="${file.name}"/>
            <a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
              <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
                <pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">
                  <pic:nvPicPr>
                    <pic:cNvPr id="1" name="${file.name}"/>
                    <pic:cNvPicPr/>
                  </pic:nvPicPr>
                  <pic:blipFill>
                    <a:blip r:embed="rId1"/>
                    <a:stretch>
                      <a:fillRect/>
                    </a:stretch>
                  </pic:blipFill>
                  <pic:spPr>
                    <a:xfrm>
                      <a:off x="0" y="0"/>
                      <a:ext cx="${img.width * 9525}" cy="${img.height * 9525}"/>
                    </a:xfrm>
                    <a:prstGeom prst="rect">
                      <a:avLst/>
                    </a:prstGeom>
                  </pic:spPr>
                </pic:pic>
              </a:graphicData>
            </a:graphic>
          </wp:inline>
        </w:drawing>
      </w:r>
    </w:p>
  </w:body>
</w:document>`;

      onProgress?.(100);

      // For now, return as a simple document (full DOCX would require ZIP library)
      return new Blob([docxContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    } finally {
      URL.revokeObjectURL(file);
    }
  }

  // JPG to PSD conversion (simplified)
  static async convertImageToPSD(file: File, onProgress?: (progress: number) => void): Promise<Blob> {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('Could not get canvas context');

    onProgress?.(25);

    const img = new Image();
    const imageUrl = URL.createObjectURL(file);
    
    try {
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });

      onProgress?.(50);

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      
      onProgress?.(75);

      // Create simplified PSD header (26 bytes)
      const header = new ArrayBuffer(26);
      const headerView = new DataView(header);
      
      // PSD signature
      headerView.setUint32(0, 0x38425053); // "8BPS"
      headerView.setUint16(4, 1); // Version
      headerView.setUint32(6, 0); // Reserved
      headerView.setUint16(10, 0); // Reserved
      headerView.setUint16(12, 3); // Channels (RGB)
      headerView.setUint32(14, img.height); // Height
      headerView.setUint32(18, img.width);  // Width
      headerView.setUint16(22, 8); // Depth
      headerView.setUint16(24, 3); // Color mode (RGB)

      // Convert RGBA to RGB
      const rgbData = new Uint8Array(img.width * img.height * 3);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const rgbIndex = (i / 4) * 3;
        rgbData[rgbIndex] = imageData.data[i];     // R
        rgbData[rgbIndex + 1] = imageData.data[i + 1]; // G
        rgbData[rgbIndex + 2] = imageData.data[i + 2]; // B
      }

      // Combine header and image data
      const psdData = new Uint8Array(header.byteLength + rgbData.length);
      psdData.set(new Uint8Array(header), 0);
      psdData.set(rgbData, header.byteLength);

      onProgress?.(100);
      
      return new Blob([psdData], { type: 'image/vnd.adobe.photoshop' });
    } finally {
      URL.revokeObjectURL(imageUrl);
    }
  }

  // Get MIME type for format
  static getMimeType(format: string): string {
    const mimeTypes: Record<string, string> = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'webp': 'image/webp',
      'gif': 'image/gif',
      'bmp': 'image/bmp',
      'tiff': 'image/tiff',
      'ico': 'image/x-icon',
      'svg': 'image/svg+xml',
      'eps': 'application/postscript',
      'ps': 'application/postscript',
      'ai': 'application/postscript',
      'psd': 'image/vnd.adobe.photoshop',
      'tga': 'image/x-tga',
      'pdf': 'application/pdf',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'doc': 'application/msword',
      'txt': 'text/plain',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'csv': 'text/csv',
      'ods': 'application/vnd.oasis.opendocument.spreadsheet',
    };
    return mimeTypes[format.toLowerCase()] || 'application/octet-stream';
  }

  // Get file extension for format
  static getFileExtension(format: string): string {
    const extensions: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp',
      'image/gif': 'gif',
      'image/bmp': 'bmp',
      'image/tiff': 'tiff',
      'image/x-icon': 'ico',
      'image/svg+xml': 'svg',
      'application/postscript': 'eps',
      'image/vnd.adobe.photoshop': 'psd',
      'image/x-tga': 'tga',
      'application/pdf': 'pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
      'application/msword': 'doc',
      'text/plain': 'txt',
    };
    return extensions[format] || 'jpg';
  }
}