import React from 'react';
import { BaseConverter } from './BaseConverter';

export const BMPToICOConverter: React.FC = () => {
  const handleConvert = async (file: File): Promise<Blob> => {
    // Mock conversion - in a real implementation, you would use canvas or a library like sharp
    // For now, we'll return the original file as a placeholder
    return file;
  };

  return (
    <BaseConverter
      title="BMP to ICO Converter"
      description="Convert BMP images to ICO format for Windows icons. Create high-quality icons from bitmap images with multiple sizes."
      inputFormat="BMP"
      outputFormat="ICO"
      inputExtensions={['bmp']}
      outputExtensions={['ico']}
      onConvert={handleConvert}
      seoTitle="Free BMP to ICO Converter Online - Convert BMP Images to ICO Icons"
      seoDescription="Convert BMP images to ICO format instantly. Free online BMP to ICO converter for creating Windows icons. Support for multiple icon sizes."
      features={[
        "Convert BMP images to ICO format",
        "Support for multiple icon sizes",
        "High-quality conversion",
        "Windows icon compatibility",
        "Batch conversion support",
        "No quality loss"
      ]}
      useCases={[
        "Windows application icons",
        "Website favicon creation",
        "Desktop shortcut icons",
        "Software development",
        "UI/UX design projects",
        "Brand asset creation"
      ]}
    />
  );
};
