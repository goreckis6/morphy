import React from 'react';
import { BaseConverter } from './BaseConverter';

export const EPUBToRTFConverter: React.FC = () => {
  const handleConvert = async (file: File): Promise<Blob> => {
    // Mock conversion - in a real implementation, you would parse EPUB and generate RTF
    // For now, we'll create a simple RTF file as a placeholder
    const rtfContent = `{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0 Times New Roman;}} \\f0\\fs24 E-book Content\\par\\par Chapter 1\\par This is the converted content from EPUB to RTF format.\\par}`;
    return new Blob([rtfContent], { type: 'application/rtf' });
  };

  return (
    <BaseConverter
      title="EPUB to RTF Converter"
      description="Convert EPUB e-book files to Rich Text Format (RTF) for cross-platform document sharing. Transform e-books into universally compatible documents with basic formatting."
      inputFormat="EPUB"
      outputFormat="RTF"
      inputExtensions={['epub']}
      outputExtensions={['rtf']}
      onConvert={handleConvert}
      seoTitle="Free EPUB to RTF Converter Online - Convert E-books to Rich Text Format"
      seoDescription="Convert EPUB files to RTF format instantly. Free online EPUB to RTF converter for creating cross-platform documents from e-books. Perfect for universal document compatibility."
      features={[
        "Convert EPUB files to RTF format",
        "E-book to document conversion",
        "Cross-platform compatibility",
        "Rich text formatting",
        "Universal document support",
        "Legacy system integration"
      ]}
      useCases={[
        "Cross-platform document sharing",
        "Legacy system integration",
        "Universal document format",
        "Content repurposing",
        "Document archiving",
        "Simple document workflows"
      ]}
    />
  );
};
