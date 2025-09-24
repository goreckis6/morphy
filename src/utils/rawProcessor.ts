export interface RawConversionOptions {
  quality?: number;
  lossless?: boolean;
  maxWidth?: number;
  maxHeight?: number;
}

export class RAWProcessor {
  private static isInitialized = false;
  private static librawModule: any = null;
  private static librawLoading = false;

  static async initializeProcessor() {
    if (this.isInitialized) return;
    
    try {
      // Initialize libraw.js for advanced RAW processing
      await this.initializeLibRaw();
      this.isInitialized = true;
      console.log('RAW processor initialized with fallback methods');
    } catch (error) {
      console.warn('RAW processor initialization:', error);
      this.isInitialized = true; // Continue with fallback methods
    }
  }

  private static async initializeLibRaw() {
    if (this.librawModule || this.librawLoading) return this.librawModule;
    
    this.librawLoading = true;
    try {
      // Ensure process env stub for libraw.js (browser compatibility)
      const globalAny = globalThis as any;
      if (typeof globalAny.process === 'undefined') {
        globalAny.process = { env: {}, versions: { node: '0.0.0', modules: '0' } };
      } else {
        if (typeof globalAny.process.env === 'undefined') {
          globalAny.process.env = {};
        }
        if (typeof globalAny.process.versions === 'undefined') {
          globalAny.process.versions = { node: '0.0.0', modules: '0' };
        } else {
          if (typeof globalAny.process.versions.node === 'undefined') {
            globalAny.process.versions.node = '0.0.0';
          }
          if (typeof globalAny.process.versions.modules === 'undefined') {
            globalAny.process.versions.modules = '0';
          }
        }
      }

      // Dynamically import libraw.js
      const LibRaw = await import('libraw.js');
      this.librawModule = await LibRaw.default();
      console.log('LibRaw.js initialized successfully');
      return this.librawModule;
    } catch (error) {
      console.warn('LibRaw.js initialization failed:', error);
      return null;
    } finally {
      this.librawLoading = false;
    }
  }

