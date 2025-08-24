'use client';

import { useState } from "react";
import FileUpload from "./FileUpload";
import DataTable from "./DataTable";
import QrGrid from "./QrGrid";
import Sidebar, { QrOptions } from "./Sidebar";
import { toast } from "sonner";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

type CsvData = {
  headers: string[];
  rows: { [key: string]: string }[];
};

export default function QrGeneratorPage() {
  const [csvData, setCsvData] = useState<CsvData | null>(null);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [qrCodes, setQrCodes] = useState<string[]>([]);
  const [qrOptions, setQrOptions] = useState<QrOptions>({
    foregroundColor: "#000000",
    backgroundColor: "#ffffff",
    size: 200, 
    fileExtension: "png",
  });

  const handleFileUpload = (data: CsvData) => {
    setCsvData(data);
    setQrCodes([]);
    setSelectedColumns(data.headers);
  };

  const handleGenerateQrs = () => {
    if (!csvData) return;

    let hasLongQrCode = false;
    const MAX_QR_CODE_LENGTH = 500;

    const codes = csvData.rows.map(row => {
      const combinedText = selectedColumns.map(col => row[col]).join(' ').trim();
      if (combinedText.length > MAX_QR_CODE_LENGTH) {
        hasLongQrCode = true;
      }
      return combinedText;
    });
    setQrCodes(codes);

    if (hasLongQrCode) {
      toast.warning("Some QR codes might be too dense to scan easily.", {
        description: `Text length exceeds ${MAX_QR_CODE_LENGTH} characters for some QR codes. Consider reducing the data.`,
        duration: 5000,
      });
    } else {
      toast.success("QR Codes generated successfully!");
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadZip = async () => {
    if (qrCodes.length === 0) {
      toast.error("No QR codes to download.");
      return;
    }

    const zip = new JSZip();
    const promises = qrCodes.map((code, index) => {
      const qrCodeElement = document.getElementById(`qr-code-container-${index}`);
      const canvas = qrCodeElement?.querySelector("canvas");
      
      if (canvas) {
        return new Promise<void>((resolve) => {
          canvas.toBlob((blob) => {
            if (blob) {
              zip.file(`qr_code_${index + 1}.png`, blob);
            }
            resolve();
          });
        });
      }
      return Promise.resolve();
    });

    await Promise.all(promises);
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "qr_codes.zip");
    });
    toast.success("Downloading ZIP file...");
  };

  const handleDownloadPdf = () => {
    if (qrCodes.length === 0) {
      toast.error("No QR codes to download.");
      return;
    }

    const doc = new jsPDF();
    const margin = 10;
    const qrSize = 50;
    const qrPerPage = Math.floor((doc.internal.pageSize.height - margin * 2) / (qrSize + margin));

    qrCodes.forEach((code, index) => {
      if (index > 0 && index % qrPerPage === 0) {
        doc.addPage();
      }
      
      const qrCodeElement = document.getElementById(`qr-code-container-${index}`);
      const canvas = qrCodeElement?.querySelector("canvas");

      if (canvas) {
        const dataUrl = canvas.toDataURL("image/png");
        const yPos = margin + (index % qrPerPage) * (qrSize + margin);
        doc.addImage(dataUrl, "PNG", margin, yPos, qrSize, qrSize);
        doc.text(code, margin + qrSize + 10, yPos + qrSize / 2);
      }
    });

    doc.save("qr_codes.pdf");
    toast.success("Downloading PDF file...");
  };

  const handleSetQrOptions = (options: QrOptions) => {
    setQrOptions(options);
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-grow">
        {!csvData ? (
          <FileUpload onUpload={handleFileUpload} />
        ) : (
          qrCodes.length === 0 ? (
            <DataTable data={csvData} />
          ) : (
            <QrGrid codes={qrCodes} qrOptions={qrOptions} />
          )
        )}
      </div>
      {csvData && (
        <aside className="lg:w-1/3 xl:w-1/4">
          <Sidebar 
            headers={csvData.headers}
            selectedColumns={selectedColumns}
            setSelectedColumns={setSelectedColumns}
            onGenerate={handleGenerateQrs}
            onDownloadZip={handleDownloadZip}
            onDownloadPdf={handleDownloadPdf}
            qrCodesGenerated={qrCodes.length > 0}
            setQrOptions={handleSetQrOptions}
          />
        </aside>
      )}
    </div>
  );
}