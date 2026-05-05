import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAdminProducts, useCategories } from "@/hooks/useProducts";
import { AVAILABLE_COLORS } from "@/lib/colors";
import { ColorSwatches } from "@/components/ColorSwatches";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";

function formatPrice(n: number) {
  return `₦${Number(n).toLocaleString("en-NG")}`;
}

const EMPTY_FORM = {
  id: "",
  name: "",
  price: "",
  category_id: "",
  image: "",
  badge: "",
  colors: [] as string[],
  active: true,
};

export function ProductsTab() {
  const qc = useQueryClient();
  const { data: products = [], isLoading } = useAdminProducts();
  const { data: categories = [] } = useCategories();

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function openAdd() {
    setForm({ ...EMPTY_FORM });
    setIsEdit(false);
    setErr("");
    setOpen(true);
  }

  function openEdit(p: typeof products[0]) {
    setForm({
      id: p.id,
      name: p.name,
      price: String(p.price),
      category_id: p.category,
      image: p.image,
      badge: p.badge ?? "",
      colors: p.colors ?? [],
      active: true,
    });
    setIsEdit(true);
    setErr("");
    setOpen(true);
  }

  function toggleColor(name: string) {
    setForm((f) => ({
      ...f,
      colors: f.colors.includes(name)
        ? f.colors.filter((c) => c !== name)
        : [...f.colors, name],
    }));
  }

  async function handleSave() {
    if (!form.name.trim() || !form.price || !form.category_id || !form.image.trim()) {
      setErr("Name, price, category, and image are required.");
      return;
    }
    setSaving(true);
    setErr("");
    const payload = {
      name: form.name.trim(),
      price: parseInt(form.price),
      category_id: form.category_id,
      image: form.image.trim(),
      badge: form.badge.trim() || null,
      colors: form.colors.length > 0 ? form.colors : null,
      active: form.active,
      updated_at: new Date().toISOString(),
    };
    let error;
    if (isEdit) {
      ({ error } = await supabase.from("products").update(payload).eq("id", form.id));
    } else {
      const id = `prod-${Date.now()}`;
      ({ error } = await supabase.from("products").insert({ id, ...payload }));
    }
    setSaving(false);
    if (error) { setErr(error.message); return; }
    qc.invalidateQueries({ queryKey: ["admin-products"] });
    qc.invalidateQueries({ queryKey: ["products"] });
    setOpen(false);
  }

  async function handleDelete(id: string) {
    await supabase.from("products").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["admin-products"] });
    qc.invalidateQueries({ queryKey: ["products"] });
    setDeleteId(null);
  }

  async function toggleActive(id: string, current: boolean) {
    await supabase.from("products").update({ active: !current, updated_at: new Date().toISOString() }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["admin-products"] });
    qc.invalidateQueries({ queryKey: ["products"] });
  }

  const displayed = filterCat ? products.filter((p) => p.category === filterCat) : products;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Products</h2>
          <p className="text-gray-400 text-sm">{products.length} total products</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold px-4 py-2 rounded-lg text-sm transition-colors"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Filter */}
      <div className="mb-4">
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="bg-[#1a1a1a] border border-gray-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
        >
          <option value="">All Categories</option>
          {categories.map((c: { id: string; label: string }) => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="text-gray-400 text-sm py-8 text-center">Loading products...</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#1a1a1a] text-gray-400 text-xs uppercase tracking-wide">
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Colors</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayed.map((p, i) => (
                <tr key={p.id} className={`border-t border-gray-800 ${i % 2 === 0 ? "bg-[#111111]" : "bg-[#0f0f0f]"}`}>
                  <td className="px-4 py-3">
                    <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-lg bg-gray-800" />
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-white font-medium line-clamp-1">{p.name}</p>
                    {p.badge && <span className="text-[10px] bg-[#22c55e]/20 text-[#22c55e] px-1.5 py-0.5 rounded-full">{p.badge}</span>}
                  </td>
                  <td className="px-4 py-3 text-gray-400">{p.category}</td>
                  <td className="px-4 py-3 text-[#22c55e] font-bold">{formatPrice(p.price)}</td>
                  <td className="px-4 py-3">
                    {p.colors && p.colors.length > 0 ? (
                      <ColorSwatches colors={p.colors} />
                    ) : (
                      <span className="text-gray-600 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleActive(p.id, true)}
                      className="text-xs px-2 py-1 rounded-full bg-[#22c55e]/20 text-[#22c55e]"
                    >
                      Active
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="p-1.5 rounded-lg bg-[#1a1a1a] hover:bg-[#22c55e]/20 text-gray-400 hover:text-[#22c55e] transition-colors"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        onClick={() => setDeleteId(p.id)}
                        className="p-1.5 rounded-lg bg-[#1a1a1a] hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {displayed.length === 0 && (
            <div className="text-center py-12 text-gray-500 text-sm">No products found.</div>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h3 className="text-white font-bold text-lg">{isEdit ? "Edit Product" : "Add Product"}</h3>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1.5">Product Name *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Arsenal 24/25 Home Jersey"
                  className="w-full bg-[#1a1a1a] border border-gray-700 text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e] placeholder:text-gray-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1.5">Price (₦) *</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    placeholder="15000"
                    className="w-full bg-[#1a1a1a] border border-gray-700 text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e] placeholder:text-gray-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1.5">Category *</label>
                  <select
                    value={form.category_id}
                    onChange={(e) => setForm((f) => ({ ...f, category_id: e.target.value }))}
                    className="w-full bg-[#1a1a1a] border border-gray-700 text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                  >
                    <option value="">Select...</option>
                    {categories.map((c: { id: string; label: string }) => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <ImageUpload
                label="Product Image *"
                value={form.image}
                onChange={(url) => setForm((f) => ({ ...f, image: url }))}
                folder="products"
              />
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1.5">Badge (optional)</label>
                <input
                  value={form.badge}
                  onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value }))}
                  placeholder="e.g. New, 🔥 Hot, Best Seller"
                  className="w-full bg-[#1a1a1a] border border-gray-700 text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e] placeholder:text-gray-600"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-2">
                  Available Colors <span className="text-gray-600 normal-case font-normal">(select all that apply)</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {AVAILABLE_COLORS.map((c) => {
                    const selected = form.colors.includes(c.name);
                    return (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => toggleColor(c.name)}
                        className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs border transition-all ${
                          selected
                            ? "border-[#22c55e] bg-[#22c55e]/10 text-white"
                            : "border-gray-700 bg-[#1a1a1a] text-gray-400"
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-gray-600 shrink-0"
                          style={{ backgroundColor: c.hex }}
                        />
                        {c.name}
                        {selected && <Check size={10} className="text-[#22c55e] ml-auto" />}
                      </button>
                    );
                  })}
                </div>
                {form.colors.length > 0 && (
                  <p className="text-[#22c55e] text-xs mt-2">Selected: {form.colors.join(", ")}</p>
                )}
              </div>

              {err && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">{err}</div>
              )}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setOpen(false)}
                  className="flex-1 py-2.5 rounded-lg border border-gray-700 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 py-2.5 rounded-lg bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold text-sm transition-colors disabled:opacity-60"
                >
                  {saving ? "Saving..." : isEdit ? "Save Changes" : "Add Product"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6 max-w-sm w-full text-center">
            <Trash2 size={40} className="text-red-400 mx-auto mb-4" />
            <h3 className="text-white font-bold text-lg mb-2">Delete Product?</h3>
            <p className="text-gray-400 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-lg border border-gray-700 text-gray-400 hover:text-white text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
