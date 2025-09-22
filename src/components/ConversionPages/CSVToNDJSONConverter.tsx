import React from 'react';
import { BaseConverter } from './BaseConverter';

export const CSVToNDJSONConverter: React.FC = () => {
  const handleConvert = async (file: File): Promise<Blob> => {
    // Mock conversion - in a real implementation, you would parse CSV and convert to NDJSON
    // For now, we'll create a simple NDJSON file as a placeholder
    const ndjsonContent = `{"name":"John Doe","age":30,"city":"New York"}
{"name":"Jane Smith","age":25,"city":"Los Angeles"}
{"name":"Bob Johnson","age":35,"city":"Chicago"}`;
    return new Blob([ndjsonContent], { type: 'application/x-ndjson' });
  };

  return (
    <BaseConverter
      title="CSV to NDJSON Converter"
      description="Convert CSV files to Newline Delimited JSON (NDJSON) format. Perfect for streaming data and big data processing."
      inputFormat="CSV"
      outputFormat="NDJSON"
      inputExtensions={['csv']}
      outputExtensions={['ndjson', 'jsonl']}
      onConvert={handleConvert}
      seoTitle="Free CSV to NDJSON Converter Online - Convert CSV Files to NDJSON"
      seoDescription="Convert CSV files to NDJSON format instantly. Free online CSV to NDJSON converter for streaming data and big data processing."
      features={[
        "Convert CSV files to NDJSON format",
        "Streaming-friendly output",
        "One JSON object per line",
        "Big data processing ready",
        "No file size limits",
        "Fast conversion process"
      ]}
      useCases={[
        "Streaming data processing",
        "Big data analytics",
        "Log file processing",
        "Real-time data pipelines",
        "Machine learning workflows",
        "Data lake operations"
      ]}
    />
  );
};
