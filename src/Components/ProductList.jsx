import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Loader from "./Loader";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("خطا در دریافت محصولات");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "خطا در دریافت محصولات");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((p) => p.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, quantity: Math.max(1, quantity) } : p
      )
    );
  };

  if (loading) {
    return (
      <div className="p-4 text-center">
        <Loader/>
        <div className="loader mt-2 border-t-4 border-blue-500 rounded-full w-8 h-8 mx-auto animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <p className="p-4 text-center text-red-500">{error}</p>;
  }

  if (!products.length) {
    return <p className="p-4 text-center">هیچ محصولی موجود نیست...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          cartItem={cart.find((p) => p.id === product.id)}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
          onUpdateQuantity={updateQuantity}
        />
      ))}
    </div>
  );
}
