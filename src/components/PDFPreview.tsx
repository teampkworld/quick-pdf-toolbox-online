
import { useState, useEffect } from 'react';
import { Document, pdfjs } from 'react-pdf';
import PDFPageThumbnail from './PDFPageThumbnail';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, FileText } from 'lucide-react';

// Configure react-pdf with correct worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

// Import CSS for react-pdf
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

interface PDFPreviewProps {
  file: File;
  mode?: 'view' | 'select' | 'rotate' | 'delete' | 'reorder';
  selectedPages?: number[];
  onPageSelect?: (pageNumber: number) => void;
  onPageRotate?: (pageNumber: number) => void;
  onPageDelete?: (pageNumber: number) => void;
  onPagesReorder?: (newOrder: number[]) => void;
  className?: string;
}

const PDFPreview = ({
  file,
  mode = 'view',
  selectedPages = [],
  onPageSelect,
  onPageRotate,
  onPageDelete,
  onPagesReorder,
  className
}: PDFPreviewProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string>('');

  useEffect(() => {
    console.log('PDFPreview: Setting up file URL for:', file.name);
    // Create object URL for the file
    const url = URL.createObjectURL(file);
    setFileUrl(url);
    
    // Cleanup on unmount
    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [file]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    console.log('PDFPreview: PDF loaded successfully with', numPages, 'pages');
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error: any) => {
    console.error('PDFPreview: Error loading PDF:', error);
    setError('Failed to load PDF. The file might be corrupted or password-protected.');
    setIsLoading(false);
  };

  const handlePageSelect = (pageNumber: number) => {
    if (mode === 'select' && onPageSelect) {
      onPageSelect(pageNumber);
    }
  };

  const selectAllPages = () => {
    if (mode === 'select' && onPageSelect) {
      for (let i = 1; i <= numPages; i++) {
        if (!selectedPages.includes(i)) {
          onPageSelect(i);
        }
      }
    }
  };

  const deselectAllPages = () => {
    if (mode === 'select' && onPageSelect) {
      selectedPages.forEach(pageNumber => onPageSelect(pageNumber));
    }
  };

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="p-6 text-center">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Preview Error</h3>
          <p className="text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            PDF Preview
            {!isLoading && (
              <span className="text-sm font-normal text-muted-foreground">
                ({numPages} page{numPages !== 1 ? 's' : ''})
              </span>
            )}
          </CardTitle>
          
          {mode === 'select' && !isLoading && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={selectAllPages}>
                Select All
              </Button>
              <Button variant="outline" size="sm" onClick={deselectAllPages}>
                Deselect All
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading PDF preview...</p>
          </div>
        ) : (
          <Document
            file={fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading=""
            options={{
              cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
              cMapPacked: true,
              standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/standard_fonts/',
            }}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {Array.from(new Array(numPages), (el, index) => (
                <PDFPageThumbnail
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  selected={selectedPages.includes(index + 1)}
                  showSelection={mode === 'select'}
                  showRotation={mode === 'rotate'}
                  showDelete={mode === 'delete'}
                  onSelect={handlePageSelect}
                  onRotate={onPageRotate}
                  onDelete={onPageDelete}
                />
              ))}
            </div>
          </Document>
        )}
      </CardContent>
    </Card>
  );
};

export default PDFPreview;
