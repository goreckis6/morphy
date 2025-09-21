import React from 'react';
import { 
  Image, 
  FileText, 
  BarChart3, 
  Code, 
  Camera, 
  Palette,
  FileImage,
  FileCode,
  Presentation,
  Type
} from 'lucide-react';

interface FormatCategory {
  title: string;
  icon: React.ReactNode;
  description: string;
  formats: Array<{
    name: string;
    extensions: string;
  }>;
}

export const SupportedFormats: React.FC = () => {
  const formatCategories: FormatCategory[] = [
    {
      title: "Standard Image Formats",
      icon: <Image className="w-6 h-6 text-blue-600" />,
      description: "Common image formats for web and print",
      formats: [
        { name: "JPEG (Joint Photographic Experts Group)", extensions: "jpg jpeg jpe" },
        { name: "JPEG 2000 Core Image File", extensions: "jp2" },
        { name: "JPEG 2000 Image", extensions: "jpf" },
        { name: "PNG (Portable Network Graphics)", extensions: "png pn8 png24 png32" },
        { name: "Web Picture Format", extensions: "webp" },
        { name: "AV1 Image File Format", extensions: "avif" },
        { name: "GIF (Graphics Interchange Format)", extensions: "gif" },
        { name: "TIFF (Tagged Image File Format)", extensions: "tif tiff tiff64" },
        { name: "Pyramid encoded TIFF", extensions: "ptif" },
        { name: "Bitmap Image", extensions: "bmp bmp2 bmp3 bitmap" }
      ]
    },
    {
      title: "Icon Formats",
      icon: <FileImage className="w-6 h-6 text-purple-600" />,
      description: "Icon and cursor file formats",
      formats: [
        { name: "Icon", extensions: "ico icon" },
        { name: "CUR", extensions: "cur" }
      ]
    },
    {
      title: "Vector Graphics",
      icon: <Palette className="w-6 h-6 text-green-600" />,
      description: "Scalable vector graphics and illustrations",
      formats: [
        { name: "Scalable Vector Graphics", extensions: "svg svgz msvgz" },
        { name: "Encapsulated PostScript", extensions: "eps eps2 eps3 epsf" },
        { name: "Adobe Illustrator Artwork", extensions: "ai" },
        { name: "PostScript File", extensions: "ps ps2 ps3" }
      ]
    },
    {
      title: "RAW Camera Formats",
      icon: <Camera className="w-6 h-6 text-orange-600" />,
      description: "Professional camera RAW image formats",
      formats: [
        { name: "Nikon Raw Image Format", extensions: "nef" },
        { name: "Canon Raw Image format", extensions: "cr2 crw" },
        { name: "Kodak Raw Image format", extensions: "dcr kdc k25" },
        { name: "Sigma Camera Raw Image format", extensions: "x3f" },
        { name: "Sony Raw Image format", extensions: "arw sr2 srf" },
        { name: "Epson Raw Image format", extensions: "erf" },
        { name: "Fuji Raw Image format", extensions: "raf" },
        { name: "Hasselblad Digital Camera Raw Image Format", extensions: "3fr" },
        { name: "Olympus Raw File Format", extensions: "orf" },
        { name: "Pentax Digital Camera Raw Image Format", extensions: "pef" },
        { name: "Digital Negative", extensions: "dng" }
      ]
    },
    {
      title: "Mobile & Camera Formats",
      icon: <FileImage className="w-6 h-6 text-pink-600" />,
      description: "Modern mobile and camera formats",
      formats: [
        { name: "High Efficiency Image Container", extensions: "heic heif" }
      ]
    },
    {
      title: "Professional/Editing Formats",
      icon: <Palette className="w-6 h-6 text-indigo-600" />,
      description: "Professional image editing formats",
      formats: [
        { name: "GIMP (eXperimental Computing Facility)", extensions: "xcf" },
        { name: "Photoshop Data File", extensions: "psd" },
        { name: "Photoshop Large Document Format", extensions: "psb" }
      ]
    },
    {
      title: "Font Formats",
      icon: <Type className="w-6 h-6 text-gray-600" />,
      description: "Typography and font file formats",
      formats: [
        { name: "TrueType Font", extensions: "ttf" },
        { name: "OpenType Font", extensions: "otf" },
        { name: "Web Open Font Format File", extensions: "woff" },
        { name: "TrueType Font Collection", extensions: "ttc" },
        { name: "Mac OS X Data Fork Font", extensions: "dfont" },
        { name: "Spline Font Database File", extensions: "sfd" }
      ]
    },
    {
      title: "Document Formats",
      icon: <FileText className="w-6 h-6 text-red-600" />,
      description: "Text documents and PDFs",
      formats: [
        { name: "Apple Pages Document", extensions: "pages" },
        { name: "Microsoft Word Open XML Document", extensions: "docx" },
        { name: "Microsoft Word Document", extensions: "doc" },
        { name: "Rich Text Format File", extensions: "rtf" },
        { name: "OpenDocument Text Document", extensions: "odt" },
        { name: "WordPerfect Document", extensions: "wpd" },
        { name: "Microsoft Works Word Processor", extensions: "wps" },
        { name: "JustSystems-Ichitaro File", extensions: "jtd jtt" },
        { name: "Portable Document Format File", extensions: "pdf" },
        { name: "Encapsulated Portable Document Format", extensions: "epdf" },
        { name: "LaTeX Source Document", extensions: "tex" },
        { name: "FrameMaker Maker Markup", extensions: "mml" },
        { name: "Uniform Office Document", extensions: "uof uot" },
        { name: "StarOffice Writer Text Document", extensions: "sdw sxw" },
        { name: "DjVu File", extensions: "djvu" }
      ]
    },
    {
      title: "Presentation Formats",
      icon: <Presentation className="w-6 h-6 text-yellow-600" />,
      description: "Presentation and slideshow formats",
      formats: [
        { name: "OpenDocument Presentation", extensions: "odp" },
        { name: "OpenDocument Presentation Template", extensions: "otp" },
        { name: "PowerPoint Template", extensions: "pot" },
        { name: "PowerPoint Slide Show", extensions: "pps ppsx" },
        { name: "PowerPoint Presentation", extensions: "ppt pptx" },
        { name: "StarOffice Presentation", extensions: "sdd" },
        { name: "StarOffice Presentation Template", extensions: "sti" },
        { name: "Stat Studio Program", extensions: "sx" },
        { name: "Uniform Office Presentation", extensions: "uop" },
        { name: "StarOffice Impress Presentation", extensions: "sxi" }
      ]
    },
    {
      title: "Code Formats",
      icon: <Code className="w-6 h-6 text-teal-600" />,
      description: "Programming and markup languages",
      formats: [
        { name: "ActionScript File", extensions: "as actionscript" },
        { name: "Sendmail Configuration File", extensions: "cf" },
        { name: "ColdFusion Markup File", extensions: "cfm" },
        { name: "Visual C# Source Code File", extensions: "cs" },
        { name: "C/C++ Source Code File", extensions: "c" },
        { name: "C/C++ Header File", extensions: "h" },
        { name: "C++ Source Code File", extensions: "cc" },
        { name: "Xcode C++ Source File", extensions: "cp" },
        { name: "C++ Source Code File", extensions: "cpp" },
        { name: "Markdown", extensions: "md markdown" },
        { name: "Objective-C Implementation File", extensions: "m" },
        { name: "Cascading Style Sheet", extensions: "css" },
        { name: "Pascal Source File", extensions: "pas" },
        { name: "Difference File", extensions: "diff" },
        { name: "Patch File", extensions: "patch" },
        { name: "Erlang Source Code File", extensions: "erl" },
        { name: "Script File", extensions: "groovy" },
        { name: "JavaScript File", extensions: "js" },
        { name: "Java Source Code File", extensions: "java" },
        { name: "Perl Script", extensions: "pl" },
        { name: "Source File", extensions: "perl" },
        { name: "PHP Source Code File", extensions: "php" },
        { name: "Plain Text File", extensions: "txt text" },
        { name: "Python Script", extensions: "py" },
        { name: "Python Script", extensions: "python" },
        { name: "Ruby Source Code", extensions: "rb ruby" },
        { name: "Scala (programming language)", extensions: "scala" },
        { name: "Structured Query Language Data", extensions: "sql" },
        { name: "VBScript File", extensions: "vb" },
        { name: "Extensible Hypertext Markup", extensions: "xhtml" },
        { name: "XML File", extensions: "xml" },
        { name: "XSL Transformations File", extensions: "xsl" },
        { name: "YAML Document", extensions: "yaml" }
      ]
    },
    {
      title: "Spreadsheet Formats",
      icon: <BarChart3 className="w-6 h-6 text-emerald-600" />,
      description: "Spreadsheet and data formats",
      formats: [
        { name: "Microsoft Excel", extensions: "xls" },
        { name: "Excel Microsoft Office Open XML Format Spreadsheet", extensions: "xlsx" },
        { name: "Excel Binary Workbook", extensions: "xlsb" },
        { name: "Excel Macro-Enabled Workbook", extensions: "xlsm" },
        { name: "Open Document Spreadsheet", extensions: "ods" },
        { name: "Comma-Separated Value", extensions: "csv" }
      ]
    }
  ];

  return (
    <section id="supported-formats" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Supported File Types for Online Viewing
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            This page provides a comprehensive list of file formats that can be viewed directly in our advanced file viewer. 
            With MorphyIMG, you can easily share files of any format. We continually expand our support to include additional 
            file types for online viewing.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Need Support for Another Format?
            </h3>
            <p className="text-blue-700">
              We're constantly working to expand our file format support. If you have a specific format you'd like us to add, 
              please reach out to us!
            </p>
          </div>
        </div>

        <div className="space-y-12">
          {formatCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                {category.icon}
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {category.title}
                  </h3>
                  <p className="text-gray-600">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Format
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Extensions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {category.formats.map((format, formatIndex) => (
                      <tr key={formatIndex} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {format.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                          {format.extensions}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Try Format-Specific Viewers
            </h3>
            <p className="text-gray-600 mb-6">
              Choose a specific format viewer for optimized viewing experience.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a
                href="#viewer/jpg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                JPG Viewer
              </a>
              <a
                href="#viewer/xlsx"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Excel Viewer
              </a>
              <a
                href="#viewer/pdf"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                PDF Viewer
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to Try Our File Viewer?
            </h3>
            <p className="text-gray-600 mb-6">
              Upload any of the supported file formats above and experience our advanced file viewer in action.
            </p>
            <button
              onClick={() => document.getElementById('viewer')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Try File Viewer Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};