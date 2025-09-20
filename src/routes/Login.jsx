import React, { useEffect, useState } from 'react' 
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'


export default function Login() {

  const {user,setUser} = useAppContext()  
  const navigate = useNavigate()

  const [csrfToken,setCsrfToken] = useState('')

  const [form,setForm] = useState({
      email:'',
      password:''
    })
  
    const handleChange =(e)=>{
      setForm({
        ...form,
        [e.target.name]: e.target.value
      })
    }
  
    const handleSubmit =(e)=>{
      e.preventDefault()
  
      fetch('http://localhost:5000/login',{
        credentials:'include',
        method:'POST',
        body: JSON.stringify(form),
        headers:{'Content-Type':'application/json','CSRF-Token':csrfToken}
      }).then(res=>res.json())
      .then(data=>{
        if (data.user) {
          setUser(data.user)
          navigate('/profile')
        }else{
          if (data.error) {
            toast.error(data.error.msg)
          }else{
            toast.error(data.message)
          }
        }
      })
      .catch(err=>{toast.error('Error al enviar datos');})
  
  
    }
  

  useEffect(()=>{
    document.title = 'Login'

    fetch('http://localhost:5000/perfil',{credentials:'include',method:'GET'})
    .then(res=>res.json())
    .then(data=>{
      if (data.loggedIn) {
        console.log('El usuario está logueado');
        setUser(data.user)
        navigate('/profile')
        
        
      }else{
        console.log('El usuario no está logueado');
      }
    })


    fetch('http://localhost:5000/csrf-token',{credentials:'include',method:'GET'})
    .then(res=>res.json())
    .then(data=>{setCsrfToken(data.csrfToken)})


  },[])

  return (
    <div className="flex py-[150px] justify-center items-center bg-gradient-to-r from-blue-700 to-blue-500 px-4">
      <form
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col gap-6"
        onSubmit={handleSubmit}
      >

        <h1 className="text-3xl font-extrabold text-center text-blue-800">
          Iniciar Sesión
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

        {/* Password */}
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-sm font-semibold text-gray-600"
          >
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            autoComplete='off'
            placeholder="Introduce tu contraseña"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Forgot password */}
        <div className="text-right">
          <a
            href="/forgot_password"
            className="text-sm text-blue-600 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="cursor-pointer bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Enviar
        </button>

        {/* No tienes cuenta */}
        <div className="text-center">
          <p className="text-sm text-blue-600">
            ¿No tienes cuenta? <a href="/register" className='text-blue-800 font-bold'>Crear Cuenta</a>
          </p>
        </div>
      </form>
    </div>
  )
}