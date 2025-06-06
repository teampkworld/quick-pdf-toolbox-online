
import { FileType } from "lucide-react";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";

const PDFToWord = () => {
  const aboutContent = {
    whatIs: "PDF to Word converts PDF documents to editable Microsoft Word format while preserving text and formatting.",
    uses: ["Editing PDF content", "Document collaboration", "Text extraction", "Format conversion"],
    whyUse: "Advanced conversion technology maintains formatting and creates fully editable Word documents.",
    howToUse: ["Upload PDF", "Process conversion", "Download Word file", "Edit as needed"],
    example: "Convert a PDF contract to Word format for editing and collaboration with legal teams."
  };

  return (
    <PDFToolTemplate title="PDF to Word" description="Convert PDF documents to editable Word files." icon={FileType} keywords="PDF to Word, PDF to DOCX, convert PDF to editable" aboutContent={aboutContent}>
      <div className="space-y-6"><PDFUploader onFileSelect={() => {}} /><div className="text-center text-muted-foreground"><p>Tool coming soon!</p></div><div className="flex justify-center"><Button disabled size="lg">Convert to Word</Button></div></div>
    </PDFToolTemplate>
  );
};

export default PDFToWord;
