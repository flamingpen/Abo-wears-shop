export const AVAILABLE_COLORS: { name: string; hex: string; letter: string }[] = [
  { name: "Black",  hex: "#111111", letter: "B"  },
  { name: "White",  hex: "#F5F5F5", letter: "W"  },
  { name: "Red",    hex: "#EF4444", letter: "R"  },
  { name: "Blue",   hex: "#3B82F6", letter: "Bl" },
  { name: "Navy",   hex: "#1E3A5F", letter: "N"  },
  { name: "Green",  hex: "#22C55E", letter: "G"  },
  { name: "Yellow", hex: "#EAB308", letter: "Y"  },
  { name: "Orange", hex: "#F97316", letter: "O"  },
  { name: "Purple", hex: "#A855F7", letter: "P"  },
  { name: "Grey",   hex: "#6B7280", letter: "Gr" },
  { name: "Brown",  hex: "#92400E", letter: "Br" },
  { name: "Pink",   hex: "#EC4899", letter: "Pi" },
  { name: "Gold",   hex: "#D97706", letter: "Go" },
  { name: "Maroon", hex: "#7F1D1D", letter: "M"  },
  { name: "Olive",  hex: "#6B7C32", letter: "Ol" },
];

export function getColorHex(name: string): string {
  return AVAILABLE_COLORS.find((c) => c.name === name)?.hex ?? "#CCCCCC";
}

export function getColorLetter(name: string): string {
  return AVAILABLE_COLORS.find((c) => c.name === name)?.letter ?? name[0];
}

export function isLightColor(name: string): boolean {
  return ["White", "Yellow", "Gold"].includes(name);
}
