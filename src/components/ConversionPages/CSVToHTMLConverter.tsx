import React from 'react';
import { BaseConverter } from './BaseConverter';

export const CSVToHTMLConverter: React.FC = () => {
  const handleConvert = async (file: File): Promise<Blob> => {
    // Mock conversion - in a real implementation, you would parse CSV and generate HTML table
    // For now, we'll create a simple HTML file as a placeholder
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <title>CSV Data</title>
    <style>
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <table>
        <tr><th>Name</th><th>Age</th><th>City</th></tr>
        <tr><td>John Doe</td><td>30</td><td>New York</td></tr>
        <tr><td>Jane Smith</td><td>25</td><td>Los Angeles</td></tr>
    </table>
</body>
</html>`;
    return new Blob([htmlContent], { type: 'text/html' });
  };

  return (
    <BaseConverter
      title="CSV to HTML Converter"
      description="Convert CSV files to HTML format with styled tables. Perfect for web display and data presentation."
      inputFormat="CSV"
      outputFormat="HTML"
      inputExtensions={['csv']}
      outputExtensions={['html', 'htm']}
      onConvert={handleConvert}
      seoTitle="Free CSV to HTML Converter Online - Convert CSV Files to HTML Tables"
      seoDescription="Convert CSV files to HTML format instantly. Free online CSV to HTML converter for creating web-ready tables from tabular data."
      features={[
        "Convert CSV files to HTML format",
        "Styled table output",
        "Web-ready formatting",
        "Responsive design",
        "Custom CSS styling",
        "Cross-browser compatibility"
      ]}
      useCases={[
        "Web development",
        "Data visualization",
        "Report generation",
        "Content management",
        "Email templates",
        "Documentation"
      ]}
    />
  );
};