  private static async processWithLibRaw(data: Uint8Array, filename: string, options: RawConversionOptions): Promise<Blob | null> {
    if (!this.librawModule) {
      await this.initializeLibRaw();
    }

    if (!this.librawModule) {
      return null;
    }

    const fileName = '/tmp/' + filename;
    try {
      this.librawModule.FS.writeFile(fileName, data);
      const processor = new this.librawModule.LibRaw();
      const openResult = processor.open_file(fileName);
      if (openResult !== 0) {
        processor.recycle();
        return null;
      }

      const unpackResult = processor.unpack();
      if (unpackResult !== 0) {
        processor.recycle();
        return null;
      }

      const params = processor.imgdata.params;
      params.half_size = 1;
      params.output_color = this.librawModule.LibRaw_constants.LIBRAW_COLORSPACE_SRGB;
      params.output_bps = 8;
      params.use_camera_wb = 1;
      params.no_auto_bright = 1;
      params.user_qual = options.lossless ? 3 : 2;

      processor.dcraw_process();
      const imageData = processor.dcraw_make_mem_image();
      if (!imageData || !imageData.data) {
        processor.recycle();
        return null;
      }

      const width = Math.min(imageData.width, options.maxWidth ?? imageData.width);
      const height = Math.min(imageData.height, options.maxHeight ?? imageData.height);

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        processor.recycle();
        return null;
      }

      canvas.width = width;
      canvas.height = height;

      const imgData = ctx.createImageData(width, height);
      const scaleX = imageData.width / width;
      const scaleY = imageData.height / height;

      const srcData = imageData.data;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const srcX = Math.floor(x * scaleX);
          const srcY = Math.floor(y * scaleY);
          const srcIndex = (srcY * imageData.width + srcX) * 3;
          const dstIndex = (y * width + x) * 4;

          imgData.data[dstIndex] = srcData[srcIndex];
          imgData.data[dstIndex + 1] = srcData[srcIndex + 1];
          imgData.data[dstIndex + 2] = srcData[srcIndex + 2];
          imgData.data[dstIndex + 3] = 255;
        }
      }

      ctx.putImageData(imgData, 0, 0);

      processor.recycle();

      return await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/webp', options.lossless ? 1.0 : (options.quality ?? 0.9));
      });
    } catch (error) {
      console.error('LibRaw processing error:', error);
      return null;
    } finally {
      try {
        this.librawModule.FS.unlink(fileName);
      } catch (e) {
        // ignore
      }
    }
  }

  // Ensure we pass ArrayBuffer to Blob for strict TS compatibility
  private static toArrayBuffer(view: Uint8Array): ArrayBuffer {
    return view.buffer.slice(view.byteOffset, view.byteOffset + view.byteLength);
  }

  static async convertToWebP(file: File, options: RawConversionOptions = {}): Promise<Blob | null> {
    await this.initializeProcessor();

    const quality = options.quality ?? 0.9;
    const lossless = options.lossless ?? false;
    const maxWidth = options.maxWidth ?? 4000;
    const maxHeight = options.maxHeight ?? 4000;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // Use LibRaw if available
      if (this.librawModule) {
        try {
          const result = await this.processWithLibRaw(uint8Array, file.name, {
            quality,
            lossless,
            maxWidth,
            maxHeight
          });
          if (result) {
            return result;
          }
        } catch (error) {
          console.warn('LibRaw conversion failed:', error);
        }
      }

      // Fallback: attempt to use embedded JPEG
      const jpegData = await this.findBestJPEGThumbnail(uint8Array, file.name);
      if (jpegData && jpegData.length > 100) {
        const blob = new Blob([jpegData], { type: 'image/jpeg' });
        const imageBitmap = await createImageBitmap(blob);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;

        canvas.width = Math.min(imageBitmap.width, maxWidth);
        canvas.height = Math.min(imageBitmap.height, maxHeight);
        ctx.drawImage(imageBitmap, 0, 0, canvas.width, canvas.height);

        return new Promise((resolve) => {
          canvas.toBlob((resultBlob) => resolve(resultBlob), 'image/webp', lossless ? 1.0 : quality);
        });
      }

      return null;
    } catch (error) {
      console.error('RAW conversion failed:', error);
      return null;
    }
  }

  static async createRAWPreview(file: File): Promise<string> {
    try {
      console.log(`Processing RAW file: ${file.name}, size: ${file.size}`);
      
      await this.initializeProcessor();

      // For HEIC/HEIF files
      if (this.isHEICFormat(file.name)) {
        try {
          const heic2any = await import('heic2any');
          const convertedBlob = await heic2any.default({
            blob: file,
            toType: 'image/jpeg',
            quality: 0.9
          });
          const blob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
          return URL.createObjectURL(blob);
        } catch (error) {
          console.warn('HEIC conversion failed:', error);
        }
      }

      // For RAW files
      if (this.isRAWFormat(file.name)) {
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        
        console.log(`RAW file loaded, buffer size: ${uint8Array.length}`);

        // Method 2: Universal JPEG thumbnail search
        const jpegData = await this.findBestJPEGThumbnail(uint8Array, file.name);
        if (jpegData && jpegData.length > 500) {
          console.log(`Found JPEG thumbnail, size: ${jpegData.length}`);
          const ab = RAWProcessor.toArrayBuffer(jpegData);
          const blob = new Blob([ab], { type: 'image/jpeg' });
          return URL.createObjectURL(blob);
        }

        // Method 3: EXIF thumbnail extraction
        try {
          const exifResult = await this.extractEXIFThumbnail(uint8Array);
          if (exifResult) {
            console.log('Successfully extracted EXIF thumbnail');
            return exifResult;
          }
        } catch (error) {
          console.warn('EXIF extraction failed:', error);
        }

        // Method 4: Try to create a basic image from the file
        try {
          const imageUrl = URL.createObjectURL(file);
          const canDecode = await this.canDecodeImage(imageUrl);
          if (canDecode) {
            console.log('File can be decoded as image directly');
            return imageUrl;
          }
          URL.revokeObjectURL(imageUrl);
        } catch (error) {
          console.warn('Direct image decode failed:', error);
        }
      }

      console.log('No preview could be generated, creating fallback');
      return await this.createFallbackPreview(file.name, file.size);
    } catch (error) {
      console.error('RAW processing failed:', error);
      return await this.createFallbackPreview(file.name, file.size);
    }
  }

  private static async extractLibRawThumbnail(data: Uint8Array, filename: string): Promise<string | null> {
    try {
      console.log('Attempting LibRaw thumbnail extraction for:', filename);
      
      if (!this.librawModule) {
        await this.initializeLibRaw();
      }
      
      if (!this.librawModule) {
        console.log('LibRaw not available, skipping');
        return null;
      }

      // Create a file in LibRaw's virtual filesystem
      const fileName = '/tmp/' + filename;
      this.librawModule.FS.writeFile(fileName, data);
      
      try {
        // Open the RAW file
        const processor = new this.librawModule.LibRaw();
        const result = processor.open_file(fileName);
        
        if (result !== 0) {
          console.log('LibRaw failed to open file, error code:', result);
          return null;
        }

        // Try to extract thumbnail
        const thumbResult = processor.unpack_thumb();
        if (thumbResult === 0) {
          // Get thumbnail data
          const thumbData = processor.get_thumbnail();
          if (thumbData && thumbData.length > 0) {
            console.log(`LibRaw extracted thumbnail: ${thumbData.length} bytes`);
            
            // Convert to blob URL
            const ab = RAWProcessor.toArrayBuffer(new Uint8Array(thumbData));
            const blob = new Blob([ab], { type: 'image/jpeg' });
            return URL.createObjectURL(blob);
          }
        }
        
        // If no thumbnail, try a quick demosaic for preview
        const demosaicResult = processor.unpack();
        if (demosaicResult === 0) {
          // Process to a small preview
          processor.dcraw_process();
          const imageData = processor.get_processed_image();
          
          if (imageData && imageData.length > 0) {
            console.log(`LibRaw created demosaic preview: ${imageData.length} bytes`);
            
            // Convert raw image data to JPEG using canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            if (ctx && imageData.width && imageData.height) {
              canvas.width = Math.min(imageData.width, 800);
              canvas.height = Math.min(imageData.height, 600);
              
              const imgData = ctx.createImageData(canvas.width, canvas.height);
              
              // Copy and scale image data
              const scaleX = imageData.width / canvas.width;
              const scaleY = imageData.height / canvas.height;
              
              for (let y = 0; y < canvas.height; y++) {
                for (let x = 0; x < canvas.width; x++) {
                  const srcX = Math.floor(x * scaleX);
                  const srcY = Math.floor(y * scaleY);
                  const srcIndex = (srcY * imageData.width + srcX) * 3;
                  const dstIndex = (y * canvas.width + x) * 4;
                  
                  imgData.data[dstIndex] = imageData.data[srcIndex];     // R
                  imgData.data[dstIndex + 1] = imageData.data[srcIndex + 1]; // G
                  imgData.data[dstIndex + 2] = imageData.data[srcIndex + 2]; // B
                  imgData.data[dstIndex + 3] = 255; // A
                }
              }
              
              ctx.putImageData(imgData, 0, 0);
              
              return new Promise((resolve) => {
                canvas.toBlob((blob) => {
                  if (blob) {
                    resolve(URL.createObjectURL(blob));
                  } else {
                    resolve(null);
                  }
                }, 'image/jpeg', 0.8);
              });
            }
          }
        }
        
        processor.recycle();
      } finally {
        // Clean up virtual file
        try {
          this.librawModule.FS.unlink(fileName);
        } catch (e) {
          // Ignore cleanup errors
        }
      }
      
      return null;
    } catch (error) {
      console.error('LibRaw thumbnail extraction failed:', error);
      return null;
    }
  }

  private static async findBestJPEGThumbnail(data: Uint8Array, filename: string): Promise<Uint8Array | null> {
    console.log(`Searching for JPEG thumbnails in ${filename}`);
    const candidates: Array<{data: Uint8Array, score: number}> = [];
    
    // Comprehensive JPEG search
    for (let i = 0; i < data.length - 10; i++) {
      if (data[i] === 0xFF && data[i + 1] === 0xD8) {
        console.log(`Found JPEG start marker at position ${i}`);
        // Look for end marker
        for (let j = i + 10; j < Math.min(i + 2000000, data.length - 1); j++) {
          if (data[j] === 0xFF && data[j + 1] === 0xD9) {
            console.log(`Found JPEG end marker at position ${j}, size: ${j - i + 2}`);
            const jpegData = data.slice(i, j + 2);
            
            if (jpegData.length > 100) {
              const score = this.scoreJPEGCandidate(jpegData, i, filename);
              console.log(`JPEG candidate score: ${score}, size: ${jpegData.length}`);
              if (score > 0) {
                candidates.push({ data: jpegData, score });
              }
            }
            break;
          }
        }
      }
    }
    
    console.log(`Found ${candidates.length} JPEG candidates`);
    if (candidates.length > 0) {
      candidates.sort((a, b) => b.score - a.score);
      console.log(`Best candidate: ${candidates[0].data.length} bytes, score: ${candidates[0].score}`);
      return candidates[0].data;
    }
    
    return null;
  }

  private static scoreJPEGCandidate(data: Uint8Array, position: number, filename: string): number {
    let score = 0;
    
    // Size scoring
    if (data.length > 10000 && data.length < 1000000) score += 100;
    else if (data.length > 5000 && data.length < 500000) score += 75;
    else if (data.length > 2000 && data.length < 200000) score += 50;
    else if (data.length > 1000) score += 25;
    
    // Position scoring
    if (position < 100000) score += 50;
    else if (position < 1000000) score += 25;
    
    // JFIF header check
    if (data.length > 10) {
      try {
        const header = new TextDecoder().decode(data.slice(6, 10));
        if (header === 'JFIF') score += 75;
        
        // Also check for EXIF header
        const exifHeader = new TextDecoder().decode(data.slice(6, 10));
        if (exifHeader === 'Exif') score += 50;
      } catch (e) {
        // Ignore decode errors
      }
    }
    
    // Basic JPEG validation
    let validMarkers = 0;
    for (let i = 2; i < Math.min(200, data.length - 1); i++) {
      if (data[i] === 0xFF) {
        const marker = data[i + 1];
        if ([0xE0, 0xE1, 0xE2, 0xDB, 0xC0, 0xC4, 0xDA, 0xC2].includes(marker)) {
          validMarkers++;
        }
      }
    }
    
    if (validMarkers > 0) score += validMarkers * 20;
    else score -= 50;
    
    console.log(`JPEG candidate scoring: size=${data.length}, position=${position}, validMarkers=${validMarkers}, score=${score}`);
    return Math.max(0, score);
  }

  private static async extractEXIFThumbnail(data: Uint8Array): Promise<string | null> {
    try {
      console.log('Attempting EXIF thumbnail extraction');
      const piexif = await import('piexifjs');
      
      // Convert to base64 for piexifjs
      const sampleSize = Math.min(data.length, 500000);
      const base64 = btoa(String.fromCharCode(...data.slice(0, sampleSize)));
      const dataUrl = `data:image/jpeg;base64,${base64}`;
      
      const exifData = piexif.load(dataUrl);
      if (exifData && exifData.thumbnail) {
        console.log(`EXIF thumbnail found: ${exifData.thumbnail.length} bytes`);
        const ab = RAWProcessor.toArrayBuffer(new Uint8Array(exifData.thumbnail));
        const thumbnailBlob = new Blob([ab], { type: 'image/jpeg' });
        return URL.createObjectURL(thumbnailBlob);
      }
    } catch (error) {
      console.warn('EXIF thumbnail extraction failed:', error);
    }
    return null;
  }

  private static async createDataPreview(data: Uint8Array, filename: string): Promise<string | null> {
    try {
      // Analyze the raw data to create a meaningful preview
      const canvas = document.createElement('canvas');
      canvas.width = 300;
      canvas.height = 300;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return null;
      
      // Create a data visualization
      const imageData = ctx.createImageData(300, 300);
      const pixels = imageData.data;
      
      // Sample data points throughout the file
      const sampleSize = Math.min(90000, data.length); // 300x300 pixels
      const step = Math.floor(data.length / sampleSize);
      
      for (let i = 0; i < sampleSize; i++) {
        const dataIndex = i * step;
        const pixelIndex = i * 4;
        
        if (dataIndex < data.length && pixelIndex < pixels.length - 3) {
          // Use raw data to create grayscale visualization
          const value = data[dataIndex];
          pixels[pixelIndex] = value;     // R
          pixels[pixelIndex + 1] = value; // G
          pixels[pixelIndex + 2] = value; // B
          pixels[pixelIndex + 3] = 255;   // A
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
      
      // Add overlay with file info
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 250, 300, 50);
      
      ctx.fillStyle = 'white';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('RAW DATA PREVIEW', 150, 270);
      ctx.font = '12px Arial';
      ctx.fillText(filename, 150, 290);
      
      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(URL.createObjectURL(blob));
          } else {
            resolve(null);
          }
        }, 'image/jpeg', 0.9);
      });
    } catch (error) {
      console.error('Data preview creation failed:', error);
      return null;
    }
  }

  // Validate whether a given object URL is a decodable image
  private static async canDecodeImage(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

  private static async createFallbackPreview(filename: string, fileSize: number): Promise<string> {
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext('2d')!;
    
    const extension = filename.split('.').pop()?.toLowerCase() || 'raw';
    
    // Color scheme based on format
    const colors = {
      'nef': ['#FCD34D', '#F59E0B'], // Yellow
      'cr2': ['#EF4444', '#DC2626'], 'crw': ['#EF4444', '#DC2626'], // Red
      'dcr': ['#F97316', '#EA580C'], 'kdc': ['#F97316', '#EA580C'], 'k25': ['#F97316', '#EA580C'], // Orange
      'x3f': ['#3B82F6', '#2563EB'], // Blue
      'arw': ['#8B5CF6', '#7C3AED'], 'sr2': ['#8B5CF6', '#7C3AED'], 'srf': ['#8B5CF6', '#7C3AED'], // Purple
      'mrw': ['#10B981', '#059669'], // Green
      'erf': ['#14B8A6', '#0D9488'], // Teal
      'raf': ['#059669', '#047857'], // Emerald
      '3fr': ['#6366F1', '#4F46E5'], // Indigo
      'orf': ['#06B6D4', '#0891B2'], // Cyan
      'pef': ['#DC2626', '#B91C1C'], // Red
      'dng': ['#6B7280', '#4B5563'], // Gray
    };
    
    const [color1, color2] = colors[extension as keyof typeof colors] || ['#6B7280', '#4B5563'];
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 300, 300);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 300, 300);
    
    // Add camera icon
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('📷', 150, 100);
    
    // Add format info
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial';
    ctx.fillText('RAW', 150, 140);
    ctx.font = 'bold 20px Arial';
    ctx.fillText(extension.toUpperCase(), 150, 170);
    
    // Add filename (truncated)
    ctx.font = '14px Arial';
    const truncatedName = filename.length > 25 ? filename.substring(0, 22) + '...' : filename;
    ctx.fillText(truncatedName, 150, 220);
    
    // Add file size
    ctx.font = '16px Arial';
    ctx.fillText(this.formatFileSize(fileSize), 150, 250);
    
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(URL.createObjectURL(blob));
        } else {
          resolve('');
        }
      }, 'image/jpeg', 0.9);
    });
  }

  static isRAWFormat(filename: string): boolean {
    const extension = filename.split('.').pop()?.toLowerCase();
    const rawFormats = ['nef', 'cr2', 'crw', 'dcr', 'kdc', 'k25', 'x3f', 'arw', 'sr2', 'srf', 'erf', 'raf', '3fr', 'orf', 'pef', 'dng'];
    return rawFormats.includes(extension || '');
  }

  static isHEICFormat(filename: string): boolean {
    const extension = filename.split('.').pop()?.toLowerCase();
    return ['heic', 'heif'].includes(extension || '');
  }

  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}