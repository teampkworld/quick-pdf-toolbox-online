
import { PenTool } from "lucide-react";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";

const SignPDF = () => {
  const aboutContent = {
    whatIs: "Sign PDF enables digital signature addition to PDF documents with drawing tools and text signatures.",
    uses: ["Contract signing", "Document approval", "Legal compliance", "Electronic authorization"],
    whyUse: "Multiple signature options including drawing, typing, and image upload with positioning controls.",
    howToUse: ["Upload PDF", "Create signature", "Position signature", "Save signed document"],
    example: "Digitally sign employment contracts and legal agreements for remote processing."
  };

  return (
    <PDFToolTemplate title="Sign PDF" description="Digitally sign PDF documents with ease." icon={PenTool} keywords="sign PDF, digital signature, e-sign documents" aboutContent={aboutContent}>
      <div className="space-y-6"><PDFUploader onFileSelect={() => {}} /><div className="text-center text-muted-foreground"><p>Tool coming soon!</p></div><div className="flex justify-center"><Button disabled size="lg">Sign Document</Button></div></div>
    </PDFToolTemplate>
  );
};

export default SignPDF;
