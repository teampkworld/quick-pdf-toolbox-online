
import { Presentation } from "lucide-react";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";

const PowerPointToPDF = () => {
  const aboutContent = {
    whatIs: "PowerPoint to PDF converts presentation files to PDF format for easy sharing and viewing.",
    uses: ["Sharing presentations", "Creating handouts", "Archiving slides", "Print-ready versions"],
    whyUse: "Preserves slide formatting and ensures presentations display correctly on any device.",
    howToUse: ["Upload presentation", "Select conversion options", "Generate PDF", "Download result"],
    example: "Convert a business presentation to PDF for client distribution and printing."
  };

  return (
    <PDFToolTemplate title="PowerPoint to PDF" description="Convert PowerPoint presentations to PDF." icon={Presentation} keywords="PowerPoint to PDF, PPT to PDF, presentation converter" aboutContent={aboutContent}>
      <div className="space-y-6"><PDFUploader onFileSelect={() => {}} /><div className="text-center text-muted-foreground"><p>Tool coming soon!</p></div><div className="flex justify-center"><Button disabled size="lg">Convert Presentation</Button></div></div>
    </PDFToolTemplate>
  );
};

export default PowerPointToPDF;
