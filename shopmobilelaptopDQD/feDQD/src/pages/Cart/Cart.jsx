import { useEffect, useMemo, useState } from "react";
import { ShoppingCart, Truck, ShieldCheck, Percent } from "lucide-react";
import SEO from "@/components/SEO";
import CartItem from "@/components/cart/CartItem";
import { loadCart, updateQty, removeItem, clearCart, cartTotals } from "@/lib/cart";

export default function CartPage() {
  const [items, setItems] = useState([]);

  useEffect(() => { setItems(loadCart()); }, []);

  const totals = useMemo(() => cartTotals(items), [items]);

  const structuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "ShoppingCart",
    "name": "Giỏ hàng",
    "itemListElement": items.map((i, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "Product",
        "name": i.name,
        "image": i.image,
        "sku": i.sku || i.id,
        "offers": {
          "@type": "Offer",
          "priceCurrency": "VND",
          "price": i.price
        }
      },
      "quantity": i.qty
    })),
    "potentialAction": {
      "@type": "BuyAction",
      "expectsAcceptanceOf": {
        "@type": "Offer",
        "priceCurrency": "VND",
        "price": totals.total
      }
    }
  }), [items, totals]);

  return (
    <main className="max-w-6xl mx-auto py-6">
      <SEO
        title="Giỏ hàng | Cửa hàng"
        description="Xem lại sản phẩm đã thêm vào giỏ và tiến hành đặt hàng. Miễn phí vận chuyển cho đơn trên 1.000.000₫."
        canonical={typeof window !== "undefined" ? window.location.href : undefined}
        ogImage="/og-cart.jpg"
        jsonLd={structuredData}
      />

      <header className="flex items-center gap-3 mb-6">
        <ShoppingCart className="size-6" aria-hidden="true" />
        <h1 className="text-2xl md:text-3xl font-bold">Giỏ hàng</h1>
      </header>

      {items.length === 0 ? (
        <div className="p-8 border rounded-2xl text-center">
          <p>Giỏ của bạn đang trống.</p>
          <a href="/" className="inline-block mt-4 px-4 py-2 rounded-xl border hover:bg-gray-50">Tiếp tục mua sắm</a>
        </div>
      ) : (
        <div className="grid md:grid-cols-[1fr_360px] gap-6">
          <section className="space-y-4" aria-label="Danh sách sản phẩm trong giỏ">
            {items.map((item) => (
              <CartItem
                key={(item.id ?? '') + (item.variant ?? '')}
                item={item}
                onQty={(qty) => setItems(updateQty(item.id, item.variant, qty))}
                onRemove={() => setItems(removeItem(item.id, item.variant))}
              />
            ))}
            <button
              className="text-sm text-gray-600 hover:text-gray-900"
              onClick={() => setItems(clearCart())}
            >
              Xóa toàn bộ giỏ
            </button>
          </section>

          <aside className="space-y-4" aria-label="Tóm tắt đơn hàng">
            <div className="p-4 rounded-2xl border bg-gray-50/60">
              <h2 className="text-lg font-semibold mb-3">Tạm tính</h2>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between"><dt>Tổng sản phẩm</dt><dd>{totals.subtotal.toLocaleString()}₫</dd></div>
                <div className="flex justify-between"><dt>Khuyến mãi</dt><dd>-{totals.discount.toLocaleString()}₫</dd></div>
                <div className="flex justify-between"><dt>Phí vận chuyển</dt><dd>{totals.shipping.toLocaleString()}₫</dd></div>
                <div className="border-t my-2" />
                <div className="flex justify-between text-base font-semibold"><dt>Tổng cộng</dt><dd>{totals.total.toLocaleString()}₫</dd></div>
              </dl>
              <a
                href="/checkout"
                className="mt-4 inline-flex w-full justify-center px-4 py-2 rounded-xl bg-black text-white hover:opacity-90"
                aria-label="Tiến hành thanh toán"
              >
                Thanh toán
              </a>
              <p className="mt-2 text-xs text-gray-500">Thuế và phí sẽ được tính ở bước thanh toán.</p>
            </div>

            <ul className="grid gap-3 text-sm">
              <li className="flex items-center gap-2"><Truck className="size-4" /> Giao nhanh 1-3 ngày</li>
              <li className="flex items-center gap-2"><ShieldCheck className="size-4" /> Đổi trả trong 7 ngày</li>
              <li className="flex items-center gap-2"><Percent className="size-4" /> Nhiều ưu đãi hấp dẫn</li>
            </ul>
          </aside>
        </div>
      )}
    </main>
  );
}
