
import { useState } from 'react';
import { Page } from 'react-pdf';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, RotateCw, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PDFPageThumbnailProps {
  pageNumber: number;
  selected?: boolean;
  showSelection?: boolean;
  showRotation?: boolean;
  showDelete?: boolean;
  onSelect?: (pageNumber: number) => void;
  onRotate?: (pageNumber: number) => void;
  onDelete?: (pageNumber: number) => void;
  className?: string;
}

const PDFPageThumbnail = ({
  pageNumber,
  selected = false,
  showSelection = false,
  showRotation = false,
  showDelete = false,
  onSelect,
  onRotate,
  onDelete,
  className
}: PDFPageThumbnailProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoadSuccess = () => {
    console.log(`Page ${pageNumber} loaded successfully`);
    setIsLoading(false);
    setHasError(false);
  };

  const handleLoadError = (error: any) => {
    console.error(`Error loading page ${pageNumber}:`, error);
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <Card className={cn(
      "relative p-2 transition-all duration-200 hover:shadow-md",
      selected && "ring-2 ring-primary",
      className
    )}>
      <div className="relative">
        {hasError ? (
          <div className="w-[150px] h-[200px] bg-muted rounded flex items-center justify-center">
            <span className="text-sm text-muted-foreground">Failed to load</span>
          </div>
        ) : (
          <Page
            pageNumber={pageNumber}
            width={150}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            onLoadSuccess={handleLoadSuccess}
            onLoadError={handleLoadError}
            loading={
              <div className="w-[150px] h-[200px] bg-muted animate-pulse rounded flex items-center justify-center">
                <span className="text-sm text-muted-foreground">Loading...</span>
              </div>
            }
          />
        )}
        
        {/* Page number overlay */}
        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          Page {pageNumber}
        </div>

        {/* Selection indicator */}
        {showSelection && selected && (
          <div className="absolute top-2 right-2">
            <CheckCircle className="h-5 w-5 text-primary fill-current" />
          </div>
        )}

        {/* Action buttons */}
        <div className="absolute top-2 left-2 flex gap-1">
          {showRotation && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onRotate?.(pageNumber)}
              className="h-7 w-7 p-0"
            >
              <RotateCw className="h-3 w-3" />
            </Button>
          )}
          {showDelete && (
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete?.(pageNumber)}
              className="h-7 w-7 p-0"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>

      {/* Click overlay for selection */}
      {showSelection && (
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={() => onSelect?.(pageNumber)}
        />
      )}
    </Card>
  );
};

export default PDFPageThumbnail;
