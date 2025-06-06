
import { useState } from "react";
import { Crop } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const CropPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [cropMargins, setCropMargins] = useState({
    top: 50,
    bottom: 50,
    left: 50,
    right: 50
  });
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const cropPDF = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to crop.",
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
        const { width, height } = page.getSize();
        
        // Set crop box (media box defines the visible area)
        page.setCropBox(
          cropMargins.left,
          cropMargins.bottom,
          width - cropMargins.right - cropMargins.left,
          height - cropMargins.top - cropMargins.bottom
        );
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `cropped-${file.name}`;
      link.click();

      toast({
        title: "Success!",
        description: "PDF cropped successfully and downloaded.",
      });

      setFile(null);
    } catch (error) {
      console.error('Error cropping PDF:', error);
      toast({
        title: "Error",
        description: "Failed to crop PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const aboutContent = {
    whatIs: "Crop PDF removes unwanted margins and areas from PDF pages, allowing you to focus on specific content areas.",
    uses: ["Removing margins", "Focusing content", "Resizing pages", "Eliminating white space"],
    whyUse: "Precise cropping tools with preview functionality and batch processing capabilities.",
    howToUse: ["Upload PDF", "Select crop area", "Preview changes", "Apply cropping"],
    example: "Crop excessive white margins from scanned documents to optimize page layout."
  };

  return (
    <PDFToolTemplate
      title="Crop PDF"
      description="Crop and resize PDF pages to custom dimensions."
      icon={Crop}
      keywords="crop PDF, resize PDF pages, remove margins"
      aboutContent={aboutContent}
    >
      <div className="space-y-6">
        <PDFUploader onFileSelect={handleFileSelect} />
        
        {file && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold">Crop Margins (in points)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="top">Top Margin</Label>
                  <Input
                    id="top"
                    type="number"
                    min="0"
                    value={cropMargins.top}
                    onChange={(e) => setCropMargins(prev => ({ ...prev, top: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bottom">Bottom Margin</Label>
                  <Input
                    id="bottom"
                    type="number"
                    min="0"
                    value={cropMargins.bottom}
                    onChange={(e) => setCropMargins(prev => ({ ...prev, bottom: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="left">Left Margin</Label>
                  <Input
                    id="left"
                    type="number"
                    min="0"
                    value={cropMargins.left}
                    onChange={(e) => setCropMargins(prev => ({ ...prev, left: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="right">Right Margin</Label>
                  <Input
                    id="right"
                    type="number"
                    min="0"
                    value={cropMargins.right}
                    onChange={(e) => setCropMargins(prev => ({ ...prev, right: parseInt(e.target.value) || 0 }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="flex justify-center">
          <Button 
            onClick={cropPDF}
            disabled={!file || processing}
            size="lg"
          >
            {processing ? "Cropping..." : "Crop Pages"}
          </Button>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default CropPDF;
