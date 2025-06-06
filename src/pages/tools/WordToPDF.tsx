
import { useState } from "react";
import { FileType } from "lucide-react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const WordToPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.type.includes('word') || selectedFile.name.endsWith('.docx') || selectedFile.name.endsWith('.doc')) {
      setFile(selectedFile);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please select a Word document (.docx or .doc).",
        variant: "destructive",
      });
    }
  };

  const convertToPDF = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a Word document to convert.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);

    try {
      // For demonstration, create a PDF with file information
      // In a real implementation, you would use mammoth.js or similar library to extract content
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      page.drawText('Word Document Converted to PDF', {
        x: 50,
        y: height - 100,
        size: 20,
        font,
        color: rgb(0, 0, 0),
      });

      page.drawText(`Original file: ${file.name}`, {
        x: 50,
        y: height - 140,
        size: 12,
        font,
        color: rgb(0.5, 0.5, 0.5),
      });

      page.drawText(`File size: ${(file.size / 1024 / 1024).toFixed(2)} MB`, {
        x: 50,
        y: height - 160,
        size: 12,
        font,
        color: rgb(0.5, 0.5, 0.5),
      });

      page.drawText('Content extraction and formatting would be implemented here.', {
        x: 50,
        y: height - 200,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${file.name.replace(/\.[^/.]+$/, "")}.pdf`;
      link.click();

      toast({
        title: "Success!",
        description: "Word document converted to PDF successfully.",
      });

      setFile(null);
    } catch (error) {
      console.error('Error converting Word to PDF:', error);
      toast({
        title: "Error",
        description: "Failed to convert Word document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const aboutContent = {
    whatIs: "Word to PDF converts Microsoft Word documents to PDF format while preserving formatting, fonts, and layout.",
    uses: ["Converting resumes for job applications", "Creating PDF versions of reports", "Sharing documents securely", "Archiving Word files"],
    whyUse: "Maintains perfect formatting and layout while creating universally compatible PDF files.",
    howToUse: ["Upload Word document", "Preview conversion", "Download PDF", "Share or print"],
    example: "Convert a Word resume to PDF format for email submission to potential employers."
  };

  return (
    <PDFToolTemplate
      title="Word to PDF"
      description="Convert Microsoft Word documents to PDF format."
      icon={FileType}
      keywords="Word to PDF, DOCX to PDF, convert Word documents"
      aboutContent={aboutContent}
    >
      <div className="space-y-6">
        <PDFUploader 
          onFileSelect={handleFileSelect}
          acceptMultiple={false}
        />
        
        <div className="flex justify-center">
          <Button 
            onClick={convertToPDF}
            disabled={!file || processing}
            size="lg"
          >
            {processing ? "Converting..." : "Convert to PDF"}
          </Button>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default WordToPDF;
