
import { Droplets } from "lucide-react";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";

const AddWatermark = () => {
  const aboutContent = {
    whatIs: "Add Watermark overlays text or image watermarks on PDF documents for branding, security, or identification purposes.",
    uses: ["Document branding", "Copyright protection", "Draft marking", "Confidentiality labels"],
    whyUse: "Customizable opacity, positioning, and rotation with support for both text and image watermarks.",
    howToUse: ["Upload PDF", "Choose watermark type", "Customize appearance", "Apply watermark"],
    example: "Add a 'CONFIDENTIAL' watermark to sensitive business documents before sharing."
  };

  return (
    <PDFToolTemplate title="Add Watermark" description="Add text or image watermarks to PDFs." icon={Droplets} keywords="add watermark, PDF watermark, document branding" aboutContent={aboutContent}>
      <div className="space-y-6"><PDFUploader onFileSelect={() => {}} /><div className="text-center text-muted-foreground"><p>Tool coming soon!</p></div><div className="flex justify-center"><Button disabled size="lg">Add Watermark</Button></div></div>
    </PDFToolTemplate>
  );
};

export default AddWatermark;
