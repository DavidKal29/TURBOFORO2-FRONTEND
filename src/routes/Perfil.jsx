import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from "sonner";

export default function Perfil() {
  const { user, setUser } = useAppContext()
  const navigate = useNavigate()

  // Enviar correo de verificación
  const verificarCorreo = () => {
    fetch(`${process.env.REACT_APP_API_URL}/enviar_verificacion`, {
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({ email: user?.email || null }),
      credentials:'include'
    })
    .then(res => res.json())
    .then(data => toast.info(data.message))
    .catch(() => toast.error('Error al enviar el correo de verificación'))
  }

  // Logout
  const logout = () => {
    fetch(`${process.env.REACT_APP_API_URL}/logout`, { credentials:'include', method:'GET' })
      .then(res => res.json())
      .then(data => {
        if (data.loggedOut) {
          setUser(null)
          navigate('/login')
        } else console.log('El usuario no está logueado')
      })
  }

  // Borrar cuenta con confirmación
  const borrarCuenta = () => {
    toast(t => (
      <div className="flex flex-col gap-2">
        <p>¿Seguro que quieres borrar tu cuenta? Esta acción no se puede deshacer.</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => {
              toast.dismiss(t)
              fetch(`${process.env.REACT_APP_API_URL}/borrar_cuenta`, { method:'GET', credentials:'include' })
                .then(res => res.json())
                .then(data => {
                  if (data.deleted) {
                    toast.success('Cuenta borrada con éxito')
                    logout()
                  } else {
                    toast.error('Error al intentar borrar usuario, inténtalo más tarde')
                  }
                })
                .catch(() => toast.error('Error al borrar la cuenta'))
            }}
            className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
          >
            Sí, borrar
          </button>
          <button onClick={() => toast.dismiss(t)} className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300">
            Cancelar
          </button>
        </div>
      </div>
    ), { duration: Infinity })
  }

  // Obtener datos del usuario al montar
  useEffect(() => {
    document.title = 'Perfil'

    fetch(`${process.env.REACT_APP_API_URL}/perfil`, { credentials: 'include', method: 'GET' })
      .then(res => res.json())
      .then(data => {
        if (!data.loggedIn) {
          setUser(null)
          navigate('/login')
        } else setUser(data.user)
      })
  }, [])

  return (
    <div className="mt-[80px] flex justify-center items-center flex-col gap-8 px-4 sm:px-6 py-10 bg-gray-50">

      {/* --- Badges principales --- */}
      <div className="w-full max-w-6xl bg-gradient-to-r from-blue-200 to-gray-500 rounded-3xl shadow-2xl p-8 mt-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 text-center md:text-left">
          Perfil de Usuario
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Verificado */}
          <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-xl shadow-md">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-600">
              {user?.verificado ? <i className="fas fa-check text-white text-sm"></i> : <i className="fa-solid fa-x text-white text-sm"></i>}
            </div>
            <span className="text-gray-800 font-medium">Usuario Verificado</span>
          </div>

          {/* Admin */}
          <div className="flex items-center gap-3 bg-green-50 p-4 rounded-xl shadow-md">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-green-600">
              {user?.rol === 'admin' ? <i className="fas fa-check text-white text-sm"></i> : <i className="fa-solid fa-x text-white text-sm"></i>}
            </div>
            <span className="text-gray-800 font-medium">Usuario Admin</span>
          </div>

          {/* Veterano */}
          <div className="flex items-center gap-3 bg-red-50 p-4 rounded-xl shadow-md">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-red-600">
              {user?.veterania >= 1 ? <i className="fas fa-check text-white text-sm"></i> : <i className="fa-solid fa-x text-white text-sm"></i>}
            </div>
            <span className="text-gray-800 font-medium">Usuario Veterano</span>
          </div>
        </div>
      </div>

      {/* --- Contenedor principal --- */}
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl p-8">
        {/* Avatar + Info */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 mb-10">
          {/* Avatar */}
          <div className="relative">
            <img
              src={`/avatars/avatar${user?.avatar || 16}.webp`}
              alt="avatar"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-gray-300 shadow-lg object-cover"
            />
            <Link
              to="/avatares"
              className="absolute bottom-2 right-2 bg-red-600 text-white w-8 h-8 flex items-center justify-center rounded-full shadow-md transition"
            >
              <i className="fas fa-pencil-alt text-sm"></i>
            </Link>
          </div>

          {/* Info + Botones */}
          <div className="text-center lg:text-left flex flex-col gap-4 flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">{user?.username || 'Username'}</h1>

            {/* Botones */}
            <div className={`grid grid-cols-1 ${user?.verificado ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} lg:grid-cols-4 gap-4`}>
              <Link to="/edit_profile">
                <button className="cursor-pointer w-full bg-gradient-to-r from-green-700 to-green-500 shadow-lg text-white rounded-full px-12 py-3 font-semibold text-sm md:text-base">Editar Perfil</button>
              </Link>

              {!user?.verificado && (
                <button onClick={verificarCorreo} className="cursor-pointer w-full bg-gradient-to-r from-blue-700 to-blue-500 shadow-lg text-white rounded-full px-12 py-3 font-semibold text-sm md:text-base">
                  Verificar Email
                </button>
              )}

              {user?.rol === 'admin' ? (
                <Link to='/usuarios/1' className="cursor-pointer w-full bg-gradient-to-r from-orange-700 to-orange-500 shadow-lg text-white rounded-full px-12 py-3 font-semibold text-sm md:text-base text-center">
                  Usuarios
                </Link>
              ) : (<></>)}

              <button onClick={borrarCuenta} className="cursor-pointer w-full bg-gradient-to-r from-red-700 to-red-500 shadow-lg text-white rounded-full px-12 py-3 font-semibold text-sm md:text-base">
                Borrar Cuenta
              </button>
            </div>
          </div>
        </div>

        {/* Descripción */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Descripción</h2>
          <p className="text-gray-700 leading-relaxed">{user?.description || 'Este usuario todavía no ha escrito una descripción personal.'}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <Link to={user?.hilos>0  ? `/user_threads/${user?.id}/page/1` : ''} className="bg-indigo-50 rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-sm font-semibold text-gray-600 uppercase">Hilos</h3>
            <p className="text-3xl font-extrabold text-indigo-600 mt-2">{user?.hilos || 0}</p>
          </Link>
          <Link to={user?.mensajes>0  ? `/user_messages/${user?.id}/page/1` : ''} className="bg-teal-50 rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-sm font-semibold text-gray-600 uppercase">Mensajes</h3>
            <p className="text-3xl font-extrabold text-teal-600 mt-2">{user?.mensajes || 0}</p>
          </Link>
          <div className="bg-pink-50 rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-sm font-semibold text-gray-600 uppercase">Miembro desde</h3>
            <p className="text-lg font-medium text-pink-600 mt-2">{user?.fecha_registro}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
