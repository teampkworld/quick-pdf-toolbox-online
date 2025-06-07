
import { GlobalWorkerOptions } from 'pdfjs-dist';

// Configure PDF.js worker with the correct CDN URL
if (typeof window !== 'undefined') {
  GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;
}

// Export for use in components
export { GlobalWorkerOptions };
