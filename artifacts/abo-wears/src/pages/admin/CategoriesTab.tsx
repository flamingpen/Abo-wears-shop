import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useCategories } from "@/hooks/useProducts";
import { Plus, Pencil, Trash2, X } from "lucide-react";

const EMPTY_FORM = { id: "", label: "", icon: "", description: "", is_jersey_type: false };

export function CategoriesTab() {
  const qc = useQueryClient();
  const { data: categories = [], isLoading } = useCategories();

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function openAdd() {
    setForm({ ...EMPTY_FORM });
    setIsEdit(false);
    setErr("");
    setOpen(true);
  }

  function openEdit(c: { id: string; label: string; icon: string; description: string; href: string }) {
    setForm({
      id: c.id,
      label: c.label,
      icon: c.icon,
      description: c.description,
      is_jersey_type: c.href === "/jerseys",
    });
    setIsEdit(true);
    setErr("");
    setOpen(true);
  }

  async function handleSave() {
    if (!form.label.trim() || !form.icon.trim()) {
      setErr("Name and icon are required.");
      return;
    }
    setSaving(true);
    setErr("");
    const id = isEdit ? form.id : form.label.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const href = form.is_jersey_type ? "/jerseys" : `/category/${id}`;
    const payload = {
      label: form.label.trim(),
      icon: form.icon.trim(),
      description: form.description.trim(),
      href,
      active: true,
    };
    let error;
    if (isEdit) {
      ({ error } = await supabase.from("categories").update(payload).eq("id", form.id));
    } else {
      ({ error } = await supabase.from("categories").insert({ id, ...payload, sort_order: 99 }));
    }
    setSaving(false);
    if (error) { setErr(error.message); return; }
    qc.invalidateQueries({ queryKey: ["categories"] });
    setOpen(false);
  }

  async function handleDelete(id: string) {
    await supabase.from("categories").update({ active: false }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["categories"] });
    setDeleteId(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Product Categories</h2>
          <p className="text-gray-400 text-sm">
            Add new product types — they'll automatically appear on the homepage
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold px-4 py-2 rounded-lg text-sm transition-colors"
        >
          <Plus size={16} /> Add Category
        </button>
      </div>

      {isLoading ? (
        <div className="text-gray-400 text-sm py-8 text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(categories as Array<{ id: string; label: string; icon: string; description: string; href: string }>).map((c) => (
            <div
              key={c.id}
              className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 flex items-start justify-between"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{c.icon}</span>
                <div>
                  <p className="text-white font-semibold">{c.label}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{c.description || "—"}</p>
                  <p className="text-gray-600 text-xs mt-1 font-mono">{c.href}</p>
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <button
                  onClick={() => openEdit(c)}
                  className="p-1.5 rounded-lg bg-[#111111] hover:bg-[#22c55e]/20 text-gray-400 hover:text-[#22c55e] transition-colors"
                >
                  <Pencil size={13} />
                </button>
                <button
                  onClick={() => setDeleteId(c.id)}
                  className="p-1.5 rounded-lg bg-[#111111] hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New Category Info Box */}
      <div className="mt-6 bg-[#22c55e]/5 border border-[#22c55e]/20 rounded-xl p-4">
        <p className="text-[#22c55e] text-sm font-semibold mb-1">💡 Adding New Product Types</p>
        <p className="text-gray-400 text-xs leading-relaxed">
          When you add a new category (e.g., "Boots"), a page is automatically created at{" "}
          <code className="text-gray-300">/category/boots</code> and the link appears in the homepage
          navigation. Then add products under that category in the Products tab.
        </p>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-gray-800 rounded-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h3 className="text-white font-bold text-lg">{isEdit ? "Edit Category" : "Add New Category"}</h3>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1.5">Icon *</label>
                  <input
                    value={form.icon}
                    onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
                    placeholder="⚽"
                    className="w-full bg-[#1a1a1a] border border-gray-700 text-white rounded-lg px-3 py-2.5 text-lg text-center focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1.5">Category Name *</label>
                  <input
                    value={form.label}
                    onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
                    placeholder="e.g. Football Boots"
                    disabled={isEdit}
                    className="w-full bg-[#1a1a1a] border border-gray-700 text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e] placeholder:text-gray-600 disabled:opacity-50"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1.5">Description</label>
                <input
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Short description of this category"
                  className="w-full bg-[#1a1a1a] border border-gray-700 text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e] placeholder:text-gray-600"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_jersey_type}
                    onChange={(e) => setForm((f) => ({ ...f, is_jersey_type: e.target.checked }))}
                    className="w-4 h-4 accent-[#22c55e]"
                  />
                  <span className="text-sm text-gray-300">This is a jersey sub-type (shows as tab on Jerseys page)</span>
                </label>
                <p className="text-gray-600 text-xs mt-1 pl-6">
                  {form.is_jersey_type
                    ? "Link will go to /jerseys"
                    : `Link will go to /category/${form.label.toLowerCase().replace(/\s+/g, "-") || "..."}`}
                </p>
              </div>
              {err && <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">{err}</div>}
              <div className="flex gap-3 pt-2">
                <button onClick={() => setOpen(false)} className="flex-1 py-2.5 rounded-lg border border-gray-700 text-gray-400 hover:text-white text-sm">Cancel</button>
                <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 rounded-lg bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold text-sm disabled:opacity-60">
                  {saving ? "Saving..." : isEdit ? "Save" : "Add Category"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6 max-w-sm w-full text-center">
            <Trash2 size={40} className="text-red-400 mx-auto mb-4" />
            <h3 className="text-white font-bold text-lg mb-2">Hide Category?</h3>
            <p className="text-gray-400 text-sm mb-6">This will hide the category from the site. Products won't be deleted.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-lg border border-gray-700 text-gray-400 text-sm">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 rounded-lg bg-red-500 text-white font-bold text-sm">Hide</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
