import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Categoria() {
  const { categoria } = useParams();
  const { categorias, setCategorias } = useAppContext();
  const [hilos, setHilos] = useState([]);
  const navigate = useNavigate();

  const encontrado = categorias.find((c) => c.nombre === categoria);
  const page = Number(useParams().page)

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const res = await fetch('http://localhost:5000/categorias', { method: 'GET', credentials: 'include' });
        const data = await res.json();
        setCategorias(data.categorias);
      } catch (error) {
        navigate('/')
      }
    };

    obtenerCategorias();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = `${categoria}`;
  }, [categoria, setCategorias,page]);

  
  useEffect(() => {
    if (categorias.length > 0 && !encontrado) {
      navigate("/");
    }
  }, [categorias, encontrado]);

  
  useEffect(() => {
    if (!encontrado) return;

    const obtenerHilos = async () => {
      try {
        const res = await fetch(`http://localhost:5000/hilos/${encontrado.id}/${page}`, { method: 'GET', credentials: 'include' });
        const data = await res.json();
        setHilos(data.hilos);
      } catch (error) {
        navigate('/')
      }
    };

    obtenerHilos();

    if (page===0) {
      navigate(`/categoria/${categoria}/page/1`)
    }

    if (page>Math.ceil(encontrado.counter/39)) {
      navigate(`/categoria/${categoria}/page/${Math.ceil(encontrado.counter/39)}`)
    }

    if (!page) {
      navigate('/')
    }
    
  }, [encontrado, page]);

  

  if (!encontrado) return null;

  return (
    <div className="min-h-screen bg-gray-100 mt-[80px]">
      {/* HERO */}
      <div className={`relative bg-gradient-to-r from-${encontrado.color} to-purple-600 py-20 text-center text-white`}>
        <i className={`fa-solid ${encontrado.icono} text-6xl drop-shadow-lg`}></i>
        <h1 className="mt-6 font-extrabold text-5xl md:text-7xl drop-shadow-lg">
          {encontrado.nombre}
        </h1>

        <h1 className="mt-6 font-extrabold text-5xl md:text-7xl drop-shadow-lg">
          Página:{page}
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
                  {hilo.titulo}
                </h2>
                <p className="mt-2 text-gray-500 text-sm">@{hilo.id_usuario}</p>
              </div>

              <div className="mt-6 flex items-center justify-between text-gray-600">
                <div className="flex items-center gap-2">
                  <i className={`fa-solid fa-comment text-${encontrado.color}`}></i>
                  <span className="font-medium">{hilo.mensajes}</span>
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

      <div class="flex justify-center items-center gap-2 mt-4 lg:mt-6 gap-4 flex-wrap pb-6">
        {Array.from({length:Math.ceil(encontrado.counter/39)},(_,i)=>i+1).map((p,index)=>(
            <Link to={`/categoria/${categoria}/page/${p}`}  key={index} className={`${page===p ? ('bg-indigo-900') : ('bg-blue-500')} text-white px-3 py-2 sm:px-5 sm:py-3 rounded-[5px] font-bold`} >
              {p}
            </Link>
        ))}
        
      </div>

      
    </div>
  );
}
