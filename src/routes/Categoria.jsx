import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Categoria() {
  const { categoria } = useParams();
  const { categorias } = useAppContext();
  const navigate = useNavigate();

  const encontrado = categorias.find((c) => c.nombre === categoria);

  const comprobarCategoria = () => {
    if (!encontrado) {
      navigate("/");
    }
  };

  useEffect(() => {
    comprobarCategoria();
    window.scrollTo({ top: "0", behavior: "smooth" });
    document.title = `${categoria}`;
  }, []);

  // Generamos 40 hilos ficticios
  const hilos = Array.from({ length: 40 });

  if (!encontrado) return null;

  return (
    <div className="min-h-screen bg-gray-100 mt-[80px]">
      {/* HERO */}
      <div className={`relative bg-gradient-to-r from-${encontrado.color} to-purple-600 py-20 text-center text-white`}>
        <i className={`fa-solid ${encontrado.icono} text-6xl drop-shadow-lg`}></i>
        <h1 className="mt-6 font-extrabold text-5xl md:text-7xl drop-shadow-lg">
          {encontrado.nombre}
        </h1>
        <p className="mt-4 text-lg opacity-90">
          Bienvenido a la categoría de <span className="font-semibold">{encontrado.nombre}</span>, explora y participa 🚀
        </p>
      </div>

      {/* GRID DE HILOS */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {hilos.map((hilo, index) => (
          <div
            key={index}
            className="relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer group overflow-hidden border border-gray-200"
          >

            <div className="flex flex-col h-full justify-between">
              <div>
                <h2 className="font-bold text-2xl text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                  Título del Hilo
                </h2>
                <p className="mt-2 text-gray-500 text-sm">@Autor</p>
              </div>

              <div className="mt-6 flex items-center justify-between text-gray-600">
                <div className="flex items-center gap-2">
                  <i className={`fa-solid fa-comment text-${encontrado.color}`}></i>
                  <span className="font-medium">234</span>
                </div>
                <button
                  className={`bg-${encontrado.color} text-white text-sm font-semibold px-4 py-2 rounded-full shadow hover:scale-105 transition-transform`}
                >
                  Ver hilo
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
