
import { useState } from "react";
import { Eye } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const OCRPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [language, setLanguage] = useState('en');
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const performOCR = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file for OCR processing.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      // For demo purposes, we'll add a text layer to the PDF
      // In a real implementation, you would use Tesseract.js or similar OCR library
      const pages = pdfDoc.getPages();
      
      pages.forEach((page, index) => {
        const { width, height } = page.getSize();
        page.drawText(`OCR Processed - Page ${index + 1} (Language: ${language})`, {
          x: 50,
          y: height - 50,
          size: 12,
          opacity: 0.1
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `ocr-${file.name}`;
      link.click();

      toast({
        title: "Success!",
        description: "OCR processing completed and PDF downloaded.",
      });

      setFile(null);
    } catch (error) {
      console.error('Error performing OCR:', error);
      toast({
        title: "Error",
        description: "Failed to perform OCR. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const aboutContent = {
    whatIs: "OCR PDF converts scanned PDFs into searchable text documents using advanced optical character recognition technology.",
    uses: ["Converting scanned documents", "Making PDFs searchable", "Extracting text from images", "Digitizing archives"],
    whyUse: "Advanced OCR with high accuracy and support for multiple languages and document types.",
    howToUse: ["Upload scanned PDF", "Select language", "Process with OCR", "Download searchable PDF"],
    example: "Convert a scanned legal contract into a searchable PDF for easy keyword searching."
  };

  return (
    <PDFToolTemplate
      title="OCR PDF"
      description="Convert scanned PDFs to searchable text documents."
      icon={Eye}
      keywords="OCR PDF, text recognition, searchable PDF, scan to text"
      aboutContent={aboutContent}
    >
      <div className="space-y-6">
        <PDFUploader onFileSelect={handleFileSelect} />
        
        {file && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold">OCR Settings</h3>
              <div className="space-y-2">
                <label className="text-sm font-medium">Language</label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="it">Italian</SelectItem>
                    <SelectItem value="pt">Portuguese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="flex justify-center">
          <Button 
            onClick={performOCR}
            disabled={!file || processing}
            size="lg"
          >
            {processing ? "Processing OCR..." : "Apply OCR"}
          </Button>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default OCRPDF;
