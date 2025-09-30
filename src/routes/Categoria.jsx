import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { toast } from "sonner";

export default function Categoria() {
  const { categoria } = useParams();
  const { categorias, setCategorias } = useAppContext();
  const { user, setUser } = useAppContext();
  const [hilos, setHilos] = useState([]);
  const navigate = useNavigate();

  const encontrado = categorias.find((c) => c.nombre === categoria);
  const page = Number(useParams().page);

  // obtener hilos de la categoría
  const obtenerHilos = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/hilos/${encontrado.id}/${page}`,
        { method: 'GET', credentials: 'include' }
      );
      const data = await res.json();
      if (data.hilos) setHilos(data.hilos);
      else navigate('/*');
    } catch (error) {
      navigate('/');
    }
  };

  // confirmación de eliminación
  const confirmDelete = (id_hilo) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p>¿Estás seguro de eliminar este hilo? No se puede deshacer.</p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                toast.dismiss(t);
                borrarHilo(id_hilo);
              }}
              className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
            >
              Sí, eliminar
            </button>
            <button
              onClick={() => toast.dismiss(t)}
              className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300"
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  // eliminar hilo
  const borrarHilo = async (id_hilo) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/delete_thread/${id_hilo}`,
        { method: 'GET', credentials: 'include' }
      );
      const data = await res.json();
      if (data.deleted) {
        toast.success("Hilo eliminado con éxito");
        obtenerHilos();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error al eliminar el hilo");
    }
  };

  // obtener categorías y scroll al top
  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/categorias`, { method: 'GET', credentials: 'include' });
        const data = await res.json();
        if (data.categorias) setCategorias(data.categorias);
        else navigate('/');
      } catch (error) {
        navigate('/');
      }
    };

    obtenerCategorias();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = `${categoria}`;
  }, [categoria, setCategorias, page]);

  // si la categoría no existe, redirigir
  useEffect(() => {
    if (categorias.length > 0 && !encontrado) navigate("/");
  }, [categorias, encontrado]);

  // check login y obtener hilos
  useEffect(() => {
    if (!encontrado) return;

    fetch(`${process.env.REACT_APP_API_URL}/perfil`, { credentials: 'include', method: 'GET' })
      .then(res => res.json())
      .then(data => {
        if (!data.loggedIn) setUser(null);
        else setUser(data.user);
      });

    obtenerHilos();
  }, [encontrado]);

  if (!encontrado) return null;

  return (
    <div className="min-h-screen bg-gray-100 mt-[80px]">
      {/* HERO */}
      <div className={`relative bg-gradient-to-r from-${encontrado.color} to-purple-600 py-20 text-center text-white`}>
        <i className={`fa-solid ${encontrado.icono} text-6xl drop-shadow-lg`}></i>
        <h1 className="mt-6 font-extrabold text-5xl md:text-7xl drop-shadow-lg">{encontrado.nombre}</h1>
        <h1 className="mt-6 font-extrabold text-5xl md:text-7xl drop-shadow-lg">Página: {page}</h1>
        <p className="mt-4 text-lg opacity-90">
          Bienvenido a la categoría de <span className="font-semibold">{encontrado.nombre}</span>, explora y participa 🚀
        </p>
      </div>

      

      {/* paginación */}
      <div className="flex justify-center items-center gap-4 mt-4 lg:mt-6 flex-wrap pb-6">
        {Array.from({ length: Math.ceil(encontrado.counter / 39) }, (_, i) => i + 1).map((p, index) => (
          <Link
            to={`/categoria/${categoria}/page/${p}`}
            key={index}
            className={`${page === p ? 'bg-blue-500' : 'bg-indigo-900'} text-white px-4 py-2 rounded-xl font-bold hover:scale-105 transition`}
          >
            {p}
          </Link>
        ))}
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
                <p className="mt-2 text-gray-500 text-sm">@{hilo.username} | {hilo.fecha}</p>
              </div>

              <div className="mt-6 flex items-center justify-between text-gray-600">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-comment text-blue-500"></i>
                  <span className="font-medium">{hilo.mensajes}</span>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`/display_thread/${hilo.id}/page/1`}
                    className="bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow hover:scale-105 transition-transform"
                  >
                    Ver hilo
                  </a>

                  {user && user?.rol === 'admin' && (
                    <button
                      onClick={() => confirmDelete(hilo.id)}
                      className="cursor-pointer bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow hover:scale-105 transition-transform"
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* paginación */}
      <div className="flex justify-center items-center gap-4 mt-4 lg:mt-6 flex-wrap pb-6">
        {Array.from({ length: Math.ceil(encontrado.counter / 39) }, (_, i) => i + 1).map((p, index) => (
          <Link
            to={`/categoria/${categoria}/page/${p}`}
            key={index}
            className={`${page === p ? 'bg-blue-500' : 'bg-indigo-900'} text-white px-4 py-2 rounded-xl font-bold hover:scale-105 transition`}
          >
            {p}
          </Link>
        ))}
      </div>
    </div>
  );
}
