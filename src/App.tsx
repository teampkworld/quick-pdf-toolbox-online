import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// PDF Tool Pages
import MergePDF from "./pages/tools/MergePDF";
import SplitPDF from "./pages/tools/SplitPDF";
import RemovePages from "./pages/tools/RemovePages";
import ExtractPages from "./pages/tools/ExtractPages";
import OrganizePDF from "./pages/tools/OrganizePDF";
import ScanToPDF from "./pages/tools/ScanToPDF";
import CompressPDF from "./pages/tools/CompressPDF";
import RepairPDF from "./pages/tools/RepairPDF";
import OCRPDF from "./pages/tools/OCRPDF";
import JPGToPDF from "./pages/tools/JPGToPDF";
import WordToPDF from "./pages/tools/WordToPDF";
import PowerPointToPDF from "./pages/tools/PowerPointToPDF";
import ExcelToPDF from "./pages/tools/ExcelToPDF";
import HTMLToPDF from "./pages/tools/HTMLToPDF";
import PDFToJPG from "./pages/tools/PDFToJPG";
import PDFToWord from "./pages/tools/PDFToWord";
import PDFToPowerPoint from "./pages/tools/PDFToPowerPoint";
import PDFToExcel from "./pages/tools/PDFToExcel";
import PDFToPDFA from "./pages/tools/PDFToPDFA";
import RotatePDF from "./pages/tools/RotatePDF";
import AddPageNumbers from "./pages/tools/AddPageNumbers";
import AddWatermark from "./pages/tools/AddWatermark";
import CropPDF from "./pages/tools/CropPDF";
import EditPDF from "./pages/tools/EditPDF";
import UnlockPDF from "./pages/tools/UnlockPDF";
import ProtectPDF from "./pages/tools/ProtectPDF";
import SignPDF from "./pages/tools/SignPDF";
import RedactPDF from "./pages/tools/RedactPDF";
import ComparePDF from "./pages/tools/ComparePDF";

// Essential Pages
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import DMCA from "./pages/DMCA";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="pdf-tools-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  
                  {/* PDF Tool Routes */}
                  <Route path="/merge-pdf" element={<MergePDF />} />
                  <Route path="/split-pdf" element={<SplitPDF />} />
                  <Route path="/remove-pages" element={<RemovePages />} />
                  <Route path="/extract-pages" element={<ExtractPages />} />
                  <Route path="/organize-pdf" element={<OrganizePDF />} />
                  <Route path="/scan-to-pdf" element={<ScanToPDF />} />
                  <Route path="/compress-pdf" element={<CompressPDF />} />
                  <Route path="/repair-pdf" element={<RepairPDF />} />
                  <Route path="/ocr-pdf" element={<OCRPDF />} />
                  <Route path="/jpg-to-pdf" element={<JPGToPDF />} />
                  <Route path="/word-to-pdf" element={<WordToPDF />} />
                  <Route path="/powerpoint-to-pdf" element={<PowerPointToPDF />} />
                  <Route path="/excel-to-pdf" element={<ExcelToPDF />} />
                  <Route path="/html-to-pdf" element={<HTMLToPDF />} />
                  <Route path="/pdf-to-jpg" element={<PDFToJPG />} />
                  <Route path="/pdf-to-word" element={<PDFToWord />} />
                  <Route path="/pdf-to-powerpoint" element={<PDFToPowerPoint />} />
                  <Route path="/pdf-to-excel" element={<PDFToExcel />} />
                  <Route path="/pdf-to-pdfa" element={<PDFToPDFA />} />
                  <Route path="/rotate-pdf" element={<RotatePDF />} />
                  <Route path="/add-page-numbers" element={<AddPageNumbers />} />
                  <Route path="/add-watermark" element={<AddWatermark />} />
                  <Route path="/crop-pdf" element={<CropPDF />} />
                  <Route path="/edit-pdf" element={<EditPDF />} />
                  <Route path="/unlock-pdf" element={<UnlockPDF />} />
                  <Route path="/protect-pdf" element={<ProtectPDF />} />
                  <Route path="/sign-pdf" element={<SignPDF />} />
                  <Route path="/redact-pdf" element={<RedactPDF />} />
                  <Route path="/compare-pdf" element={<ComparePDF />} />
                  
                  {/* Essential Pages */}
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/dmca" element={<DMCA />} />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
