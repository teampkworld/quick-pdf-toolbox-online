
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const EditPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [textEdits, setTextEdits] = useState([
    { page: 1, x: 100, y: 700, text: 'Sample Text', fontSize: 12, color: '#000000' }
  ]);
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const addTextEdit = () => {
    setTextEdits(prev => [...prev, {
      page: 1,
      x: 100,
      y: 600,
      text: 'New Text',
      fontSize: 12,
      color: '#000000'
    }]);
  };

  const updateTextEdit = (index: number, field: string, value: any) => {
    setTextEdits(prev => 
      prev.map((edit, i) => i === index ? { ...edit, [field]: value } : edit)
    );
  };

  const removeTextEdit = (index: number) => {
    setTextEdits(prev => prev.filter((_, i) => i !== index));
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

    setProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      textEdits.forEach(edit => {
        const pageIndex = edit.page - 1;
        if (pageIndex >= 0 && pageIndex < pages.length) {
          const page = pages[pageIndex];
          
          // Convert hex color to rgb
          const hexColor = edit.color.replace('#', '');
          const r = parseInt(hexColor.substr(0, 2), 16) / 255;
          const g = parseInt(hexColor.substr(2, 2), 16) / 255;
          const b = parseInt(hexColor.substr(4, 2), 16) / 255;
          
          page.drawText(edit.text, {
            x: edit.x,
            y: edit.y,
            size: edit.fontSize,
            font,
            color: rgb(r, g, b),
          });
        }
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `edited-${file.name}`;
      link.click();

      toast({
        title: "Success!",
        description: `PDF edited with ${textEdits.length} text modification(s).`,
      });

      setFile(null);
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
    whatIs: "Edit PDF allows you to add text, annotations, and modifications to existing PDF documents.",
    uses: ["Adding notes", "Filling forms", "Adding corrections", "Document annotation"],
    whyUse: "Comprehensive editing tools with precise positioning and formatting controls.",
    howToUse: ["Upload PDF", "Add text elements", "Position and style", "Download edited PDF"],
    example: "Add signatures, dates, or corrections to contracts and forms."
  };

  return (
    <PDFToolTemplate
      title="Edit PDF"
      description="Add text and annotations to PDF documents."
      icon={Edit}
      keywords="edit PDF, add text to PDF, PDF annotation, modify PDF"
      aboutContent={aboutContent}
    >
      <div className="space-y-6">
        <PDFUploader onFileSelect={handleFileSelect} />
        
        {file && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Text Edits</h3>
                <Button variant="outline" size="sm" onClick={addTextEdit}>
                  Add Text
                </Button>
              </div>
              
              {textEdits.map((edit, index) => (
                <div key={index} className="border p-3 rounded space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium">Text Edit {index + 1}</Label>
                    {textEdits.length > 1 && (
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => removeTextEdit(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`text-${index}`}>Text Content</Label>
                    <Textarea
                      id={`text-${index}`}
                      value={edit.text}
                      onChange={(e) => updateTextEdit(index, 'text', e.target.value)}
                      placeholder="Enter text to add..."
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    <div className="space-y-1">
                      <Label className="text-xs">Page</Label>
                      <Input
                        type="number"
                        min="1"
                        value={edit.page}
                        onChange={(e) => updateTextEdit(index, 'page', parseInt(e.target.value) || 1)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">X Position</Label>
                      <Input
                        type="number"
                        value={edit.x}
                        onChange={(e) => updateTextEdit(index, 'x', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Y Position</Label>
                      <Input
                        type="number"
                        value={edit.y}
                        onChange={(e) => updateTextEdit(index, 'y', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Font Size</Label>
                      <Input
                        type="number"
                        min="8"
                        max="72"
                        value={edit.fontSize}
                        onChange={(e) => updateTextEdit(index, 'fontSize', parseInt(e.target.value) || 12)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Color</Label>
                      <Input
                        type="color"
                        value={edit.color}
                        onChange={(e) => updateTextEdit(index, 'color', e.target.value)}
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
            onClick={editPDF}
            disabled={!file || processing}
            size="lg"
          >
            {processing ? "Editing..." : "Apply Edits"}
          </Button>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default EditPDF;
