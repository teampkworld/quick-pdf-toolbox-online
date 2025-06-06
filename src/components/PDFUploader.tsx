
import { useState, useCallback } from "react";
import { Upload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface PDFUploaderProps {
  onFileSelect: (file: File) => void;
  acceptMultiple?: boolean;
  maxFiles?: number;
  className?: string;
}

const PDFUploader = ({ 
  onFileSelect, 
  acceptMultiple = false, 
  maxFiles = 1,
  className = "" 
}: PDFUploaderProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const handleFiles = useCallback((files: FileList) => {
    const fileArray = Array.from(files);
    const pdfFiles = fileArray.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length === 0) {
      toast({
        title: "Invalid file type",
        description: "Please select PDF files only.",
        variant: "destructive",
      });
      return;
    }

    if (!acceptMultiple && pdfFiles.length > 1) {
      toast({
        title: "Multiple files not allowed",
        description: "Please select only one PDF file.",
        variant: "destructive",
      });
      return;
    }

    if (acceptMultiple && pdfFiles.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `Please select no more than ${maxFiles} files.`,
        variant: "destructive",
      });
      return;
    }

    setSelectedFiles(pdfFiles);
    pdfFiles.forEach(file => onFileSelect(file));
    
    toast({
      title: "File(s) uploaded successfully",
      description: `${pdfFiles.length} PDF file(s) ready for processing.`,
    });
  }, [acceptMultiple, maxFiles, onFileSelect, toast]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  }, [handleFiles]);

  const removeFile = useCallback((index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <div className={`space-y-4 ${className}`}>
      <Card 
        className={`border-2 border-dashed transition-colors ${
          dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <CardContent className="p-8 text-center">
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            Drop your PDF file{acceptMultiple ? 's' : ''} here
          </h3>
          <p className="text-muted-foreground mb-4">
            or click to browse from your device
          </p>
          <Button asChild>
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".pdf,application/pdf"
                multiple={acceptMultiple}
                onChange={handleFileInput}
                className="hidden"
              />
              Choose File{acceptMultiple ? 's' : ''}
            </label>
          </Button>
          {acceptMultiple && (
            <p className="text-sm text-muted-foreground mt-2">
              Maximum {maxFiles} files allowed
            </p>
          )}
        </CardContent>
      </Card>

      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Selected Files:</h4>
          {selectedFiles.map((file, index) => (
            <Card key={index} className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PDFUploader;
