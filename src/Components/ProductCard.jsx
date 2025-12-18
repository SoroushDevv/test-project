import React, { useContext } from "react";
import Swal from "sweetalert2";
import { CartContext } from "../Context/CartContext";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { cart, addToCart, removeFromCart, updateQuantity } = useContext(CartContext);

  const cartItem = cart.find((p) => p.id === product.id);

  const handleAddToCart = () => {
    addToCart(product);

    Swal.fire({
      icon: "success",
      title: "موفقیت!",
      text: "محصول به سبد خرید اضافه شد.",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      customClass: {
        popup: "rounded-lg shadow-lg p-6",
        title: "text-lg font-bold",
        content: "text-gray-700",
      },
    });
  };
  const handleRemoveFromCart = () => {
    removeFromCart(product.id);

    Swal.fire({
      icon: "info",
      title: "حذف شد",
      text: "محصول از سبد خرید حذف شد.",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      customClass: {
        popup: "rounded-lg shadow-lg p-6",
        title: "text-lg font-bold",
        content: "text-gray-700",
      },
    });}
    return (
      <div  className="border p-4 flex flex-col items-center rounded shadow hover:shadow-lg transition-shadow">
        <img
          src={product.image}
          alt={product.title}
          className="h-40 w-40 object-contain mb-2"
        />
        <Link to={`product/${product.id}`} className="text-sm font-semibold text-center text-inherit">{product.title}</Link>
        <p className="text-xs text-gray-500 mt-1">{product.category}</p>
        <p className="font-bold mt-1">${product.price}</p>

        {cartItem ? (
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
              className="px-2 py-1 bg-gray-300 rounded"
            >
              -
            </button>
            <span>{cartItem.quantity}</span>
            <button
              onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
              className="px-2 py-1 bg-gray-300 rounded"
            >
              +
            </button>
            <button
              onClick={() => handleRemoveFromCart(product.id)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              حذف
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            افزودن به سبد خرید
          </button>
        )}
      </div>
    );
  }
