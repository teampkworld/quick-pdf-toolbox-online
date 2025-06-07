
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
  const [startNumber, setStartNumber] = useState(1);
  const [fontSize, setFontSize] = useState(12);
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
        
        let x, y;
        
        // Determine position
        switch (position) {
          case 'top-left':
            x = 50;
            y = height - 50;
            break;
          case 'top-center':
            x = width / 2 - 10;
            y = height - 50;
            break;
          case 'top-right':
            x = width - 50;
            y = height - 50;
            break;
          case 'bottom-left':
            x = 50;
            y = 50;
            break;
          case 'bottom-center':
            x = width / 2 - 10;
            y = 50;
            break;
          case 'bottom-right':
            x = width - 50;
            y = 50;
            break;
          default:
            x = width / 2 - 10;
            y = 50;
        }

        page.drawText(pageNumber.toString(), {
          x,
          y,
          size: fontSize,
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
        description: `Added page numbers to ${pages.length} pages.`,
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
    whatIs: "Add Page Numbers automatically inserts sequential page numbers to PDF documents with customizable positioning and formatting.",
    uses: ["Document organization", "Professional formatting", "Academic papers", "Legal documents"],
    whyUse: "Customizable positioning, font size, and starting number options for professional document formatting.",
    howToUse: ["Upload PDF", "Choose position", "Set starting number", "Download numbered PDF"],
    example: "Add page numbers to a thesis document starting from page 3 in the bottom-right corner."
  };

  return (
    <PDFToolTemplate
      title="Add Page Numbers"
      description="Add sequential page numbers to PDF documents."
      icon={Hash}
      keywords="add page numbers, PDF numbering, page numbering tool"
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
                      <SelectValue placeholder="Select position" />
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
                  <Label htmlFor="fontSize">Font Size</Label>
                  <Input
                    id="fontSize"
                    type="number"
                    min="8"
                    max="24"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value) || 12)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startNumber">Starting Number</Label>
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
