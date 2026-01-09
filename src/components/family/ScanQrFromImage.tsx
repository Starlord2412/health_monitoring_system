// src/components/ScanQrFromImage.tsx
import React, { useRef, useState } from "react";
import jsQR from "jsqr";

type Props = {
  onUidDetected: (uid: string) => void;
};

export default function ScanQrFromImage({ onUidDetected }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [status, setStatus] = useState<string>("");

  const handlePickImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus("Reading image...");

    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setStatus("Could not get canvas context");
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );

        const code = jsQR(
          imageData.data,
          imageData.width,
          imageData.height
        );

        if (code && code.data) {
          console.log("QR decoded:", code);
          setStatus("QR detected ✔");
          // If your QR contains only the UID, this is fine.
          // If it contains JSON, parse it and extract uid.
          onUidDetected(code.data.trim());
        } else {
          setStatus("No QR code found in image");
        }
      };
      img.onerror = () => {
        setStatus("Could not load image");
      };
      img.src = reader.result as string;
    };

    reader.onerror = () => {
      setStatus("Error reading file");
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={handlePickImage}
        className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-medium text-white hover:bg-emerald-700"
      >
        Scan QR from gallery
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {status && (
        <p className="text-[11px] text-slate-500">{status}</p>
      )}
    </div>
  );
}
