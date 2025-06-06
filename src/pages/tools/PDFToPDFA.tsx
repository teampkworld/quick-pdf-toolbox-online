
import { FileText } from "lucide-react";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";

const PDFToPDFA = () => {
  const aboutContent = {
    whatIs: "PDF to PDF/A converts standard PDFs to archival PDF/A format for long-term preservation and compliance.",
    uses: ["Legal compliance", "Document archiving", "Government submissions", "Long-term storage"],
    whyUse: "Ensures document accessibility and preservation according to ISO standards.",
    howToUse: ["Upload PDF", "Select PDF/A standard", "Convert document", "Download compliant file"],
    example: "Convert business records to PDF/A format for regulatory compliance and archival."
  };

  return (
    <PDFToolTemplate title="PDF to PDF/A" description="Convert PDFs to archival PDF/A format." icon={FileText} keywords="PDF to PDF/A, PDF archival, PDF compliance, ISO standard" aboutContent={aboutContent}>
      <div className="space-y-6"><PDFUploader onFileSelect={() => {}} /><div className="text-center text-muted-foreground"><p>Tool coming soon!</p></div><div className="flex justify-center"><Button disabled size="lg">Convert to PDF/A</Button></div></div>
    </PDFToolTemplate>
  );
};

export default PDFToPDFA;
