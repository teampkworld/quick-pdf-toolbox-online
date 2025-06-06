
import { EyeOff } from "lucide-react";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";

const RedactPDF = () => {
  const aboutContent = {
    whatIs: "Redact PDF permanently removes sensitive information from PDF documents by covering content with black boxes.",
    uses: ["Privacy protection", "Legal compliance", "Information security", "Data anonymization"],
    whyUse: "Permanent content removal ensures sensitive data cannot be recovered or accessed.",
    howToUse: ["Upload PDF", "Select content to redact", "Apply redaction", "Download secured document"],
    example: "Redact personal information from legal documents before public filing."
  };

  return (
    <PDFToolTemplate title="Redact PDF" description="Remove sensitive information from PDFs." icon={EyeOff} keywords="redact PDF, remove sensitive data, PDF privacy" aboutContent={aboutContent}>
      <div className="space-y-6"><PDFUploader onFileSelect={() => {}} /><div className="text-center text-muted-foreground"><p>Tool coming soon!</p></div><div className="flex justify-center"><Button disabled size="lg">Redact Content</Button></div></div>
    </PDFToolTemplate>
  );
};

export default RedactPDF;
