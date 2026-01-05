import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import QRCode from "react-qr-code";
import { auth } from "../../lib/firebase";

export default function UserQr() {
  const [uid, setUid] = useState("");
  const [isReady, setIsReady] = useState(false); // avoid flicker
  const qrRef = useRef(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUid(user ? user.uid : "");
      setIsReady(true);
    });
    return () => unsub();
  }, []);

  const handleDownload = () => {
    if (!qrRef.current) return;

    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      URL.revokeObjectURL(url);
      const pngUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = "patient-qr.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    img.src = url;
  };

  if (!isReady) {
    // wait until Firebase auth state is known → prevents blinking
    return null;
  }

  if (!uid) {
    return (
      <p className="text-sm text-gray-500">Login to see your QR.</p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div ref={qrRef} className="bg-white p-3 rounded shadow">
        <QRCode value={uid} size={100} />
      </div>

      <button
        onClick={handleDownload}
        className="rounded bg-teal-600 px-3 py-1 text-xs font-semibold text-white hover:bg-teal-700"
      >
        Download QR
      </button>
    </div>
  );
}
