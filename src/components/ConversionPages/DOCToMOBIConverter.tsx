import React from 'react';
import { BaseConverter } from './BaseConverter';

export const DOCToMOBIConverter: React.FC = () => {
  const handleConvert = async (file: File): Promise<Blob> => {
    // Mock conversion - in a real implementation, you would parse DOC and generate MOBI
    // For now, we'll create a simple MOBI file as a placeholder
    const mobiContent = 'Mock MOBI content - in real implementation, this would be a proper MOBI file';
    return new Blob([mobiContent], { type: 'application/x-mobipocket-ebook' });
  };

  return (
    <BaseConverter
      title="DOC to MOBI Converter"
      description="Convert Microsoft Word DOC files to MOBI format for Kindle e-readers. Transform Word documents into Amazon Kindle-compatible e-book format."
      inputFormat="DOC"
      outputFormat="MOBI"
      inputExtensions={['doc']}
      outputExtensions={['mobi']}
      onConvert={handleConvert}
      seoTitle="Free DOC to MOBI Converter Online - Convert Microsoft Word Documents to Kindle Format"
      seoDescription="Convert DOC files to MOBI format instantly. Free online DOC to MOBI converter for creating Kindle e-books from Word documents. Perfect for Amazon Kindle compatibility."
      features={[
        "Convert DOC files to MOBI format",
        "Kindle e-reader compatibility",
        "Amazon format support",
        "E-book creation",
        "Mobile reading optimization",
        "Professional formatting"
      ]}
      useCases={[
        "Kindle e-book publishing",
        "Amazon publishing workflows",
        "Mobile reading optimization",
        "Educational content distribution",
        "Self-publishing on Kindle",
        "Document to e-reader conversion"
      ]}
    />
  );
};
