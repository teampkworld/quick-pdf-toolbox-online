
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FileText, Scissors, Trash2, Download, Settings, 
  Scan, Minimize2, Wrench, Eye, Image, 
  FileType, Presentation, Calculator, Code,
  RotateCw, Hash, Droplets, Crop, Edit,
  Unlock, Shield, PenTool, EyeOff, GitCompare,
  Star, Users, Zap, Lock, Globe, Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const pdfTools = [
    { name: "Merge PDF", icon: FileText, description: "Combine multiple PDF files into one document", href: "/merge-pdf" },
    { name: "Split PDF", icon: Scissors, description: "Split a large PDF into separate pages or sections", href: "/split-pdf" },
    { name: "Remove Pages", icon: Trash2, description: "Delete unwanted pages from your PDF documents", href: "/remove-pages" },
    { name: "Extract Pages", icon: Download, description: "Extract specific pages from PDF files", href: "/extract-pages" },
    { name: "Organize PDF", icon: Settings, description: "Reorder and organize PDF pages efficiently", href: "/organize-pdf" },
    { name: "Scan to PDF", icon: Scan, description: "Convert scanned images into searchable PDF documents", href: "/scan-to-pdf" },
    { name: "Compress PDF", icon: Minimize2, description: "Reduce PDF file size without losing quality", href: "/compress-pdf" },
    { name: "Repair PDF", icon: Wrench, description: "Fix corrupted or damaged PDF files", href: "/repair-pdf" },
    { name: "OCR PDF", icon: Eye, description: "Convert scanned PDFs to searchable text documents", href: "/ocr-pdf" },
    { name: "JPG to PDF", icon: Image, description: "Convert JPG images to PDF format instantly", href: "/jpg-to-pdf" },
    { name: "Word to PDF", icon: FileType, description: "Convert Microsoft Word documents to PDF", href: "/word-to-pdf" },
    { name: "PowerPoint to PDF", icon: Presentation, description: "Convert PowerPoint presentations to PDF", href: "/powerpoint-to-pdf" },
    { name: "Excel to PDF", icon: Calculator, description: "Convert Excel spreadsheets to PDF format", href: "/excel-to-pdf" },
    { name: "HTML to PDF", icon: Code, description: "Convert HTML web pages to PDF documents", href: "/html-to-pdf" },
    { name: "PDF to JPG", icon: Image, description: "Convert PDF pages to high-quality JPG images", href: "/pdf-to-jpg" },
    { name: "PDF to Word", icon: FileType, description: "Convert PDF documents to editable Word files", href: "/pdf-to-word" },
    { name: "PDF to PowerPoint", icon: Presentation, description: "Convert PDF to PowerPoint presentations", href: "/pdf-to-powerpoint" },
    { name: "PDF to Excel", icon: Calculator, description: "Convert PDF tables to Excel spreadsheets", href: "/pdf-to-excel" },
    { name: "PDF to PDF/A", icon: FileText, description: "Convert PDFs to archival PDF/A format", href: "/pdf-to-pdfa" },
    { name: "Rotate PDF", icon: RotateCw, description: "Rotate PDF pages to the correct orientation", href: "/rotate-pdf" },
    { name: "Add Page Numbers", icon: Hash, description: "Add custom page numbers to your PDFs", href: "/add-page-numbers" },
    { name: "Add Watermark", icon: Droplets, description: "Add text or image watermarks to PDFs", href: "/add-watermark" },
    { name: "Crop PDF", icon: Crop, description: "Crop and resize PDF pages to custom dimensions", href: "/crop-pdf" },
    { name: "Edit PDF", icon: Edit, description: "Edit text and images in PDF documents", href: "/edit-pdf" },
    { name: "Unlock PDF", icon: Unlock, description: "Remove password protection from PDFs", href: "/unlock-pdf" },
    { name: "Protect PDF", icon: Shield, description: "Add password protection to your PDFs", href: "/protect-pdf" },
    { name: "Sign PDF", icon: PenTool, description: "Digitally sign PDF documents with ease", href: "/sign-pdf" },
    { name: "Redact PDF", icon: EyeOff, description: "Remove sensitive information from PDFs", href: "/redact-pdf" },
    { name: "Compare PDF", icon: GitCompare, description: "Compare two PDF documents side by side", href: "/compare-pdf" },
  ];

  const userReviews = [
    { name: "Sarah Johnson", rating: 5, comment: "Amazing tools! Saved me hours of work.", avatar: "👩‍💼" },
    { name: "Mike Chen", rating: 5, comment: "Fast and reliable PDF processing.", avatar: "👨‍💻" },
    { name: "Emily Davis", rating: 5, comment: "No watermarks, completely free. Perfect!", avatar: "👩‍🎨" },
    { name: "David Wilson", rating: 4, comment: "Great interface, easy to use tools.", avatar: "👨‍🔬" },
    { name: "Lisa Brown", rating: 5, comment: "Best PDF tools I've found online.", avatar: "👩‍🏫" },
    { name: "Tom Anderson", rating: 5, comment: "Professional quality results every time.", avatar: "👨‍⚖️" },
    { name: "Rachel Green", rating: 5, comment: "Intuitive design, works perfectly.", avatar: "👩‍⚕️" },
    { name: "James Miller", rating: 4, comment: "Excellent for business documents.", avatar: "👨‍💼" },
    { name: "Anna White", rating: 5, comment: "Secure and fast processing.", avatar: "👩‍🔬" },
  ];

  const customerTestimonials = [
    { name: "Jennifer Martinez", role: "Marketing Manager", comment: "These PDF tools have revolutionized our document workflow. The merge feature alone saves us 2 hours daily.", avatar: "👩‍💼" },
    { name: "Robert Thompson", role: "Legal Consultant", comment: "The security features are top-notch. I trust this platform with all our confidential legal documents.", avatar: "👨‍⚖️" },
    { name: "Maria Rodriguez", role: "Graphic Designer", comment: "Converting between formats is seamless. The quality never disappoints, and it's perfect for client presentations.", avatar: "👩‍🎨" },
    { name: "John Kim", role: "Project Manager", comment: "Our team collaborates better now. The organize and split tools make document sharing effortless.", avatar: "👨‍💼" },
    { name: "Sophie Turner", role: "HR Director", comment: "Processing employee documents is now a breeze. The batch processing saves incredible amounts of time.", avatar: "👩‍💼" },
    { name: "Alex Johnson", role: "IT Specialist", comment: "Reliable, secure, and no software installation needed. Perfect for our remote team setup.", avatar: "👨‍💻" },
    { name: "Emma Wilson", role: "Accountant", comment: "Converting Excel reports to PDF for clients is now instant. The formatting stays perfect every time.", avatar: "👩‍💼" },
    { name: "Carlos Mendez", role: "Architect", comment: "Large CAD files to PDF conversion works flawlessly. Essential tool for sharing blueprints with clients.", avatar: "👨‍🔬" },
    { name: "Olivia Chen", role: "Teacher", comment: "Creating lesson materials is so much easier. Students love the interactive PDFs I can now create.", avatar: "👩‍🏫" },
    { name: "Daniel Park", role: "Sales Director", comment: "Proposal creation is streamlined. Merge, watermark, and protect - all in one platform.", avatar: "👨‍💼" },
    { name: "Isabella Garcia", role: "Content Creator", comment: "Publishing e-books and guides is simplified. The compression tool maintains quality while reducing size.", avatar: "👩‍🎨" },
    { name: "Michael Brown", role: "Research Analyst", comment: "OCR functionality is impressive. Converting scanned research papers to searchable text is invaluable.", avatar: "👨‍🔬" },
  ];

  const keyFeatures = [
    { icon: Zap, title: "Lightning Fast Processing", description: "Process PDFs in seconds with our optimized algorithms" },
    { icon: Lock, title: "100% Secure & Private", description: "Your files are processed locally and never stored on our servers" },
    { icon: Globe, title: "No Software Required", description: "Works directly in your browser - no downloads needed" },
    { icon: Smartphone, title: "Mobile Friendly", description: "Optimized for all devices - desktop, tablet, and mobile" },
    { icon: Users, title: "Unlimited Usage", description: "Process unlimited files without restrictions" },
    { icon: Star, title: "Professional Quality", description: "Enterprise-grade tools with consumer-friendly interface" },
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Free PDF Tools - Merge, Split, Convert & Edit PDFs Online</title>
        <meta name="description" content="Professional PDF tools for free. Merge, split, compress, convert, edit and organize PDFs online. No watermarks, no registration required." />
        <meta name="keywords" content="PDF tools, merge PDF, split PDF, compress PDF, PDF converter, free PDF tools, online PDF editor" />
        <link rel="canonical" href="https://yoursite.com/" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" className="mb-4">
              ⚡ 2M+ Users Trust Our Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Edit, Convert, and Optimize PDFs in Seconds – 100% Free!
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              No watermarks, no registration. Merge, split, compress, and sign PDFs with just a few clicks. 
              Professional-grade tools that work instantly in your browser.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <Link to="#tools">Explore All Tools →</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Learn More
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <span>4.9/5 from 10K+ reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                <span>100% Secure Processing</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* User Reviews Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground">Join millions of satisfied users worldwide</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userReviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="text-2xl mr-3">{review.avatar}</div>
                      <div>
                        <div className="font-semibold">{review.name}</div>
                        <div className="flex text-yellow-500">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic">"{review.comment}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our PDF Tools?</h2>
            <p className="text-muted-foreground">Professional features designed for everyone</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Customer Success Stories</h2>
            <p className="text-muted-foreground">Professionals worldwide trust our platform</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {customerTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="text-2xl mr-3">{testimonial.avatar}</div>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic">"{testimonial.comment}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PDF Tools Grid */}
      <section id="tools" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Complete PDF Toolkit</h2>
            <p className="text-muted-foreground">Everything you need to work with PDFs professionally</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pdfTools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <Link to={tool.href}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                    <CardContent className="p-6 text-center">
                      <tool.icon className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="font-semibold mb-2">{tool.name}</h3>
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
