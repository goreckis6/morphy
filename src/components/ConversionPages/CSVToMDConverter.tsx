import React from 'react';
import { BaseConverter } from './BaseConverter';

export const CSVToMDConverter: React.FC = () => {
  const handleConvert = async (file: File): Promise<Blob> => {
    // Mock conversion - in a real implementation, you would parse CSV and convert to Markdown table
    // For now, we'll create a simple Markdown file as a placeholder
    const markdownContent = `# CSV Data

| Name | Age | City |
|------|-----|------|
| John Doe | 30 | New York |
| Jane Smith | 25 | Los Angeles |
| Bob Johnson | 35 | Chicago |

*Generated from CSV data*`;
    return new Blob([markdownContent], { type: 'text/markdown' });
  };

  return (
    <BaseConverter
      title="CSV to Markdown Converter"
      description="Convert CSV files to Markdown format with formatted tables. Perfect for documentation and GitHub README files."
      inputFormat="CSV"
      outputFormat="MD"
      inputExtensions={['csv']}
      outputExtensions={['md', 'markdown']}
      onConvert={handleConvert}
      seoTitle="Free CSV to Markdown Converter Online - Convert CSV Files to MD Tables"
      seoDescription="Convert CSV files to Markdown format instantly. Free online CSV to Markdown converter for creating documentation and README files."
      features={[
        "Convert CSV files to Markdown format",
        "Formatted table output",
        "GitHub compatible",
        "Documentation ready",
        "Clean formatting",
        "Version control friendly"
      ]}
      useCases={[
        "Documentation",
        "GitHub README files",
        "Technical writing",
        "Project documentation",
        "Wiki content",
        "Blog posts"
      ]}
    />
  );
};
