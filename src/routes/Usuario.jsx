import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { toast } from "sonner"
import { Link } from 'react-router-dom'

export default function Usuario() {
  const [userData, setUserData] = useState(null) // Datos del usuario que estamos viendo
  const navigate = useNavigate()
  const { id_usuario } = useParams() // ID del usuario desde la URL
  const { user, setUser } = useAppContext() // Usuario logueado actual

  // Función para borrar un usuario (solo admins)
  const borrarUsuario = (id_usuario) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p>¿Seguro que quieres borrar a este usuario? Esta acción no se puede deshacer.</p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                toast.dismiss(t);
                fetch(`http://localhost:5000/admin/delete_user/${id_usuario}`, { method: 'GET', credentials: 'include' })
                  .then(res => res.json())
                  .then(data => {
                    if (data.deleted) {
                      toast.success('Usuario borrado con éxito');
                      navigate('/')
                    } else {
                      toast.error(data.message);
                    }
                  })
                  .catch(err => {
                    console.error(err);
                    toast.error('Error al borrar el usuario');
                  });
              }}
              className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
            >
              Sí, borrar
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
    )
  }

  // useEffect para obtener datos del usuario y del usuario logueado
  useEffect(() => {
    document.title = 'Usuario'

    // Verificar si el usuario logueado sigue activo
    fetch('http://localhost:5000/perfil', { credentials: 'include', method: 'GET' })
      .then(res => res.json())
      .then(data => {
        if (!data.loggedIn) setUser(null)
        else setUser(data.user)
      })

    // Obtener datos del usuario cuyo perfil se está viendo
    fetch(`http://localhost:5000/usuario/${id_usuario}`, { credentials: 'include', method: 'GET' })
      .then(res => res.json())
      .then(data => {
        if (data.user_data) {
          setUserData(data.user_data)
        } else {
          navigate('/*') // Redirige a página 404 si no existe
        }
      })
  }, [])

  return (
    <div className="mt-[80px] flex justify-center items-center flex-col gap-8 px-4 sm:px-6 py-10 bg-gray-50">

      {/* --- Badges principales --- */}
      <div className="w-full max-w-6xl bg-gradient-to-r from-blue-200 to-gray-500 rounded-3xl shadow-2xl p-8 mt-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">Perfil de Usuario</h1>

        <div className="flex flex-col sm:flex-row justify-between gap-6">

          {/* Badge: Usuario verificado */}
          <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-xl shadow-md">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-600">
              {userData?.verificado 
                ? <i className="fas fa-check text-white text-sm"></i>
                : <i className="fa-solid fa-x text-white text-sm"></i>}
            </div>
            <span className="text-gray-800 font-medium">Usuario Verificado</span>
          </div>

          {/* Badge: Usuario Admin */}
          <div className="flex items-center gap-3 bg-green-50 p-4 rounded-xl shadow-md">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-green-600">
              {userData?.rol === 'admin'
                ? <i className="fas fa-check text-white text-sm"></i>
                : <i className="fa-solid fa-x text-white text-sm"></i>}
            </div>
            <span className="text-gray-800 font-medium">Usuario Admin</span>
          </div>

          {/* Badge: Usuario Veterano */}
          <div className="flex items-center gap-3 bg-red-50 p-4 rounded-xl shadow-md">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-red-600">
              {userData?.veterania >= 1
                ? <i className="fas fa-check text-white text-sm"></i>
                : <i className="fa-solid fa-x text-white text-sm"></i>}
            </div>
            <span className="text-gray-800 font-medium">Usuario Veterano</span>
          </div>

        </div>
      </div>

      {/* --- Contenedor principal del perfil --- */}
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl p-8">

        {/* Avatar + Info */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="relative">
            <img
              src={`/avatars/avatar${userData?.avatar}.webp` || `/avatars/avatar16.webp`}
              alt="avatar"
              className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-lg object-cover"
            />
          </div>

          <div className="text-center md:text-left flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
              {userData?.username || 'Username'}
            </h1>
          </div>

          {/* Botón para borrar usuario (solo admins) */}
          {user && user?.rol === 'admin' && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center justify-center">
              <button
                onClick={() => { borrarUsuario(id_usuario) }}
                className="cursor-pointer w-full bg-gradient-to-r from-red-700 to-red-500 shadow-lg text-white rounded-full px-12 py-3 lg:px-5 font-semibold text-sm md:text-base"
              >
                Borrar Cuenta
              </button>
            </div>
          )}

        </div>

        {/* Descripción del usuario */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Descripción</h2>
          <p className="text-gray-700 leading-relaxed">
            {userData?.description ||
              "Este usuario todavía no ha escrito una descripción personal, pero seguro que tiene mucho que contar."}
          </p>
        </div>

        {/* Stats: Hilos, Mensajes, Fecha de registro */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-indigo-50 rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-sm font-semibold text-gray-600 uppercase">Hilos</h3>
            <p className="text-3xl font-extrabold text-indigo-600 mt-2">
              {userData?.hilos || 0}
            </p>
          </div>
          <div className="bg-teal-50 rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-sm font-semibold text-gray-600 uppercase">Mensajes</h3>
            <p className="text-3xl font-extrabold text-teal-600 mt-2">
              {userData?.mensajes || 0}
            </p>
          </div>
          <div className="bg-pink-50 rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-sm font-semibold text-gray-600 uppercase">Miembro desde</h3>
            <p className="text-lg font-medium text-pink-600 mt-2">
              {userData?.fecha_registro}
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}


