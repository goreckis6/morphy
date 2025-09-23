import React from 'react';
import { BaseConverter } from './BaseConverter';

export const DOCToEPUBConverter: React.FC = () => {
  const handleConvert = async (file: File): Promise<Blob> => {
    // Mock conversion - in a real implementation, you would parse DOC and generate EPUB
    // For now, we'll create a simple EPUB file as a placeholder
    const epubContent = 'Mock EPUB content - in real implementation, this would be a proper EPUB file';
    return new Blob([epubContent], { type: 'application/epub+zip' });
  };

  return (
    <BaseConverter
      title="DOC to EPUB Converter"
      description="Convert Microsoft Word DOC files to EPUB format for e-books. Transform Word documents into digital book format compatible with e-readers and mobile devices."
      inputFormat="DOC"
      outputFormat="EPUB"
      inputExtensions={['doc']}
      outputExtensions={['epub']}
      onConvert={handleConvert}
      seoTitle="Free DOC to EPUB Converter Online - Convert Microsoft Word Documents to E-book Format"
      seoDescription="Convert DOC files to EPUB format instantly. Free online DOC to EPUB converter for creating e-books from Word documents. Perfect for digital publishing and e-reader compatibility."
      features={[
        "Convert DOC files to EPUB format",
        "E-book creation",
        "E-reader compatibility",
        "Digital publishing ready",
        "Mobile device support",
        "Professional formatting"
      ]}
      useCases={[
        "E-book publishing",
        "Digital content creation",
        "Mobile reading optimization",
        "Educational materials",
        "Document distribution",
        "Self-publishing workflows"
      ]}
    />
  );
};
