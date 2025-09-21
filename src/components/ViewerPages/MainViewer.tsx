import React from 'react';
import { Eye, ArrowLeft } from 'lucide-react';
import { Header } from '../Header';

interface FormatData {
  name: string;
  extensions: string;
  path: string;
}

export const MainViewer: React.FC = () => {
  const formatCategories = [
    {
      title: "STANDARD IMAGE FORMATS",
      formats: [
        { name: "JPEG (Joint Photographic Experts Group)", extensions: "jpg jpeg jpe", path: "#viewer/jpg" },
        { name: "JPEG 2000 Core Image File", extensions: "jp2", path: "#viewer/jp2" },
        { name: "JPEG 2000 Image", extensions: "jpf", path: "#viewer/jpf" },
        { name: "PNG (Portable Network Graphics)", extensions: "png pn8 png24 png32", path: "#viewer/png" },
        { name: "Web Picture Format", extensions: "webp", path: "#viewer/webp" },
        { name: "AV1 Image File Format", extensions: "avif", path: "#viewer/avif" },
        { name: "GIF (Graphics Interchange Format)", extensions: "gif", path: "#viewer/gif" },
        { name: "TIFF (Tagged Image File Format)", extensions: "tif tiff tiff64", path: "#viewer/tiff" },
        { name: "Pyramid encoded TIFF", extensions: "ptif", path: "#viewer/ptif" },
        { name: "Bitmap Image", extensions: "bmp bmp2 bmp3 bitmap", path: "#viewer/bmp" }
      ]
    },
    {
      title: "ICON FORMATS",
      formats: [
        { name: "Icon", extensions: "ico icon", path: "#viewer/ico" },
        { name: "CUR", extensions: "cur", path: "#viewer/cur" }
      ]
    },
    {
      title: "VECTOR GRAPHICS",
      formats: [
        { name: "Scalable Vector Graphics", extensions: "svg svgz msvgz", path: "#viewer/svg" },
        { name: "Encapsulated PostScript", extensions: "eps eps2 eps3 epsf", path: "#viewer/eps" },
        { name: "Adobe Illustrator Artwork", extensions: "ai", path: "#viewer/ai" },
        { name: "PostScript File", extensions: "ps ps2 ps3", path: "#viewer/ps" }
      ]
    },
    {
      title: "RAW CAMERA FORMATS",
      formats: [
        { name: "Nikon Raw Image Format", extensions: "nef", path: "#viewer/nef" },
        { name: "Canon Raw Image format", extensions: "cr2 crw", path: "#viewer/cr2" },
        { name: "Kodak Raw Image format", extensions: "dcr kdc k25", path: "#viewer/dcr" },
        { name: "Sigma Camera Raw Image format", extensions: "x3f", path: "#viewer/x3f" },
        { name: "Sony Raw Image format", extensions: "arw sr2 srf", path: "#viewer/arw" },
        { name: "Epson Raw Image format", extensions: "erf", path: "#viewer/erf" },
        { name: "Fuji Raw Image format", extensions: "raf", path: "#viewer/raf" },
        { name: "Hasselblad Digital Camera Raw Image Format", extensions: "3fr", path: "#viewer/3fr" },
        { name: "Olympus Raw File Format", extensions: "orf", path: "#viewer/orf" },
        { name: "Pentax Digital Camera Raw Image Format", extensions: "pef", path: "#viewer/pef" },
        { name: "Digital Negative", extensions: "dng", path: "#viewer/dng" }
      ]
    },
    {
      title: "MOBILE & CAMERA FORMATS",
      formats: [
        { name: "High Efficiency Image Container", extensions: "heic heif", path: "#viewer/heic" }
      ]
    },
    {
      title: "PROFESSIONAL/EDITING FORMATS",
      formats: [
        { name: "GIMP (eXperimental Computing Facility)", extensions: "xcf", path: "#viewer/xcf" },
        { name: "Photoshop Data File", extensions: "psd", path: "#viewer/psd" },
        { name: "Photoshop Large Document Format", extensions: "psb", path: "#viewer/psb" }
      ]
    },
    {
      title: "SPECIALIZED IMAGE FORMATS",
      formats: [
        { name: "PCT", extensions: "pct pict", path: "#viewer/pct" },
        { name: "DirectDraw Surface", extensions: "dds", path: "#viewer/dds" },
        { name: "Ikon PodFlow", extensions: "pex", path: "#viewer/pex" },
        { name: "Dune Device Image Format", extensions: "aai", path: "#viewer/aai" },
        { name: "openEXR Image", extensions: "exr", path: "#viewer/exr" },
        { name: "High Dynamic Range", extensions: "hdr", path: "#viewer/hdr" },
        { name: "DICOM Image (Digital Imaging and Communications in Medicine)", extensions: "dcm dicom", path: "#viewer/dcm" },
        { name: "Truevision TGA Raster graphics File", extensions: "tga", path: "#viewer/tga" },
        { name: "Flexible Image Transport System", extensions: "fit fits fts", path: "#viewer/fit" },
        { name: "Multiple-image Network Graphics", extensions: "mng", path: "#viewer/mng" },
        { name: "Silicon Graphics Image", extensions: "sgi", path: "#viewer/sgi" },
        { name: "Interchange File Format", extensions: "iff", path: "#viewer/iff" },
        { name: "Scitex Continuous Tone File format", extensions: "sct", path: "#viewer/sct" }
      ]
    },
    {
      title: "PORTABLE FORMATS",
      formats: [
        { name: "Portable Pixmap Format", extensions: "ppm", path: "#viewer/ppm" },
        { name: "Portable Graymap Format", extensions: "pgm", path: "#viewer/pgm" },
        { name: "Portable Bitmap Format", extensions: "pbm", path: "#viewer/pbm" },
        { name: "Portable Anymap Format", extensions: "pnm", path: "#viewer/pnm" },
        { name: "Portable Arbitrary Map", extensions: "pam", path: "#viewer/pam" }
      ]
    },
    {
      title: "X WINDOW SYSTEM FORMATS",
      formats: [
        { name: "X Pixmap", extensions: "xpm", path: "#viewer/xpm" },
        { name: "X BitMap", extensions: "xbm", path: "#viewer/xbm" },
        { name: "X Windows Dump Image", extensions: "xwd", path: "#viewer/xwd" }
      ]
    },
    {
      title: "LEGACY FORMATS",
      formats: [
        { name: "Personal Computer Exchange", extensions: "pcx", path: "#viewer/pcx" },
        { name: "PC Paintbrush File Format", extensions: "pcc", path: "#viewer/pcc" }
      ]
    },
    {
      title: "FONT FORMATS",
      formats: [
        { name: "TrueType Font", extensions: "ttf", path: "#viewer/ttf" },
        { name: "OpenType Font", extensions: "otf", path: "#viewer/otf" },
        { name: "Web Open Font Format File", extensions: "woff", path: "#viewer/woff" },
        { name: "TrueType Font Collection", extensions: "ttc", path: "#viewer/ttc" },
        { name: "Mac OS X Data Fork Font", extensions: "dfont", path: "#viewer/dfont" },
        { name: "Spline Font Database File", extensions: "sfd", path: "#viewer/sfd" }
      ]
    },
    {
      title: "DOCUMENT FORMATS",
      formats: [
        { name: "Apple Pages Document", extensions: "pages", path: "#viewer/pages" },
        { name: "Microsoft Word Open XML Document", extensions: "docx", path: "#viewer/docx" },
        { name: "Microsoft Word Document", extensions: "doc", path: "#viewer/doc" },
        { name: "Rich Text Format File", extensions: "rtf", path: "#viewer/rtf" },
        { name: "OpenDocument Text Document", extensions: "odt", path: "#viewer/odt" },
        { name: "WordPerfect Document", extensions: "wpd", path: "#viewer/wpd" },
        { name: "Microsoft Works Word Processor", extensions: "wps", path: "#viewer/wps" },
        { name: "JustSystems-Ichitaro File", extensions: "jtd jtt", path: "#viewer/jtd" },
        { name: "Portable Document Format File", extensions: "pdf", path: "#viewer/pdf" },
        { name: "Encapsulated Portable Document Format", extensions: "epdf", path: "#viewer/epdf" },
        { name: "LaTeX Source Document", extensions: "tex", path: "#viewer/tex" },
        { name: "FrameMaker Maker Markup", extensions: "mml", path: "#viewer/mml" },
        { name: "Uniform Office Document", extensions: "uof uot", path: "#viewer/uof" },
        { name: "StarOffice Writer Text Document", extensions: "sdw sxw", path: "#viewer/sdw" },
        { name: "DjVu File", extensions: "djvu", path: "#viewer/djvu" }
      ]
    },
    {
      title: "PRESENTATION FORMATS",
      formats: [
        { name: "OpenDocument Presentation", extensions: "odp", path: "#viewer/odp" },
        { name: "OpenDocument Presentation Template", extensions: "otp", path: "#viewer/otp" },
        { name: "PowerPoint Template", extensions: "pot", path: "#viewer/pot" },
        { name: "PowerPoint Slide Show", extensions: "pps ppsx", path: "#viewer/pps" },
        { name: "PowerPoint Presentation", extensions: "ppt pptx", path: "#viewer/ppt" },
        { name: "StarOffice Presentation", extensions: "sdd", path: "#viewer/sdd" },
        { name: "StarOffice Presentation Template", extensions: "sti", path: "#viewer/sti" },
        { name: "Stat Studio Program", extensions: "sx", path: "#viewer/sx" },
        { name: "Uniform Office Presentation", extensions: "uop", path: "#viewer/uop" },
        { name: "StarOffice Impress Presentation", extensions: "sxi", path: "#viewer/sxi" }
      ]
    },
    {
      title: "CODE FORMATS",
      formats: [
        { name: "ActionScript File", extensions: "as actionscript", path: "#viewer/as" },
        { name: "Sendmail Configuration File", extensions: "cf", path: "#viewer/cf" },
        { name: "ColdFusion Markup File", extensions: "cfm", path: "#viewer/cfm" },
        { name: "Visual C# Source Code File", extensions: "cs", path: "#viewer/cs" },
        { name: "C/C++ Source Code File", extensions: "c", path: "#viewer/c" },
        { name: "C/C++ Header File", extensions: "h", path: "#viewer/h" },
        { name: "C++ Source Code File", extensions: "cc", path: "#viewer/cc" },
        { name: "Xcode C++ Source File", extensions: "cp", path: "#viewer/cp" },
        { name: "C++ Source Code File", extensions: "cpp", path: "#viewer/cpp" },
        { name: "Markdown", extensions: "md markdown", path: "#viewer/md" },
        { name: "Objective-C Implementation File", extensions: "m", path: "#viewer/m" },
        { name: "Cascading Style Sheet", extensions: "css", path: "#viewer/css" },
        { name: "Pascal Source File", extensions: "pas", path: "#viewer/pas" },
        { name: "Difference File", extensions: "diff", path: "#viewer/diff" },
        { name: "Patch File", extensions: "patch", path: "#viewer/patch" },
        { name: "Erlang Source Code File", extensions: "erl", path: "#viewer/erl" },
        { name: "Script File", extensions: "groovy", path: "#viewer/groovy" },
        { name: "JavaScript File", extensions: "js", path: "#viewer/js" },
        { name: "Java Source Code File", extensions: "java", path: "#viewer/java" },
        { name: "Perl Script", extensions: "pl", path: "#viewer/pl" },
        { name: "Source File", extensions: "perl", path: "#viewer/perl" },
        { name: "PHP Source Code File", extensions: "php", path: "#viewer/php" },
        { name: "Plain Text File", extensions: "txt text", path: "#viewer/txt" },
        { name: "Python Script", extensions: "py", path: "#viewer/py" },
        { name: "Python Script", extensions: "python", path: "#viewer/python" },
        { name: "Ruby Source Code", extensions: "rb ruby", path: "#viewer/rb" },
        { name: "Scala (programming language)", extensions: "scala", path: "#viewer/scala" },
        { name: "Structured Query Language Data", extensions: "sql", path: "#viewer/sql" },
        { name: "VBScript File", extensions: "vb", path: "#viewer/vb" },
        { name: "Extensible Hypertext Markup", extensions: "xhtml", path: "#viewer/xhtml" },
        { name: "XML File", extensions: "xml", path: "#viewer/xml" },
        { name: "XSL Transformations File", extensions: "xsl", path: "#viewer/xsl" },
        { name: "YAML Document", extensions: "yaml", path: "#viewer/yaml" }
      ]
    },
    {
      title: "SPREADSHEET FORMATS",
      formats: [
        { name: "Microsoft Excel", extensions: "xls", path: "#viewer/xls" },
        { name: "Excel Microsoft Office Open XML Format Spreadsheet", extensions: "xlsx", path: "#viewer/xlsx" },
        { name: "Excel Binary Workbook", extensions: "xlsb", path: "#viewer/xlsb" },
        { name: "Excel Macro-Enabled Workbook", extensions: "xlsm", path: "#viewer/xlsm" },
        { name: "Open Document Spreadsheet", extensions: "ods", path: "#viewer/ods" },
        { name: "Comma-Separated Value", extensions: "csv", path: "#viewer/csv" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.location.href = '/'}
              className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                File Format Viewers
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Choose a specific format viewer for optimized viewing experience
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Supported File Types for Online Viewing
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            This page provides a comprehensive list of file formats that can be viewed directly in our advanced file viewer. 
            With MorphyIMG, you can easily share files of any format. We continually expand our support to include additional 
            file types for online viewing. If there is a format you would like us to support, please let us know.
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

        {/* Format Tables */}
        <div className="space-y-12">
          {formatCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-800">
                  {category.title}
                </h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
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
                        <td className="px-6 py-4">
                          <a
                            href={format.path.replace('#', '')}
                            className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            {format.name}
                          </a>
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

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-8 text-center mt-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Can't Find Your Format?
          </h3>
          <p className="text-gray-600 mb-6">
            We support over 100+ file formats. If you don't see your format listed above, try our universal viewer.
          </p>
          <a
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Back to Home
          </a>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">MorphyIMG</h2>
            </div>
            
            <p className="text-gray-300 mb-6">
              Professional file viewer supporting 100+ formats for all your viewing needs.
            </p>
            
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
              <span>© 2025 MorphyIMG. Built for file format professionals.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};