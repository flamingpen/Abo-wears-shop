import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAllPromos, usePromoProducts } from "@/hooks/usePromos";
import { Plus, Pencil, Trash2, X, Tag, ToggleLeft, ToggleRight, ChevronDown, ChevronUp } from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import type { DbPromo } from "@/lib/supabase";

function formatPrice(n: number) {
  return `₦${Number(n).toLocaleString("en-NG")}`;
}
function discount(orig: number, promo: number) {
  return Math.round(((orig - promo) / orig) * 100);
}

const EMPTY_PROMO = { title: "", description: "", banner_image: "", banner_pos_x: 50, banner_pos_y: 50 };
const EMPTY_ITEM = { name: "", image: "", original_price: "", promo_price: "" };

function PromoItemsSection({ promoId }: { promoId: string }) {
  const qc = useQueryClient();
  const { data: items = [] } = usePromoProducts(promoId);
  const [form, setForm] = useState({ ...EMPTY_ITEM });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  async function addItem() {
    if (!form.name.trim() || !form.image.trim() || !form.original_price || !form.promo_price) {
      setErr("All fields required."); return;
    }
    const op = parseInt(form.original_price);
    const pp = parseInt(form.promo_price);
    if (pp >= op) { setErr("Promo price must be less than original price."); return; }
    setSaving(true);
    const { error } = await supabase.from("promo_products").insert({
      promo_id: promoId,
      name: form.name.trim(),
      image: form.image.trim(),
      original_price: op,
      promo_price: pp,
      sort_order: items.length,
    });
    setSaving(false);
    if (error) { setErr(error.message); return; }
    qc.invalidateQueries({ queryKey: ["promo-products", promoId] });
    setForm({ ...EMPTY_ITEM });
    setErr("");
  }

  async function removeItem(id: string) {
    await supabase.from("promo_products").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["promo-products", promoId] });
  }

  return (
    <div className="mt-4 border-t border-gray-800 pt-4">
      <h4 className="text-white font-semibold text-sm mb-3">Promo Items ({items.length})</h4>

      {items.length > 0 && (
        <div className="space-y-2 mb-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 bg-[#1a1a1a] rounded-lg p-2.5">
              <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-md bg-gray-800" />
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium line-clamp-1">{item.name}</p>
                <div className="flex gap-2 items-center">
                  <span className="text-[#22c55e] text-xs font-bold">{formatPrice(item.promo_price)}</span>
                  <span className="text-gray-500 text-xs line-through">{formatPrice(item.original_price)}</span>
                  <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                    -{discount(item.original_price, item.promo_price)}%
                  </span>
                </div>
              </div>
              <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-500 p-1">
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="bg-[#1a1a1a] rounded-xl p-4 space-y-3">
        <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">Add Item to Promo</p>
        <input
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="Product name"
          className="w-full bg-[#111111] border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e] placeholder:text-gray-600"
        />
        <ImageUpload
          label="Item Image"
          value={form.image}
          onChange={(url) => setForm((f) => ({ ...f, image: url }))}
          folder="promo-items"
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            value={form.original_price}
            onChange={(e) => setForm((f) => ({ ...f, original_price: e.target.value }))}
            placeholder="Original price (₦)"
            className="bg-[#111111] border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e] placeholder:text-gray-600"
          />
          <input
            type="number"
            value={form.promo_price}
            onChange={(e) => setForm((f) => ({ ...f, promo_price: e.target.value }))}
            placeholder="Promo price (₦)"
            className="bg-[#111111] border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e] placeholder:text-gray-600"
          />
        </div>
        {form.original_price && form.promo_price && parseInt(form.promo_price) < parseInt(form.original_price) && (
          <p className="text-[#22c55e] text-xs">
            💰 {discount(parseInt(form.original_price), parseInt(form.promo_price))}% off — Save {formatPrice(parseInt(form.original_price) - parseInt(form.promo_price))}
          </p>
        )}
        {err && <p className="text-red-400 text-xs">{err}</p>}
        <button
          onClick={addItem}
          disabled={saving}
          className="w-full py-2 bg-[#22c55e]/20 hover:bg-[#22c55e]/30 text-[#22c55e] font-semibold text-sm rounded-lg transition-colors disabled:opacity-60"
        >
          {saving ? "Adding..." : "+ Add Item"}
        </button>
      </div>
    </div>
  );
}

export function PromosTab() {
  const qc = useQueryClient();
  const { data: promos = [], isLoading } = useAllPromos();

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [form, setForm] = useState({ ...EMPTY_PROMO });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  function openAdd() {
    setForm({ ...EMPTY_PROMO });
    setIsEdit(false);
    setEditId("");
    setErr("");
    setOpen(true);
  }

  function openEdit(p: DbPromo) {
    const pos = p.banner_position ?? "50% 50%";
    const parts = pos.split(" ");
    const px = parseInt(parts[0]) || 50;
    const py = parseInt(parts[1]) || 50;
    setForm({ title: p.title, description: p.description ?? "", banner_image: p.banner_image ?? "", banner_pos_x: px, banner_pos_y: py });
    setIsEdit(true);
    setEditId(p.id);
    setErr("");
    setOpen(true);
  }

  async function handleSave() {
    if (!form.title.trim()) { setErr("Title is required."); return; }
    setSaving(true);
    const payload = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      banner_image: form.banner_image.trim() || null,
      banner_position: `${form.banner_pos_x}% ${form.banner_pos_y}%`,
      updated_at: new Date().toISOString(),
    };
    let error;
    if (isEdit) {
      ({ error } = await supabase.from("promos").update(payload).eq("id", editId));
    } else {
      ({ error } = await supabase.from("promos").insert({ ...payload, active: false }));
    }
    setSaving(false);
    if (error) { setErr(error.message); return; }
    qc.invalidateQueries({ queryKey: ["all-promos"] });
    qc.invalidateQueries({ queryKey: ["active-promos"] });
    setOpen(false);
  }

  async function toggleActive(id: string, current: boolean) {
    await supabase.from("promos").update({ active: !current, updated_at: new Date().toISOString() }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["all-promos"] });
    qc.invalidateQueries({ queryKey: ["active-promos"] });
  }

  async function deletePromo(id: string) {
    await supabase.from("promos").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["all-promos"] });
    qc.invalidateQueries({ queryKey: ["active-promos"] });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Promo Pages</h2>
          <p className="text-gray-400 text-sm">Active promos show a banner on the homepage</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold px-4 py-2 rounded-lg text-sm transition-colors"
        >
          <Plus size={16} /> Create Promo
        </button>
      </div>

      {isLoading ? (
        <div className="text-gray-400 text-sm py-8 text-center">Loading...</div>
      ) : promos.length === 0 ? (
        <div className="bg-[#1a1a1a] border border-gray-800 border-dashed rounded-xl p-12 text-center">
          <Tag size={40} className="text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 font-semibold">No promo pages yet</p>
          <p className="text-gray-600 text-sm mt-1">Create a promo to display a special deals banner on your homepage.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {promos.map((p) => (
            <div key={p.id} className="bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden">
              <div className="flex items-center gap-4 p-4">
                {p.banner_image && (
                  <img src={p.banner_image} alt={p.title} className="w-16 h-16 object-cover rounded-lg bg-gray-800 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white font-bold">{p.title}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${p.active ? "bg-[#22c55e]/20 text-[#22c55e]" : "bg-gray-700 text-gray-400"}`}>
                      {p.active ? "Live" : "Inactive"}
                    </span>
                  </div>
                  {p.description && <p className="text-gray-400 text-sm line-clamp-1">{p.description}</p>}
                  <p className="text-gray-600 text-xs mt-1 font-mono">/promo/{p.id}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleActive(p.id, p.active)}
                    className={`p-1.5 rounded-lg transition-colors ${p.active ? "text-[#22c55e] hover:bg-red-500/20 hover:text-red-400" : "text-gray-400 hover:text-[#22c55e]"}`}
                    title={p.active ? "Deactivate" : "Activate"}
                  >
                    {p.active ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                  </button>
                  <button
                    onClick={() => openEdit(p)}
                    className="p-1.5 rounded-lg hover:bg-[#22c55e]/20 text-gray-400 hover:text-[#22c55e] transition-colors"
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    onClick={() => deletePromo(p.id)}
                    className="p-1.5 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                  <button
                    onClick={() => setExpanded(expanded === p.id ? null : p.id)}
                    className="p-1.5 rounded-lg hover:bg-[#1a1a1a] text-gray-400 hover:text-white transition-colors"
                  >
                    {expanded === p.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>
              {expanded === p.id && (
                <div className="px-4 pb-4">
                  <PromoItemsSection promoId={p.id} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-gray-800 rounded-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h3 className="text-white font-bold text-lg">{isEdit ? "Edit Promo" : "Create Promo"}</h3>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1.5">Promo Title *</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. Ramadan Sale — Up to 30% Off!"
                  className="w-full bg-[#1a1a1a] border border-gray-700 text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e] placeholder:text-gray-600"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1.5">Description (optional)</label>
                <input
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Short tagline shown on the banner"
                  className="w-full bg-[#1a1a1a] border border-gray-700 text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e] placeholder:text-gray-600"
                />
              </div>
              <ImageUpload
                label="Banner Image (optional)"
                value={form.banner_image}
                onChange={(url) => setForm((f) => ({ ...f, banner_image: url }))}
                folder="promo-banners"
              />

              {form.banner_image && (
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                      Crop / Position Preview
                    </p>
                    <p className="text-gray-600 text-[11px] mb-2">
                      Use the sliders to set which part of the image is visible in the hero section. The green border shows the cropped area.
                    </p>
                    <div
                      className="relative w-full rounded-xl overflow-hidden border-2 border-[#22c55e]"
                      style={{ aspectRatio: "16/5" }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `url(${form.banner_image})`,
                          backgroundSize: "cover",
                          backgroundPosition: `${form.banner_pos_x}% ${form.banner_pos_y}%`,
                        }}
                      />
                      <div className="absolute inset-0 bg-black/20" />
                      <span className="absolute bottom-2 right-2 text-[10px] text-white/70 bg-black/40 px-1.5 py-0.5 rounded font-mono">
                        Hero Preview
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-gray-400 block mb-1">
                        Left ← Horizontal → Right &nbsp;{form.banner_pos_x}%
                      </label>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={form.banner_pos_x}
                        onChange={(e) => setForm((f) => ({ ...f, banner_pos_x: parseInt(e.target.value) }))}
                        className="w-full accent-[#22c55e]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-gray-400 block mb-1">
                        Top ↑ Vertical ↓ Bottom &nbsp;{form.banner_pos_y}%
                      </label>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={form.banner_pos_y}
                        onChange={(e) => setForm((f) => ({ ...f, banner_pos_y: parseInt(e.target.value) }))}
                        className="w-full accent-[#22c55e]"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-[#22c55e]/5 border border-[#22c55e]/20 rounded-lg p-3">
                <p className="text-gray-400 text-xs">
                  💡 After creating the promo, expand it to add items with price slashes. Then toggle it <strong className="text-[#22c55e]">Live</strong> to show the homepage banner.
                </p>
              </div>
              {err && <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">{err}</div>}
              <div className="flex gap-3 pt-2">
                <button onClick={() => setOpen(false)} className="flex-1 py-2.5 rounded-lg border border-gray-700 text-gray-400 text-sm">Cancel</button>
                <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 rounded-lg bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold text-sm disabled:opacity-60">
                  {saving ? "Saving..." : isEdit ? "Save" : "Create Promo"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
