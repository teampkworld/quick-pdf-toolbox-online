
import { Crop } from "lucide-react";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";

const CropPDF = () => {
  const aboutContent = {
    whatIs: "Crop PDF removes unwanted margins and areas from PDF pages, allowing you to focus on specific content areas.",
    uses: ["Removing margins", "Focusing content", "Resizing pages", "Eliminating white space"],
    whyUse: "Precise cropping tools with preview functionality and batch processing capabilities.",
    howToUse: ["Upload PDF", "Select crop area", "Preview changes", "Apply cropping"],
    example: "Crop excessive white margins from scanned documents to optimize page layout."
  };

  return (
    <PDFToolTemplate title="Crop PDF" description="Crop and resize PDF pages to custom dimensions." icon={Crop} keywords="crop PDF, resize PDF pages, remove margins" aboutContent={aboutContent}>
      <div className="space-y-6"><PDFUploader onFileSelect={() => {}} /><div className="text-center text-muted-foreground"><p>Tool coming soon!</p></div><div className="flex justify-center"><Button disabled size="lg">Crop Pages</Button></div></div>
    </PDFToolTemplate>
  );
};

export default CropPDF;
