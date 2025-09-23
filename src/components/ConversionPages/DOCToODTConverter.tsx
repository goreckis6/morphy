import React from 'react';
import { BaseConverter } from './BaseConverter';

export const DOCToODTConverter: React.FC = () => {
  const handleConvert = async (file: File): Promise<Blob> => {
    // Mock conversion - in a real implementation, you would parse DOC and generate ODT
    // For now, we'll create a simple ODT file as a placeholder
    const odtContent = 'Mock ODT content - in real implementation, this would be a proper ODT file';
    return new Blob([odtContent], { type: 'application/vnd.oasis.opendocument.text' });
  };

  return (
    <BaseConverter
      title="DOC to ODT Converter"
      description="Convert Microsoft Word DOC files to OpenDocument Text (ODT) format. Transform Word documents into open-source document format for cross-platform compatibility."
      inputFormat="DOC"
      outputFormat="ODT"
      inputExtensions={['doc']}
      outputExtensions={['odt']}
      onConvert={handleConvert}
      seoTitle="Free DOC to ODT Converter Online - Convert Microsoft Word Documents to OpenDocument Format"
      seoDescription="Convert DOC files to ODT format instantly. Free online DOC to ODT converter for creating open-source documents from Word files. Perfect for LibreOffice and cross-platform compatibility."
      features={[
        "Convert DOC files to ODT format",
        "OpenDocument compatibility",
        "Cross-platform support",
        "LibreOffice integration",
        "Open-source format",
        "Universal document access"
      ]}
      useCases={[
        "Cross-platform document sharing",
        "Open-source office suite integration",
        "Universal document compatibility",
        "Legacy format migration",
        "Collaborative document editing",
        "Free office software workflows"
      ]}
    />
  );
};
