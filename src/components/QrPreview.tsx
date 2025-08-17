'use client';

import { useEffect, useRef } from "react";
import QRCodeStyling, { Options as QRCodeStylingOptions } from "qr-code-styling";
import { QrOptions } from "./Sidebar";

interface QrPreviewProps {
  qrOptions: QrOptions;
}

export default function QrPreview({ qrOptions }: QrPreviewProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const options: QRCodeStylingOptions = {
        width: 150, // Fixed display size
        height: 150, // Fixed display size
        data: "Preview",
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
      ref.current.innerHTML = "";
      qrCode.append(ref.current);
    }
  }, [qrOptions]);

  return <div ref={ref} />;
}