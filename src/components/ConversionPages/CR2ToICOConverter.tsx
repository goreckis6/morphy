import React from 'react';
import { BaseConverter } from './BaseConverter';

export const CR2ToICOConverter: React.FC = () => {
  const handleConvert = async (file: File): Promise<Blob> => {
    // Mock conversion - in a real implementation, you would use a library like libraw
    // For now, we'll return the original file as a placeholder
    return file;
  };

  return (
    <BaseConverter
      title="CR2 to ICO Converter"
      description="Convert Canon CR2 raw images to ICO format for Windows icons. Extract high-quality icons from professional camera files."
      inputFormat="CR2"
      outputFormat="ICO"
      inputExtensions={['cr2']}
      outputExtensions={['ico']}
      onConvert={handleConvert}
      seoTitle="Free CR2 to ICO Converter Online - Convert Canon CR2 to ICO Icons"
      seoDescription="Convert Canon CR2 raw images to ICO format instantly. Free online CR2 to ICO converter for creating high-quality Windows icons."
      features={[
        "Convert CR2 raw images to ICO format",
        "Professional camera file support",
        "High-resolution icon creation",
        "Multiple icon size support",
        "Raw image processing",
        "Quality preservation"
      ]}
      useCases={[
        "Professional photography workflows",
        "Windows application icons",
        "High-resolution favicons",
        "Software development",
        "Digital asset management",
        "Brand identity creation"
      ]}
    />
  );
};
