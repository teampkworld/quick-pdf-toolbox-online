
import { FileType } from "lucide-react";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";

const WordToPDF = () => {
  const aboutContent = {
    whatIs: "Word to PDF converts Microsoft Word documents to PDF format while preserving formatting, fonts, and layout.",
    uses: ["Converting resumes for job applications", "Creating PDF versions of reports", "Sharing documents securely", "Archiving Word files"],
    whyUse: "Maintains perfect formatting and layout while creating universally compatible PDF files.",
    howToUse: ["Upload Word document", "Preview conversion", "Download PDF", "Share or print"],
    example: "Convert a Word resume to PDF format for email submission to potential employers."
  };

  return (
    <PDFToolTemplate title="Word to PDF" description="Convert Microsoft Word documents to PDF format." icon={FileType} keywords="Word to PDF, DOCX to PDF, convert Word documents" aboutContent={aboutContent}>
      <div className="space-y-6">
        <PDFUploader onFileSelect={() => {}} />
        <div className="text-center text-muted-foreground"><p>Tool coming soon!</p></div>
        <div className="flex justify-center"><Button disabled size="lg">Convert to PDF</Button></div>
      </div>
    </PDFToolTemplate>
  );
};

export default WordToPDF;
