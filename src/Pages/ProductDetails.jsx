import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import Swal from "sweetalert2";
import Loader from "../Components/Loader"
import { ArrowRight } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, updateQuantity } = useContext(CartContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then(setProduct);
  }, [id]);

  if (!product) return <Loader/>;

  const cartItem = cart.find((p) => p.id === product.id);

  const handleAddToCart = (product) => {
    addToCart(product);

    Swal.fire({
      icon: "success",
      title: "موفقیت!",
      text: "محصول به سبد خرید اضافه شد.",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
        <div className="w-full flex justify-end items-center py-2 px-3"> 
             <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 "
      >
        <ArrowRight/>
      </button>
      </div>
    

      <div className="grid md:grid-cols-2 gap-4">
        <img src={product.image} className="h-64 mx-auto object-contain" alt={product.title} />

        <div>
          <h1 className="text-xl font-bold">{product.title}</h1>
          <p className="my-2">{product.description}</p>
          <p className="font-semibold">${product.price}</p>

          {cartItem ? (
            <div className="mt-4 flex items-center gap-2">
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
                onClick={() => removeFromCart(product.id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                حذف
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-4 bg-black text-white px-4 py-2"
            >
              افزودن به سبد خرید
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
