import { useState } from "react";
import { Link } from "wouter";
import { Trash2, Minus, Plus, ShoppingBag, MessageCircle, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice, WHATSAPP_NUMBER } from "@/data/products";
import { getColorHex, isLightColor } from "@/lib/colors";

const SIZES = [
  { value: "Small", label: "S", fullLabel: "Small" },
  { value: "Medium", label: "M", fullLabel: "Medium" },
  { value: "Large", label: "L", fullLabel: "Large" },
  { value: "Extra Large", label: "XL", fullLabel: "Extra Large" },
  { value: "Double Extra Large", label: "XXL", fullLabel: "Double Extra Large" },
];

export default function Cart() {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [size, setSize] = useState("");

  function handleWhatsApp() {
    if (items.length === 0) return;

    const itemLines = items
      .map((item) => {
        const colorPart = item.color ? ` [${item.color}]` : "";
        return `- ${item.product.name}${colorPart} x${item.quantity} – ${formatPrice(item.product.price * item.quantity)}`;
      })
      .join("\n");

    const deliveryLine = address ? `\n\nDelivery Address: ${address}` : "";
    const contactLine = phone ? `\nPhone: ${phone}` : "";
    const nameLine = name ? `\nName: ${name}` : "";
    const sizeLine = size ? `\nSize: ${size}` : "";

    const message = `Hello ABO Wears, I want to order:\n${itemLines}\n\nTotal: ${formatPrice(total)}${nameLine}${contactLine}${sizeLine}${deliveryLine}`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <ShoppingBag size={64} className="text-muted-foreground mb-4 opacity-50" />
        <h1 className="font-display text-4xl text-foreground mb-2">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-6 text-sm">Add some items to get started</p>
        <Link
          href="/jerseys"
          className="inline-flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold px-8 py-3 rounded-full transition-colors"
          data-testid="continue-shopping-button"
        >
          <ArrowLeft size={16} />
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="bg-[#0a0a0a] text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm mb-4 transition-colors w-fit">
            <ArrowLeft size={14} />
            Back to Shopping
          </Link>
          <h1 className="font-display text-5xl text-white">Your Cart</h1>
          <p className="text-gray-400 text-sm mt-1">{items.length} item(s)</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-3 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.color ?? "none"}`}
                className="bg-card border border-card-border rounded-xl p-4 flex gap-4"
                data-testid={`cart-item-${item.product.id}`}
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-lg shrink-0 bg-muted"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-foreground leading-tight mb-1 line-clamp-2">
                    {item.product.name}
                  </h3>
                  {item.color && (
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full mb-1.5"
                      style={{
                        backgroundColor: getColorHex(item.color),
                        color: isLightColor(item.color) ? "#333" : "#fff",
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                      {item.color}
                    </span>
                  )}
                  <p className="text-[#22c55e] font-bold text-sm mb-3">
                    {formatPrice(item.product.price)}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.color)}
                        className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                        data-testid={`button-decrease-${item.product.id}`}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="font-semibold text-sm w-6 text-center" data-testid={`quantity-${item.product.id}`}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.color)}
                        className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                        data-testid={`button-increase-${item.product.id}`}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-sm text-foreground">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.color)}
                        className="text-red-400 hover:text-red-500 transition-colors"
                        data-testid={`button-remove-${item.product.id}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-red-400 hover:text-red-500 text-xs font-medium transition-colors"
              data-testid="clear-cart-button"
            >
              Clear cart
            </button>
          </div>

          {/* Checkout */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-card-border rounded-xl p-5 sticky top-24">
              <h2 className="font-display text-2xl text-foreground mb-4">Order Details</h2>

              <div className="space-y-3 mb-5">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tunde Adebayo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-input rounded-lg px-3.5 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-[#22c55e] transition-colors"
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 08012345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-input rounded-lg px-3.5 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-[#22c55e] transition-colors"
                    data-testid="input-phone"
                  />
                </div>

                {/* Size Selection */}
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Size
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {SIZES.map((s) => (
                      <button
                        key={s.value}
                        type="button"
                        onClick={() => setSize(s.value)}
                        className={`px-3.5 py-2 rounded-lg text-sm font-semibold border transition-all ${
                          size === s.value
                            ? "bg-[#22c55e] border-[#22c55e] text-black"
                            : "border-input bg-background text-foreground hover:border-[#22c55e] hover:text-[#22c55e]"
                        }`}
                        data-testid={`size-${s.value.toLowerCase().replace(" ", "-")}`}
                        title={s.fullLabel}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                  {size && (
                    <p className="text-xs text-[#22c55e] mt-1.5">Selected: {size}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                    Delivery Address{" "}
                    <span className="text-muted-foreground font-normal normal-case">(optional)</span>
                  </label>
                  <textarea
                    placeholder="Your full delivery address..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={3}
                    className="w-full border border-input rounded-lg px-3.5 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-[#22c55e] transition-colors resize-none"
                    data-testid="input-address"
                  />
                </div>
              </div>

              <div className="border-t border-border pt-4 mb-5">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">Subtotal</span>
                  <span className="font-bold text-foreground" data-testid="cart-total">{formatPrice(total)}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Delivery fee will be confirmed via WhatsApp</p>
              </div>

              <button
                onClick={handleWhatsApp}
                className="btn-whatsapp w-full flex items-center justify-center gap-2 font-bold py-4 rounded-xl text-base"
                data-testid="button-buy-on-whatsapp"
              >
                <MessageCircle size={20} />
                Buy Now on WhatsApp
              </button>

              <div className="mt-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/50 rounded-lg p-3">
                <p className="text-green-700 dark:text-green-400 text-xs text-center leading-relaxed">
                  📩 After sending your order, you'll receive account details for payment. Send your receipt to confirm your order.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
