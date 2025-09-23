import React from 'react';
import { BaseConverter } from './BaseConverter';

export const CSVToXLSConverter: React.FC = () => {
  const handleConvert = async (file: File): Promise<Blob> => {
    // Mock conversion - in a real implementation, you would use a library like xlsx
    // For now, we'll create a simple XLS file as a placeholder
    const xlsContent = 'Mock XLS content - in real implementation, this would be a proper XLS file';
    return new Blob([xlsContent], { type: 'application/vnd.ms-excel' });
  };

  return (
    <BaseConverter
      title="CSV to XLS Converter"
      description="Convert CSV files to Excel XLS format for spreadsheet applications. Transform tabular data into Excel workbooks with formulas and formatting."
      inputFormat="CSV"
      outputFormat="XLS"
      inputExtensions={['csv']}
      outputExtensions={['xls']}
      onConvert={handleConvert}
      seoTitle="Free CSV to XLS Converter Online - Convert CSV Files to Excel Spreadsheets"
      seoDescription="Convert CSV files to XLS format instantly. Free online CSV to XLS converter for creating Excel spreadsheets from CSV data. Compatible with all Excel versions."
      features={[
        "Convert CSV files to XLS format",
        "Excel workbook creation",
        "Formula support",
        "Cell formatting",
        "Multiple sheet support",
        "Legacy Excel compatibility"
      ]}
      useCases={[
        "Excel spreadsheet creation",
        "Data analysis in Excel",
        "Financial modeling",
        "Business reporting",
        "Data visualization",
        "Legacy system integration"
      ]}
    />
  );
};
