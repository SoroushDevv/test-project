import { useEffect, useState } from "react";

export default function useProducts() {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; 

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("خطا در دریافت محصولات");
        const data = await res.json();

        if (isMounted) {
          setProducts(Array.isArray(data) ? data : []); 
        }
      } catch (err) {
        if (isMounted) setError(err.message || "خطا در دریافت محصولات");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    products,              
    loading,                
    error,                 
  };
}
