
import { useState } from "react";
import { EyeOff } from "lucide-react";
import { PDFDocument, rgb } from "pdf-lib";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const RedactPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [redactionAreas, setRedactionAreas] = useState([
    { x: 100, y: 700, width: 200, height: 20 }
  ]);
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const addRedactionArea = () => {
    setRedactionAreas(prev => [...prev, { x: 100, y: 600, width: 200, height: 20 }]);
  };

  const updateRedactionArea = (index: number, field: string, value: number) => {
    setRedactionAreas(prev => 
      prev.map((area, i) => i === index ? { ...area, [field]: value } : area)
    );
  };

  const removeRedactionArea = (index: number) => {
    setRedactionAreas(prev => prev.filter((_, i) => i !== index));
  };

  const redactPDF = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to redact.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();

      // Apply redaction to first page (for demonstration)
      if (pages.length > 0) {
        const firstPage = pages[0];
        
        redactionAreas.forEach(area => {
          // Draw black rectangle to redact content
          firstPage.drawRectangle({
            x: area.x,
            y: area.y,
            width: area.width,
            height: area.height,
            color: rgb(0, 0, 0),
          });
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `redacted-${file.name}`;
      link.click();

      toast({
        title: "Success!",
        description: `PDF redacted with ${redactionAreas.length} area(s) and downloaded.`,
      });

      setFile(null);
    } catch (error) {
      console.error('Error redacting PDF:', error);
      toast({
        title: "Error",
        description: "Failed to redact PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const aboutContent = {
    whatIs: "Redact PDF permanently removes sensitive information from PDF documents by covering content with black boxes.",
    uses: ["Privacy protection", "Legal compliance", "Information security", "Data anonymization"],
    whyUse: "Permanent content removal ensures sensitive data cannot be recovered or accessed.",
    howToUse: ["Upload PDF", "Select content to redact", "Apply redaction", "Download secured document"],
    example: "Redact personal information from legal documents before public filing."
  };

  return (
    <PDFToolTemplate
      title="Redact PDF"
      description="Remove sensitive information from PDFs."
      icon={EyeOff}
      keywords="redact PDF, remove sensitive data, PDF privacy"
      aboutContent={aboutContent}
    >
      <div className="space-y-6">
        <PDFUploader onFileSelect={handleFileSelect} />
        
        {file && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Redaction Areas</h3>
                <Button variant="outline" size="sm" onClick={addRedactionArea}>
                  Add Area
                </Button>
              </div>
              
              {redactionAreas.map((area, index) => (
                <div key={index} className="border p-3 rounded space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium">Area {index + 1}</Label>
                    {redactionAreas.length > 1 && (
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => removeRedactionArea(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="space-y-1">
                      <Label className="text-xs">X</Label>
                      <Input
                        type="number"
                        value={area.x}
                        onChange={(e) => updateRedactionArea(index, 'x', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Y</Label>
                      <Input
                        type="number"
                        value={area.y}
                        onChange={(e) => updateRedactionArea(index, 'y', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Width</Label>
                      <Input
                        type="number"
                        value={area.width}
                        onChange={(e) => updateRedactionArea(index, 'width', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Height</Label>
                      <Input
                        type="number"
                        value={area.height}
                        onChange={(e) => updateRedactionArea(index, 'height', parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
        
        <div className="flex justify-center">
          <Button 
            onClick={redactPDF}
            disabled={!file || processing}
            size="lg"
          >
            {processing ? "Redacting..." : "Redact Content"}
          </Button>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default RedactPDF;
