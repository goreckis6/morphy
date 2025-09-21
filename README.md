# MorphyIMG - Universal File Converter & Viewer

A comprehensive file conversion and viewing platform supporting 100+ file formats including images, documents, spreadsheets, and code files.

## Features

- **Universal File Converter**: Convert between 15+ image formats, documents, and data files
- **Advanced File Viewer**: Preview files directly in browser with professional quality
- **RAW Camera Support**: View and convert professional camera RAW files (NEF, CR2, ARW, etc.)
- **Batch Processing**: Handle multiple files simultaneously
- **Secure Processing**: All conversions happen locally in your browser
- **Professional Quality**: Maintain image quality with customizable compression settings

## Supported Formats

### Image Formats
- Standard: JPEG, PNG, WebP, AVIF, GIF, BMP, TIFF, SVG
- RAW Camera: NEF, CR2, ARW, X3F, RAF, ORF, PEF, DNG, 3FR, ERF, DCR
- Professional: PSD, EPS, AI, PostScript, ICO, CUR
- Mobile: HEIC, HEIF

### Document Formats
- PDF, DOCX, DOC, RTF, ODT, Pages
- Text files, Markdown, Code files

### Data Formats
- Excel (XLSX, XLS), CSV, ODS
- JSON, XML, YAML

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth
- **File Processing**: Canvas API, Tesseract.js (OCR), jsPDF
- **RAW Processing**: LibRaw.js, HEIC2Any
- **Spreadsheets**: SheetJS (xlsx)

## Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd morphyimg

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Deployment

### Render.com Deployment

This project includes a `render.yaml` file for easy deployment to Render.com:

1. Connect your GitLab repository to Render.com
2. The build will automatically use the configuration in `render.yaml`
3. Set environment variables in Render dashboard

### AWS Deployment Options

#### Option 1: AWS Amplify
1. Connect your GitLab repository to AWS Amplify
2. Use the included `amplify.yml` for build configuration
3. Set environment variables in Amplify console

#### Option 2: AWS S3 + CloudFront
1. Build the project: `npm run build`
2. Upload `dist/` folder to S3 bucket
3. Configure CloudFront distribution
4. Use the included `aws-deploy.sh` script

### Netlify Deployment
Use the included `netlify.toml` for Netlify deployment.

### Vercel Deployment
Use the included `vercel.json` for Vercel deployment.

## Project Structure

```
src/
├── components/           # React components
│   ├── FormatViewers/   # Format-specific viewers
│   ├── ConversionPages/ # Conversion tools
│   └── ViewerPages/     # Main viewer pages
├── contexts/            # React contexts (Auth)
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
└── lib/                 # External library configurations
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support or feature requests, please open an issue on GitLab.