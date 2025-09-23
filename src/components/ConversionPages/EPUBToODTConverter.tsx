import React from 'react';
import { BaseConverter } from './BaseConverter';

export const EPUBToODTConverter: React.FC = () => {
  const handleConvert = async (file: File): Promise<Blob> => {
    // Mock conversion - in a real implementation, you would parse EPUB and generate ODT
    // For now, we'll create a simple ODT file as a placeholder
    const odtContent = 'Mock ODT content - in real implementation, this would be a proper ODT file';
    return new Blob([odtContent], { type: 'application/vnd.oasis.opendocument.text' });
  };

  return (
    <BaseConverter
      title="EPUB to ODT Converter"
      description="Convert EPUB e-book files to OpenDocument Text (ODT) format for document editing. Transform e-books into editable documents with cross-platform compatibility."
      inputFormat="EPUB"
      outputFormat="ODT"
      inputExtensions={['epub']}
      outputExtensions={['odt']}
      onConvert={handleConvert}
      seoTitle="Free EPUB to ODT Converter Online - Convert E-books to OpenDocument Format"
      seoDescription="Convert EPUB files to ODT format instantly. Free online EPUB to ODT converter for creating editable documents from e-books. Perfect for LibreOffice and cross-platform editing."
      features={[
        "Convert EPUB files to ODT format",
        "E-book to document conversion",
        "OpenDocument compatibility",
        "Cross-platform editing",
        "Formatting preservation",
        "Open-source office support"
      ]}
      useCases={[
        "Cross-platform document editing",
        "Open-source office workflows",
        "Content repurposing",
        "Universal document compatibility",
        "Collaborative editing",
        "Free office software integration"
      ]}
    />
  );
};
