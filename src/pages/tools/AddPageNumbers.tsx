
import { useState } from "react";
import { Hash } from "lucide-react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const AddPageNumbers = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [position, setPosition] = useState('bottom-center');
  const [format, setFormat] = useState('number');
  const [startNumber, setStartNumber] = useState(1);
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const addPageNumbers = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to add page numbers.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      pages.forEach((page, index) => {
        const { width, height } = page.getSize();
        const pageNumber = startNumber + index;
        
        let text = '';
        switch (format) {
          case 'number':
            text = pageNumber.toString();
            break;
          case 'page-number':
            text = `Page ${pageNumber}`;
            break;
          case 'number-total':
            text = `${pageNumber} of ${pages.length}`;
            break;
          case 'page-number-total':
            text = `Page ${pageNumber} of ${pages.length}`;
            break;
        }

        let x = 0, y = 0;
        switch (position) {
          case 'top-left':
            x = 50;
            y = height - 50;
            break;
          case 'top-center':
            x = width / 2 - (text.length * 3);
            y = height - 50;
            break;
          case 'top-right':
            x = width - 100;
            y = height - 50;
            break;
          case 'bottom-left':
            x = 50;
            y = 50;
            break;
          case 'bottom-center':
            x = width / 2 - (text.length * 3);
            y = 50;
            break;
          case 'bottom-right':
            x = width - 100;
            y = 50;
            break;
        }

        page.drawText(text, {
          x,
          y,
          size: 12,
          font,
          color: rgb(0, 0, 0),
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `numbered-${file.name}`;
      link.click();

      toast({
        title: "Success!",
        description: "Page numbers added successfully and PDF downloaded.",
      });

      setFile(null);
    } catch (error) {
      console.error('Error adding page numbers:', error);
      toast({
        title: "Error",
        description: "Failed to add page numbers. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const aboutContent = {
    whatIs: "Add Page Numbers automatically inserts customizable page numbers to your PDF documents with various formatting options.",
    uses: ["Document organization", "Report formatting", "Academic papers", "Legal documents"],
    whyUse: "Flexible positioning and formatting options with support for different numbering styles.",
    howToUse: ["Upload PDF", "Choose position", "Select format", "Add page numbers"],
    example: "Add sequential page numbers to a technical manual for easy reference and navigation."
  };

  return (
    <PDFToolTemplate
      title="Add Page Numbers"
      description="Add custom page numbers to your PDFs."
      icon={Hash}
      keywords="add page numbers, PDF numbering, page formatting"
      aboutContent={aboutContent}
    >
      <div className="space-y-6">
        <PDFUploader onFileSelect={handleFileSelect} />
        
        {file && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold">Page Number Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Position</Label>
                  <Select value={position} onValueChange={setPosition}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top-left">Top Left</SelectItem>
                      <SelectItem value="top-center">Top Center</SelectItem>
                      <SelectItem value="top-right">Top Right</SelectItem>
                      <SelectItem value="bottom-left">Bottom Left</SelectItem>
                      <SelectItem value="bottom-center">Bottom Center</SelectItem>
                      <SelectItem value="bottom-right">Bottom Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Format</Label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="number">1, 2, 3...</SelectItem>
                      <SelectItem value="page-number">Page 1, Page 2...</SelectItem>
                      <SelectItem value="number-total">1 of 10, 2 of 10...</SelectItem>
                      <SelectItem value="page-number-total">Page 1 of 10...</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="startNumber">Start Number</Label>
                <Input
                  id="startNumber"
                  type="number"
                  min="1"
                  value={startNumber}
                  onChange={(e) => setStartNumber(parseInt(e.target.value) || 1)}
                />
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="flex justify-center">
          <Button 
            onClick={addPageNumbers}
            disabled={!file || processing}
            size="lg"
          >
            {processing ? "Adding Numbers..." : "Add Page Numbers"}
          </Button>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default AddPageNumbers;
