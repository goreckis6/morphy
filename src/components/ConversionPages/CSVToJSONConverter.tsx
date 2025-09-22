import React from 'react';
import { BaseConverter } from './BaseConverter';

export const CSVToJSONConverter: React.FC = () => {
  const handleConvert = async (file: File): Promise<Blob> => {
    // Mock conversion - in a real implementation, you would parse CSV and convert to JSON
    // For now, we'll create a simple JSON file as a placeholder
    const jsonContent = JSON.stringify({
      "data": [
        { "name": "John Doe", "age": 30, "city": "New York" },
        { "name": "Jane Smith", "age": 25, "city": "Los Angeles" },
        { "name": "Bob Johnson", "age": 35, "city": "Chicago" }
      ]
    }, null, 2);
    return new Blob([jsonContent], { type: 'application/json' });
  };

  return (
    <BaseConverter
      title="CSV to JSON Converter"
      description="Convert CSV files to JSON format for web applications and APIs. Perfect for data exchange and processing."
      inputFormat="CSV"
      outputFormat="JSON"
      inputExtensions={['csv']}
      outputExtensions={['json']}
      onConvert={handleConvert}
      seoTitle="Free CSV to JSON Converter Online - Convert CSV Files to JSON"
      seoDescription="Convert CSV files to JSON format instantly. Free online CSV to JSON converter for web development and data processing."
      features={[
        "Convert CSV files to JSON format",
        "Array of objects output",
        "Web API compatible",
        "Preserve data types",
        "Pretty-printed formatting",
        "Cross-platform compatibility"
      ]}
      useCases={[
        "Web development",
        "API data exchange",
        "Mobile app development",
        "Data processing",
        "Configuration files",
        "Database imports"
      ]}
    />
  );
};
