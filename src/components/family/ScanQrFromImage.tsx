import { useRef, useState } from "react";
import QrScanner from "qr-scanner";

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

    setStatus("Decoding QR...");
    try {
      const result = await QrScanner.scanImage(file, {
        returnDetailedScanResult: true,
      });
      const text = result.data.trim();
      onUidDetected(text);
      setStatus("QR scanned successfully.");
    } catch (err) {
      console.error("QR decode error", err);
      setStatus("Could not read QR. Please try another image.");
    } finally {
      e.target.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handlePickImage}
        className="rounded-full bg-emerald-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-emerald-700 transition-colors"
      >
        Pick QR from gallery
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
