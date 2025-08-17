"use client";

import { useEffect, useRef } from "react";
import QRCodeStyling, {
  Options as QRCodeStylingOptions,
} from "qr-code-styling";
import { QrOptions } from "./Sidebar";

interface QrPreviewProps {
  qrOptions: QrOptions;
}

const FIXED_PREVIEW_SIZE = 150;

export default function QrPreview({ qrOptions }: QrPreviewProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const options: QRCodeStylingOptions = {
        width: FIXED_PREVIEW_SIZE,
        height: FIXED_PREVIEW_SIZE,
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

      const qrElement =
        ref.current.querySelector("canvas") || ref.current.querySelector("svg");
      if (qrElement) {
        qrElement.style.width = "85%";
        qrElement.style.height = "auto";
        qrElement.style.display = "block";
      }
    }
  }, [qrOptions]);

  return (
    <>
    <div
        ref={ref}
        className="w-full flex flex-col justify-center items-center aspect-square"
      ></div>
    </>
  );
}
