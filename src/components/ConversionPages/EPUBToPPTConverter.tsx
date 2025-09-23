import React from 'react';
import { BaseConverter } from './BaseConverter';

export const EPUBToPPTConverter: React.FC = () => {
  const handleConvert = async (file: File): Promise<Blob> => {
    // Mock conversion - in a real implementation, you would parse EPUB and generate PPT
    // For now, we'll create a simple PPT file as a placeholder
    const pptContent = 'Mock PPT content - in real implementation, this would be a proper PPT file';
    return new Blob([pptContent], { type: 'application/vnd.ms-powerpoint' });
  };

  return (
    <BaseConverter
      title="EPUB to PPT Converter"
      description="Convert EPUB e-book files to PowerPoint PPT format for presentations. Transform e-books into presentation slides with preserved content structure."
      inputFormat="EPUB"
      outputFormat="PPT"
      inputExtensions={['epub']}
      outputExtensions={['ppt']}
      onConvert={handleConvert}
      seoTitle="Free EPUB to PPT Converter Online - Convert E-books to PowerPoint Presentations"
      seoDescription="Convert EPUB files to PPT format instantly. Free online EPUB to PPT converter for creating PowerPoint presentations from e-books. Perfect for educational and business presentations."
      features={[
        "Convert EPUB files to PPT format",
        "E-book to presentation conversion",
        "PowerPoint compatibility",
        "Slide generation",
        "Content structure preservation",
        "Legacy presentation support"
      ]}
      useCases={[
        "Educational presentations",
        "Business presentations",
        "Content repurposing",
        "Academic presentations",
        "Training materials",
        "Content visualization"
      ]}
    />
  );
};
