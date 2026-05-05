import { getColorHex } from "@/lib/colors";

interface ColorSwatchesProps {
  colors: string[];
  maxShow?: number;
  size?: "sm" | "md";
}

export function ColorSwatches({ colors, maxShow = 5, size = "sm" }: ColorSwatchesProps) {
  if (!colors || colors.length === 0) return null;

  const shown = colors.slice(0, maxShow);
  const extra = colors.length - maxShow;
  const dim = size === "sm" ? "w-5 h-5 text-[9px]" : "w-6 h-6 text-[10px]";

  return (
    <div className="flex items-center gap-1 flex-wrap mt-2">
      {shown.map((color) => {
        const hex = getColorHex(color);
        const isLight = ["White", "Yellow", "Gold"].includes(color);
        return (
          <div
            key={color}
            className={`${dim} rounded-full border border-gray-300 flex items-center justify-center font-bold shrink-0`}
            style={{ backgroundColor: hex, color: isLight ? "#333" : "#fff" }}
            title={color}
          >
            {color[0]}
          </div>
        );
      })}
      {extra > 0 && (
        <span className="text-[10px] text-muted-foreground font-semibold">+{extra}</span>
      )}
    </div>
  );
}
