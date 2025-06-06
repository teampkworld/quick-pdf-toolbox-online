import { useState } from "react";
import { Trash2 } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const RemovePages = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [pagesToRemove, setPagesToRemove] = useState<number[]>([]);
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setPagesToRemove([]);
  };

  const handlePageDelete = (pageNumber: number) => {
    setPagesToRemove(prev => 
      prev.includes(pageNumber) 
        ? prev.filter(p => p !== pageNumber)
        : [...prev, pageNumber]
    );
  };

  const removePages = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file first.",
        variant: "destructive",
      });
      return;
    }

    if (pagesToRemove.length === 0) {
      toast({
        title: "No pages selected",
        description: "Please select at least one page to remove.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(arrayBuffer);
      const targetPdf = await PDFDocument.create();
      
      const totalPages = sourcePdf.getPageCount();
      
      // Create array of pages to keep (not remove)
      const pagesToKeep = [];
      for (let i = 1; i <= totalPages; i++) {
        if (!pagesToRemove.includes(i)) {
          pagesToKeep.push(i - 1); // Convert to 0-based index
        }
      }

      if (pagesToKeep.length === 0) {
        toast({
          title: "Cannot remove all pages",
          description: "You must keep at least one page in the PDF.",
          variant: "destructive",
        });
        setProcessing(false);
        return;
      }

      // Copy the pages we want to keep
      const copiedPages = await targetPdf.copyPages(sourcePdf, pagesToKeep);
      copiedPages.forEach(page => targetPdf.addPage(page));

      const pdfBytes = await targetPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `removed-pages-${file.name}`;
      link.click();

      toast({
        title: "Success!",
        description: `Removed ${pagesToRemove.length} page(s) successfully.`,
      });

      setFile(null);
      setPagesToRemove([]);
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
    whatIs: "Remove Pages allows you to delete unwanted pages from PDF documents, creating a cleaner, more focused document.",
    uses: ["Removing blank pages", "Deleting irrelevant sections", "Creating focused excerpts", "Cleaning up scanned documents"],
    whyUse: "Efficiently remove unwanted content while preserving the original document structure and formatting.",
    howToUse: ["Upload PDF", "Select pages to remove", "Preview changes", "Download cleaned PDF"],
    example: "Remove the first 3 pages and last 2 pages from a 20-page document to focus on the main content."
  };

  return (
    <PDFToolTemplate
      title="Remove Pages"
      description="Delete unwanted pages from PDF documents."
      icon={Trash2}
      keywords="remove PDF pages, delete PDF pages, PDF page removal"
      aboutContent={aboutContent}
    >
      <div className="space-y-6">
        <PDFUploader 
          onFileSelect={handleFileSelect}
          showPreview={true}
          previewMode="delete"
          onPageDelete={handlePageDelete}
        />
        
        {pagesToRemove.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2 text-destructive">Pages to Remove</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {pagesToRemove.length} page(s) selected for removal: {pagesToRemove.sort((a, b) => a - b).join(', ')}
              </p>
              <div className="flex justify-center">
                <Button 
                  onClick={removePages}
                  disabled={!file || processing || pagesToRemove.length === 0}
                  variant="destructive"
                  size="lg"
                >
                  {processing ? "Removing..." : `Remove ${pagesToRemove.length} Page${pagesToRemove.length !== 1 ? 's' : ''}`}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PDFToolTemplate>
  );
};

export default RemovePages;
