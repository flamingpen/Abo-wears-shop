export const AVAILABLE_COLORS: { name: string; hex: string }[] = [
  { name: "Black",  hex: "#111111" },
  { name: "White",  hex: "#F5F5F5" },
  { name: "Red",    hex: "#EF4444" },
  { name: "Blue",   hex: "#3B82F6" },
  { name: "Navy",   hex: "#1E3A5F" },
  { name: "Green",  hex: "#22C55E" },
  { name: "Yellow", hex: "#EAB308" },
  { name: "Orange", hex: "#F97316" },
  { name: "Purple", hex: "#A855F7" },
  { name: "Grey",   hex: "#6B7280" },
  { name: "Brown",  hex: "#92400E" },
  { name: "Pink",   hex: "#EC4899" },
  { name: "Gold",   hex: "#D97706" },
  { name: "Maroon", hex: "#7F1D1D" },
];

export function getColorHex(name: string): string {
  return AVAILABLE_COLORS.find((c) => c.name === name)?.hex ?? "#CCCCCC";
}
