
import { useState } from "react";
import { FileText } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const ExtractPages = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setSelectedPages([]); // Reset selection when new file is uploaded
  };

  const handlePageSelect = (pageNumber: number) => {
    setSelectedPages(prev => 
      prev.includes(pageNumber) 
        ? prev.filter(p => p !== pageNumber)
        : [...prev, pageNumber]
    );
  };

  const extractPages = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file first.",
        variant: "destructive",
      });
      return;
    }

    if (selectedPages.length === 0) {
      toast({
        title: "No pages selected",
        description: "Please select at least one page to extract.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(arrayBuffer);
      const targetPdf = await PDFDocument.create();

      // Sort selected pages to maintain order
      const sortedPages = [...selectedPages].sort((a, b) => a - b);
      
      for (const pageNumber of sortedPages) {
        const [copiedPage] = await targetPdf.copyPages(sourcePdf, [pageNumber - 1]);
        targetPdf.addPage(copiedPage);
      }

      const pdfBytes = await targetPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `extracted-pages-${file.name}`;
      link.click();

      toast({
        title: "Success!",
        description: `Extracted ${selectedPages.length} page(s) successfully.`,
      });

      setFile(null);
      setSelectedPages([]);
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
    whatIs: "Extract Pages allows you to select and extract specific pages from a PDF document to create a new PDF file.",
    uses: ["Creating excerpts from reports", "Extracting specific chapters", "Isolating important pages", "Sharing relevant sections"],
    whyUse: "Efficiently extract only the pages you need without modifying the original document.",
    howToUse: ["Upload PDF", "Select pages to extract", "Download new PDF", "Share extracted content"],
    example: "Extract pages 5-10 from a 50-page manual to create a focused training document."
  };

  return (
    <PDFToolTemplate
      title="Extract Pages"
      description="Extract specific pages from PDF documents."
      icon={FileText}
      keywords="extract PDF pages, select PDF pages, PDF page extraction"
      aboutContent={aboutContent}
    >
      <div className="space-y-6">
        <PDFUploader 
          onFileSelect={handleFileSelect}
          showPreview={true}
          previewMode="select"
          selectedPages={selectedPages}
          onPageSelect={handlePageSelect}
        />
        
        {selectedPages.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Selected Pages</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {selectedPages.length} page(s) selected: {selectedPages.sort((a, b) => a - b).join(', ')}
              </p>
              <div className="flex justify-center">
                <Button 
                  onClick={extractPages}
                  disabled={!file || processing || selectedPages.length === 0}
                  size="lg"
                >
                  {processing ? "Extracting..." : `Extract ${selectedPages.length} Page${selectedPages.length !== 1 ? 's' : ''}`}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PDFToolTemplate>
  );
};

export default ExtractPages;
