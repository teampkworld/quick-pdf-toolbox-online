
import { Shield } from "lucide-react";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";

const ProtectPDF = () => {
  const aboutContent = {
    whatIs: "Protect PDF adds password security and permission controls to your PDF documents for enhanced security.",
    uses: ["Document security", "Access control", "Confidential sharing", "Copyright protection"],
    whyUse: "Multiple security levels with user and owner password options and detailed permission settings.",
    howToUse: ["Upload PDF", "Set passwords", "Configure permissions", "Download protected file"],
    example: "Add password protection to financial reports before sharing with external auditors."
  };

  return (
    <PDFToolTemplate title="Protect PDF" description="Add password protection to your PDFs." icon={Shield} keywords="protect PDF, PDF security, password protect, encryption" aboutContent={aboutContent}>
      <div className="space-y-6"><PDFUploader onFileSelect={() => {}} /><div className="text-center text-muted-foreground"><p>Tool coming soon!</p></div><div className="flex justify-center"><Button disabled size="lg">Protect Document</Button></div></div>
    </PDFToolTemplate>
  );
};

export default ProtectPDF;
