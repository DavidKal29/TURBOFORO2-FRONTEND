import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Categoria() {
  const { categoria } = useParams();
  const {categorias} = useAppContext()
  const navigate = useNavigate()

  const encontrado = categorias.find(c=>c.nombre===categoria) || 'Categoria inexistente'
  console.log(encontrado);
  

  const comprobarCategoria = ()=>{
    const encontrado = categorias.find(c=>c.nombre===categoria)

    if (!encontrado) {
        navigate('/')
    }
  }

  useEffect(()=>{
    comprobarCategoria()

    window.scrollTo({top:'0',behavior:'smooth'})

    document.title = `${categoria}`
  },[])

  // Generamos 40 hilos ficticios
  const hilos = Array.from({ length: 40 })
  return (
    <div className="max-w-5xl scroll-mt-28 mx-auto mt-[150px] mb-16 px-4">
      
      <h1 className="font-extrabold text-3xl md:text-5xl text-gray-800 text-center mb-10">
        <i className={`fa-solid ${encontrado.icono} text-${encontrado.color}`}></i> {encontrado.nombre}
      </h1>

      <div className="grid grid-cols-1 gap-4">
        {hilos.map((hilo,index) => (
          <div
            key={index}
            className={`flex justify-between items-center p-4 bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-${encontrado.color}`}
          >
            <div>
              <h2 className="font-semibold text-lg text-gray-800">
                Titulo
              </h2>
              <p className="text-sm text-gray-500">@Autor</p>
            </div>

            {/* Mensajes */}
            <div className="flex items-center gap-2 text-gray-600">
              <i className={`fa-solid fa-comment text-${encontrado.color}`}></i>
              <span className="font-medium">891</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

