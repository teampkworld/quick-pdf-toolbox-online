
import { useState } from "react";
import { Edit } from "lucide-react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const EditPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [editText, setEditText] = useState('');
  const [editPosition, setEditPosition] = useState({ x: 100, y: 700 });
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const editPDF = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to edit.",
        variant: "destructive",
      });
      return;
    }

    if (!editText.trim()) {
      toast({
        title: "No text to add",
        description: "Please enter text to add to the PDF.",
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

      // Add text to the first page
      if (pages.length > 0) {
        const firstPage = pages[0];
        
        firstPage.drawText(editText, {
          x: editPosition.x,
          y: editPosition.y,
          size: 12,
          font,
          color: rgb(0, 0, 0),
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `edited-${file.name}`;
      link.click();

      toast({
        title: "Success!",
        description: "PDF edited successfully and downloaded.",
      });

      setFile(null);
      setEditText('');
    } catch (error) {
      console.error('Error editing PDF:', error);
      toast({
        title: "Error",
        description: "Failed to edit PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const aboutContent = {
    whatIs: "Edit PDF allows you to modify text, images, and other elements directly within PDF documents.",
    uses: ["Text correction", "Content updates", "Image replacement", "Form filling"],
    whyUse: "Comprehensive editing tools with support for text, images, and formatting modifications.",
    howToUse: ["Upload PDF", "Select edit mode", "Make changes", "Save modified document"],
    example: "Edit a contract to update terms and conditions before final signing."
  };

  return (
    <PDFToolTemplate
      title="Edit PDF"
      description="Edit text and images in PDF documents."
      icon={Edit}
      keywords="edit PDF, PDF editor, modify PDF content"
      aboutContent={aboutContent}
    >
      <div className="space-y-6">
        <PDFUploader onFileSelect={handleFileSelect} />
        
        {file && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold">Edit Settings</h3>
              
              <div className="space-y-2">
                <Label htmlFor="editText">Text to Add</Label>
                <Textarea
                  id="editText"
                  placeholder="Enter text to add to the PDF..."
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="posX">X Position</Label>
                  <Input
                    id="posX"
                    type="number"
                    value={editPosition.x}
                    onChange={(e) => setEditPosition(prev => ({ ...prev, x: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="posY">Y Position</Label>
                  <Input
                    id="posY"
                    type="number"
                    value={editPosition.y}
                    onChange={(e) => setEditPosition(prev => ({ ...prev, y: parseInt(e.target.value) || 0 }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="flex justify-center">
          <Button 
            onClick={editPDF}
            disabled={!file || processing || !editText.trim()}
            size="lg"
          >
            {processing ? "Editing..." : "Edit Document"}
          </Button>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default EditPDF;
