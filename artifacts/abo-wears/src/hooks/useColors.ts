import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { AVAILABLE_COLORS } from "@/lib/colors";

export type ColorDef = { name: string; hex: string; letter: string };

export function useColors() {
  return useQuery<ColorDef[]>({
    queryKey: ["colors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("colors")
        .select("name, hex, letter")
        .order("created_at", { ascending: true });
      if (error) return AVAILABLE_COLORS;
      const customNames = new Set((data ?? []).map((c) => c.name));
      const base = AVAILABLE_COLORS.filter((c) => !customNames.has(c.name));
      return [...base, ...(data ?? [])];
    },
    staleTime: 60_000,
  });
}

export function useAddColor() {
  const qc = useQueryClient();
  return async (color: Omit<ColorDef, "id">) => {
    const { error } = await supabase.from("colors").insert(color);
    if (error) throw error;
    qc.invalidateQueries({ queryKey: ["colors"] });
  };
}

export function useDeleteColor() {
  const qc = useQueryClient();
  return async (name: string) => {
    const { error } = await supabase.from("colors").delete().eq("name", name);
    if (error) throw error;
    qc.invalidateQueries({ queryKey: ["colors"] });
  };
}
