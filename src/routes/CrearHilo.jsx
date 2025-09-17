import React, { useEffect, useState } from 'react' 
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

export default function CrearHilo() {
  const { user, setUser, categorias, setCategorias } = useAppContext()  
  const navigate = useNavigate()

  const [csrfToken, setCsrfToken] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [contador, setContador] = useState(0)

  const [form, setForm] = useState({
    titulo: '',
    mensaje: '',
    categoria: '1'
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (disabled) return 

    fetch('http://localhost:5000/crearHilo', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json', 'CSRF-Token': csrfToken }
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error)
          if (data.cooldown) {
            setForm({ titulo: '', mensaje: '', categoria: '1' }) 
            setContador(data.cooldown)
            setDisabled(true)
          }
        } else {
          alert(data.message)
          if (data.id_hilo) {
            navigate(`/display_thread/${data.id_hilo}/page/1`)
          }
          if (data.cooldown) {
            setContador(data.cooldown)
            setDisabled(true)
          }
        }
      })
      .catch(err => { 
        alert('Error al enviar los datos') 
        console.error(err)
      })
  }

  
  useEffect(() => {
    if (contador > 0) {
      const interval = setInterval(() => {
        setContador(prev => {
          if (prev <= 1) {
            clearInterval(interval)
            setDisabled(false) 
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [contador])

  useEffect(() => {
    document.title = 'Create Thread'

    fetch('http://localhost:5000/perfil', { credentials: 'include', method: 'GET' })
      .then(res => res.json())
      .then(data => {
        if (!data.loggedIn) {
          setUser(null)
          navigate('/login')
        } else {
          setUser(data.user)
        }
      })

    fetch('http://localhost:5000/csrf-token', { credentials: 'include', method: 'GET' })
      .then(res => res.json())
      .then(data => { setCsrfToken(data.csrfToken) })

    const obtenerCategorias = async () => {
      try {
        const res = await fetch('http://localhost:5000/categorias', { method: 'GET', credentials: 'include' })
        const data = await res.json()
        setCategorias(data.categorias)
      } catch (error) {
        console.log('Error:', error)
      }
    }

    obtenerCategorias()
  }, [])

  return (
    <div className="flex py-[150px] justify-center items-center bg-gradient-to-r from-[#04ecb8] to-[#0d2c71] px-4">
      <form
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-extrabold text-center text-[#0d2c71]">
          Crear Hilo
        </h1>

        {/* Titulo */}
        <div className="flex flex-col">
          <label htmlFor="titulo" className="text-sm font-semibold text-gray-600">
            Título
          </label>
          <input
            type="text"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            disabled={disabled}
            placeholder="Ponle título a tu hilo"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Categoria */}
        <div className="flex flex-col">
          <label htmlFor="categoria" className="text-sm font-semibold text-gray-600">
            Categoría
          </label>
          <select 
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            disabled={disabled}
            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            {categorias.map((categoria,index)=>(
                <option key={index} value={categoria.id}>{categoria.nombre}</option>
            ))}
          </select>
        </div>

        {/* Mensaje */}
        <div className="flex flex-col">
          <label htmlFor="mensaje" className="text-sm font-semibold text-gray-600">
            Mensaje
          </label>
          <textarea
            name="mensaje"
            value={form.mensaje}
            onChange={handleChange}
            disabled={disabled}
            placeholder="Escribe aquí tu mensaje"
            className="resize-none mt-1 px-4 py-2 h-[10rem] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={disabled}
          className="cursor-pointer bg-gradient-to-r from-[#0d2c71] to-[#04ecb8] disabled:bg-green-900 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          {disabled ? `Enviar (en ${contador}s)` : "Enviar"}
        </button>
      </form>
    </div>
  )
}
