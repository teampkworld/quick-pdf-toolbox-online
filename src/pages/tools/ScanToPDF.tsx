
import { useState } from "react";
import { Scan } from "lucide-react";
import { PDFDocument, PageSizes } from "pdf-lib";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const ScanToPDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).filter(file => 
        file.type.startsWith('image/')
      );
      setFiles(selectedFiles);
    }
  };

  const scanToPDF = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select image files to convert.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);

    try {
      const pdfDoc = await PDFDocument.create();

      for (const file of files) {
        const imageBytes = await file.arrayBuffer();
        let image;
        
        if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
          image = await pdfDoc.embedJpg(imageBytes);
        } else if (file.type === 'image/png') {
          image = await pdfDoc.embedPng(imageBytes);
        } else {
          continue;
        }

        const page = pdfDoc.addPage(PageSizes.A4);
        const { width, height } = page.getSize();
        
        const imageAspectRatio = image.width / image.height;
        const pageAspectRatio = width / height;
        
        let imageWidth, imageHeight;
        if (imageAspectRatio > pageAspectRatio) {
          imageWidth = width - 40;
          imageHeight = imageWidth / imageAspectRatio;
        } else {
          imageHeight = height - 40;
          imageWidth = imageHeight * imageAspectRatio;
        }

        page.drawImage(image, {
          x: (width - imageWidth) / 2,
          y: (height - imageHeight) / 2,
          width: imageWidth,
          height: imageHeight,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'scanned-document.pdf';
      link.click();

      toast({
        title: "Success!",
        description: `Converted ${files.length} scanned image(s) to PDF successfully.`,
      });

      setFiles([]);
    } catch (error) {
      console.error('Error converting scans to PDF:', error);
      toast({
        title: "Error",
        description: "Failed to convert scans. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const aboutContent = {
    whatIs: "Scan to PDF converts scanned images into searchable PDF documents with OCR technology.",
    uses: ["Converting scanned documents", "Digitizing paper records", "Creating searchable archives", "Processing business cards"],
    whyUse: "Advanced OCR technology with support for multiple languages and high accuracy text recognition.",
    howToUse: ["Upload scanned images", "Select OCR language", "Process with OCR", "Download searchable PDF"],
    example: "Convert scanned business contracts into searchable PDFs for easy keyword searching and digital archiving."
  };

  return (
    <PDFToolTemplate
      title="Scan to PDF"
      description="Convert scanned images into searchable PDF documents."
      icon={Scan}
      keywords="scan to PDF, OCR, image to PDF, searchable PDF"
      aboutContent={aboutContent}
    >
      <div className="space-y-6">
        <Card className="border-2 border-dashed border-muted-foreground/25">
          <CardContent className="p-8 text-center">
            <Scan className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Select Scanned Images</h3>
            <p className="text-muted-foreground mb-4">Choose image files to convert to PDF</p>
            <Button asChild>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
                Choose Images
              </label>
            </Button>
          </CardContent>
        </Card>

        {files.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Selected Images ({files.length})</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {files.map((file, index) => (
                  <div key={index} className="text-sm p-2 bg-muted rounded">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="flex justify-center">
          <Button 
            onClick={scanToPDF}
            disabled={files.length === 0 || processing}
            size="lg"
          >
            {processing ? "Converting..." : `Convert ${files.length > 0 ? files.length : ''} Image${files.length !== 1 ? 's' : ''} to PDF`}
          </Button>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default ScanToPDF;
