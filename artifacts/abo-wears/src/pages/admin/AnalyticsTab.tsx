import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Eye, Calendar } from "lucide-react";
import { useState } from "react";

type Range = "7" | "30";

function useAnalytics(days: Range) {
  return useQuery({
    queryKey: ["analytics", days],
    queryFn: async () => {
      const since = new Date(Date.now() - parseInt(days) * 24 * 60 * 60 * 1000).toISOString();
      const { data, error } = await supabase
        .from("page_views")
        .select("page, viewed_at")
        .gte("viewed_at", since)
        .order("viewed_at", { ascending: true });
      if (error) return { byDay: [], byPage: [], total: 0 };

      const views = data ?? [];
      const total = views.length;

      // By day
      const dayMap: Record<string, number> = {};
      const today = new Date();
      for (let i = parseInt(days) - 1; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const key = d.toISOString().split("T")[0];
        dayMap[key] = 0;
      }
      for (const v of views) {
        const key = v.viewed_at.split("T")[0];
        if (dayMap[key] !== undefined) dayMap[key]++;
      }
      const byDay = Object.entries(dayMap).map(([date, count]) => ({
        date: date.slice(5), // MM-DD
        count,
      }));

      // By page
      const PAGE_LABELS: Record<string, string> = {
        "/": "Home",
        "/jerseys": "Jerseys",
        "/joggers": "Joggers",
        "/shorts": "Shorts",
        "/face-caps": "Face Caps",
        "/gloves": "GYM Wears",
        "/about": "About",
        "/cart": "Cart",
        "/category/gloves": "GYM Wears",
        "/category/joggers": "Joggers",
        "/category/shorts": "Shorts",
        "/category/face-caps": "Face Caps",
      };
      const getPageLabel = (p: string) => {
        if (PAGE_LABELS[p]) return PAGE_LABELS[p];
        if (p.startsWith("/promo/")) return "Promo Page";
        return p;
      };
      const pageMap: Record<string, number> = {};
      for (const v of views) {
        const label = getPageLabel(v.page);
        pageMap[label] = (pageMap[label] ?? 0) + 1;
      }
      const byPage = Object.entries(pageMap)
        .sort(([, a], [, b]) => b - a)
        .map(([page, count]) => ({ page, count }));

      return { byDay, byPage, total };
    },
    staleTime: 60 * 1000,
    refetchInterval: 2 * 60 * 1000,
  });
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#111111] border border-gray-700 rounded-lg px-3 py-2 text-sm">
        <p className="text-gray-400">{label}</p>
        <p className="text-[#22c55e] font-bold">{payload[0].value} views</p>
      </div>
    );
  }
  return null;
};

export function AnalyticsTab() {
  const [range, setRange] = useState<Range>("7");
  const { data, isLoading } = useAnalytics(range);

  const today = new Date().toISOString().split("T")[0];
  const todayViews = data?.byDay.find((d) => d.date === today.slice(5))?.count ?? 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Site Analytics</h2>
          <p className="text-gray-400 text-sm">Page views tracked from your store visitors</p>
        </div>
        <div className="flex rounded-xl bg-[#1a1a1a] border border-gray-800 p-1">
          {(["7", "30"] as Range[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                range === r ? "bg-[#22c55e] text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              {r}d
            </button>
          ))}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wide mb-2">
            <Eye size={14} /> Total Views ({range}d)
          </div>
          <p className="text-3xl font-bold text-white">{isLoading ? "—" : (data?.total ?? 0).toLocaleString()}</p>
        </div>
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wide mb-2">
            <Calendar size={14} /> Today
          </div>
          <p className="text-3xl font-bold text-white">{isLoading ? "—" : todayViews}</p>
        </div>
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wide mb-2">
            <TrendingUp size={14} /> Daily Avg ({range}d)
          </div>
          <p className="text-3xl font-bold text-white">
            {isLoading ? "—" : Math.round((data?.total ?? 0) / parseInt(range))}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 mb-8">
        <h3 className="text-white font-semibold mb-4">Views Per Day</h3>
        {isLoading ? (
          <div className="h-48 flex items-center justify-center text-gray-500">Loading chart...</div>
        ) : (data?.total ?? 0) === 0 ? (
          <div className="h-48 flex items-center justify-center text-gray-600 text-sm">
            No data yet — views will appear here as visitors browse your site.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data?.byDay ?? []} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
              <XAxis dataKey="date" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "#ffffff10" }} />
              <Bar dataKey="count" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* By Page */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5">
        <h3 className="text-white font-semibold mb-4">Views by Page</h3>
        {(data?.byPage ?? []).length === 0 ? (
          <p className="text-gray-600 text-sm">No page data yet.</p>
        ) : (
          <div className="space-y-3">
            {data?.byPage.map(({ page, count }) => {
              const max = data.byPage[0]?.count ?? 1;
              const pct = Math.round((count / max) * 100);
              return (
                <div key={page}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-300 text-sm font-mono">{page}</span>
                    <span className="text-[#22c55e] font-bold text-sm">{count}</span>
                  </div>
                  <div className="w-full h-2 bg-[#111111] rounded-full overflow-hidden">
                    <div className="h-full bg-[#22c55e] rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
