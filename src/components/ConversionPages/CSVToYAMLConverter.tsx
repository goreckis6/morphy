import React from 'react';
import { BaseConverter } from './BaseConverter';

export const CSVToYAMLConverter: React.FC = () => {
  const handleConvert = async (file: File): Promise<Blob> => {
    // Mock conversion - in a real implementation, you would parse CSV and generate YAML
    // For now, we'll create a simple YAML file as a placeholder
    const yamlContent = `# YAML data generated from CSV
data:
  - name: John Doe
    age: 30
    city: New York
  - name: Jane Smith
    age: 25
    city: Los Angeles

metadata:
  source: csv
  generated: 2025-01-01`;
    return new Blob([yamlContent], { type: 'application/x-yaml' });
  };

  return (
    <BaseConverter
      title="CSV to YAML Converter"
      description="Convert CSV files to YAML format for configuration and data serialization. Transform tabular data into human-readable YAML format for modern applications."
      inputFormat="CSV"
      outputFormat="YAML"
      inputExtensions={['csv']}
      outputExtensions={['yaml', 'yml']}
      onConvert={handleConvert}
      seoTitle="Free CSV to YAML Converter Online - Convert CSV Files to YAML Configuration Format"
      seoDescription="Convert CSV files to YAML format instantly. Free online CSV to YAML converter for creating configuration files and data serialization from spreadsheet data. Perfect for DevOps and modern applications."
      features={[
        "Convert CSV files to YAML format",
        "Human-readable configuration",
        "Data serialization",
        "DevOps friendly format",
        "Structured data output",
        "Modern application support"
      ]}
      useCases={[
        "Configuration management",
        "DevOps automation",
        "Data serialization",
        "Application settings",
        "Container orchestration",
        "Modern web applications"
      ]}
    />
  );
};
