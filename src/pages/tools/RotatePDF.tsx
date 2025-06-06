
import { useState } from "react";
import { RotateCw } from "lucide-react";
import { PDFDocument, degrees } from "pdf-lib";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const RotatePDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [rotation, setRotation] = useState(90);
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const rotateFile = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to rotate.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();

      pages.forEach(page => {
        page.setRotation(degrees(rotation));
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `rotated-${file.name}`;
      link.click();

      toast({
        title: "Success!",
        description: `PDF rotated ${rotation}° and downloaded successfully.`,
      });

      setFile(null);
    } catch (error) {
      console.error('Error rotating PDF:', error);
      toast({
        title: "Error",
        description: "Failed to rotate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const aboutContent = {
    whatIs: "Rotate PDF is an essential online tool designed to change the orientation of PDF pages quickly and efficiently. This free service allows users to rotate all pages in a PDF document by 90, 180, or 270 degrees, helping to correct documents that were scanned or created in the wrong orientation. Our tool maintains the original quality and formatting of your PDF while providing an intuitive interface that requires no technical expertise or software installation.",
    uses: [
      "Correcting scanned documents that were placed incorrectly on the scanner",
      "Fixing orientation issues in mobile-captured photos converted to PDF",
      "Adjusting presentation slides that need landscape to portrait conversion",
      "Correcting upside-down or sideways legal documents and contracts",
      "Rotating architectural drawings and blueprints to proper viewing angles",
      "Fixing orientation of academic papers and research documents",
      "Adjusting medical charts and patient records for proper viewing",
      "Correcting orientation of invoices, receipts, and financial documents"
    ],
    whyUse: "Our Rotate PDF tool offers the perfect combination of simplicity, security, and efficiency. Unlike desktop software that requires installation and system resources, our browser-based solution works instantly without any downloads. We prioritize your privacy by processing files entirely in your browser – your documents never leave your device or get stored on our servers. The tool preserves the original quality of your PDF while offering precise rotation options. Best of all, there are no watermarks, file size limitations, or usage restrictions, making it ideal for both personal and professional use.",
    howToUse: [
      "Upload your PDF file by clicking the upload area or dragging and dropping the file",
      "Select the desired rotation angle (90°, 180°, or 270°) using the rotation options",
      "Preview the rotation settings to ensure they meet your requirements",
      "Click the 'Rotate PDF' button to begin processing your document",
      "Wait for the processing to complete – this typically takes just a few seconds",
      "Download the rotated PDF file automatically to your device"
    ],
    example: "Consider a scenario where you've scanned a 20-page legal contract, but all pages appear sideways because the document was placed incorrectly on the scanner. Instead of rescanning all pages, you can upload the PDF to our Rotate PDF tool, select 90° clockwise rotation, and within seconds have a properly oriented document ready for review and printing. This saves significant time and ensures all text and images maintain their original quality and clarity."
  };

  return (
    <PDFToolTemplate
      title="Rotate PDF"
      description="Rotate PDF pages to the correct orientation. Fix sideways or upside-down documents instantly."
      icon={RotateCw}
      keywords="rotate PDF, fix PDF orientation, turn PDF pages, PDF rotation tool, correct PDF direction"
      aboutContent={aboutContent}
    >
      <div className="space-y-6">
        <PDFUploader onFileSelect={handleFileSelect} />
        
        {file && (
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Rotation Options</h3>
              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant={rotation === 90 ? "default" : "outline"}
                  onClick={() => setRotation(90)}
                  className="flex flex-col items-center p-4 h-auto"
                >
                  <RotateCw className="h-6 w-6 mb-2" />
                  <span>90° Right</span>
                </Button>
                <Button
                  variant={rotation === 180 ? "default" : "outline"}
                  onClick={() => setRotation(180)}
                  className="flex flex-col items-center p-4 h-auto"
                >
                  <RotateCw className="h-6 w-6 mb-2 rotate-180" />
                  <span>180° Flip</span>
                </Button>
                <Button
                  variant={rotation === 270 ? "default" : "outline"}
                  onClick={() => setRotation(270)}
                  className="flex flex-col items-center p-4 h-auto"
                >
                  <RotateCw className="h-6 w-6 mb-2 -rotate-90" />
                  <span>270° Left</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="flex justify-center">
          <Button 
            onClick={rotateFile}
            disabled={!file || processing}
            size="lg"
          >
            {processing ? "Rotating..." : "Rotate PDF"}
          </Button>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default RotatePDF;
