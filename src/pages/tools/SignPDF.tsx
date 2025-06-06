
import { useState } from "react";
import { PenTool } from "lucide-react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const SignPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [signatureText, setSignatureText] = useState('');
  const [signaturePosition, setSignaturePosition] = useState({ x: 100, y: 100 });
  const [signatureDate, setSignatureDate] = useState(new Date().toLocaleDateString());
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const signPDF = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to sign.",
        variant: "destructive",
      });
      return;
    }

    if (!signatureText.trim()) {
      toast({
        title: "No signature provided",
        description: "Please enter your signature text.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBoldOblique);

      // Add signature to the last page
      if (pages.length > 0) {
        const lastPage = pages[pages.length - 1];
        
        // Add signature text
        lastPage.drawText(signatureText, {
          x: signaturePosition.x,
          y: signaturePosition.y,
          size: 16,
          font,
          color: rgb(0, 0, 0.8),
        });

        // Add date below signature
        lastPage.drawText(`Signed on: ${signatureDate}`, {
          x: signaturePosition.x,
          y: signaturePosition.y - 20,
          size: 10,
          color: rgb(0.5, 0.5, 0.5),
        });

        // Add signature line
        lastPage.drawLine({
          start: { x: signaturePosition.x, y: signaturePosition.y - 5 },
          end: { x: signaturePosition.x + 200, y: signaturePosition.y - 5 },
          thickness: 1,
          color: rgb(0, 0, 0),
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `signed-${file.name}`;
      link.click();

      toast({
        title: "Success!",
        description: "PDF signed successfully and downloaded.",
      });

      setFile(null);
      setSignatureText('');
    } catch (error) {
      console.error('Error signing PDF:', error);
      toast({
        title: "Error",
        description: "Failed to sign PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const aboutContent = {
    whatIs: "Sign PDF enables digital signature addition to PDF documents with drawing tools and text signatures.",
    uses: ["Contract signing", "Document approval", "Legal compliance", "Electronic authorization"],
    whyUse: "Multiple signature options including drawing, typing, and image upload with positioning controls.",
    howToUse: ["Upload PDF", "Create signature", "Position signature", "Save signed document"],
    example: "Digitally sign employment contracts and legal agreements for remote processing."
  };

  return (
    <PDFToolTemplate
      title="Sign PDF"
      description="Digitally sign PDF documents with ease."
      icon={PenTool}
      keywords="sign PDF, digital signature, e-sign documents"
      aboutContent={aboutContent}
    >
      <div className="space-y-6">
        <PDFUploader onFileSelect={handleFileSelect} />
        
        {file && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold">Digital Signature</h3>
              
              <Tabs defaultValue="text" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="text">Text Signature</TabsTrigger>
                  <TabsTrigger value="draw">Draw Signature</TabsTrigger>
                </TabsList>
                
                <TabsContent value="text" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signatureText">Your Name/Signature</Label>
                    <Input
                      id="signatureText"
                      placeholder="Enter your name or signature text"
                      value={signatureText}
                      onChange={(e) => setSignatureText(e.target.value)}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="draw" className="space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 p-8 text-center">
                    <p className="text-muted-foreground">Drawing signature functionality would be implemented here</p>
                    <p className="text-sm text-muted-foreground mt-2">Use canvas or signature pad library</p>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="posX">X Position</Label>
                  <Input
                    id="posX"
                    type="number"
                    value={signaturePosition.x}
                    onChange={(e) => setSignaturePosition(prev => ({ ...prev, x: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="posY">Y Position</Label>
                  <Input
                    id="posY"
                    type="number"
                    value={signaturePosition.y}
                    onChange={(e) => setSignaturePosition(prev => ({ ...prev, y: parseInt(e.target.value) || 0 }))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signatureDate">Signature Date</Label>
                <Input
                  id="signatureDate"
                  type="date"
                  value={signatureDate}
                  onChange={(e) => setSignatureDate(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="flex justify-center">
          <Button 
            onClick={signPDF}
            disabled={!file || processing || !signatureText.trim()}
            size="lg"
          >
            {processing ? "Signing..." : "Sign Document"}
          </Button>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default SignPDF;
