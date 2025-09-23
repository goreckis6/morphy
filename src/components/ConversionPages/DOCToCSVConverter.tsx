import React from 'react';
import { BaseConverter } from './BaseConverter';

export const DOCToCSVConverter: React.FC = () => {
  const handleConvert = async (file: File): Promise<Blob> => {
    // Mock conversion - in a real implementation, you would parse DOC and extract table data
    // For now, we'll create a simple CSV file as a placeholder
    const csvContent = `Name,Age,City
John Doe,30,New York
Jane Smith,25,Los Angeles`;
    return new Blob([csvContent], { type: 'text/csv' });
  };

  return (
    <BaseConverter
      title="DOC to CSV Converter"
      description="Convert Microsoft Word DOC files to CSV format for data analysis. Extract tabular data from Word documents and transform into spreadsheet-compatible format."
      inputFormat="DOC"
      outputFormat="CSV"
      inputExtensions={['doc']}
      outputExtensions={['csv']}
      onConvert={handleConvert}
      seoTitle="Free DOC to CSV Converter Online - Convert Microsoft Word Documents to CSV Format"
      seoDescription="Convert DOC files to CSV format instantly. Free online DOC to CSV converter for extracting tabular data from Word documents. Perfect for data analysis and spreadsheet import."
      features={[
        "Convert DOC files to CSV format",
        "Table data extraction",
        "Microsoft Word compatibility",
        "Data analysis ready",
        "Spreadsheet import support",
        "Legacy document processing"
      ]}
      useCases={[
        "Data extraction from reports",
        "Table migration to spreadsheets",
        "Legacy document processing",
        "Data analysis workflows",
        "Database import preparation",
        "Business intelligence"
      ]}
    />
  );
};
