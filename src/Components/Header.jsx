import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

export default function Header() {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <header className=" bg-gray-100 flex flex-row-reverse justify-arround items-center relative px-4">
      <Link to="/" className="font-bold text-lg">
        فروشگاه
      </Link>

      <div
        className="relative p-4"
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <div className="font-semibold border-2 border-gray-200  rounded-md cursor-pointer py-2 px-3 bg-blue-600 text-white">
          سبد خرید: {totalQuantity}

        </div>

        {showDropdown && (
          <div className="absolute right-3 mt-2 w-72 bg-white border rounded shadow-lg z-50">
            {cart.length === 0 ? (
              <p className="p-4 text-gray-500 text-center border-2 border-red-500 bg-red-200">سبد خرید شما خالی است.</p>
            ) : (
              <div className="flex flex-col gap-2 max-h-96 overflow-y-auto p-2">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-10 h-10 object-contain"
                      />
                      <div>
                        <p className="text-sm font-semibold">{item.title}</p>
                        <p className="text-xs text-gray-500">
                          {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 text-xs px-2 py-1 rounded hover:bg-red-500 bg-red-200"
                    >
                      حذف
                    </button>
                  </div>
                ))}

                <div className="mt-2 p-2 border-t font-bold flex justify-between">
                  <span>جمع کل:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                <Link
                  to="#"
                  className="mt-2 block text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                  مشاهده سبد خرید
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
