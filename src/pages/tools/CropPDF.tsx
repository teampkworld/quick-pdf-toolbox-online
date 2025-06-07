
import { useState } from "react";
import { Crop } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const CropPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [cropMode, setCropMode] = useState('margins');
  const [margins, setMargins] = useState({ top: 50, bottom: 50, left: 50, right: 50 });
  const [customCrop, setCustomCrop] = useState({ x: 0, y: 0, width: 595, height: 842 });
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
        
        if (cropMode === 'margins') {
          // Apply margin-based cropping
          page.setCropBox(
            margins.left,
            margins.bottom,
            width - margins.left - margins.right,
            height - margins.top - margins.bottom
          );
        } else {
          // Apply custom cropping
          page.setCropBox(
            customCrop.x,
            customCrop.y,
            customCrop.width,
            customCrop.height
          );
        }
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
        description: `PDF cropped successfully with ${cropMode} settings.`,
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
    whatIs: "Crop PDF removes unwanted margins and areas from PDF pages, focusing on specific content regions.",
    uses: ["Removing white space", "Focusing on content", "Reducing file size", "Improving readability"],
    whyUse: "Precise cropping tools with margin-based or custom coordinate options for perfect results.",
    howToUse: ["Upload PDF", "Set crop parameters", "Preview changes", "Download cropped PDF"],
    example: "Remove large margins from scanned documents to focus on the actual content area."
  };

  return (
    <PDFToolTemplate
      title="Crop PDF"
      description="Remove unwanted areas from PDF pages."
      icon={Crop}
      keywords="crop PDF, trim PDF, remove margins, PDF cropping"
      aboutContent={aboutContent}
    >
      <div className="space-y-6">
        <PDFUploader onFileSelect={handleFileSelect} />
        
        {file && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold">Crop Settings</h3>
              
              <div className="space-y-2">
                <Label>Crop Mode</Label>
                <Select value={cropMode} onValueChange={setCropMode}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="margins">Remove Margins</SelectItem>
                    <SelectItem value="custom">Custom Area</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {cropMode === 'margins' ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="top">Top (px)</Label>
                    <Input
                      id="top"
                      type="number"
                      min="0"
                      value={margins.top}
                      onChange={(e) => setMargins(prev => ({ ...prev, top: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bottom">Bottom (px)</Label>
                    <Input
                      id="bottom"
                      type="number"
                      min="0"
                      value={margins.bottom}
                      onChange={(e) => setMargins(prev => ({ ...prev, bottom: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="left">Left (px)</Label>
                    <Input
                      id="left"
                      type="number"
                      min="0"
                      value={margins.left}
                      onChange={(e) => setMargins(prev => ({ ...prev, left: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="right">Right (px)</Label>
                    <Input
                      id="right"
                      type="number"
                      min="0"
                      value={margins.right}
                      onChange={(e) => setMargins(prev => ({ ...prev, right: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="x">X Position</Label>
                    <Input
                      id="x"
                      type="number"
                      min="0"
                      value={customCrop.x}
                      onChange={(e) => setCustomCrop(prev => ({ ...prev, x: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="y">Y Position</Label>
                    <Input
                      id="y"
                      type="number"
                      min="0"
                      value={customCrop.y}
                      onChange={(e) => setCustomCrop(prev => ({ ...prev, y: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="width">Width</Label>
                    <Input
                      id="width"
                      type="number"
                      min="1"
                      value={customCrop.width}
                      onChange={(e) => setCustomCrop(prev => ({ ...prev, width: parseInt(e.target.value) || 1 }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height</Label>
                    <Input
                      id="height"
                      type="number"
                      min="1"
                      value={customCrop.height}
                      onChange={(e) => setCustomCrop(prev => ({ ...prev, height: parseInt(e.target.value) || 1 }))}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
        
        <div className="flex justify-center">
          <Button 
            onClick={cropPDF}
            disabled={!file || processing}
            size="lg"
          >
            {processing ? "Cropping..." : "Crop PDF"}
          </Button>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default CropPDF;
