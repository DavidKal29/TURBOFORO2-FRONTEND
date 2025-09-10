import React from "react";
import { Link } from "react-router-dom";

export default function Categorias() {
  const categorias = [
    { nombre: "General", icono: "fa-earth-americas", color: "blue-500" },
    { nombre: "Informática", icono: "fa-computer", color: "green-500" },
    { nombre: "Videojuegos", icono: "fa-gamepad", color: "purple-500" },
    { nombre: "Coches y Motor", icono: "fa-car", color: "red-500" },
    { nombre: "Series y Cine", icono: "fa-film", color: "yellow-500" },
    { nombre: "Manga y Anime", icono: "fa-book", color: "pink-500" },
    { nombre: "Deportes", icono: "fa-futbol", color: "indigo-500" },
    { nombre: "Fitness", icono: "fa-dumbbell", color: "teal-500" },
    { nombre: "Hobbies", icono: "fa-palette", color: "orange-500" },
    { nombre: "Polémica", icono: "fa-fire", color: "red-600" },
    { nombre: "Música", icono: "fa-music", color: "pink-600" },
    { nombre: "Viajes", icono: "fa-plane", color: "cyan-500" },
    { nombre: "Cocina", icono: "fa-utensils", color: "yellow-600" },
    { nombre: "Mascotas", icono: "fa-paw", color: "green-600" },
    { nombre: "Ciencia", icono: "fa-brain", color: "purple-600" },
    { nombre: "Memes y Humor", icono: "fa-face-laugh-beam", color: "yellow-400" },
  ];

  return (
    <div className="bg-gray-50 rounded-xl shadow-lg p-6 mt-12 mb-12 w-full">
      <h1 className="font-extrabold text-4xl md:text-5xl text-center mb-6 text-gray-800">
        Categorías
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
        {categorias.map((cat, index) => (
          <Link to={`/categoria/${cat.nombre}`}
            key={index}
            className={`flex items-center gap-3 p-4 bg-white rounded-xl shadow hover:shadow-xl transition-all duration-300 cursor-pointer border-l-4 border-${cat.color}`}
          >
            <i
              className={`fa-solid ${cat.icono} text-${cat.color} text-2xl`}
            ></i>
            <span
              className={`font-semibold text-lg md:text-xl`}
            >
              {cat.nombre}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
