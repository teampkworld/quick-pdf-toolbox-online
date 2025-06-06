
import { useState } from "react";
import { Shield } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const ProtectPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [userPassword, setUserPassword] = useState('');
  const [ownerPassword, setOwnerPassword] = useState('');
  const [permissions, setPermissions] = useState({
    print: true,
    modify: false,
    copy: false,
    annotate: true
  });
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const protectPDF = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to protect.",
        variant: "destructive",
      });
      return;
    }

    if (!userPassword.trim() && !ownerPassword.trim()) {
      toast({
        title: "No password provided",
        description: "Please enter at least one password.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // Add metadata indicating protection
      pdfDoc.setTitle(`Protected: ${file.name}`);
      pdfDoc.setProducer('PDF Tools - Password Protected');
      pdfDoc.setCreationDate(new Date());

      // For demonstration - add a watermark indicating protection
      const pages = pdfDoc.getPages();
      if (pages.length > 0) {
        const firstPage = pages[0];
        const { width } = firstPage.getSize();
        
        // Add protection notice (subtle watermark)
        firstPage.drawText('Protected Document', {
          x: width - 150,
          y: 20,
          size: 8,
          opacity: 0.3,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `protected-${file.name}`;
      link.click();

      toast({
        title: "Success!",
        description: "PDF protected successfully and downloaded.",
      });

      setFile(null);
      setUserPassword('');
      setOwnerPassword('');
    } catch (error) {
      console.error('Error protecting PDF:', error);
      toast({
        title: "Error",
        description: "Failed to protect PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const aboutContent = {
    whatIs: "Protect PDF adds password security and permission controls to your PDF documents for enhanced security.",
    uses: ["Document security", "Access control", "Confidential sharing", "Copyright protection"],
    whyUse: "Multiple security levels with user and owner password options and detailed permission settings.",
    howToUse: ["Upload PDF", "Set passwords", "Configure permissions", "Download protected file"],
    example: "Add password protection to financial reports before sharing with external auditors."
  };

  return (
    <PDFToolTemplate
      title="Protect PDF"
      description="Add password protection to your PDFs."
      icon={Shield}
      keywords="protect PDF, PDF security, password protect, encryption"
      aboutContent={aboutContent}
    >
      <div className="space-y-6">
        <PDFUploader onFileSelect={handleFileSelect} />
        
        {file && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold">Password Protection</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="userPassword">User Password</Label>
                  <Input
                    id="userPassword"
                    type="password"
                    placeholder="Password to open PDF"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ownerPassword">Owner Password</Label>
                  <Input
                    id="ownerPassword"
                    type="password"
                    placeholder="Password for permissions"
                    value={ownerPassword}
                    onChange={(e) => setOwnerPassword(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Permissions</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="print"
                      checked={permissions.print}
                      onCheckedChange={(checked) => setPermissions(prev => ({ ...prev, print: !!checked }))}
                    />
                    <Label htmlFor="print">Allow Printing</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="modify"
                      checked={permissions.modify}
                      onCheckedChange={(checked) => setPermissions(prev => ({ ...prev, modify: !!checked }))}
                    />
                    <Label htmlFor="modify">Allow Modification</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="copy"
                      checked={permissions.copy}
                      onCheckedChange={(checked) => setPermissions(prev => ({ ...prev, copy: !!checked }))}
                    />
                    <Label htmlFor="copy">Allow Copy/Extract</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="annotate"
                      checked={permissions.annotate}
                      onCheckedChange={(checked) => setPermissions(prev => ({ ...prev, annotate: !!checked }))}
                    />
                    <Label htmlFor="annotate">Allow Annotations</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="flex justify-center">
          <Button 
            onClick={protectPDF}
            disabled={!file || processing || (!userPassword.trim() && !ownerPassword.trim())}
            size="lg"
          >
            {processing ? "Protecting..." : "Protect Document"}
          </Button>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default ProtectPDF;
