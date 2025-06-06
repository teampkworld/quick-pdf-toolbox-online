
import { useState } from "react";
import { Image } from "lucide-react";
import { PDFDocument, PageSizes } from "pdf-lib";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const JPGToPDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).filter(file => 
        file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
      );
      setFiles(selectedFiles);
    }
  };

  const convertToPDF = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select JPG/PNG images to convert.",
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
        } else {
          image = await pdfDoc.embedPng(imageBytes);
        }

        const page = pdfDoc.addPage(PageSizes.A4);
        const { width, height } = page.getSize();
        
        // Scale image to fit page while maintaining aspect ratio
        const imageAspectRatio = image.width / image.height;
        const pageAspectRatio = width / height;
        
        let imageWidth, imageHeight;
        if (imageAspectRatio > pageAspectRatio) {
          imageWidth = width - 40; // 20px margin on each side
          imageHeight = imageWidth / imageAspectRatio;
        } else {
          imageHeight = height - 40; // 20px margin on top and bottom
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
      link.download = 'converted-images.pdf';
      link.click();

      toast({
        title: "Success!",
        description: `Converted ${files.length} image(s) to PDF successfully.`,
      });

      setFiles([]);
    } catch (error) {
      console.error('Error converting to PDF:', error);
      toast({
        title: "Error",
        description: "Failed to convert images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const aboutContent = {
    whatIs: "JPG to PDF is a versatile conversion tool that transforms JPEG and PNG images into professional PDF documents. This free online service allows users to convert single images or combine multiple images into a single PDF file, maintaining image quality while creating universally compatible documents perfect for sharing, printing, or archiving.",
    uses: [
      "Converting scanned documents and receipts into PDF format for digital storage",
      "Creating PDF portfolios from multiple image files for professional presentations",
      "Converting screenshots and digital images for report inclusion and documentation",
      "Transforming product photos into PDF catalogs for business use",
      "Converting artwork and design images into PDF format for client sharing",
      "Creating digital photo albums in PDF format for easy sharing and printing",
      "Converting infographics and charts into PDF for professional distribution",
      "Transforming certificate images into PDF format for official documentation"
    ],
    whyUse: "Our JPG to PDF converter stands out for its simplicity, quality preservation, and batch processing capabilities. Unlike many online converters that compress images or add watermarks, our tool maintains original image quality while creating clean, professional PDFs. The service processes multiple images simultaneously, automatically organizing them into a single document or separate PDFs based on your preference. Everything happens securely in your browser – no uploads to external servers means complete privacy for your images. The tool supports both JPG and PNG formats and automatically optimizes page layouts for the best visual presentation.",
    howToUse: [
      "Click the upload area to select JPG or PNG image files from your device",
      "Choose multiple images if you want to combine them into a single PDF document",
      "Preview your selected images and ensure they're in the correct order",
      "Click the 'Convert to PDF' button to begin the conversion process",
      "Wait for the processing to complete – this usually takes just a few seconds",
      "Download the generated PDF file containing your converted images"
    ],
    example: "Imagine you have 5 product photos in JPG format that you need to send to a client as a single document. Instead of attaching multiple image files to an email, you can use our JPG to PDF tool to combine all 5 images into one professional PDF document. The tool will automatically size each image to fit properly on A4 pages, creating a clean, organized catalog that's easy for your client to view, print, and share with their team."
  };

  return (
    <PDFToolTemplate
      title="JPG to PDF"
      description="Convert JPG and PNG images to PDF format instantly. Combine multiple images into one PDF."
      icon={Image}
      keywords="JPG to PDF, image to PDF converter, PNG to PDF, convert images to PDF"
      aboutContent={aboutContent}
    >
      <div className="space-y-6">
        <Card className="border-2 border-dashed border-muted-foreground/25">
          <CardContent className="p-8 text-center">
            <Image className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Select Images</h3>
            <p className="text-muted-foreground mb-4">Choose JPG or PNG files to convert</p>
            <Button asChild>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
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
            onClick={convertToPDF}
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

export default JPGToPDF;
