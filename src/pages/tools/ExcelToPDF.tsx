
import { Calculator } from "lucide-react";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";

const ExcelToPDF = () => {
  const aboutContent = {
    whatIs: "Excel to PDF converts spreadsheet files to PDF format while maintaining table structure and formatting.",
    uses: ["Creating reports", "Sharing financial data", "Archiving spreadsheets", "Print-ready tables"],
    whyUse: "Preserves table formatting and creates professional-looking PDF documents from Excel data.",
    howToUse: ["Upload Excel file", "Configure layout", "Generate PDF", "Download converted file"],
    example: "Convert a financial report spreadsheet to PDF for board meeting distribution."
  };

  return (
    <PDFToolTemplate title="Excel to PDF" description="Convert Excel spreadsheets to PDF format." icon={Calculator} keywords="Excel to PDF, XLS to PDF, spreadsheet converter" aboutContent={aboutContent}>
      <div className="space-y-6"><PDFUploader onFileSelect={() => {}} /><div className="text-center text-muted-foreground"><p>Tool coming soon!</p></div><div className="flex justify-center"><Button disabled size="lg">Convert Spreadsheet</Button></div></div>
    </PDFToolTemplate>
  );
};

export default ExcelToPDF;
