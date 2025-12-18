import { useMemo, useState } from "react";
import useProducts from "../Hooks/useProducts";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import Loader from "../components/Loader";

export default function Products() {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const categories = [...new Set(products.map((p) => p.category))];

  const filteredProducts = useMemo(() => {
    let list = products;

    if (search) {
      list = list.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      list = list.filter((p) => p.category === category);
    }

    if (sort === "price-asc") {
      list = [...list].sort((a, b) => a.price - b.price);
    }

    if (sort === "price-desc") {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    if (sort === "title") {
      list = [...list].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    return list;
  }, [products, search, category, sort]);

  if (loading) return <Loader />;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <Filters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        categories={categories}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredProducts.length === 0 && <p>محصولی یافت نشد</p>}
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
