
import { Presentation } from "lucide-react";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";

const PDFToPowerPoint = () => {
  const aboutContent = {
    whatIs: "PDF to PowerPoint converts PDF documents to editable presentation format for easy modification.",
    uses: ["Editing presentations", "Template creation", "Slide modification", "Content reuse"],
    whyUse: "Converts PDF pages to editable slides while maintaining visual layout and formatting.",
    howToUse: ["Upload PDF", "Convert to slides", "Download presentation", "Edit in PowerPoint"],
    example: "Convert a PDF presentation template to PowerPoint for customization and branding."
  };

  return (
    <PDFToolTemplate title="PDF to PowerPoint" description="Convert PDF to PowerPoint presentations." icon={Presentation} keywords="PDF to PowerPoint, PDF to PPT, convert PDF slides" aboutContent={aboutContent}>
      <div className="space-y-6"><PDFUploader onFileSelect={() => {}} /><div className="text-center text-muted-foreground"><p>Tool coming soon!</p></div><div className="flex justify-center"><Button disabled size="lg">Convert to PPT</Button></div></div>
    </PDFToolTemplate>
  );
};

export default PDFToPowerPoint;
