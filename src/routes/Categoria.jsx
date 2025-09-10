import React from "react";
import { useParams } from "react-router-dom";

export default function Categoria() {
  const { categoria } = useParams();

  // Generamos 40 hilos ficticios
  const hilos = Array.from({ length: 40 })
  return (
    <div className="max-w-5xl mx-auto mt-[150px] mb-16 px-4">
      
      <h1 className="font-extrabold text-3xl md:text-5xl text-gray-800 text-center mb-10">
        {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
      </h1>

      <div className="grid grid-cols-1 gap-4">
        {hilos.map((hilo,index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-blue-500"
          >
            <div>
              <h2 className="font-semibold text-lg text-gray-800">
                Titulo
              </h2>
              <p className="text-sm text-gray-500">@Autor</p>
            </div>

            {/* Mensajes */}
            <div className="flex items-center gap-2 text-gray-600">
              <i className="fa-solid fa-comment text-blue-500"></i>
              <span className="font-medium">891</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

