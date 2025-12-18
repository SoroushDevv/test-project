import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";

export default function Cart() {
  const { updateQuantity, removeFromCart } = useContext(CartContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleUpdateQuantity = (id, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return <p className="p-4 text-center text-gray-500 border-2 border-red-500 bg-red-200">سبد خرید شما خالی است.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">سبد خرید</h2>
      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border p-4 rounded shadow"
          >
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.category}</p>
                <p className="text-sm font-bold">
                  {item.quantity} × ${item.price.toFixed(2)} = ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                className="px-2 py-1 bg-gray-300 rounded"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                className="px-2 py-1 bg-gray-300 rounded"
              >
                +
              </button>
              <button
                onClick={() => handleRemove(item.id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 border-t flex justify-between items-center font-bold text-lg">
        <span>جمع کل:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
}
