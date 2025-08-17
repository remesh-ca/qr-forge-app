"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import QrCodeItem from "./QrCodeItem";
import { QrOptions } from "./Sidebar";
import QRCodeStyling, {
  Options as QRCodeStylingOptions,
} from "qr-code-styling";

interface QrGridProps {
  codes: string[];
  qrOptions: QrOptions;
}

export default function QrGrid({ codes, qrOptions }: QrGridProps) {
  const downloadQrCode = (code: string, index: number) => {
    const options: QRCodeStylingOptions = {
      width: qrOptions.size,
      height: qrOptions.size,
      data: code,
      margin: 5,
      type: qrOptions.fileExtension === "svg" ? "svg" : "canvas",
      dotsOptions: {
        color: qrOptions.foregroundColor,
      },
      backgroundOptions: {
        color: qrOptions.backgroundColor,
      },
      image: qrOptions.logo,
      imageOptions: {
        margin: 4,
        imageSize: 0.4,
      },
    };
    const qrCode = new QRCodeStyling(options);
    qrCode.download({
      name: `qr_code_${index + 1}`,
      extension: qrOptions.fileExtension,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Step 3: Your QR Codes</CardTitle>
        <CardDescription>
          Here are your generated QR codes. Use the sidebar to download them in
          different formats.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {codes.map((code, i) => (
          <Card
            key={i}
            className="flex flex-col items-center justify-between p-4 gap-3 min-h-[250px]"
          >
            <div id={`qr-code-container-${i}`}>
              <QrCodeItem code={code} qrOptions={qrOptions} />
            </div>
            <p className="text-xs text-center break-all">
              {code.length > 20 ? code.slice(0, 20) + "..." : code}
            </p>

            <Button
              variant="outline"
              size="sm"
              onClick={() => downloadQrCode(code, i)}
            >
              <Download className="h-4 w-4 mr-2" />
              {qrOptions.fileExtension.toUpperCase()}
            </Button>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
