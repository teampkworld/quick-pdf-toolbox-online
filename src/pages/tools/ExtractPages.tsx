
import { Trash2 as Download } from "lucide-react";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";

const ExtractPages = () => {
  const aboutContent = {
    whatIs: "Extract Pages is a specialized PDF tool that allows you to extract specific pages from larger PDF documents, creating separate files containing only the pages you need. This free online service enables users to pull out individual pages, page ranges, or specific sections from comprehensive documents while maintaining original quality and formatting.",
    uses: [
      "Extracting specific chapters from textbooks or manuals",
      "Pulling out relevant pages from large reports for targeted sharing",
      "Creating separate files for different sections of legal documents",
      "Extracting forms or applications from comprehensive document packages"
    ],
    whyUse: "Our Extract Pages tool provides precise page selection with professional results, processing everything securely in your browser without uploading files to external servers.",
    howToUse: [
      "Upload your PDF file to the secure processing interface",
      "Specify the pages you want to extract using page numbers or ranges",
      "Click 'Extract Pages' to process your selection",
      "Download the new PDF containing only your selected pages"
    ],
    example: "From a 100-page employee handbook, you can extract pages 25-35 containing the benefits section to share specifically with new hires, creating a focused 11-page document."
  };

  return (
    <PDFToolTemplate
      title="Extract Pages"
      description="Extract specific pages from PDF files into separate documents."
      icon={Download}
      keywords="extract PDF pages, PDF page extractor, separate PDF pages"
      aboutContent={aboutContent}
    >
      <div className="space-y-6">
        <PDFUploader onFileSelect={() => {}} />
        <div className="text-center text-muted-foreground">
          <p>Tool coming soon! Full functionality will be available shortly.</p>
        </div>
        <div className="flex justify-center">
          <Button disabled size="lg">Extract Pages</Button>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default ExtractPages;
