
import { Calculator } from "lucide-react";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";

const PDFToExcel = () => {
  const aboutContent = {
    whatIs: "PDF to Excel extracts table data from PDF documents and converts it to editable Excel spreadsheets.",
    uses: ["Data extraction", "Report analysis", "Financial processing", "Database import"],
    whyUse: "Intelligent table recognition technology preserves data structure and relationships.",
    howToUse: ["Upload PDF", "Detect tables", "Extract data", "Download Excel file"],
    example: "Extract financial data from PDF reports for analysis and budget planning in Excel."
  };

  return (
    <PDFToolTemplate title="PDF to Excel" description="Convert PDF tables to Excel spreadsheets." icon={Calculator} keywords="PDF to Excel, extract PDF tables, PDF data extraction" aboutContent={aboutContent}>
      <div className="space-y-6"><PDFUploader onFileSelect={() => {}} /><div className="text-center text-muted-foreground"><p>Tool coming soon!</p></div><div className="flex justify-center"><Button disabled size="lg">Extract to Excel</Button></div></div>
    </PDFToolTemplate>
  );
};

export default PDFToExcel;
