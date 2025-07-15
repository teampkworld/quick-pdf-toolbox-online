
import { useState, useEffect } from 'react';
import { Document, pdfjs } from 'react-pdf';
import PDFPageThumbnail from './PDFPageThumbnail';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, FileText, RefreshCw } from 'lucide-react';

// Worker is configured in main.tsx

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
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    console.log('PDFPreview: Setting up file URL for:', file.name);
    // Create object URL for the file
    const url = URL.createObjectURL(file);
    setFileUrl(url);
    setError(null);
    setIsLoading(true);
    setRetryCount(0);
    
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
    setError('Failed to load PDF. The file might be corrupted, password-protected, or there was a worker loading issue.');
    setIsLoading(false);
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setError(null);
    setIsLoading(true);
    
    // Force reload the file URL
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }
    const newUrl = URL.createObjectURL(file);
    setFileUrl(newUrl);
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
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={handleRetry} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry Loading
          </Button>
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
            {retryCount > 0 && (
              <p className="text-sm text-muted-foreground mt-2">Retry attempt: {retryCount}</p>
            )}
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
              verbosity: 0,
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
