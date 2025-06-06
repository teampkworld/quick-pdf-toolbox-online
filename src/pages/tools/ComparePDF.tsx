
import { GitCompare } from "lucide-react";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";

const ComparePDF = () => {
  const aboutContent = {
    whatIs: "Compare PDF analyzes two PDF documents side by side to identify differences in text, formatting, and content.",
    uses: ["Document versioning", "Change tracking", "Quality control", "Legal review"],
    whyUse: "Advanced comparison algorithms highlight textual and visual differences with detailed reporting.",
    howToUse: ["Upload two PDFs", "Start comparison", "Review differences", "Export comparison report"],
    example: "Compare contract versions to identify changes and revisions before final approval."
  };

  return (
    <PDFToolTemplate title="Compare PDF" description="Compare two PDF documents side by side." icon={GitCompare} keywords="compare PDF, PDF diff, document comparison" aboutContent={aboutContent}>
      <div className="space-y-6"><PDFUploader onFileSelect={() => {}} acceptMultiple={true} maxFiles={2} /><div className="text-center text-muted-foreground"><p>Tool coming soon!</p></div><div className="flex justify-center"><Button disabled size="lg">Compare Documents</Button></div></div>
    </PDFToolTemplate>
  );
};

export default ComparePDF;
