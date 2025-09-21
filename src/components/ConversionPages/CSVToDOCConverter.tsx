import React from 'react';
import { BaseConverter } from './BaseConverter';

export const CSVToDOCConverter: React.FC = () => {
  const handleConvert = async (file: File): Promise<Blob> => {
    // Mock conversion - in a real implementation, you would use a library like docx
    // For now, we'll create a simple DOC file as a placeholder
    const docContent = 'Mock DOC content - in real implementation, this would be a proper DOC file';
    return new Blob([docContent], { type: 'application/msword' });
  };

  return (
    <BaseConverter
      title="CSV to DOC Converter"
      description="Convert CSV files to Microsoft Word DOC format. Transform tabular data into formatted documents for reports and presentations."
      inputFormat="CSV"
      outputFormat="DOC"
      inputExtensions={['csv']}
      outputExtensions={['doc']}
      onConvert={handleConvert}
      seoTitle="Free CSV to DOC Converter Online - Convert CSV Files to Word Documents"
      seoDescription="Convert CSV files to DOC format instantly. Free online CSV to DOC converter for creating Word documents from tabular data."
      features={[
        "Convert CSV files to DOC format",
        "Table formatting and styling",
        "Professional document layout",
        "Microsoft Word compatibility",
        "Customizable formatting options",
        "Batch conversion support"
      ]}
      useCases={[
        "Report generation",
        "Data presentation",
        "Business documentation",
        "Academic papers",
        "Client deliverables",
        "Document management"
      ]}
    />
  );
};
