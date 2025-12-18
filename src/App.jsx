import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./Pages/Products";
import ProductDetail from "./Pages/ProductDetails";
import Header from "./Components/Header";
import "./index.css"

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
