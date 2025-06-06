
import { Image } from "lucide-react";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";

const PDFToJPG = () => {
  const aboutContent = {
    whatIs: "PDF to JPG converts PDF pages into high-quality JPG images for easy viewing and sharing.",
    uses: ["Creating thumbnails", "Extracting images", "Social media sharing", "Web publishing"],
    whyUse: "High-quality image extraction with customizable resolution and compression settings.",
    howToUse: ["Upload PDF", "Select pages", "Choose quality", "Download images"],
    example: "Convert presentation slides to JPG images for social media or website use."
  };

  return (
    <PDFToolTemplate title="PDF to JPG" description="Convert PDF pages to high-quality JPG images." icon={Image} keywords="PDF to JPG, PDF to image, convert PDF pages" aboutContent={aboutContent}>
      <div className="space-y-6"><PDFUploader onFileSelect={() => {}} /><div className="text-center text-muted-foreground"><p>Tool coming soon!</p></div><div className="flex justify-center"><Button disabled size="lg">Convert to Images</Button></div></div>
    </PDFToolTemplate>
  );
};

export default PDFToJPG;
