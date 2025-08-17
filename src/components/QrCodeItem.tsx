'use client';

import { useEffect, useRef } from "react";
import QRCodeStyling, { Options as QRCodeStylingOptions } from "qr-code-styling";
import { QrOptions } from "./Sidebar";

interface QrCodeItemProps {
  code: string;
  qrOptions: QrOptions; // Still need qrOptions for colors/logo
}

export default function QrCodeItem({ code, qrOptions }: QrCodeItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const options: QRCodeStylingOptions = {
        width: 150, // Fixed display size
        height: 150, // Fixed display size
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
      ref.current.innerHTML = ""; // Clear previous QR code
      qrCode.append(ref.current);
    }
  }, [code, qrOptions]); // qrOptions is still a dependency for colors/logo

  return <div ref={ref} />;
}
