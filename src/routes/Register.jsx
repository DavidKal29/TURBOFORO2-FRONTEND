import React, { useEffect, useState } from 'react' 
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'


export default function Register() {

  const {user,setUser} = useAppContext()  
  const navigate = useNavigate()

  const [form,setForm] = useState({
    email:'',
    username:'',
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

    fetch('http://localhost:5000/register',{
      credentials:'include',
      method:'POST',
      body: JSON.stringify(form),
      headers:{'Content-Type':'application/json'}
    }).then(res=>res.json())
          .then(data=>{
            if (data.user) {
              setUser(data.user)
              navigate('/profile')
            }else{
              if (data.error) {
                alert(data.error.msg)
              }else{
                alert(data.message)
              }
            }
          })
          .catch(err=>{alert(err);})


  }

  useEffect(()=>{
    document.title = 'Register'

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


  },[])

  return (
    <div className="flex py-[150px] justify-center items-center bg-gradient-to-r from-purple-700 to-purple-500 px-4">
      <form
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-extrabold text-center text-purple-800">
          Crear Cuenta
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
          <label htmlFor="email" className="text-sm font-semibold text-gray-600">
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

        {/* Button */}
        <button
          type="submit"
          className="cursor-pointer bg-gradient-to-r from-purple-500 to-purple-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Enviar
        </button>

        {/* No tienes cuenta */}
        <div className="text-center">
          <p className="text-sm text-purple-600">
            ¿Ya tienes cuenta? <a href="/login" className='text-purple-800 font-bold'>Iniciar Sesión</a>
          </p>
        </div>
      </form>
    </div>
  )
}