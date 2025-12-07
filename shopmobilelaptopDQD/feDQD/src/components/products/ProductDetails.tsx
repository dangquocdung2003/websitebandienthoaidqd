import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById, Product } from "../../lib/api";

function formatPrice(price?: number) {
  if (!price) return "";
  return price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}

export default function ProductDetails() {
  const { id } = useParams(); // ⬅️ KHÔNG gán kiểu ở đây

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Không có ID sản phẩm trong URL.");
      return;
    }

    const productId = Number(id);
    if (isNaN(productId)) {
      setError("ID không hợp lệ.");
      return;
    }

    async function fetchProduct() {
      try {
        setLoading(true);
        const data = await getProductById(productId); // ⬅️ TRUYỀN NUMBER
        setProduct(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Không tìm thấy sản phẩm.");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="p-10 text-center">Đang tải sản phẩm...</div>;
  }

  if (error) {
    return <div className="p-10 text-center text-red-600">{error}</div>;
  }

  if (!product) {
    return <div className="p-10 text-center">Sản phẩm không tồn tại.</div>;
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-gray-50 p-6 rounded-2xl flex items-center justify-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-96 object-contain"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          <p className="text-red-600 text-2xl font-bold mt-4">
            {formatPrice(product.price)}
          </p>

          <p className="text-gray-600 mt-6 leading-relaxed">
            {product.description || "Sản phẩm đang chờ cập nhật mô tả chi tiết."}
          </p>

          <p className="mt-3 text-sm text-gray-500">
            Số lượng còn lại: <b>{product.stock}</b>
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <button className="py-3 w-full bg-black text-white font-semibold rounded-xl hover:bg-gray-700">
              Mua ngay
            </button>
            <button className="py-3 w-full bg-gray-200 text-gray-900 font-semibold rounded-xl hover:bg-gray-300">
              Thêm giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
