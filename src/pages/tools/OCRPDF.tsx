
import { Eye } from "lucide-react";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";

const OCRPDF = () => {
  const aboutContent = {
    whatIs: "OCR PDF converts scanned PDFs into searchable text documents using advanced optical character recognition technology.",
    uses: ["Converting scanned documents", "Making PDFs searchable", "Extracting text from images", "Digitizing archives"],
    whyUse: "Advanced OCR with high accuracy and support for multiple languages and document types.",
    howToUse: ["Upload scanned PDF", "Select language", "Process with OCR", "Download searchable PDF"],
    example: "Convert a scanned legal contract into a searchable PDF for easy keyword searching."
  };

  return (
    <PDFToolTemplate title="OCR PDF" description="Convert scanned PDFs to searchable text documents." icon={Eye} keywords="OCR PDF, text recognition, searchable PDF, scan to text" aboutContent={aboutContent}>
      <div className="space-y-6">
        <PDFUploader onFileSelect={() => {}} />
        <div className="text-center text-muted-foreground"><p>Tool coming soon!</p></div>
        <div className="flex justify-center"><Button disabled size="lg">Apply OCR</Button></div>
      </div>
    </PDFToolTemplate>
  );
};

export default OCRPDF;
