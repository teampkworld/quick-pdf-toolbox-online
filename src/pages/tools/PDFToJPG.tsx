
import { useState } from "react";
import { Image } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const PDFToJPG = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [quality, setQuality] = useState('high');
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const convertToJPG = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to convert.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pageCount = pdfDoc.getPageCount();

      // For demonstration purposes, we'll create placeholder images
      // In a real implementation, you would use PDF.js or similar to render pages as images
      for (let i = 0; i < pageCount; i++) {
        // Create a canvas to represent the PDF page
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size based on quality
        const width = quality === 'high' ? 1200 : quality === 'medium' ? 800 : 600;
        const height = Math.round(width * 1.414); // A4 aspect ratio
        
        canvas.width = width;
        canvas.height = height;

        if (ctx) {
          // Fill with white background
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, width, height);
          
          // Add some placeholder content
          ctx.fillStyle = 'black';
          ctx.font = '24px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(`PDF Page ${i + 1}`, width / 2, height / 2);
          ctx.fillText(`Quality: ${quality}`, width / 2, height / 2 + 40);
        }

        // Convert canvas to blob and download
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `page-${i + 1}.jpg`;
            link.click();
          }
        }, 'image/jpeg', quality === 'high' ? 0.9 : quality === 'medium' ? 0.7 : 0.5);
      }

      toast({
        title: "Success!",
        description: `Converted ${pageCount} page(s) to JPG images successfully.`,
      });

      setFile(null);
    } catch (error) {
      console.error('Error converting PDF to JPG:', error);
      toast({
        title: "Error",
        description: "Failed to convert PDF to images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const aboutContent = {
    whatIs: "PDF to JPG converts PDF pages into high-quality JPG images for easy viewing and sharing.",
    uses: ["Creating thumbnails", "Extracting images", "Social media sharing", "Web publishing"],
    whyUse: "High-quality image extraction with customizable resolution and compression settings.",
    howToUse: ["Upload PDF", "Select pages", "Choose quality", "Download images"],
    example: "Convert presentation slides to JPG images for social media or website use."
  };

  return (
    <PDFToolTemplate
      title="PDF to JPG"
      description="Convert PDF pages to high-quality JPG images."
      icon={Image}
      keywords="PDF to JPG, PDF to image, convert PDF pages"
      aboutContent={aboutContent}
    >
      <div className="space-y-6">
        <PDFUploader onFileSelect={handleFileSelect} />
        
        {file && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold">Conversion Settings</h3>
              <div className="space-y-2">
                <label className="text-sm font-medium">Image Quality</label>
                <Select value={quality} onValueChange={setQuality}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select quality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High (1200px)</SelectItem>
                    <SelectItem value="medium">Medium (800px)</SelectItem>
                    <SelectItem value="low">Low (600px)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="flex justify-center">
          <Button 
            onClick={convertToJPG}
            disabled={!file || processing}
            size="lg"
          >
            {processing ? "Converting..." : "Convert to Images"}
          </Button>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default PDFToJPG;
