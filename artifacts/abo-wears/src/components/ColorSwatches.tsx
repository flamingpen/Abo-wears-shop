import { getColorHex, getColorLetter, isLightColor } from "@/lib/colors";

interface ColorSwatchesProps {
  colors: string[];
  maxShow?: number;
  size?: "sm" | "md";
  selected?: string;
  onSelect?: (color: string) => void;
}

export function ColorSwatches({
  colors,
  maxShow = 6,
  size = "sm",
  selected,
  onSelect,
}: ColorSwatchesProps) {
  if (!colors || colors.length === 0) return null;

  const shown = colors.slice(0, maxShow);
  const extra = colors.length - maxShow;
  const dim = size === "sm" ? "w-7 h-7 text-[9px]" : "w-8 h-8 text-[10px]";
  const interactive = !!onSelect;

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {shown.map((color) => {
        const hex = getColorHex(color);
        const letter = getColorLetter(color);
        const light = isLightColor(color);
        const isSelected = selected === color;

        return (
          <button
            key={color}
            type="button"
            disabled={!interactive}
            onClick={() => onSelect?.(color)}
            title={color}
            className={`${dim} rounded-full flex items-center justify-center font-bold shrink-0 transition-all
              ${interactive ? "cursor-pointer hover:scale-110 active:scale-95" : "cursor-default"}
              ${isSelected
                ? "ring-2 ring-offset-2 ring-[#22c55e] scale-110 shadow-md"
                : "ring-1 ring-gray-300/40"
              }`}
            style={{
              backgroundColor: hex,
              color: light ? "#333" : "#fff",
            }}
          >
            <span className="leading-none font-extrabold">{letter}</span>
          </button>
        );
      })}
      {extra > 0 && (
        <span className="text-[10px] text-muted-foreground font-semibold">+{extra}</span>
      )}
    </div>
  );
}
