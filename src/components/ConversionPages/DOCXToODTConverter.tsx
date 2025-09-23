import React from 'react';
import { BaseConverter } from './BaseConverter';

export const DOCXToODTConverter: React.FC = () => {
  const handleConvert = async (file: File): Promise<Blob> => {
    // Mock conversion - in a real implementation, you would parse DOCX and generate ODT
    // For now, we'll create a simple ODT file as a placeholder
    const odtContent = 'Mock ODT content - in real implementation, this would be a proper ODT file';
    return new Blob([odtContent], { type: 'application/vnd.oasis.opendocument.text' });
  };

  return (
    <BaseConverter
      title="DOCX to ODT Converter"
      description="Convert Microsoft Word DOCX files to OpenDocument Text (ODT) format. Transform modern Word documents into open-source document format for cross-platform compatibility."
      inputFormat="DOCX"
      outputFormat="ODT"
      inputExtensions={['docx']}
      outputExtensions={['odt']}
      onConvert={handleConvert}
      seoTitle="Free DOCX to ODT Converter Online - Convert Microsoft Word Documents to OpenDocument Format"
      seoDescription="Convert DOCX files to ODT format instantly. Free online DOCX to ODT converter for creating open-source documents from Word files. Perfect for LibreOffice and cross-platform compatibility."
      features={[
        "Convert DOCX files to ODT format",
        "OpenDocument compatibility",
        "Cross-platform support",
        "LibreOffice integration",
        "Open-source format",
        "Modern document features"
      ]}
      useCases={[
        "Cross-platform document sharing",
        "Open-source office suite integration",
        "Universal document compatibility",
        "Modern format migration",
        "Collaborative document editing",
        "Free office software workflows"
      ]}
    />
  );
};
