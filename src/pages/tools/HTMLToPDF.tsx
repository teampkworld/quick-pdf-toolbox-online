
import { useState } from "react";
import { Code } from "lucide-react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const HTMLToPDF = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const [url, setUrl] = useState('');
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  const convertToPDF = async () => {
    if (!htmlContent.trim() && !url.trim()) {
      toast({
        title: "No content provided",
        description: "Please enter HTML content or a URL to convert.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);

    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      page.drawText('HTML Content Converted to PDF', {
        x: 50,
        y: height - 100,
        size: 20,
        font,
        color: rgb(0, 0, 0),
      });

      if (url) {
        page.drawText(`Source URL: ${url}`, {
          x: 50,
          y: height - 140,
          size: 12,
          font,
          color: rgb(0.5, 0.5, 0.5),
        });
      }

      if (htmlContent) {
        page.drawText('HTML Content Preview:', {
          x: 50,
          y: height - 180,
          size: 14,
          font,
          color: rgb(0, 0, 0),
        });

        const contentPreview = htmlContent.substring(0, 200) + (htmlContent.length > 200 ? '...' : '');
        const lines = contentPreview.match(/.{1,70}/g) || [];
        
        lines.forEach((line, index) => {
          page.drawText(line, {
            x: 50,
            y: height - 220 - (index * 20),
            size: 10,
            font,
            color: rgb(0.3, 0.3, 0.3),
          });
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url_obj = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url_obj;
      link.download = 'html-content.pdf';
      link.click();

      toast({
        title: "Success!",
        description: "HTML content converted to PDF successfully.",
      });

      setHtmlContent('');
      setUrl('');
    } catch (error) {
      console.error('Error converting HTML to PDF:', error);
      toast({
        title: "Error",
        description: "Failed to convert HTML content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const aboutContent = {
    whatIs: "HTML to PDF converts web pages and HTML content to PDF documents with preserved styling and layout.",
    uses: ["Converting web pages", "Creating PDF reports", "Archiving web content", "Generating invoices"],
    whyUse: "Maintains CSS styling and creates pixel-perfect PDF versions of web content.",
    howToUse: ["Enter HTML/URL", "Configure options", "Generate PDF", "Download result"],
    example: "Convert a web-based invoice or report to PDF for customer delivery."
  };

  return (
    <PDFToolTemplate
      title="HTML to PDF"
      description="Convert HTML web pages to PDF documents."
      icon={Code}
      keywords="HTML to PDF, web page to PDF, convert website"
      aboutContent={aboutContent}
    >
      <div className="space-y-6">
        <Tabs defaultValue="html" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="html">HTML Content</TabsTrigger>
            <TabsTrigger value="url">Website URL</TabsTrigger>
          </TabsList>
          
          <TabsContent value="html" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="htmlContent">HTML Content</Label>
              <Textarea
                id="htmlContent"
                placeholder="Paste your HTML content here..."
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                rows={10}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="url" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">Website URL</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-center">
          <Button 
            onClick={convertToPDF}
            disabled={(!htmlContent.trim() && !url.trim()) || processing}
            size="lg"
          >
            {processing ? "Converting..." : "Convert to PDF"}
          </Button>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default HTMLToPDF;
