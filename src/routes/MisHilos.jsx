import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { toast } from "sonner";

export default function MisHilos() {
  const [hilos, setHilos] = useState([]);
  const { user, setUser } = useAppContext();
  const navigate = useNavigate();
  const page = Number(useParams().page);

  const obtenerHilos = async () => {
    try {
      const res = await fetch(`http://localhost:5000/mis_hilos/${page}`, { method: 'GET', credentials: 'include' });
      const data = await res.json();
      if (data.hilos) {
        setHilos(data.hilos);
      } else {
        navigate('/profile');
      }
    } catch (error) {
      setHilos([]);
      console.error(error);
    }
  };

  // Función de confirmación de eliminación con toast
  const confirmDelete = (id_hilo) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p>¿Estás seguro de que quieres eliminar este hilo? Esta acción no se puede deshacer.</p>
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

  const borrarHilo = async (id_hilo) => {
    try {
      const res = await fetch(`http://localhost:5000/delete/${id_hilo}`, { method: 'GET', credentials: 'include' });
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Mis hilos';
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/perfil', { credentials: 'include', method: 'GET' })
      .then(res => res.json())
      .then(data => {
        if (!data.loggedIn) {
          setUser(null);
          navigate('/login');
        } else {
          setUser(data.user);
        }
      });

    obtenerHilos();
  }, []);

  if (hilos.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6">
        <h1 className="text-[120px] font-extrabold drop-shadow-lg text-center">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Debes crear un hilo para ver tus hilos aquí
        </h2>
        <p className="text-lg text-blue-100 max-w-lg text-center mb-8">
          Parece que la página que buscas no existe o fue movida.
        </p>
        <Link
          to="/"
          className="bg-white text-blue-700 font-bold px-6 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
        >
          Volver al inicio
        </Link>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-gray-100 mt-[80px]">
        <div className={`relative bg-gradient-to-r from-blue-500 to-purple-600 py-20 text-center text-white`}>
          <i className={`fa-solid fa-earth text-6xl drop-shadow-lg`}></i>
          <h1 className="mt-6 font-extrabold text-5xl md:text-7xl drop-shadow-lg">
            Mis Hilos
          </h1>
          <h1 className="mt-6 font-extrabold text-5xl md:text-7xl drop-shadow-lg">
            Página: {page}
          </h1>
          <p className="mt-4 text-lg opacity-90 text-center">
            Aquí podrás ver y eliminar tus propios hilos
          </p>
        </div>

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
                    <i className={`fa-solid fa-comment text-blue-500`}></i>
                    <span className="font-medium">{hilo.mensajes}</span>
                  </div>
                  <div className="flex gap-2">
                    <a href={`/display_thread/${hilo.id}/page/1`}
                      className={`bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow hover:scale-105 transition-transform`}
                    >
                      Ver hilo
                    </a>
                    <button onClick={() => confirmDelete(hilo.id)}
                      className={`cursor-pointer bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow hover:scale-105 transition-transform`}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-2 mt-4 lg:mt-6 gap-4 flex-wrap pb-6">
          {Array.from({ length: Math.ceil((user?.hilos || 0) / 39) }, (_, i) => i + 1).map((p, index) => (
            <Link to={`/my_threads/page/${p}`} key={index} className={`${page === p ? ('bg-indigo-900') : ('bg-blue-500')} text-white px-3 py-2 sm:px-5 sm:py-3 rounded-[5px] font-bold`}>
              {p}
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
