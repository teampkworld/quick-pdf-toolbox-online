import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import MergePDF from './pages/tools/MergePDF';
import SplitPDF from './pages/tools/SplitPDF';
import RotatePDF from './pages/tools/RotatePDF';
import ExtractPages from './pages/tools/ExtractPages';
import RemovePages from './pages/tools/RemovePages';
import OrganizePDF from './pages/tools/OrganizePDF';
import CompressPDF from './pages/tools/CompressPDF';
import ScanToPDF from './pages/tools/ScanToPDF';
import RepairPDF from './pages/tools/RepairPDF';
import OCRPDF from './pages/tools/OCRPDF';
import JPGToPDF from './pages/tools/JPGToPDF';
import WordToPDF from './pages/tools/WordToPDF';
import PowerPointToPDF from './pages/tools/PowerPointToPDF';
import ExcelToPDF from './pages/tools/ExcelToPDF';
import HTMLToPDF from './pages/tools/HTMLToPDF';
import PDFToJPG from './pages/tools/PDFToJPG';
import PDFToWord from './pages/tools/PDFToWord';
import PDFToPowerPoint from './pages/tools/PDFToPowerPoint';
import PDFToExcel from './pages/tools/PDFToExcel';
import PDFToPDFA from './pages/tools/PDFToPDFA';
import AddPageNumbers from './pages/tools/AddPageNumbers';
import CropPDF from './pages/tools/CropPDF';
import EditPDF from './pages/tools/EditPDF';
import UnlockPDF from './pages/tools/UnlockPDF';
import ProtectPDF from './pages/tools/ProtectPDF';
import SignPDF from './pages/tools/SignPDF';
import RedactPDF from './pages/tools/RedactPDF';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="merge-pdf" element={<MergePDF />} />
            <Route path="split-pdf" element={<SplitPDF />} />
            <Route path="rotate-pdf" element={<RotatePDF />} />
            <Route path="extract-pages" element={<ExtractPages />} />
            <Route path="remove-pages" element={<RemovePages />} />
            <Route path="organize-pdf" element={<OrganizePDF />} />
            <Route path="compress-pdf" element={<CompressPDF />} />
            <Route path="scan-to-pdf" element={<ScanToPDF />} />
            <Route path="repair-pdf" element={<RepairPDF />} />
            <Route path="ocr-pdf" element={<OCRPDF />} />
            <Route path="jpg-to-pdf" element={<JPGToPDF />} />
            <Route path="word-to-pdf" element={<WordToPDF />} />
            <Route path="powerpoint-to-pdf" element={<PowerPointToPDF />} />
            <Route path="excel-to-pdf" element={<ExcelToPDF />} />
            <Route path="html-to-pdf" element={<HTMLToPDF />} />
            <Route path="pdf-to-jpg" element={<PDFToJPG />} />
            <Route path="pdf-to-word" element={<PDFToWord />} />
            <Route path="pdf-to-powerpoint" element={<PDFToPowerPoint />} />
            <Route path="pdf-to-excel" element={<PDFToExcel />} />
            <Route path="pdf-to-pdfa" element={<PDFToPDFA />} />
            <Route path="add-page-numbers" element={<AddPageNumbers />} />
            <Route path="crop-pdf" element={<CropPDF />} />
            <Route path="edit-pdf" element={<EditPDF />} />
            <Route path="unlock-pdf" element={<UnlockPDF />} />
            <Route path="protect-pdf" element={<ProtectPDF />} />
            <Route path="sign-pdf" element={<SignPDF />} />
            <Route path="redact-pdf" element={<RedactPDF />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
