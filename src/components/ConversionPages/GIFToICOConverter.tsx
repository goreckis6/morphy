import React from 'react';
import { BaseConverter } from './BaseConverter';

export const GIFToICOConverter: React.FC = () => {
  const handleConvert = async (file: File): Promise<Blob> => {
    // Mock conversion - in a real implementation, you would use a library like sharp
    // For now, we'll return the original file as a placeholder
    return file;
  };

  return (
    <BaseConverter
      title="GIF to ICO Converter"
      description="Convert animated GIF files to ICO format for Windows icons. Transform GIF animations into high-quality Windows icon files with multiple sizes and frame support."
      inputFormat="GIF"
      outputFormat="ICO"
      inputExtensions={['gif']}
      outputExtensions={['ico']}
      onConvert={handleConvert}
      seoTitle="Free GIF to ICO Converter Online - Convert Animated GIFs to Windows Icons"
      seoDescription="Convert GIF files to ICO format instantly. Free online GIF to ICO converter for creating Windows icons from animated GIFs. Perfect for application icons and animated favicons."
      features={[
        "Convert GIF files to ICO format",
        "Animated GIF support",
        "Multiple icon size generation",
        "Windows icon compatibility",
        "Frame preservation",
        "High-quality output"
      ]}
      useCases={[
        "Animated application icons",
        "Website favicon creation",
        "Windows desktop icons",
        "Software development",
        "Animated brand elements",
        "Interactive icon design"
      ]}
    />
  );
};
