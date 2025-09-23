import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner' // notificaciones

export default function EditProfile() {
  const { user, setUser } = useAppContext()
  const navigate = useNavigate()

  const [csrfToken, setCsrfToken] = useState('')
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    email: '',
    username: '',
    description: ''
  })

  // manejar cambios del formulario
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  // enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!csrfToken) {
      toast.error('Token de seguridad no listo, inténtalo de nuevo')
      return
    }

    console.log('Enviando datos:', form, 'CSRF:', csrfToken)

    fetch('http://localhost:5000/editar_perfil', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': csrfToken
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.changed) {
          toast.success(data.message)
          navigate('/profile')
        } else {
          if (data.error) toast.error(data.error.msg)
          else toast.error(data.message || 'Error al actualizar')
        }
      })
      .catch((err) => {
        toast.error('Error al enviar los datos')
        console.error(err)
      })
  }

  // cargar datos iniciales y CSRF
  useEffect(() => {
    document.title = 'Edit Profile'

    Promise.all([
      fetch('http://localhost:5000/perfil', { credentials: 'include', method: 'GET' }).then((res) => res.json()),
      fetch('http://localhost:5000/csrf-token', { credentials: 'include', method: 'GET' }).then((res) => res.json())
    ])
      .then(([perfil, csrf]) => {
        if (!perfil.loggedIn) {
          console.log('Usuario no logueado')
          setUser(null)
          navigate('/login')
        } else {
          console.log('Usuario logueado')
          setUser(perfil.user)
          setForm({
            email: perfil.user.email,
            username: perfil.user.username,
            description: perfil.user.description || ''
          })
        }
        setCsrfToken(csrf.csrfToken)
      })
      .catch((err) => {
        console.error('Error cargando datos iniciales', err)
        toast.error('Error al cargar los datos del perfil')
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="text-center py-20 text-white">Cargando...</div>

  return (
    <div className="flex py-[150px] justify-center items-center bg-gradient-to-r from-red-700 to-red-500 px-4">
      <form
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-extrabold text-center text-red-800">
          Editar Perfil
        </h1>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-semibold text-gray-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Introduce tu email"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Username */}
        <div className="flex flex-col">
          <label htmlFor="username" className="text-sm font-semibold text-gray-600">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Introduce tu username"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm font-semibold text-gray-600">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Descríbete"
            className="resize-none mt-1 px-4 py-2 h-[10rem] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="cursor-pointer bg-gradient-to-r from-red-500 to-red-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Enviar
        </button>
      </form>
    </div>
  )
}
