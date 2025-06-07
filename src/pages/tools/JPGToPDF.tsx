
import { useState } from "react";
import { Image } from "lucide-react";
import { PDFDocument, PageSizes } from "pdf-lib";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const JPGToPDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [pageSize, setPageSize] = useState('A4');
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).filter(file => 
        file.type === 'image/jpeg' || file.type === 'image/jpg'
      );
      setFiles(selectedFiles);
    }
  };

  const convertToPDF = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select JPG images to convert.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);

    try {
      const pdfDoc = await PDFDocument.create();
      const pageSizeConfig = PageSizes[pageSize as keyof typeof PageSizes] || PageSizes.A4;

      for (const file of files) {
        const imageBytes = await file.arrayBuffer();
        const image = await pdfDoc.embedJpg(imageBytes);
        
        const page = pdfDoc.addPage(pageSizeConfig);
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
      link.download = 'images-to-pdf.pdf';
      link.click();

      toast({
        title: "Success!",
        description: `Converted ${files.length} JPG image(s) to PDF successfully.`,
      });

      setFiles([]);
    } catch (error) {
      console.error('Error converting JPG to PDF:', error);
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
    whatIs: "JPG to PDF converts JPEG images into a single PDF document with customizable page layouts.",
    uses: ["Creating photo albums", "Document compilation", "Image archiving", "Portfolio creation"],
    whyUse: "Combines multiple images into one organized PDF with professional formatting options.",
    howToUse: ["Select JPG images", "Choose page size", "Convert to PDF", "Download result"],
    example: "Convert a series of scanned receipts into a single PDF for expense reporting."
  };

  return (
    <PDFToolTemplate
      title="JPG to PDF"
      description="Convert JPG images to PDF documents."
      icon={Image}
      keywords="JPG to PDF, image to PDF, photo to PDF converter"
      aboutContent={aboutContent}
    >
      <div className="space-y-6">
        <Card className="border-2 border-dashed border-muted-foreground/25">
          <CardContent className="p-8 text-center">
            <Image className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Select JPG Images</h3>
            <p className="text-muted-foreground mb-4">Choose JPEG images to convert to PDF</p>
            <Button asChild>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/jpeg,image/jpg"
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
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold">Selected Images ({files.length})</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Page Size</label>
                <Select value={pageSize} onValueChange={setPageSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select page size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A4">A4</SelectItem>
                    <SelectItem value="Letter">Letter</SelectItem>
                    <SelectItem value="Legal">Legal</SelectItem>
                    <SelectItem value="A3">A3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-40 overflow-y-auto">
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
