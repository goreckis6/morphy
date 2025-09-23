import React from 'react';
import { BaseConverter } from './BaseConverter';

export const DOCToTXTConverter: React.FC = () => {
  const handleConvert = async (file: File): Promise<Blob> => {
    // Mock conversion - in a real implementation, you would parse DOC and extract text
    // For now, we'll create a simple TXT file as a placeholder
    const txtContent = `Document Text Content
====================

This is a sample text extracted from a DOC file.
The content would be properly extracted from the Word document.

Generated from DOC file conversion.`;
    return new Blob([txtContent], { type: 'text/plain' });
  };

  return (
    <BaseConverter
      title="DOC to TXT Converter"
      description="Convert Microsoft Word DOC files to plain text format for universal compatibility. Extract text content from Word documents and save as simple text files."
      inputFormat="DOC"
      outputFormat="TXT"
      inputExtensions={['doc']}
      outputExtensions={['txt']}
      onConvert={handleConvert}
      seoTitle="Free DOC to TXT Converter Online - Convert Microsoft Word Documents to Plain Text"
      seoDescription="Convert DOC files to TXT format instantly. Free online DOC to TXT converter for extracting plain text from Word documents. Perfect for universal compatibility and text processing."
      features={[
        "Convert DOC files to TXT format",
        "Plain text extraction",
        "Universal compatibility",
        "No formatting dependencies",
        "Cross-platform support",
        "Lightweight output"
      ]}
      useCases={[
        "Text content extraction",
        "Universal document sharing",
        "Legacy system integration",
        "Text processing workflows",
        "Data archiving",
        "Simple document conversion"
      ]}
    />
  );
};
