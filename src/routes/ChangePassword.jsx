import React, { useEffect, useState } from 'react' 
import { useAppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner' // notificaciones

export default function ChangePassword() {
  const { user, setUser } = useAppContext()  
  const navigate = useNavigate()
  const Parametros = useParams()

  const [csrfToken, setCsrfToken] = useState('')
  const [form, setForm] = useState({
    new_password: '',
    confirm_password: ''
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

    fetch(`${process.env.REACT_APP_API_URL}/cambiarPassword/${Parametros.token}`, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json', 'CSRF-Token': csrfToken }
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) toast.error(data.error.msg)
        else {
          if (data.message === 'Contraseña cambiada con éxito') toast.success(data.message)
          else toast.error(data.message)
        }
      })
      .catch(() => { toast.error('Error al enviar datos') })
  }

  // check login y obtener CSRF
  useEffect(() => {
    document.title = 'Change Password'

    fetch(`${process.env.REACT_APP_API_URL}/perfil`, { credentials: 'include', method: 'GET' })
      .then(res => res.json())
      .then(data => {
        if (data.loggedIn) {
          console.log('Usuario logueado')
          setUser(data.user)
          navigate('/profile')
        } else console.log('Usuario no logueado')
      })

    fetch(`${process.env.REACT_APP_API_URL}/csrf-token`, { credentials: 'include', method: 'GET' })
      .then(res => res.json())
      .then(data => { setCsrfToken(data.csrfToken) })

  }, [])

  return (
    <div className="flex py-[150px] justify-center items-center bg-gradient-to-r from-pink-700 to-pink-500 px-4">
      <form
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col gap-6"
        onSubmit={handleSubmit}
      >

        <h1 className="text-3xl font-extrabold text-center text-pink-800">
          Cambiar Contraseña
        </h1>

        {/* Nueva contraseña */}
        <div className="flex flex-col">
          <label htmlFor="new_password" className="text-sm font-semibold text-gray-600">
            Nueva Contraseña
          </label>
          <input
            type="password"
            name="new_password"
            value={form.new_password}
            onChange={handleChange}
            autoComplete='off'
            placeholder="Introduce tu nueva contraseña"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Confirmar contraseña */}
        <div className="flex flex-col">
          <label htmlFor="confirm_password" className="text-sm font-semibold text-gray-600">
            Confirmar Contraseña
          </label>
          <input
            type="password"
            name="confirm_password"
            value={form.confirm_password}
            onChange={handleChange}
            autoComplete='off'
            placeholder="Confirma la contraseña"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="cursor-pointer bg-gradient-to-r from-pink-500 to-pink-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Enviar
        </button>

        {/* Iniciar sesión */}
        <div className="text-center">
          <p className="text-sm text-pink-600">
            ¿Cambiaste la contraseña? <a href="/login" className='text-pink-800 font-bold'>Iniciar Sesión</a>
          </p>
        </div>
      </form>
    </div>
  )
}
