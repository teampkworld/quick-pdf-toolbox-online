
import { useState } from "react";
import { Scissors } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const SplitPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [splitMethod, setSplitMethod] = useState<'pages' | 'range'>('pages');
  const [pagesPerFile, setPagesPerFile] = useState(1);
  const [pageRange, setPageRange] = useState('1-3, 5-7');
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const splitFile = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to split.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const totalPages = pdfDoc.getPageCount();

      if (splitMethod === 'pages') {
        // Split by pages per file
        for (let i = 0; i < totalPages; i += pagesPerFile) {
          const newPdf = await PDFDocument.create();
          const endPage = Math.min(i + pagesPerFile, totalPages);
          const pages = await newPdf.copyPages(pdfDoc, Array.from({length: endPage - i}, (_, idx) => i + idx));
          
          pages.forEach(page => newPdf.addPage(page));
          
          const pdfBytes = await newPdf.save();
          const blob = new Blob([pdfBytes], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          
          const link = document.createElement('a');
          link.href = url;
          link.download = `split-${i + 1}-${endPage}.pdf`;
          link.click();
        }
      } else {
        // Split by page ranges
        const ranges = pageRange.split(',').map(r => r.trim());
        
        for (let i = 0; i < ranges.length; i++) {
          const range = ranges[i];
          const [start, end] = range.split('-').map(n => parseInt(n.trim()) - 1);
          
          if (start >= 0 && start < totalPages && (!end || end < totalPages)) {
            const newPdf = await PDFDocument.create();
            const endIdx = end !== undefined ? end : start;
            const pageIndices = Array.from({length: endIdx - start + 1}, (_, idx) => start + idx);
            const pages = await newPdf.copyPages(pdfDoc, pageIndices);
            
            pages.forEach(page => newPdf.addPage(page));
            
            const pdfBytes = await newPdf.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `split-range-${start + 1}-${endIdx + 1}.pdf`;
            link.click();
          }
        }
      }

      toast({
        title: "Success!",
        description: "PDF split successfully and files downloaded.",
      });

      setFile(null);
    } catch (error) {
      console.error('Error splitting PDF:', error);
      toast({
        title: "Error",
        description: "Failed to split PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const aboutContent = {
    whatIs: "Split PDF is a versatile online tool that allows you to divide large PDF documents into smaller, more manageable files. This free service enables users to extract specific pages or sections from a PDF document, creating separate files based on your exact requirements. Whether you need to separate chapters, extract specific pages, or divide a document into equal parts, our split tool provides flexible options while maintaining the original quality and formatting of your content.",
    uses: [
      "Extracting specific chapters from lengthy reports or books for individual distribution",
      "Separating different sections of contracts or legal documents for review",
      "Dividing large presentation files into smaller, topic-specific segments",
      "Extracting relevant pages from research papers or academic documents",
      "Breaking down training manuals into individual lesson modules",
      "Separating invoice batches into individual billing documents",
      "Dividing portfolio files into separate project presentations",
      "Extracting specific forms or pages from comprehensive document packages"
    ],
    whyUse: "Our Split PDF tool offers unmatched flexibility and ease of use for document separation tasks. Unlike limited desktop software, our browser-based solution works instantly without requiring any installations or system resources. The tool provides multiple splitting methods – you can split by page count, specific page ranges, or custom intervals to meet your exact needs. We prioritize your security by processing files entirely in your browser, ensuring your documents never leave your device. The split files maintain perfect quality and formatting, and there are no watermarks, file limits, or hidden costs involved.",
    howToUse: [
      "Upload your PDF file by clicking the upload area or dragging the file into the interface",
      "Choose your preferred splitting method: split by number of pages per file or by specific page ranges",
      "If splitting by pages, specify how many pages each new file should contain",
      "If splitting by ranges, enter the page numbers using format like '1-5, 8-12, 15-20'",
      "Click the 'Split PDF' button to begin processing your document",
      "Download each split file individually as they are generated automatically"
    ],
    example: "Suppose you have a 100-page training manual that covers 5 different topics, with each topic spanning roughly 20 pages. Using our Split PDF tool, you can set it to split every 20 pages, resulting in 5 separate PDF files – one for each training topic. Alternatively, if you know the exact page ranges (pages 1-18 for Topic 1, pages 19-35 for Topic 2, etc.), you can use the range method to create perfectly organized topic-specific files that trainers can distribute individually."
  };

  return (
    <PDFToolTemplate
      title="Split PDF"
      description="Split large PDF files into smaller documents by pages or ranges. Fast and free."
      icon={Scissors}
      keywords="split PDF, divide PDF, extract PDF pages, PDF splitter online, separate PDF files"
      aboutContent={aboutContent}
    >
      <div className="space-y-6">
        <PDFUploader onFileSelect={handleFileSelect} />
        
        {file && (
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold">Split Options</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={splitMethod === 'pages' ? "default" : "outline"}
                  onClick={() => setSplitMethod('pages')}
                  className="p-4 h-auto flex flex-col"
                >
                  <span className="font-semibold">Split by Pages</span>
                  <span className="text-sm">Equal page count</span>
                </Button>
                <Button
                  variant={splitMethod === 'range' ? "default" : "outline"}
                  onClick={() => setSplitMethod('range')}
                  className="p-4 h-auto flex flex-col"
                >
                  <span className="font-semibold">Split by Range</span>
                  <span className="text-sm">Custom page ranges</span>
                </Button>
              </div>

              {splitMethod === 'pages' && (
                <div className="space-y-2">
                  <Label htmlFor="pagesPerFile">Pages per file</Label>
                  <Input
                    id="pagesPerFile"
                    type="number"
                    min="1"
                    value={pagesPerFile}
                    onChange={(e) => setPagesPerFile(parseInt(e.target.value) || 1)}
                  />
                </div>
              )}

              {splitMethod === 'range' && (
                <div className="space-y-2">
                  <Label htmlFor="pageRange">Page ranges (e.g., 1-3, 5-7, 10)</Label>
                  <Input
                    id="pageRange"
                    value={pageRange}
                    onChange={(e) => setPageRange(e.target.value)}
                    placeholder="1-3, 5-7, 10-15"
                  />
                  <p className="text-sm text-muted-foreground">
                    Separate ranges with commas. Use format: 1-5 or single page: 7
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
        
        <div className="flex justify-center">
          <Button 
            onClick={splitFile}
            disabled={!file || processing}
            size="lg"
          >
            {processing ? "Splitting..." : "Split PDF"}
          </Button>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default SplitPDF;
