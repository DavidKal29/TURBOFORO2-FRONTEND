import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Categorias() {

  const {categorias,setCategorias} = useAppContext()
       

    useEffect(()=>{
      const obtenerCategorias = async()=>{
        try {
          const res = await fetch('http://localhost:5000/categorias',{method:'GET',credentials:'include'})

          const data = await res.json()

          if (data.categorias) {
            setCategorias(data.categorias)
          }else{
            setCategorias([])
          }
          
        } catch (error) {
          console.log('Error:',error);
        }

      }

      obtenerCategorias()

    },[])
  

  return (
    <div className="bg-gray-50 rounded-xl shadow-lg p-6 mb-12 w-full">
      <h1 className="font-extrabold text-4xl md:text-5xl text-center mb-6 text-gray-800">
        Categorías
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">

        {categorias.length === 0 ? (
          <p className="text-center text-gray-500 py-4">Las categorias: {categorias[0]}</p>
        ) : (
          categorias.map((cat,index) => (
            <Link to={`/categoria/${cat.nombre}/page/1`}
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
          ))
        )}

        
      </div>
    </div>
  );
}
