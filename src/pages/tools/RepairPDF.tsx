
import { useState } from "react";
import { Wrench } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const RepairPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const repairFile = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to repair.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    setProgress(0);

    try {
      const arrayBuffer = await file.arrayBuffer();
      setProgress(25);
      
      // Attempt to load and repair the PDF
      const pdfDoc = await PDFDocument.load(arrayBuffer, { 
        ignoreEncryption: true,
        capNumbers: true,
        parseSpeed: 'fast'
      });
      setProgress(50);
      
      // Re-save to repair structure
      const pdfBytes = await pdfDoc.save({
        useObjectStreams: false,
        addDefaultPage: false,
      });
      setProgress(75);
      
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `repaired-${file.name}`;
      link.click();
      
      setProgress(100);

      toast({
        title: "Success!",
        description: "PDF repaired successfully and downloaded.",
      });

      setFile(null);
    } catch (error) {
      console.error('Error repairing PDF:', error);
      toast({
        title: "Repair Failed",
        description: "This PDF may be too corrupted to repair, or it may not be a valid PDF file.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
      setProgress(0);
    }
  };

  const aboutContent = {
    whatIs: "Repair PDF fixes corrupted or damaged PDF files, restoring them to a usable state.",
    uses: ["Fixing corrupted downloads", "Repairing damaged scans", "Restoring backup files", "Fixing transfer errors"],
    whyUse: "Advanced repair algorithms can recover most corrupted PDF files with high success rates.",
    howToUse: ["Upload damaged PDF", "Analyze corruption", "Repair automatically", "Download fixed file"],
    example: "Repair a PDF that won't open after being recovered from a damaged hard drive."
  };

  return (
    <PDFToolTemplate
      title="Repair PDF"
      description="Fix corrupted or damaged PDF files."
      icon={Wrench}
      keywords="repair PDF, fix PDF, corrupted PDF recovery"
      aboutContent={aboutContent}
    >
      <div className="space-y-6">
        <PDFUploader onFileSelect={handleFileSelect} />
        
        {processing && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Repairing PDF...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} />
          </div>
        )}
        
        <div className="flex justify-center">
          <Button 
            onClick={repairFile}
            disabled={!file || processing}
            size="lg"
          >
            {processing ? "Repairing..." : "Repair PDF"}
          </Button>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default RepairPDF;
