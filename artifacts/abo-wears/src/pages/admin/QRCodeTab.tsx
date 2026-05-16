import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Download, ExternalLink } from "lucide-react";

const STORE_URL = "https://abowears.com.ng";

export function QRCodeTab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataUrl, setDataUrl] = useState("");

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, STORE_URL, {
      width: 320,
      margin: 3,
      color: { dark: "#000000", light: "#ffffff" },
    });
    QRCode.toDataURL(STORE_URL, {
      width: 600,
      margin: 3,
      color: { dark: "#000000", light: "#ffffff" },
    }).then(setDataUrl);
  }, []);

  function handleDownload() {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "abowears-qr-code.png";
    a.click();
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-white text-xl font-bold mb-1">Store QR Code</h2>
        <p className="text-gray-400 text-sm">
          Scan to visit{" "}
          <a href={STORE_URL} target="_blank" rel="noopener noreferrer" className="text-[#22c55e] hover:underline inline-flex items-center gap-1">
            {STORE_URL} <ExternalLink size={11} />
          </a>
        </p>
      </div>

      <div className="flex flex-col items-center gap-6 bg-[#111] border border-gray-800 rounded-2xl p-8 max-w-sm">
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <canvas ref={canvasRef} />
        </div>

        <div className="text-center">
          <p className="text-gray-300 text-sm font-semibold mb-0.5">ABO Wears</p>
          <p className="text-gray-500 text-xs">{STORE_URL}</p>
        </div>

        <button
          onClick={handleDownload}
          disabled={!dataUrl}
          className="w-full flex items-center justify-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] disabled:opacity-50 text-black font-bold px-6 py-3 rounded-xl text-sm transition-colors"
        >
          <Download size={16} />
          Download QR Code (PNG)
        </button>
      </div>
    </div>
  );
}
