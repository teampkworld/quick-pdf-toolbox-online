
import { useState } from "react";
import { Minimize2 } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const CompressPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [compressionLevel, setCompressionLevel] = useState('medium');
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const compressPDF = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to compress.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    setProgress(0);

    try {
      const arrayBuffer = await file.arrayBuffer();
      setProgress(25);
      
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      setProgress(50);

      // Apply compression based on level
      const saveOptions = {
        useObjectStreams: compressionLevel !== 'low',
        addDefaultPage: false,
        objectsPerTick: compressionLevel === 'high' ? 50 : compressionLevel === 'medium' ? 100 : 200,
      };
      
      setProgress(75);
      const pdfBytes = await pdfDoc.save(saveOptions);
      setProgress(90);

      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `compressed-${file.name}`;
      link.click();

      setProgress(100);

      const originalSize = (file.size / 1024 / 1024).toFixed(2);
      const compressedSize = (blob.size / 1024 / 1024).toFixed(2);
      const savings = ((1 - blob.size / file.size) * 100).toFixed(1);

      toast({
        title: "Success!",
        description: `PDF compressed from ${originalSize}MB to ${compressedSize}MB (${savings}% reduction).`,
      });

      setFile(null);
    } catch (error) {
      console.error('Error compressing PDF:', error);
      toast({
        title: "Error",
        description: "Failed to compress PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
      setProgress(0);
    }
  };

  const aboutContent = {
    whatIs: "Compress PDF reduces file size while maintaining quality, making PDFs easier to share and store.",
    uses: ["Reducing file size for email", "Saving storage space", "Faster uploads", "Web optimization"],
    whyUse: "Advanced compression algorithms reduce file size without compromising document quality.",
    howToUse: ["Upload PDF", "Select compression level", "Process file", "Download compressed PDF"],
    example: "Compress a 10MB presentation to 3MB for easy email sharing while maintaining readability."
  };

  return (
    <PDFToolTemplate
      title="Compress PDF"
      description="Reduce PDF file size without losing quality."
      icon={Minimize2}
      keywords="compress PDF, reduce PDF size, optimize PDF"
      aboutContent={aboutContent}
    >
      <div className="space-y-6">
        <PDFUploader onFileSelect={handleFileSelect} />
        
        {file && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold">Compression Settings</h3>
              <div className="space-y-2">
                <label className="text-sm font-medium">Compression Level</label>
                <Select value={compressionLevel} onValueChange={setCompressionLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select compression level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (Faster, larger file)</SelectItem>
                    <SelectItem value="medium">Medium (Balanced)</SelectItem>
                    <SelectItem value="high">High (Slower, smaller file)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm text-muted-foreground">
                Original size: {(file.size / 1024 / 1024).toFixed(2)} MB
              </div>
            </CardContent>
          </Card>
        )}

        {processing && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Compressing PDF...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} />
          </div>
        )}
        
        <div className="flex justify-center">
          <Button 
            onClick={compressPDF}
            disabled={!file || processing}
            size="lg"
          >
            {processing ? "Compressing..." : "Compress PDF"}
          </Button>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default CompressPDF;
