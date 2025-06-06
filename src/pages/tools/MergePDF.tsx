
import { useState } from "react";
import { FileText } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import PDFToolTemplate from "@/components/PDFToolTemplate";
import PDFUploader from "@/components/PDFUploader";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const MergePDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    setFiles(prev => [...prev, file]);
  };

  const mergeFiles = async () => {
    if (files.length < 2) {
      toast({
        title: "Insufficient files",
        description: "Please select at least 2 PDF files to merge.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    setProgress(0);

    try {
      const mergedPdf = await PDFDocument.create();
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        
        copiedPages.forEach((page) => mergedPdf.addPage(page));
        setProgress(((i + 1) / files.length) * 100);
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'merged-document.pdf';
      link.click();

      toast({
        title: "Success!",
        description: "PDFs merged successfully and downloaded.",
      });

      setFiles([]);
      setProgress(0);
    } catch (error) {
      console.error('Error merging PDFs:', error);
      toast({
        title: "Error",
        description: "Failed to merge PDFs. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const aboutContent = {
    whatIs: "Merge PDF is a powerful online tool that allows you to combine multiple PDF documents into a single, unified file. This free service enables users to seamlessly join different PDF files while maintaining the original quality and formatting of each document. Whether you're working with reports, presentations, contracts, or any other PDF documents, our merge tool provides a simple and efficient solution for consolidating your files without requiring any software installation.",
    uses: [
      "Combining multiple contract pages or legal documents into one comprehensive file",
      "Merging chapters of a book or research paper for easier distribution",
      "Consolidating monthly reports into a quarterly summary document",
      "Joining scanned documents that were saved as separate PDF files",
      "Creating presentation packages by combining slides, handouts, and appendices",
      "Assembling project documentation from multiple team members",
      "Combining invoices or receipts for accounting and bookkeeping purposes",
      "Merging academic papers and citations into a single research document"
    ],
    whyUse: "Our Merge PDF tool stands out as the best free online solution for several compelling reasons. Unlike other services, we don't add watermarks to your merged documents, ensuring your files remain professional and clean. The tool operates entirely in your browser, meaning your sensitive documents never leave your device – providing maximum security and privacy. Our advanced algorithms preserve the original quality and formatting of your PDFs while processing them quickly and efficiently. The interface is intuitive and user-friendly, requiring no technical expertise, and supports unlimited file merging without hidden fees or subscription requirements.",
    howToUse: [
      "Click on the upload area or drag and drop your first PDF file into the designated zone",
      "Add additional PDF files by repeating the upload process - you can merge as many files as needed",
      "Review the list of selected files and ensure they are in the correct order for merging",
      "Click the 'Merge PDFs' button to begin the combining process",
      "Wait for the processing to complete - this usually takes just a few seconds",
      "Download the merged PDF file automatically or click the download link when ready"
    ],
    example: "Imagine you have three separate PDF files: a cover letter (2 pages), a resume (3 pages), and a portfolio (10 pages). Using our Merge PDF tool, you can upload all three files in sequence, and within seconds, you'll have a single 15-page PDF document containing all your materials in the correct order. This merged file is perfect for job applications, as it presents all your information as one cohesive document that's easy for employers to review and save."
  };

  return (
    <PDFToolTemplate
      title="Merge PDF"
      description="Combine multiple PDF files into one document instantly. Free, secure, and no watermarks."
      icon={FileText}
      keywords="merge PDF, combine PDF files, join PDF documents, PDF merger online, free PDF merge tool"
      aboutContent={aboutContent}
    >
      <div className="space-y-6">
        <PDFUploader
          onFileSelect={handleFileSelect}
          acceptMultiple={true}
          maxFiles={10}
        />
        
        {processing && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Merging PDFs...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} />
          </div>
        )}
        
        <div className="flex justify-center">
          <Button 
            onClick={mergeFiles}
            disabled={files.length < 2 || processing}
            size="lg"
          >
            {processing ? "Merging..." : `Merge ${files.length} PDFs`}
          </Button>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default MergePDF;
