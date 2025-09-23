import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner' // notificaciones

export default function ForgotPassword() {
  const { user, setUser } = useAppContext()
  const navigate = useNavigate()

  const [csrfToken, setCsrfToken] = useState('')
  const [form, setForm] = useState({ email: '' })

  // manejar cambios del formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault()

    fetch('http://localhost:5000/recuperarPassword', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json', 'CSRF-Token': csrfToken }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) toast.error(data.error.msg)
        else {
          if (data.message === 'Correo enviado') toast.success(data.message)
          else toast.error(data.message)
        }
      })
      .catch(() => toast.error('Error al enviar datos'))
  }

  // cargar datos iniciales y CSRF
  useEffect(() => {
    document.title = 'Forgot Password'

    fetch('http://localhost:5000/perfil', { credentials: 'include', method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        if (data.loggedIn) {
          console.log('Usuario logueado')
          setUser(data.user)
          navigate('/profile')
        } else {
          console.log('Usuario no logueado')
        }
      })

    fetch('http://localhost:5000/csrf-token', { credentials: 'include', method: 'GET' })
      .then((res) => res.json())
      .then((data) => setCsrfToken(data.csrfToken))
  }, [])

  return (
    <div className="flex justify-center items-center pt-[150px] pb-[50px] bg-gradient-to-r from-green-600 to-green-800 px-4">
      <form
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-extrabold text-center text-green-800">
          Recuperar Contraseña
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

        {/* Botón */}
        <button
          type="submit"
          className="cursor-pointer bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Enviar
        </button>

        {/* Recordaste contraseña */}
        <div className="text-center">
          <p className="text-sm text-green-600">
            ¿Recordaste la contraseña?{' '}
            <a href="/login" className="text-green-800 font-bold">
              Iniciar Sesión
            </a>
          </p>
        </div>
      </form>
    </div>
  )
}
