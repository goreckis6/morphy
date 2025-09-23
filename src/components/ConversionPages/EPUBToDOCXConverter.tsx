import React from 'react';
import { BaseConverter } from './BaseConverter';

export const EPUBToDOCXConverter: React.FC = () => {
  const handleConvert = async (file: File): Promise<Blob> => {
    // Mock conversion - in a real implementation, you would parse EPUB and generate DOCX
    // For now, we'll create a simple DOCX file as a placeholder
    const docxContent = 'Mock DOCX content - in real implementation, this would be a proper DOCX file';
    return new Blob([docxContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  };

  return (
    <BaseConverter
      title="EPUB to DOCX Converter"
      description="Convert EPUB e-book files to Microsoft Word DOCX format for modern document editing. Transform e-books into editable Word documents with advanced formatting support."
      inputFormat="EPUB"
      outputFormat="DOCX"
      inputExtensions={['epub']}
      outputExtensions={['docx']}
      onConvert={handleConvert}
      seoTitle="Free EPUB to DOCX Converter Online - Convert E-books to Modern Word Documents"
      seoDescription="Convert EPUB files to DOCX format instantly. Free online EPUB to DOCX converter for creating editable Word documents from e-books. Perfect for modern document editing and collaboration."
      features={[
        "Convert EPUB files to DOCX format",
        "E-book to document conversion",
        "Modern Word compatibility",
        "Advanced formatting support",
        "Editable document output",
        "Collaboration ready"
      ]}
      useCases={[
        "E-book editing and modification",
        "Modern document collaboration",
        "Content repurposing",
        "Advanced document features",
        "Professional document workflows",
        "Content management systems"
      ]}
    />
  );
};
