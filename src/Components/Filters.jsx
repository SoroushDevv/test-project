import { useMemo } from "react";

export default function Filters({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
  categories = [],
}) {
  const categoryNames = useMemo(
    () => ({
      "men's clothing": "پوشاک مردانه",
      "women's clothing": "پوشاک زنانه",
      "jewelery": "جواهرات",
      "electronics": "لوازم برقی",
    }),
    []
  );

  const categoryOptions = useMemo(
    () =>
      categories.map((c) => {
        const key = c.toLowerCase().trim(); 
        return {
          value: c,
          label: categoryNames[key] || c,
        };
      }),
    [categories, categoryNames]
  );

  const sortOptions = useMemo(
    () => [
      { value: "", label: "مرتب‌سازی" },
      { value: "price-asc", label: "قیمت صعودی" },
      { value: "price-desc", label: "قیمت نزولی" },
      { value: "title", label: "عنوان (A-Z)" },
    ],
    []
  );

  return (
    <div className="flex justify-end items-start flex-wrap gap-2 mb-4 rtl">
      <input
      dir="rtl"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="جستجو..."
        className="border p-2 outline-none border rounded-full focus:ring-none focus:border-blue-500 rtl"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="focus:outline-none p-2 border-2 border-gray-500 rounded-md border-blue-500"
      >
        <option value="">همه دسته‌ها</option>
        {categoryOptions.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="focus:outline-none p-2 border-2 border-gray-500 rounded-md border-blue-500"
      >
        {sortOptions.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
  );
}
