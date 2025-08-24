"use client";

import { useEffect, useRef } from "react";
import QRCodeStyling, {
  Options as QRCodeStylingOptions,
} from "qr-code-styling";
import { QrOptions } from "./Sidebar";

interface QrCodeItemProps {
  code: string;
  qrOptions: QrOptions;
}

const FIXED_DISPLAY_SIZE = 150;

export default function QrCodeItem({ code, qrOptions }: QrCodeItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const options: QRCodeStylingOptions = {
        width: FIXED_DISPLAY_SIZE,
        height: FIXED_DISPLAY_SIZE,
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
      ref.current.innerHTML = "";
      qrCode.append(ref.current);

      const qrElement =
        ref.current.querySelector("canvas") || ref.current.querySelector("svg");
      if (qrElement) {
        qrElement.style.width = "100%";
        qrElement.style.height = "auto";
        qrElement.style.display = "block";
      }
    }
  }, [code, qrOptions]);

  return (
    <div
      ref={ref}
      className="w-full flex flex-col justify-center items-center aspect-square"
    ></div>
  );
}
