import React from "react";

export default function Loader({ text = "در حال بارگذاری..." }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-90">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-700 font-medium">{text}</p>
    </div>
  );
}
