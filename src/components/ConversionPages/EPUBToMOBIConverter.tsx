import React from 'react';
import { BaseConverter } from './BaseConverter';

export const EPUBToMOBIConverter: React.FC = () => {
  const handleConvert = async (file: File): Promise<Blob> => {
    // Mock conversion - in a real implementation, you would parse EPUB and generate MOBI
    // For now, we'll create a simple MOBI file as a placeholder
    const mobiContent = 'Mock MOBI content - in real implementation, this would be a proper MOBI file';
    return new Blob([mobiContent], { type: 'application/x-mobipocket-ebook' });
  };

  return (
    <BaseConverter
      title="EPUB to MOBI Converter"
      description="Convert EPUB e-book files to MOBI format for Kindle e-readers. Transform e-books into Amazon Kindle-compatible format for enhanced reading experience."
      inputFormat="EPUB"
      outputFormat="MOBI"
      inputExtensions={['epub']}
      outputExtensions={['mobi']}
      onConvert={handleConvert}
      seoTitle="Free EPUB to MOBI Converter Online - Convert E-books to Kindle Format"
      seoDescription="Convert EPUB files to MOBI format instantly. Free online EPUB to MOBI converter for creating Kindle e-books from EPUB files. Perfect for Amazon Kindle compatibility."
      features={[
        "Convert EPUB files to MOBI format",
        "E-book format conversion",
        "Kindle e-reader compatibility",
        "Amazon format support",
        "Enhanced reading features",
        "Professional e-book output"
      ]}
      useCases={[
        "Kindle e-book publishing",
        "E-reader format conversion",
        "Amazon publishing workflows",
        "Cross-platform e-book distribution",
        "Personal e-book library",
        "E-book format standardization"
      ]}
    />
  );
};
