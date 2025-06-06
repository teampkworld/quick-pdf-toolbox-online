
import { Scan } from "lucide-react";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";

const ScanToPDF = () => {
  const aboutContent = {
    whatIs: "Scan to PDF converts scanned images into searchable PDF documents with OCR technology.",
    uses: ["Converting scanned documents", "Digitizing paper records", "Creating searchable archives", "Processing business cards"],
    whyUse: "Advanced OCR technology with support for multiple languages and high accuracy text recognition.",
    howToUse: ["Upload scanned images", "Select OCR language", "Process with OCR", "Download searchable PDF"],
    example: "Convert scanned business contracts into searchable PDFs for easy keyword searching and digital archiving."
  };

  return (
    <PDFToolTemplate title="Scan to PDF" description="Convert scanned images into searchable PDF documents." icon={Scan} keywords="scan to PDF, OCR, image to PDF, searchable PDF" aboutContent={aboutContent}>
      <div className="space-y-6">
        <PDFUploader onFileSelect={() => {}} />
        <div className="text-center text-muted-foreground"><p>Tool coming soon!</p></div>
        <div className="flex justify-center"><Button disabled size="lg">Scan to PDF</Button></div>
      </div>
    </PDFToolTemplate>
  );
};

export default ScanToPDF;
