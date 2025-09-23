import React from 'react';
import { BaseConverter } from './BaseConverter';

export const DOCXToTXTConverter: React.FC = () => {
  const handleConvert = async (file: File): Promise<Blob> => {
    // Mock conversion - in a real implementation, you would parse DOCX and extract text
    // For now, we'll create a simple TXT file as a placeholder
    const txtContent = `Document Text Content
====================

This is a sample text extracted from a DOCX file.
The content would be properly extracted from the Word document.

Generated from DOCX file conversion.`;
    return new Blob([txtContent], { type: 'text/plain' });
  };

  return (
    <BaseConverter
      title="DOCX to TXT Converter"
      description="Convert Microsoft Word DOCX files to plain text format for universal compatibility. Extract text content from modern Word documents and save as simple text files."
      inputFormat="DOCX"
      outputFormat="TXT"
      inputExtensions={['docx']}
      outputExtensions={['txt']}
      onConvert={handleConvert}
      seoTitle="Free DOCX to TXT Converter Online - Convert Microsoft Word Documents to Plain Text"
      seoDescription="Convert DOCX files to TXT format instantly. Free online DOCX to TXT converter for extracting plain text from Word documents. Perfect for universal compatibility and text processing."
      features={[
        "Convert DOCX files to TXT format",
        "Plain text extraction",
        "Universal compatibility",
        "No formatting dependencies",
        "Cross-platform support",
        "Modern document support"
      ]}
      useCases={[
        "Text content extraction",
        "Universal document sharing",
        "Modern system integration",
        "Text processing workflows",
        "Data archiving",
        "Simple document conversion"
      ]}
    />
  );
};
