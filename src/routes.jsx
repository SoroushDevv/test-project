import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./Pages/Products";
import ProductDetails from "./Pages/ProductDetails";
import Header from "./Components/Header";

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
