import { FEATURED_PRODUCTS } from "@/data/products";
import {Link} from "react-router-dom";

export default function FeaturedProducts() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-gray-900">Sản phẩm nổi bật</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {FEATURED_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="border rounded-2xl shadow-sm hover:-translate-y-1 hover:shadow-xl transition-transform bg-white"
            >
              <div className="relative overflow-hidden rounded-t-2xl bg-gray-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-contain transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-red-600 font-bold text-lg mt-1">
                  {product.price}
                </p>
                <Link to={`/product/${product.id}`}>
                <button  className="mt-3 w-full py-2 text-sm font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition">
                  Xem chi tiết
                </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
