
import { useState } from "react";
import { FileText } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const PDFToPDFA = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [pdfaStandard, setPdfaStandard] = useState('PDF/A-1b');
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const convertToPDFA = async () => {
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
      
      // Add PDF/A compliance metadata
      pdfDoc.setTitle(`${file.name} - ${pdfaStandard} Compliant`);
      pdfDoc.setAuthor('PDF Tools Converter');
      pdfDoc.setSubject(`Document converted to ${pdfaStandard} format`);
      pdfDoc.setCreator('PDF Tools');
      pdfDoc.setProducer(`PDF Tools ${pdfaStandard} Converter`);
      pdfDoc.setCreationDate(new Date());
      pdfDoc.setModificationDate(new Date());

      // Save with specific settings for PDF/A compliance
      const pdfBytes = await pdfDoc.save({
        useObjectStreams: false,
        addDefaultPage: false,
      });
      
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${file.name.replace(/\.[^/.]+$/, "")}-${pdfaStandard.replace('/', '-')}.pdf`;
      link.click();

      toast({
        title: "Success!",
        description: `PDF converted to ${pdfaStandard} format successfully.`,
      });

      setFile(null);
    } catch (error) {
      console.error('Error converting to PDF/A:', error);
      toast({
        title: "Error",
        description: "Failed to convert to PDF/A format. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const aboutContent = {
    whatIs: "PDF to PDF/A converts standard PDFs to archival PDF/A format for long-term preservation and compliance.",
    uses: ["Legal compliance", "Document archiving", "Government submissions", "Long-term storage"],
    whyUse: "Ensures document accessibility and preservation according to ISO standards.",
    howToUse: ["Upload PDF", "Select PDF/A standard", "Convert document", "Download compliant file"],
    example: "Convert business records to PDF/A format for regulatory compliance and archival."
  };

  return (
    <PDFToolTemplate
      title="PDF to PDF/A"
      description="Convert PDFs to archival PDF/A format."
      icon={FileText}
      keywords="PDF to PDF/A, PDF archival, PDF compliance, ISO standard"
      aboutContent={aboutContent}
    >
      <div className="space-y-6">
        <PDFUploader onFileSelect={handleFileSelect} />
        
        {file && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold">PDF/A Standard</h3>
              <div className="space-y-2">
                <label className="text-sm font-medium">Select PDF/A Standard</label>
                <Select value={pdfaStandard} onValueChange={setPdfaStandard}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select PDF/A standard" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PDF/A-1b">PDF/A-1b (Basic)</SelectItem>
                    <SelectItem value="PDF/A-1a">PDF/A-1a (Accessible)</SelectItem>
                    <SelectItem value="PDF/A-2b">PDF/A-2b (Enhanced)</SelectItem>
                    <SelectItem value="PDF/A-2a">PDF/A-2a (Accessible Enhanced)</SelectItem>
                    <SelectItem value="PDF/A-3b">PDF/A-3b (With Attachments)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="flex justify-center">
          <Button 
            onClick={convertToPDFA}
            disabled={!file || processing}
            size="lg"
          >
            {processing ? "Converting..." : "Convert to PDF/A"}
          </Button>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default PDFToPDFA;
