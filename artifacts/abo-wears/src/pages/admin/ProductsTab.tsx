import { useState, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAdminProducts, useCategories } from "@/hooks/useProducts";
import { AVAILABLE_COLORS } from "@/lib/colors";
import { ColorSwatches } from "@/components/ColorSwatches";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Plus, Pencil, Trash2, X, Check, Upload, Loader2 } from "lucide-react";

function formatPrice(n: number) {
  return `₦${Number(n).toLocaleString("en-NG")}`;
}

const EMPTY_FORM = {
  id: "",
  name: "",
  price: "",
  category_id: "",
  images: ["", "", ""] as string[],
  badge: "",
  colors: [] as string[],
  colorImages: {} as Record<string, string[]>,
  active: true,
};

// Single image slot inside a color row
function ColorImageSlot({
  label,
  colorName,
  idx,
  value,
  onChange,
}: {
  label: string;
  colorName: string;
  idx: number;
  value: string;
  onChange: (url: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) return;
    setUploading(true);
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const path = `products/color-${colorName.toLowerCase()}-${idx}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file, { cacheControl: "3600", upsert: false });
    if (!error) {
      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      onChange(data.publicUrl);
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div className="flex items-center gap-2 py-1.5">
      <span className="text-gray-500 text-[10px] w-10 shrink-0">{label}</span>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste URL…"
        className="flex-1 bg-[#0f0f0f] border border-gray-700 text-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#22c55e] placeholder:text-gray-600"
      />
      <input ref={fileRef} type="file" accept="image/*" className="hidden" id={`color-img-${colorName}-${idx}`} onChange={handleFile} />
      <label
        htmlFor={`color-img-${colorName}-${idx}`}
        className="shrink-0 flex items-center gap-1 px-2 py-1.5 rounded-lg bg-[#1a1a1a] border border-gray-700 text-gray-400 hover:text-white hover:border-[#22c55e] cursor-pointer transition-colors text-xs"
      >
        {uploading ? <Loader2 size={11} className="animate-spin" /> : <Upload size={11} />}
      </label>
      {value && (
        <img src={value} alt="" className="w-8 h-8 rounded-md object-cover shrink-0 bg-gray-800 border border-gray-700" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
      )}
    </div>
  );
}

function ColorImageRow({
  colorName,
  colorHex,
  values,
  onChange,
}: {
  colorName: string;
  colorHex: string;
  values: string[];
  onChange: (urls: string[]) => void;
}) {
  function update(i: number, url: string) {
    const next = [...values];
    next[i] = url;
    onChange(next);
  }

  return (
    <div className="border-b border-gray-800 last:border-0 py-2">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-5 h-5 rounded-full border border-gray-600 shrink-0" style={{ backgroundColor: colorHex }} />
        <span className="text-white text-xs font-semibold">{colorName}</span>
      </div>
      {[0, 1, 2].map((i) => (
        <ColorImageSlot
          key={i}
          label={i === 0 ? "Photo 1" : `Photo ${i + 1}`}
          colorName={colorName}
          idx={i}
          value={values[i] ?? ""}
          onChange={(url) => update(i, url)}
        />
      ))}
    </div>
  );
}

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
    setForm({ ...EMPTY_FORM, images: ["", "", ""] });
    setIsEdit(false);
    setErr("");
    setOpen(true);
  }

  function openEdit(p: typeof products[0]) {
    const imgs = p.images ?? [p.image];
    const colorImgs = Object.fromEntries(
      Object.entries(p.colorImages ?? {}).map(([k, v]) => [
        k,
        [v[0] ?? "", v[1] ?? "", v[2] ?? ""],
      ])
    );
    setForm({
      id: p.id,
      name: p.name,
      price: String(p.price),
      category_id: p.category,
      images: [imgs[0] ?? "", imgs[1] ?? "", imgs[2] ?? ""],
      badge: p.badge ?? "",
      colors: p.colors ?? [],
      colorImages: colorImgs,
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

  function setColorImages(colorName: string, urls: string[]) {
    setForm((f) => ({
      ...f,
      colorImages: { ...f.colorImages, [colorName]: urls },
    }));
  }

  function updateImage(i: number, url: string) {
    setForm((f) => {
      const next = [...f.images];
      next[i] = url;
      return { ...f, images: next };
    });
  }

  async function handleSave() {
    const mainImages = form.images.filter((u) => u.trim());
    if (!form.name.trim() || !form.price || !form.category_id || mainImages.length === 0) {
      setErr("Name, price, category, and at least one image are required.");
      return;
    }
    setSaving(true);
    setErr("");

    const cleanColorImages: Record<string, string[]> = {};
    for (const [k, v] of Object.entries(form.colorImages)) {
      const filtered = v.filter((u) => u && u.trim());
      if (filtered.length > 0) cleanColorImages[k] = filtered;
    }

    const payload = {
      name: form.name.trim(),
      price: parseInt(form.price),
      category_id: form.category_id,
      image: mainImages[0],
      images: mainImages,
      badge: form.badge.trim() || null,
      colors: form.colors.length > 0 ? form.colors : null,
      color_images: Object.keys(cleanColorImages).length > 0 ? cleanColorImages : null,
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
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold px-4 py-2 rounded-lg text-sm transition-colors">
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="mb-4">
        <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)}
          className="bg-[#1a1a1a] border border-gray-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#22c55e]">
          <option value="">All Categories</option>
          {(categories as Array<{ id: string; label: string }>).map((c) => (
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
                    <p className="text-white font-medium whitespace-pre-line line-clamp-3">{p.name}</p>
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
                    <button onClick={() => toggleActive(p.id, true)}
                      className="text-xs px-2 py-1 rounded-full bg-[#22c55e]/20 text-[#22c55e]">
                      Active
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(p)}
                        className="p-1.5 rounded-lg bg-[#1a1a1a] hover:bg-[#22c55e]/20 text-gray-400 hover:text-[#22c55e] transition-colors">
                        <Pencil size={13} />
                      </button>
                      <button onClick={() => setDeleteId(p.id)}
                        className="p-1.5 rounded-lg bg-[#1a1a1a] hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors">
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
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">

              {/* Product Name — textarea for multiline */}
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1.5">
                  Product Name * <span className="normal-case font-normal text-gray-600">(press Enter for new line)</span>
                </label>
                <textarea
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder={"e.g. Arsenal 24/25\nHome Jersey"}
                  rows={3}
                  className="w-full bg-[#1a1a1a] border border-gray-700 text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e] placeholder:text-gray-600 resize-none"
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
                    {(categories as Array<{ id: string; label: string }>).map((c) => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 3 Product Image Slots */}
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-2">
                  Product Photos * <span className="normal-case font-normal text-gray-600">(up to 3 — customers can scroll)</span>
                </label>
                <div className="space-y-3">
                  {[0, 1, 2].map((i) => (
                    <ImageUpload
                      key={i}
                      label={i === 0 ? "Photo 1 (Main) *" : `Photo ${i + 1} (optional)`}
                      value={form.images[i] ?? ""}
                      onChange={(url) => updateImage(i, url)}
                      folder="products"
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1.5">Badge (optional)</label>
                <input
                  value={form.badge}
                  onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value }))}
                  placeholder="e.g. New, 🔥 Hot, Best Seller"
                  className="w-full bg-[#1a1a1a] border border-gray-700 text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e] placeholder:text-gray-600"
                />
              </div>

              {/* Colour Picker */}
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-2">
                  Available Colours <span className="text-gray-600 normal-case font-normal">(select all that apply)</span>
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
                          selected ? "border-[#22c55e] bg-[#22c55e]/10 text-white" : "border-gray-700 bg-[#1a1a1a] text-gray-400"
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full border border-gray-600 shrink-0" style={{ backgroundColor: c.hex }} />
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

              {/* Per-colour Photos */}
              {form.colors.length > 0 && (
                <div className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-4">
                  <p className="text-white text-xs font-bold uppercase tracking-wide mb-1">Colour Photos</p>
                  <p className="text-gray-500 text-[11px] mb-3">
                    Add up to 3 photos per colour so customers can scroll through each variant.
                  </p>
                  {form.colors.map((colorName) => {
                    const colorDef = AVAILABLE_COLORS.find((c) => c.name === colorName);
                    return (
                      <ColorImageRow
                        key={colorName}
                        colorName={colorName}
                        colorHex={colorDef?.hex ?? "#888"}
                        values={form.colorImages[colorName] ?? ["", "", ""]}
                        onChange={(urls) => setColorImages(colorName, urls)}
                      />
                    );
                  })}
                </div>
              )}

              {err && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">{err}</div>
              )}
              <div className="flex gap-3 pt-2">
                <button onClick={() => setOpen(false)}
                  className="flex-1 py-2.5 rounded-lg border border-gray-700 text-gray-400 hover:text-white text-sm transition-colors">
                  Cancel
                </button>
                <button onClick={handleSave} disabled={saving}
                  className="flex-1 py-2.5 rounded-lg bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold text-sm transition-colors disabled:opacity-60">
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
              <button onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-lg border border-gray-700 text-gray-400 hover:text-white text-sm">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold text-sm">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
