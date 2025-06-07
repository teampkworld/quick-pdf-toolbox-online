
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FileText,
  Scissors,
  RotateCcw,
  Layers,
  Trash2,
  FolderOpen,
  Zap,
  ScanLine,
  Wrench,
  Eye,
  ImageIcon,
  FileDown,
  MonitorSpeaker,
  Table,
  Globe,
  Download,
  Edit,
  Unlock,
  Lock,
  PenTool,
  EyeOff,
  Hash,
  Crop,
  Plus
} from "lucide-react";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const pdfTools = [
    {
      title: "Merge PDF",
      description: "Combine multiple PDF files into one",
      icon: Layers,
      path: "/merge-pdf",
      category: "organize"
    },
    {
      title: "Split PDF",
      description: "Split a PDF into multiple files",
      icon: Scissors,
      path: "/split-pdf",
      category: "organize"
    },
    {
      title: "Rotate PDF",
      description: "Rotate pages in your PDF",
      icon: RotateCcw,
      path: "/rotate-pdf",
      category: "organize"
    },
    {
      title: "Extract Pages",
      description: "Extract specific pages from PDF",
      icon: FolderOpen,
      path: "/extract-pages",
      category: "organize"
    },
    {
      title: "Remove Pages",
      description: "Delete pages from your PDF",
      icon: Trash2,
      path: "/remove-pages",
      category: "organize"
    },
    {
      title: "Organize PDF",
      description: "Reorder pages in your PDF",
      icon: FileText,
      path: "/organize-pdf",
      category: "organize"
    },
    {
      title: "Compress PDF",
      description: "Reduce PDF file size",
      icon: Zap,
      path: "/compress-pdf",
      category: "optimize"
    },
    {
      title: "Scan to PDF",
      description: "Convert scanned images to PDF",
      icon: ScanLine,
      path: "/scan-to-pdf",
      category: "convert"
    },
    {
      title: "Repair PDF",
      description: "Fix corrupted PDF files",
      icon: Wrench,
      path: "/repair-pdf",
      category: "optimize"
    },
    {
      title: "OCR PDF",
      description: "Extract text from scanned PDFs",
      icon: Eye,
      path: "/ocr-pdf",
      category: "optimize"
    },
    {
      title: "JPG to PDF",
      description: "Convert JPG images to PDF",
      icon: ImageIcon,
      path: "/jpg-to-pdf",
      category: "convert"
    },
    {
      title: "Word to PDF",
      description: "Convert Word documents to PDF",
      icon: FileDown,
      path: "/word-to-pdf",
      category: "convert"
    },
    {
      title: "PowerPoint to PDF",
      description: "Convert PowerPoint to PDF",
      icon: MonitorSpeaker,
      path: "/powerpoint-to-pdf",
      category: "convert"
    },
    {
      title: "Excel to PDF",
      description: "Convert Excel files to PDF",
      icon: Table,
      path: "/excel-to-pdf",
      category: "convert"
    },
    {
      title: "HTML to PDF",
      description: "Convert HTML content to PDF",
      icon: Globe,
      path: "/html-to-pdf",
      category: "convert"
    },
    {
      title: "PDF to JPG",
      description: "Convert PDF pages to JPG images",
      icon: Download,
      path: "/pdf-to-jpg",
      category: "convert"
    },
    {
      title: "PDF to Word",
      description: "Convert PDF to Word document",
      icon: FileDown,
      path: "/pdf-to-word",
      category: "convert"
    },
    {
      title: "PDF to PowerPoint",
      description: "Convert PDF to PowerPoint",
      icon: MonitorSpeaker,
      path: "/pdf-to-powerpoint",
      category: "convert"
    },
    {
      title: "PDF to Excel",
      description: "Convert PDF to Excel spreadsheet",
      icon: Table,
      path: "/pdf-to-excel",
      category: "convert"
    },
    {
      title: "PDF to PDF/A",
      description: "Convert PDF to PDF/A format",
      icon: FileText,
      path: "/pdf-to-pdfa",
      category: "convert"
    },
    {
      title: "Add Page Numbers",
      description: "Add page numbers to your PDF",
      icon: Hash,
      path: "/add-page-numbers",
      category: "edit"
    },
    {
      title: "Crop PDF",
      description: "Crop pages in your PDF",
      icon: Crop,
      path: "/crop-pdf",
      category: "edit"
    },
    {
      title: "Edit PDF",
      description: "Edit text and images in PDF",
      icon: Edit,
      path: "/edit-pdf",
      category: "edit"
    },
    {
      title: "Unlock PDF",
      description: "Remove password from PDF",
      icon: Unlock,
      path: "/unlock-pdf",
      category: "security"
    },
    {
      title: "Protect PDF",
      description: "Add password protection to PDF",
      icon: Lock,
      path: "/protect-pdf",
      category: "security"
    },
    {
      title: "Sign PDF",
      description: "Add digital signature to PDF",
      icon: PenTool,
      path: "/sign-pdf",
      category: "security"
    },
    {
      title: "Redact PDF",
      description: "Remove sensitive information from PDF",
      icon: EyeOff,
      path: "/redact-pdf",
      category: "security"
    }
  ];

  const categories = [
    { key: "all", label: "All Tools", count: pdfTools.length },
    { key: "organize", label: "Organize", count: pdfTools.filter(tool => tool.category === "organize").length },
    { key: "convert", label: "Convert", count: pdfTools.filter(tool => tool.category === "convert").length },
    { key: "edit", label: "Edit", count: pdfTools.filter(tool => tool.category === "edit").length },
    { key: "optimize", label: "Optimize", count: pdfTools.filter(tool => tool.category === "optimize").length },
    { key: "security", label: "Security", count: pdfTools.filter(tool => tool.category === "security").length }
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTools = pdfTools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Professional PDF Tools
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Complete suite of PDF tools for all your document needs. Fast, secure, and completely free. 
            All processing happens in your browser - no uploads to servers required.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <Input
              type="search"
              placeholder="Search PDF tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-center"
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category.key}
              variant={selectedCategory === category.key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.key)}
              className="mb-2"
            >
              {category.label} ({category.count})
            </Button>
          ))}
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredTools.map((tool, index) => (
            <motion.div
              key={tool.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <tool.icon className="h-12 w-12 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="text-lg">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm mb-4 text-center">
                    {tool.description}
                  </p>
                  <Button asChild className="w-full">
                    <Link to={tool.path}>
                      Use Tool
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No tools found matching your search criteria.
            </p>
          </div>
        )}

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our PDF Tools?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional-grade PDF processing with privacy and security at the forefront
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">100% Secure</h3>
              <p className="text-muted-foreground">
                All processing happens locally in your browser. Your files never leave your device.
              </p>
            </Card>

            <Card className="text-center p-6">
              <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                No uploads or downloads required. Process your PDFs instantly without waiting.
              </p>
            </Card>

            <Card className="text-center p-6">
              <Plus className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Always Free</h3>
              <p className="text-muted-foreground">
                Access all tools completely free with no limits, watermarks, or hidden costs.
              </p>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
