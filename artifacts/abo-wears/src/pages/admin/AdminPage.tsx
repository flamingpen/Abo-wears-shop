import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { AdminLogin } from "./AdminLogin";
import { ProductsTab } from "./ProductsTab";
import { CategoriesTab } from "./CategoriesTab";
import { PromosTab } from "./PromosTab";
import { AnalyticsTab } from "./AnalyticsTab";
import { Link } from "wouter";
import { Package, LayoutGrid, Tag, BarChart2, LogOut, ExternalLink } from "lucide-react";
import type { Session } from "@supabase/supabase-js";

const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS ?? "")
  .split(",")
  .map((e: string) => e.trim().toLowerCase());

type Tab = "products" | "categories" | "promos" | "analytics";

const NAV_ITEMS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "products", label: "Products", icon: <Package size={18} /> },
  { id: "categories", label: "Categories", icon: <LayoutGrid size={18} /> },
  { id: "promos", label: "Promos", icon: <Tag size={18} /> },
  { id: "analytics", label: "Analytics", icon: <BarChart2 size={18} /> },
];

function Unauthorized({ onSignOut }: { onSignOut: () => void }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 text-center">
      <div>
        <div className="text-6xl mb-4">🚫</div>
        <h1 className="text-white font-bold text-2xl mb-2">Access Denied</h1>
        <p className="text-gray-400 mb-6">Your account is not authorized for the admin dashboard.</p>
        <button
          onClick={onSignOut}
          className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("products");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    setSession(null);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#22c55e] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return <AdminLogin onLogin={() => supabase.auth.getSession().then(({ data }) => setSession(data.session))} />;
  }

  const userEmail = session.user.email ?? "";
  if (!ADMIN_EMAILS.includes(userEmail.toLowerCase())) {
    return <Unauthorized onSignOut={handleSignOut} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar — desktop */}
      <aside className="hidden md:flex flex-col w-60 bg-[#111111] border-r border-gray-800 shrink-0">
        <div className="p-5 border-b border-gray-800">
          <Link href="/" className="flex items-center gap-1">
            <span className="font-display text-xl tracking-widest text-white">ABO</span>
            <span className="font-display text-xl tracking-widest text-[#22c55e]">WEARS</span>
          </Link>
          <p className="text-gray-500 text-xs mt-1">Admin Dashboard</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === item.id
                  ? "bg-[#22c55e] text-black"
                  : "text-gray-400 hover:bg-[#1a1a1a] hover:text-white"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white text-xs transition-colors"
          >
            <ExternalLink size={13} /> View Store
          </Link>
          <div className="text-gray-600 text-xs truncate">{userEmail}</div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 text-xs transition-colors"
          >
            <LogOut size={13} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[#111111] border-b border-gray-800 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="font-display text-lg tracking-widest text-white">ABO</span>
          <span className="font-display text-lg tracking-widest text-[#22c55e]">WEARS</span>
          <span className="text-gray-500 text-xs ml-1">Admin</span>
        </div>
        <button onClick={() => setMobileNavOpen((o) => !o)} className="text-gray-400 hover:text-white">
          <LayoutGrid size={20} />
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileNavOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-black/70" onClick={() => setMobileNavOpen(false)}>
          <div className="absolute top-14 left-0 right-0 bg-[#111111] border-b border-gray-800 p-3" onClick={(e) => e.stopPropagation()}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setMobileNavOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === item.id ? "bg-[#22c55e] text-black" : "text-gray-400"
                }`}
              >
                {item.icon} {item.label}
              </button>
            ))}
            <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 text-sm">
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 min-h-screen md:overflow-y-auto">
        <div className="pt-14 md:pt-0 p-5 md:p-8 max-w-5xl mx-auto">
          {/* Desktop tab header */}
          <div className="hidden md:flex items-center justify-between mb-8">
            <div className="flex gap-1 bg-[#111111] border border-gray-800 rounded-xl p-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === item.id
                      ? "bg-[#22c55e] text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.icon} {item.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors">
                <ExternalLink size={14} /> View Store
              </Link>
              <button onClick={handleSignOut} className="flex items-center gap-1.5 text-red-400 hover:text-red-300 text-sm transition-colors">
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          </div>

          {activeTab === "products" && <ProductsTab />}
          {activeTab === "categories" && <CategoriesTab />}
          {activeTab === "promos" && <PromosTab />}
          {activeTab === "analytics" && <AnalyticsTab />}
        </div>
      </main>
    </div>
  );
}
