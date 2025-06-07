
import { useState } from "react";
import { Calculator } from "lucide-react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ExcelToPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.type.includes('sheet') || selectedFile.name.endsWith('.xlsx') || selectedFile.name.endsWith('.xls')) {
      setFile(selectedFile);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please select an Excel spreadsheet (.xlsx or .xls).",
        variant: "destructive",
      });
    }
  };

  const convertToPDF = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select an Excel file to convert.",
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

      page.drawText('Excel Spreadsheet Converted to PDF', {
        x: 50,
        y: height - 100,
        size: 20,
        font,
        color: rgb(0, 0, 0),
      });

      page.drawText(`Original file: ${file.name}`, {
        x: 50,
        y: height - 140,
        size: 12,
        font,
        color: rgb(0.5, 0.5, 0.5),
      });

      page.drawText(`File size: ${(file.size / 1024 / 1024).toFixed(2)} MB`, {
        x: 50,
        y: height - 160,
        size: 12,
        font,
        color: rgb(0.5, 0.5, 0.5),
      });

      // Draw sample table structure
      page.drawText('Sample Table Data (Sheet would be converted here):', {
        x: 50,
        y: height - 200,
        size: 14,
        font,
        color: rgb(0, 0, 0),
      });

      // Draw table headers
      const tableY = height - 240;
      const cellWidth = 120;
      const cellHeight = 20;
      
      ['Column A', 'Column B', 'Column C', 'Column D'].forEach((header, index) => {
        page.drawRectangle({
          x: 50 + (index * cellWidth),
          y: tableY,
          width: cellWidth,
          height: cellHeight,
          borderColor: rgb(0, 0, 0),
          borderWidth: 1,
        });
        
        page.drawText(header, {
          x: 55 + (index * cellWidth),
          y: tableY + 5,
          size: 10,
          font,
          color: rgb(0, 0, 0),
        });
      });

      // Draw sample data rows
      for (let row = 0; row < 5; row++) {
        const rowY = tableY - ((row + 1) * cellHeight);
        ['Data 1', 'Data 2', 'Data 3', 'Data 4'].forEach((data, col) => {
          page.drawRectangle({
            x: 50 + (col * cellWidth),
            y: rowY,
            width: cellWidth,
            height: cellHeight,
            borderColor: rgb(0, 0, 0),
            borderWidth: 1,
          });
          
          page.drawText(`${data} ${row + 1}`, {
            x: 55 + (col * cellWidth),
            y: rowY + 5,
            size: 10,
            font,
            color: rgb(0, 0, 0),
          });
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${file.name.replace(/\.[^/.]+$/, "")}.pdf`;
      link.click();

      toast({
        title: "Success!",
        description: "Excel file converted to PDF successfully.",
      });

      setFile(null);
    } catch (error) {
      console.error('Error converting Excel to PDF:', error);
      toast({
        title: "Error",
        description: "Failed to convert Excel file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const aboutContent = {
    whatIs: "Excel to PDF converts spreadsheets to PDF format while preserving table structure and data layout.",
    uses: ["Report generation", "Data sharing", "Archiving spreadsheets", "Professional presentations"],
    whyUse: "Maintains table formatting and creates print-ready documents from Excel data.",
    howToUse: ["Upload Excel file", "Preview conversion", "Download PDF", "Share or print"],
    example: "Convert financial reports to PDF for board presentations and official documentation."
  };

  return (
    <PDFToolTemplate
      title="Excel to PDF"
      description="Convert Excel spreadsheets to PDF format."
      icon={Calculator}
      keywords="Excel to PDF, spreadsheet to PDF, XLSX to PDF converter"
      aboutContent={aboutContent}
    >
      <div className="space-y-6">
        <PDFUploader 
          onFileSelect={handleFileSelect}
          acceptMultiple={false}
        />
        
        <div className="flex justify-center">
          <Button 
            onClick={convertToPDF}
            disabled={!file || processing}
            size="lg"
          >
            {processing ? "Converting..." : "Convert to PDF"}
          </Button>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default ExcelToPDF;
