
import { useState } from "react";
import { Code } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const HTMLToPDF = () => {
  const [htmlContent, setHtmlContent] = useState(`<!DOCTYPE html>
<html>
<head>
    <title>Sample Document</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #333; }
        p { line-height: 1.6; }
        .highlight { background-color: #ffffcc; }
    </style>
</head>
<body>
    <h1>Sample HTML Document</h1>
    <p>This is a <span class="highlight">sample HTML content</span> that will be converted to PDF.</p>
    <p>You can edit this HTML in the text area and click "Convert to PDF" to generate your document.</p>
    <ul>
        <li>Supports HTML formatting</li>
        <li>Includes CSS styling</li>
        <li>Easy to customize</li>
    </ul>
</body>
</html>`);
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  const convertToPDF = async () => {
    if (!htmlContent.trim()) {
      toast({
        title: "No content provided",
        description: "Please enter HTML content to convert.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);

    try {
      // Create a temporary iframe to render HTML
      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.left = '-9999px';
      iframe.style.width = '800px';
      iframe.style.height = '600px';
      document.body.appendChild(iframe);

      // Write HTML content to iframe
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(htmlContent);
        iframeDoc.close();

        // Wait for content to load
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Convert to canvas
        const canvas = await html2canvas(iframeDoc.body, {
          width: 800,
          height: 600,
          scale: 2,
        });

        // Create PDF
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });

        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('html-document.pdf');

        toast({
          title: "Success!",
          description: "HTML converted to PDF successfully.",
        });
      }

      // Clean up
      document.body.removeChild(iframe);
    } catch (error) {
      console.error('Error converting HTML to PDF:', error);
      toast({
        title: "Error",
        description: "Failed to convert HTML to PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const aboutContent = {
    whatIs: "HTML to PDF converts HTML content with CSS styling into formatted PDF documents.",
    uses: ["Web page archiving", "Report generation", "Documentation", "Email templates"],
    whyUse: "Preserves HTML formatting and CSS styles in the final PDF output.",
    howToUse: ["Enter HTML content", "Preview formatting", "Convert to PDF", "Download result"],
    example: "Convert a styled invoice template to PDF for professional billing documents."
  };

  return (
    <PDFToolTemplate
      title="HTML to PDF"
      description="Convert HTML content to PDF documents."
      icon={Code}
      keywords="HTML to PDF, web page to PDF, HTML converter"
      aboutContent={aboutContent}
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="p-4 space-y-4">
            <h3 className="font-semibold">HTML Content</h3>
            <Textarea
              value={htmlContent}
              onChange={(e) => setHtmlContent(e.target.value)}
              placeholder="Enter your HTML content here..."
              className="min-h-[300px] font-mono text-sm"
            />
            <div className="text-sm text-muted-foreground">
              Enter complete HTML with CSS styling. The content will be rendered and converted to PDF.
            </div>
          </CardContent>
        </Card>

        {htmlContent && (
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Preview</h3>
              <div 
                className="border rounded p-4 max-h-60 overflow-auto bg-white"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </CardContent>
          </Card>
        )}
        
        <div className="flex justify-center">
          <Button 
            onClick={convertToPDF}
            disabled={!htmlContent.trim() || processing}
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
