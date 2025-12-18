import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useEffect } from "react";

const MySwal = withReactContent(Swal);

export default function CustomAlert({ type = "success", message = "عملیات انجام شد!", show = false }) {
  useEffect(() => {
    if (!show) return;

    MySwal.fire({
      icon: type === "success" ? "success" : "error",
      title: type === "success" ? "موفقیت" : "خطا",
      text: message,
      timer: 1800,
      timerProgressBar: true,
      showConfirmButton: false,
      customClass: {
        popup: "rounded-lg shadow-lg p-6",
        title: "text-lg font-bold",
        content: "text-gray-700",
      },
    });
  }, [type, message, show]);

  return null; 
}
