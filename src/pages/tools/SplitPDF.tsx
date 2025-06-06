
import { useState } from "react";
import { Scissors } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const SplitPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [splitMode, setSplitMode] = useState<'pages' | 'ranges' | 'size'>('pages');
  const [pagesPerSplit, setPagesPerSplit] = useState(1);
  const [customRanges, setCustomRanges] = useState('1-5, 6-10');
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const splitPDF = async () => {
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
      const sourcePdf = await PDFDocument.load(arrayBuffer);
      const totalPages = sourcePdf.getPageCount();

      let splitRanges: number[][] = [];

      // Determine split ranges based on mode
      if (splitMode === 'pages') {
        for (let i = 0; i < totalPages; i += pagesPerSplit) {
          const end = Math.min(i + pagesPerSplit, totalPages);
          splitRanges.push(Array.from({ length: end - i }, (_, idx) => i + idx));
        }
      } else if (splitMode === 'ranges') {
        // Parse custom ranges like "1-5, 6-10"
        const ranges = customRanges.split(',').map(range => range.trim());
        splitRanges = ranges.map(range => {
          if (range.includes('-')) {
            const [start, end] = range.split('-').map(n => parseInt(n.trim()));
            return Array.from({ length: end - start + 1 }, (_, i) => start + i - 1);
          } else {
            return [parseInt(range) - 1];
          }
        });
      }

      // Create separate PDFs for each range
      const splitFiles: Blob[] = [];
      
      for (let i = 0; i < splitRanges.length; i++) {
        const newPdf = await PDFDocument.create();
        const pageIndices = splitRanges[i];
        
        const copiedPages = await newPdf.copyPages(sourcePdf, pageIndices);
        copiedPages.forEach(page => newPdf.addPage(page));
        
        const pdfBytes = await newPdf.save();
        splitFiles.push(new Blob([pdfBytes], { type: 'application/pdf' }));
      }

      // Download all split files
      splitFiles.forEach((blob, index) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${file.name.replace('.pdf', '')}-part-${index + 1}.pdf`;
        link.click();
      });

      toast({
        title: "Success!",
        description: `PDF split into ${splitFiles.length} separate files.`,
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
    whatIs: "Split PDF divides large PDF documents into smaller, more manageable files based on your specified criteria.",
    uses: ["Breaking large documents into chapters", "Creating individual files from combined documents", "Splitting by page ranges", "Reducing file sizes"],
    whyUse: "Easily manage large PDFs by splitting them into focused, smaller documents for better organization.",
    howToUse: ["Upload PDF", "Choose split method", "Set split parameters", "Download individual files"],
    example: "Split a 50-page manual into 5 separate 10-page chapters for easier distribution and reading."
  };

  return (
    <PDFToolTemplate
      title="Split PDF"
      description="Divide PDF documents into smaller files by pages or ranges."
      icon={Scissors}
      keywords="split PDF, divide PDF, separate PDF pages, PDF splitter"
      aboutContent={aboutContent}
    >
      <div className="space-y-6">
        <PDFUploader onFileSelect={handleFileSelect} showPreview={true} />
        
        {file && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold">Split Options</h3>
              
              <div className="space-y-2">
                <Label>Split Mode</Label>
                <Select value={splitMode} onValueChange={(value: 'pages' | 'ranges' | 'size') => setSplitMode(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pages">Split by number of pages</SelectItem>
                    <SelectItem value="ranges">Split by custom ranges</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {splitMode === 'pages' && (
                <div className="space-y-2">
                  <Label>Pages per split</Label>
                  <Input
                    type="number"
                    min="1"
                    value={pagesPerSplit}
                    onChange={(e) => setPagesPerSplit(parseInt(e.target.value) || 1)}
                  />
                </div>
              )}

              {splitMode === 'ranges' && (
                <div className="space-y-2">
                  <Label>Page ranges (e.g., 1-5, 6-10, 11-15)</Label>
                  <Input
                    value={customRanges}
                    onChange={(e) => setCustomRanges(e.target.value)}
                    placeholder="1-5, 6-10, 11-15"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        )}
        
        <div className="flex justify-center">
          <Button 
            onClick={splitPDF}
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
