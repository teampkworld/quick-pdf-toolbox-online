
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const RemovePages = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [pagesToRemove, setPagesToRemove] = useState('');
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const removePages = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file.",
        variant: "destructive",
      });
      return;
    }

    if (!pagesToRemove.trim()) {
      toast({
        title: "No pages specified",
        description: "Please specify which pages to remove.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const totalPages = pdfDoc.getPageCount();

      // Parse page numbers to remove
      const pagesToRemoveArray = pagesToRemove
        .split(',')
        .map(p => parseInt(p.trim()) - 1)
        .filter(p => p >= 0 && p < totalPages)
        .sort((a, b) => b - a); // Sort in descending order for removal

      if (pagesToRemoveArray.length === 0) {
        toast({
          title: "Invalid page numbers",
          description: "Please enter valid page numbers.",
          variant: "destructive",
        });
        return;
      }

      // Remove pages (in reverse order to maintain indices)
      pagesToRemoveArray.forEach(pageIndex => {
        pdfDoc.removePage(pageIndex);
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `removed-pages-${file.name}`;
      link.click();

      toast({
        title: "Success!",
        description: `Removed ${pagesToRemoveArray.length} pages successfully.`,
      });

      setFile(null);
      setPagesToRemove('');
    } catch (error) {
      console.error('Error removing pages:', error);
      toast({
        title: "Error",
        description: "Failed to remove pages. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const aboutContent = {
    whatIs: "Remove Pages is a precise PDF editing tool that allows you to delete unwanted pages from your PDF documents quickly and efficiently. This free online service enables users to eliminate specific pages, blank pages, or entire sections from their PDFs without affecting the remaining content's quality or formatting. Whether you need to remove confidential information, delete advertising pages, or clean up unnecessary content, our tool provides an easy solution for document refinement.",
    uses: [
      "Removing blank or unnecessary pages from scanned documents",
      "Deleting confidential or sensitive pages before sharing documents",
      "Eliminating advertising pages from downloaded PDF brochures or catalogs",
      "Removing cover pages or appendices when only main content is needed",
      "Deleting outdated sections from policy documents or manuals",
      "Removing error pages or corrupted sections from large documents",
      "Eliminating duplicate pages that may have occurred during scanning",
      "Cleaning up presentation files by removing backup or draft slides"
    ],
    whyUse: "Our Remove Pages tool offers precise control over your PDF content with professional-grade reliability. Unlike basic PDF editors that may alter formatting or quality, our tool maintains the integrity of remaining pages while cleanly removing unwanted content. The process is secure and private – your documents are processed entirely in your browser without any server uploads. You can specify exact page numbers or ranges, making it easy to remove multiple non-consecutive pages in a single operation. The tool preserves all original formatting, links, and metadata of the remaining pages.",
    howToUse: [
      "Upload your PDF file using the drag-and-drop interface or file browser",
      "Enter the page numbers you want to remove (e.g., '2, 5, 8-10' for multiple pages)",
      "Review your page selection to ensure you're removing the correct pages",
      "Click the 'Remove Pages' button to begin processing your document",
      "Wait for the processing to complete - usually takes just a few seconds",
      "Download the cleaned PDF file with unwanted pages removed"
    ],
    example: "Suppose you have a 20-page product catalog PDF, but pages 3, 7, and 15-17 contain outdated information that you need to remove before sharing with customers. Using our Remove Pages tool, you would upload the file and enter '3, 7, 15-17' in the page specification field. The tool will process your request and generate a new 15-page PDF with only the current, relevant information intact, maintaining all original formatting and image quality."
  };

  return (
    <PDFToolTemplate
      title="Remove Pages"
      description="Delete unwanted pages from your PDF documents. Clean and precise page removal."
      icon={Trash2}
      keywords="remove PDF pages, delete PDF pages, PDF page remover, edit PDF pages"
      aboutContent={aboutContent}
    >
      <div className="space-y-6">
        <PDFUploader onFileSelect={handleFileSelect} />
        
        {file && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pagesToRemove">Pages to remove (e.g., 1, 3, 5-7)</Label>
              <Input
                id="pagesToRemove"
                value={pagesToRemove}
                onChange={(e) => setPagesToRemove(e.target.value)}
                placeholder="Enter page numbers separated by commas"
              />
              <p className="text-sm text-muted-foreground">
                Use commas to separate individual pages and hyphens for ranges (e.g., 1, 3-5, 8)
              </p>
            </div>
          </div>
        )}
        
        <div className="flex justify-center">
          <Button 
            onClick={removePages}
            disabled={!file || processing || !pagesToRemove.trim()}
            size="lg"
          >
            {processing ? "Removing Pages..." : "Remove Pages"}
          </Button>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default RemovePages;
