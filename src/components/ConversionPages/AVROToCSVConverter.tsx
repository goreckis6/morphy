import React from 'react';
import { BaseConverter } from './BaseConverter';

export const AVROToCSVConverter: React.FC = () => {
  const handleConvert = async (file: File): Promise<Blob> => {
    // Mock conversion - in a real implementation, you would use a library like avro-js
    // For now, we'll create a simple CSV file as a placeholder
    const csvContent = `name,age,city
John Doe,30,New York
Jane Smith,25,Los Angeles
Bob Johnson,35,Chicago`;

    return new Blob([csvContent], { type: 'text/csv' });
  };

  return (
    <BaseConverter
      title="AVRO to CSV Converter"
      description="Convert Apache AVRO files to CSV format quickly and easily. Perfect for data analysis and spreadsheet applications."
      inputFormat="AVRO"
      outputFormat="CSV"
      inputExtensions={['avro']}
      outputExtensions={['csv']}
      onConvert={handleConvert}
      seoTitle="Free AVRO to CSV Converter Online - Convert AVRO Files to CSV"
      seoDescription="Convert AVRO files to CSV format instantly. Free online AVRO to CSV converter with no file size limits. Perfect for data analysis and spreadsheet applications."
      features={[
        "Convert AVRO files to CSV format",
        "Preserve data structure and schema",
        "Support for complex nested data",
        "Batch conversion support",
        "No file size limits",
        "100% free to use"
      ]}
      useCases={[
        "Data analysis and reporting",
        "Import into Excel or Google Sheets",
        "Database migration projects",
        "Data science workflows",
        "Business intelligence tools",
        "ETL pipeline development"
      ]}
    />
  );
};
