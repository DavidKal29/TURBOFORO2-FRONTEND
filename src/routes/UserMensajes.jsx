import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { toast } from "sonner";

export default function UserMensajes() {
  const [mensajes, setMensajes] = useState([]);
  const [counter, setCounter] = useState(0);
  const { user, setUser } = useAppContext();
  const navigate = useNavigate();
  const page = Number(useParams().page) || 0;
  const id_user = Number(useParams().id_user) || 0;

  // Obtener mensajes del usuario
  const obtenerMensajes = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/user_mensajes/${id_user}/${page}`, { 
        method: 'GET', credentials: 'include' 
      });
      const data = await res.json();
      if (data.mensajes) {
        setMensajes(data.mensajes);
      }
    } catch (error) {
      setMensajes([]);
      navigate('/*');
      console.error(error);
    }
  };

  // Confirmación de eliminación con toast
  const confirmDelete = (id_mensaje) => {
    toast((t) => (
      <div className="flex flex-col gap-2">
        <p>¿Estás seguro de que quieres eliminar este mensaje? Esta acción no se puede deshacer.</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => { toast.dismiss(t); borrarMensaje(id_mensaje); }}
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
    ), { duration: Infinity });
  };

  // Eliminar mensaje
  const borrarMensaje = async (id_mensaje) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/delete_message/${id_mensaje}`, { 
        method: 'GET', credentials: 'include' 
      });
      const data = await res.json();
      if (data.deleted) {
        toast.success("Mensaje eliminado con éxito");
        obtenerMensajes();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error al eliminar el mensaje");
    }
  };

  // Scroll arriba y título
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Mis mensajes';
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/counter_mensajes/${id_user}`, { credentials: 'include', method: 'GET' })
      .then(res => res.json())
      .then(data => {
        if (data.counter) {
          setCounter(data.counter);
        } else {
          navigate('/*');
        }
      });
  }, []);

  // Comprobar usuario
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/perfil`, { credentials: 'include', method: 'GET' })
      .then(res => res.json())
      .then(data => {
        if (!data.loggedIn) { setUser(null); navigate('/login'); }
        else setUser(data.user);
      });

    obtenerMensajes();
  }, []);

  // Si no hay mensajes, mostrar mensaje 404
  if (mensajes.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6">
        <h1 className="text-[120px] font-extrabold drop-shadow-lg text-center">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          No hay mensajes asociados a esta ruta
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
  }

  // Mostrar mensajes
  return (
    <div className="min-h-screen bg-gray-100 mt-[80px]">
      <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 py-20 text-center text-white">
        <i className="fa-solid fa-envelope text-6xl drop-shadow-lg"></i>
        <h1 className="mt-6 font-extrabold text-[35px] drop-shadow-lg">Mensajes de {mensajes[0].username}</h1>
        <h1 className="mt-6 font-extrabold text-[35px] drop-shadow-lg">Página: {page}</h1>
      </div>

      {/* Paginación */}
      <div className="flex justify-center items-center gap-2 mt-4 lg:mt-6 gap-4 flex-wrap">
        {Array.from({ length: Math.ceil((counter || 0) / 39) }, (_, i) => i + 1).map((p, index) => (
          <Link
            to={`/user_messages/${id_user}/page/${p}`}
            key={index}
            className={`${page === p ? 'bg-indigo-900' : 'bg-blue-500'} text-white px-3 py-2 sm:px-5 sm:py-3 rounded-[5px] font-bold`}
          >
            {p}
          </Link>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 gap-8">
        {mensajes.map((mensaje, index) => (
          <div
            key={index}
            className="relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer group overflow-hidden border border-gray-200"
          >
            <div className="flex flex-col h-full justify-between">
              <div>
                <h2 className="font-bold text-1xl text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                  {mensaje.contenido}
                </h2>
                <p className="mt-2 text-gray-500 text-sm">@{mensaje.username} | {mensaje.fecha}</p>
              </div>

              <div className="mt-6 flex items-center justify-between text-gray-600">
                <div className="flex gap-2">
                  <a
                    href={`/display_thread/${mensaje.id_hilo}/page/${Math.ceil(mensaje.position/39)}#post${mensaje.id}`} 
                    target="_blank"
                    className="bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow hover:scale-105 transition-transform"
                  >
                    Ver mensaje
                  </a>
                  {
                    user?.rol === 'admin' || user?.id === id_user ? (
                      <button
                        onClick={() => confirmDelete(mensaje.id)}
                        className="cursor-pointer bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow hover:scale-105 transition-transform"
                      >
                        Eliminar
                      </button>
                    ) : null
                  }
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center items-center gap-2 lg:mt-6 gap-4 flex-wrap pb-4">
        {Array.from({ length: Math.ceil((counter || 0) / 39) }, (_, i) => i + 1).map((p, index) => (
          <Link
            to={`/my_messages/page/${p}`}
            key={index}
            className={`${page === p ? 'bg-indigo-900' : 'bg-blue-500'} text-white px-3 py-2 sm:px-5 sm:py-3 rounded-[5px] font-bold`}
          >
            {p}
          </Link>
        ))}
      </div>
    </div>
  );
}
