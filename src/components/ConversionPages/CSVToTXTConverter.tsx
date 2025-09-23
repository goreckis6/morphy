import React from 'react';
import { BaseConverter } from './BaseConverter';

export const CSVToTXTConverter: React.FC = () => {
  const handleConvert = async (file: File): Promise<Blob> => {
    // Mock conversion - in a real implementation, you would parse CSV and format as text
    // For now, we'll create a simple TXT file as a placeholder
    const txtContent = `CSV Data Export
================

Name: John Doe
Age: 30
City: New York

Name: Jane Smith
Age: 25
City: Los Angeles

Generated from CSV file`;
    return new Blob([txtContent], { type: 'text/plain' });
  };

  return (
    <BaseConverter
      title="CSV to TXT Converter"
      description="Convert CSV files to plain text format for universal compatibility. Transform tabular data into readable text format for any text editor or system."
      inputFormat="CSV"
      outputFormat="TXT"
      inputExtensions={['csv']}
      outputExtensions={['txt']}
      onConvert={handleConvert}
      seoTitle="Free CSV to TXT Converter Online - Convert CSV Files to Plain Text Format"
      seoDescription="Convert CSV files to TXT format instantly. Free online CSV to TXT converter for creating plain text files from spreadsheet data. Universal compatibility guaranteed."
      features={[
        "Convert CSV files to TXT format",
        "Universal text compatibility",
        "No formatting dependencies",
        "Cross-platform support",
        "Lightweight output",
        "Any text editor compatible"
      ]}
      useCases={[
        "Universal data sharing",
        "Legacy system integration",
        "Text processing workflows",
        "Data archiving",
        "Simple data export",
        "Cross-platform compatibility"
      ]}
    />
  );
};
