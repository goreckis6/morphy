import React from 'react';
import { BaseConverter } from './BaseConverter';

export const EPUBToDOCConverter: React.FC = () => {
  const handleConvert = async (file: File): Promise<Blob> => {
    // Mock conversion - in a real implementation, you would parse EPUB and generate DOC
    // For now, we'll create a simple DOC file as a placeholder
    const docContent = 'Mock DOC content - in real implementation, this would be a proper DOC file';
    return new Blob([docContent], { type: 'application/msword' });
  };

  return (
    <BaseConverter
      title="EPUB to DOC Converter"
      description="Convert EPUB e-book files to Microsoft Word DOC format for document editing. Transform e-books into editable Word documents with preserved formatting."
      inputFormat="EPUB"
      outputFormat="DOC"
      inputExtensions={['epub']}
      outputExtensions={['doc']}
      onConvert={handleConvert}
      seoTitle="Free EPUB to DOC Converter Online - Convert E-books to Microsoft Word Documents"
      seoDescription="Convert EPUB files to DOC format instantly. Free online EPUB to DOC converter for creating editable Word documents from e-books. Perfect for document editing and collaboration."
      features={[
        "Convert EPUB files to DOC format",
        "E-book to document conversion",
        "Microsoft Word compatibility",
        "Formatting preservation",
        "Editable document output",
        "Legacy document support"
      ]}
      useCases={[
        "E-book editing and modification",
        "Document collaboration",
        "Content repurposing",
        "Legacy system integration",
        "Document archiving",
        "Content management workflows"
      ]}
    />
  );
};
