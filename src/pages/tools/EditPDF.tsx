
import { Edit } from "lucide-react";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";

const EditPDF = () => {
  const aboutContent = {
    whatIs: "Edit PDF allows you to modify text, images, and other elements directly within PDF documents.",
    uses: ["Text correction", "Content updates", "Image replacement", "Form filling"],
    whyUse: "Comprehensive editing tools with support for text, images, and formatting modifications.",
    howToUse: ["Upload PDF", "Select edit mode", "Make changes", "Save modified document"],
    example: "Edit a contract to update terms and conditions before final signing."
  };

  return (
    <PDFToolTemplate title="Edit PDF" description="Edit text and images in PDF documents." icon={Edit} keywords="edit PDF, PDF editor, modify PDF content" aboutContent={aboutContent}>
      <div className="space-y-6"><PDFUploader onFileSelect={() => {}} /><div className="text-center text-muted-foreground"><p>Tool coming soon!</p></div><div className="flex justify-center"><Button disabled size="lg">Edit Document</Button></div></div>
    </PDFToolTemplate>
  );
};

export default EditPDF;
