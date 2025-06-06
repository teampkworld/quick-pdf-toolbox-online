
import { useState } from "react";
import { Download } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const ExtractPages = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [pagesToExtract, setPagesToExtract] = useState('');
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const extractPages = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file.",
        variant: "destructive",
      });
      return;
    }

    if (!pagesToExtract.trim()) {
      toast({
        title: "No pages specified",
        description: "Please specify which pages to extract.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const totalPages = pdfDoc.getPageCount();

      // Parse page numbers to extract
      const ranges = pagesToExtract.split(',').map(r => r.trim());
      
      for (let i = 0; i < ranges.length; i++) {
        const range = ranges[i];
        let startPage, endPage;
        
        if (range.includes('-')) {
          [startPage, endPage] = range.split('-').map(n => parseInt(n.trim()) - 1);
        } else {
          startPage = endPage = parseInt(range.trim()) - 1;
        }
        
        if (startPage >= 0 && startPage < totalPages && endPage >= 0 && endPage < totalPages) {
          const newPdf = await PDFDocument.create();
          const pageIndices = Array.from({length: endPage - startPage + 1}, (_, idx) => startPage + idx);
          const pages = await newPdf.copyPages(pdfDoc, pageIndices);
          
          pages.forEach(page => newPdf.addPage(page));
          
          const pdfBytes = await newPdf.save();
          const blob = new Blob([pdfBytes], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          
          const link = document.createElement('a');
          link.href = url;
          link.download = `extracted-pages-${startPage + 1}-${endPage + 1}.pdf`;
          link.click();
        }
      }

      toast({
        title: "Success!",
        description: "Pages extracted successfully and downloaded.",
      });

      setFile(null);
      setPagesToExtract('');
    } catch (error) {
      console.error('Error extracting pages:', error);
      toast({
        title: "Error",
        description: "Failed to extract pages. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const aboutContent = {
    whatIs: "Extract Pages is a specialized PDF tool that allows you to extract specific pages from larger PDF documents, creating separate files containing only the pages you need. This free online service enables users to pull out individual pages, page ranges, or specific sections from comprehensive documents while maintaining original quality and formatting.",
    uses: [
      "Extracting specific chapters from textbooks or manuals",
      "Pulling out relevant pages from large reports for targeted sharing",
      "Creating separate files for different sections of legal documents",
      "Extracting forms or applications from comprehensive document packages"
    ],
    whyUse: "Our Extract Pages tool provides precise page selection with professional results, processing everything securely in your browser without uploading files to external servers.",
    howToUse: [
      "Upload your PDF file to the secure processing interface",
      "Specify the pages you want to extract using page numbers or ranges",
      "Click 'Extract Pages' to process your selection",
      "Download the new PDF containing only your selected pages"
    ],
    example: "From a 100-page employee handbook, you can extract pages 25-35 containing the benefits section to share specifically with new hires, creating a focused 11-page document."
  };

  return (
    <PDFToolTemplate
      title="Extract Pages"
      description="Extract specific pages from PDF files into separate documents."
      icon={Download}
      keywords="extract PDF pages, PDF page extractor, separate PDF pages"
      aboutContent={aboutContent}
    >
      <div className="space-y-6">
        <PDFUploader onFileSelect={handleFileSelect} />
        
        {file && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pagesToExtract">Pages to extract (e.g., 1, 3, 5-7)</Label>
                <Input
                  id="pagesToExtract"
                  value={pagesToExtract}
                  onChange={(e) => setPagesToExtract(e.target.value)}
                  placeholder="Enter page numbers separated by commas"
                />
                <p className="text-sm text-muted-foreground">
                  Use commas to separate individual pages and hyphens for ranges (e.g., 1, 3-5, 8)
                </p>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="flex justify-center">
          <Button 
            onClick={extractPages}
            disabled={!file || processing || !pagesToExtract.trim()}
            size="lg"
          >
            {processing ? "Extracting Pages..." : "Extract Pages"}
          </Button>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default ExtractPages;
