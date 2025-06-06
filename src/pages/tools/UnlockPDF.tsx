
import { Unlock } from "lucide-react";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";

const UnlockPDF = () => {
  const aboutContent = {
    whatIs: "Unlock PDF removes password protection from PDF documents when you have the correct password.",
    uses: ["Removing forgotten passwords", "Enabling editing", "Batch processing", "Document sharing"],
    whyUse: "Secure password removal process that maintains document integrity and formatting.",
    howToUse: ["Upload protected PDF", "Enter password", "Verify access", "Download unlocked file"],
    example: "Remove password protection from archived documents for easier team access."
  };

  return (
    <PDFToolTemplate title="Unlock PDF" description="Remove password protection from PDFs." icon={Unlock} keywords="unlock PDF, remove PDF password, decrypt PDF" aboutContent={aboutContent}>
      <div className="space-y-6"><PDFUploader onFileSelect={() => {}} /><div className="text-center text-muted-foreground"><p>Tool coming soon!</p></div><div className="flex justify-center"><Button disabled size="lg">Unlock PDF</Button></div></div>
    </PDFToolTemplate>
  );
};

export default UnlockPDF;
