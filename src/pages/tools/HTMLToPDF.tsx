
import { Code } from "lucide-react";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const HTMLToPDF = () => {
  const aboutContent = {
    whatIs: "HTML to PDF converts web pages and HTML content to PDF documents with preserved styling and layout.",
    uses: ["Converting web pages", "Creating PDF reports", "Archiving web content", "Generating invoices"],
    whyUse: "Maintains CSS styling and creates pixel-perfect PDF versions of web content.",
    howToUse: ["Enter HTML/URL", "Configure options", "Generate PDF", "Download result"],
    example: "Convert a web-based invoice or report to PDF for customer delivery."
  };

  return (
    <PDFToolTemplate title="HTML to PDF" description="Convert HTML web pages to PDF documents." icon={Code} keywords="HTML to PDF, web page to PDF, convert website" aboutContent={aboutContent}>
      <div className="space-y-6">
        <Textarea placeholder="Paste HTML content or enter URL..." rows={8} />
        <div className="text-center text-muted-foreground"><p>Tool coming soon!</p></div>
        <div className="flex justify-center"><Button disabled size="lg">Convert HTML</Button></div>
      </div>
    </PDFToolTemplate>
  );
};

export default HTMLToPDF;
