import { useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Upload, Link2, Loader2, ImageIcon } from "lucide-react";
import { resolveImageUrl, isSpecialShareUrl } from "@/lib/resolveImageUrl";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  bucket?: string;
  folder?: string;
  label?: string;
}

export function ImageUpload({
  value,
  onChange,
  bucket = "product-images",
  folder = "uploads",
  label = "Product Image",
}: ImageUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [resolving, setResolving] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB.");
      return;
    }

    setUploading(true);
    setError("");

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadErr } = await supabase.storage
      .from(bucket)
      .upload(path, file, { cacheControl: "3600", upsert: false });

    if (uploadErr) {
      if (uploadErr.message.includes("Bucket not found") || uploadErr.message.includes("bucket")) {
        setError('Storage not set up yet. Go to Supabase → Storage → Create bucket "product-images" (public).');
      } else {
        setError(uploadErr.message);
      }
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);

    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleUrlBlur() {
    if (!value || !isSpecialShareUrl(value)) return;
    setResolving(true);
    setError("");
    const resolved = await resolveImageUrl(value);
    setResolving(false);
    if (resolved !== value) {
      onChange(resolved);
    } else {
      setError("Couldn't extract an image from that link. Try right-clicking the image and copying the direct image address.");
    }
  }

  async function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const pasted = e.clipboardData.getData("text").trim();
    if (!pasted || !isSpecialShareUrl(pasted)) return;
    e.preventDefault();
    onChange(pasted);
    setResolving(true);
    setError("");
    const resolved = await resolveImageUrl(pasted);
    setResolving(false);
    if (resolved !== pasted) {
      onChange(resolved);
    } else {
      setError("Couldn't extract an image from that link. Try right-clicking the image and copying the direct image address.");
    }
  }

  return (
    <div>
      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-2">
        {label}
      </label>

      <div className="flex rounded-xl bg-[#0f0f0f] border border-gray-800 p-1 mb-3">
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
            mode === "upload"
              ? "bg-[#22c55e] text-black"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Upload size={13} />
          Upload from Device
        </button>
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
            mode === "url"
              ? "bg-[#22c55e] text-black"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Link2 size={13} />
          Paste URL
        </button>
      </div>

      {mode === "upload" ? (
        <div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
            id={`img-upload-${label.replace(/\s/g, "-")}`}
          />
          <label
            htmlFor={`img-upload-${label.replace(/\s/g, "-")}`}
            className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-6 cursor-pointer transition-colors ${
              uploading
                ? "border-gray-700 bg-[#1a1a1a] cursor-not-allowed"
                : "border-gray-700 hover:border-[#22c55e] bg-[#1a1a1a] hover:bg-[#22c55e]/5"
            }`}
          >
            {uploading ? (
              <>
                <Loader2 size={24} className="text-[#22c55e] animate-spin" />
                <p className="text-gray-400 text-sm">Uploading...</p>
              </>
            ) : value ? (
              <>
                <img
                  src={value}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-xl"
                />
                <p className="text-gray-400 text-xs text-center">Tap to change image</p>
              </>
            ) : (
              <>
                <ImageIcon size={28} className="text-gray-600" />
                <div className="text-center">
                  <p className="text-white text-sm font-semibold">Tap to upload</p>
                  <p className="text-gray-500 text-xs mt-1">
                    Choose from your gallery or take a photo
                  </p>
                  <p className="text-gray-600 text-xs mt-1">PNG, JPG, WebP up to 5MB</p>
                </div>
              </>
            )}
          </label>
        </div>
      ) : (
        <div>
          <div className="relative">
            <input
              type="text"
              value={value}
              onChange={(e) => { onChange(e.target.value); setError(""); }}
              onBlur={handleUrlBlur}
              onPaste={handlePaste}
              placeholder="Paste a direct link, Google image link, or Instagram post link"
              className="w-full bg-[#1a1a1a] border border-gray-700 text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e] placeholder:text-gray-600 pr-10"
            />
            {resolving && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 size={14} className="text-[#22c55e] animate-spin" />
              </div>
            )}
          </div>
          {resolving && (
            <p className="text-gray-400 text-xs mt-1.5">Extracting image from link...</p>
          )}
          {value && !resolving && (
            <img
              src={value}
              alt="Preview"
              className="mt-2 w-20 h-20 object-cover rounded-lg bg-gray-800"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          )}
        </div>
      )}

      {error && (
        <p className="text-red-400 text-xs mt-2 leading-relaxed">{error}</p>
      )}
    </div>
  );
}
