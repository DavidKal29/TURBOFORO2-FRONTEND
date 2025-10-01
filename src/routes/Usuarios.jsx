import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { toast } from 'sonner'
import { useNavigate, Link, useParams } from 'react-router-dom'

export default function Usuarios() {
  const [users, setUsers] = useState([])
  const { user, setUser } = useAppContext()
  const [counter, setCounter] = useState(0)
  const page = Number(useParams().page) || 0
  const navigate = useNavigate()

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
                fetch(`${process.env.REACT_APP_API_URL}/delete_account/${id_usuario}`, { method: 'GET', credentials: 'include' })
                  .then(res => res.json())
                  .then(data => {
                    if (data.deleted) {
                      toast.success('Usuario borrado con éxito');
                      navigate(0)
                    } else {
                      toast.error(data.message);
                    }
                  })
                  .catch(err => {
                    console.error(err);
                    toast.error('Error al borrar el usuario');
                  });
              }}
              className="bg-red-600 cursor-pointer text-white px-3 py-1 rounded-lg hover:bg-red-700"
            >
              Sí, borrar
            </button>
            <button
              onClick={() => toast.dismiss(t)}
              className="bg-gray-200 cursor-pointer px-3 py-1 rounded-lg hover:bg-gray-300"
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    )
  }

  useEffect(() => {
    document.title = 'Usuarios Registrados'
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/perfil`, { credentials: 'include', method: 'GET' })
      .then(res => res.json())
      .then(data => {
        if (!data.loggedIn) {
          setUser(null)
          navigate('/login')
        } else setUser(data.user)
      })

    fetch(`${process.env.REACT_APP_API_URL}/admin/users_counter`, { credentials: 'include', method: 'GET' })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          navigate('/*')
        } else {
          setCounter(data.counter)
        }
      })
  }, [])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/admin/users/${page}`, { credentials: 'include', method: 'GET' })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          navigate('/*')
        } else {
          setUsers(data.users)
        }
      })
  }, [page])

  return (
    <div className='py-[120px] flex flex-col justify-center items-center bg-gray-200'>
      <h1 className='font-extrabold text-3xl md:text-4xl text-left mb-4 text-gray-800'>Usuarios Registrados</h1>

      {/* Paginación */}
      <div className="flex justify-center items-center gap-2 mt-4 lg:mt-6 gap-4 flex-wrap pb-6">
        {Array.from({ length: Math.ceil((counter || 0) / 20) }, (_, i) => i + 1).map((p, index) => (
          <Link
            to={`/usuarios/${p}`}
            key={index}
            className={`${page === p ? 'bg-blue-500' : 'bg-indigo-900'} text-white px-4 py-2 rounded-xl font-bold hover:scale-105 transition`}
          >
            {p}
          </Link>
        ))}
      </div>

      <div class="w-full px-4 py-8 flex flex-col items-center text-white">
        <div class="overflow-x-auto w-full max-w-[1100px] rounded scrollbar-hide">
          
          {/* Tabla de usuarios */}
          <table class="w-full whitespace-nowrap border-none">

            {/* Cabecera */}
            <thead class="text-white bg-blue-800">
              <tr>
                <th class="px-4 py-3 text-[20px] md:text-[25px] font-bold text-center">Foto</th>
                <th class="px-4 py-3 text-[20px] md:text-[25px] font-bold text-center">ID</th>
                <th class="px-4 py-3 text-[20px] md:text-[25px] font-bold text-center">Email</th>
                <th class="px-4 py-3 text-[20px] md:text-[25px] font-bold text-center">Username</th>
                <th class="px-4 py-3 text-[20px] md:text-[25px] font-bold text-center">Rol</th>
                <th class="px-4 py-3 text-[20px] md:text-[25px] font-bold text-center">Fecha Registro</th>
                <th class="px-4 py-3 text-[20px] md:text-[25px] font-bold text-center">Acciones</th>
              </tr>
            </thead>

            {/* Usuarios */}
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr key={index} class="odd:bg-[#1f1f1f] even:bg-[#2a2a2a]">
                    <td class="px-4 py-3 text-[16px] md:text-[18px] font-semibold text-center">
                      <img src={`/avatars/avatar${user.id_avatar}.webp`} alt={user.id_avatar} className='rounded-full' />
                    </td>
                    <td class="px-4 py-3 text-[16px] md:text-[18px] font-semibold text-center">{user.id}</td>
                    <td class="px-4 py-3 text-[16px] md:text-[18px] font-semibold text-center">{user.email}</td>
                    <td class="px-4 py-3 text-[16px] md:text-[18px] font-semibold text-center">{user.username}</td>
                    <td class="px-4 py-3 text-[16px] md:text-[18px] font-semibold text-center">{user.rol}</td>
                    <td class="px-4 py-3 text-[16px] md:text-[18px] font-semibold text-center">{user.fecha}</td>
                    <td class="px-4 py-3 text-[16px] md:text-[18px] font-semibold text-center">
                      <div class="flex justify-center gap-4">
                        <a
                          href={`/usuario/${user.id}`}
                          target='_blank'
                          class="cursor-pointer text-center bg-green-800 px-4 py-2 rounded text-[15px]"
                        >
                          Ver Perfil
                        </a>
                        <button
                          onClick={() => { borrarUsuario(user.id) }}
                          class="cursor-pointer text-center bg-red-600 px-4 py-2 rounded text-[15px]"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paginación */}
      <div className="flex justify-center items-center gap-2 mt-4 lg:mt-6 gap-4 flex-wrap pb-6">
        {Array.from({ length: Math.ceil((counter || 0) / 20) }, (_, i) => i + 1).map((p, index) => (
          <Link
            to={`/usuarios/${p}`}
            key={index}
            className={`${page === p ? 'bg-blue-500' : 'bg-indigo-900'} text-white px-4 py-2 rounded-xl font-bold hover:scale-105 transition`}
          >
            {p}
          </Link>
        ))}
      </div>
    </div>
  )
}

