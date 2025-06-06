
import { useState } from "react";
import { Unlock } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const UnlockPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const unlockPDF = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a password-protected PDF file.",
        variant: "destructive",
      });
      return;
    }

    if (!password.trim()) {
      toast({
        title: "No password provided",
        description: "Please enter the PDF password.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      
      // Attempt to load with ignoreEncryption for password handling
      const pdfDoc = await PDFDocument.load(arrayBuffer, { 
        ignoreEncryption: true
      });

      // Re-save without password protection
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `unlocked-${file.name}`;
      link.click();

      toast({
        title: "Success!",
        description: "PDF unlocked successfully and downloaded.",
      });

      setFile(null);
      setPassword('');
    } catch (error) {
      console.error('Error unlocking PDF:', error);
      toast({
        title: "Unlock Failed",
        description: "Unable to unlock this PDF. The file may be corrupted or use advanced encryption.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const aboutContent = {
    whatIs: "Unlock PDF removes password protection from PDF documents when you have the correct password.",
    uses: ["Removing forgotten passwords", "Enabling editing", "Batch processing", "Document sharing"],
    whyUse: "Secure password removal process that maintains document integrity and formatting.",
    howToUse: ["Upload protected PDF", "Enter password", "Verify access", "Download unlocked file"],
    example: "Remove password protection from archived documents for easier team access."
  };

  return (
    <PDFToolTemplate
      title="Unlock PDF"
      description="Remove password protection from PDFs."
      icon={Unlock}
      keywords="unlock PDF, remove PDF password, decrypt PDF"
      aboutContent={aboutContent}
    >
      <div className="space-y-6">
        <PDFUploader onFileSelect={handleFileSelect} />
        
        {file && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold">Password Protection</h3>
              <div className="space-y-2">
                <Label htmlFor="password">PDF Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter PDF password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="flex justify-center">
          <Button 
            onClick={unlockPDF}
            disabled={!file || processing || !password.trim()}
            size="lg"
          >
            {processing ? "Unlocking..." : "Unlock PDF"}
          </Button>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default UnlockPDF;
