
import { GlobalWorkerOptions } from 'pdfjs-dist';

// Configure PDF.js worker for Vite build system
if (typeof window !== 'undefined') {
  GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url
  ).toString();
}

// Set options for react-pdf
export const pdfjs = {
  GlobalWorkerOptions
};

// Export for use in components
export { GlobalWorkerOptions };
