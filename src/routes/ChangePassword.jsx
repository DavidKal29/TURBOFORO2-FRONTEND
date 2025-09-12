import React, { useEffect, useState } from 'react' 
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'


export default function ChangePassword() {

  const {user,setUser} = useAppContext()  
  const navigate = useNavigate()

  const Parametros = useParams()

  const [csrfToken,setCsrfToken] = useState('')

  const [form,setForm] = useState({
      new_password:'',
      confirm_password:''
    })
  
    const handleChange =(e)=>{
      setForm({
        ...form,
        [e.target.name]: e.target.value
      })
    }
  
    const handleSubmit =(e)=>{
      e.preventDefault()
  
      fetch(`http://localhost:5000/cambiarPassword/${Parametros.token}`,{
        credentials:'include',
        method:'POST',
        body: JSON.stringify(form),
        headers:{'Content-Type':'application/json','CSRF-Token':csrfToken}
      }).then(res=>res.json())
      .then(data=>{
        if (data.error) {
            alert(data.error.msg)
        }else{
            alert(data.message)
        }
      })
      .catch(err=>{alert('Error al enviar datos');})
  
    }
  

  useEffect(()=>{
    document.title = 'Change Password'

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
    <div className="flex py-[150px] justify-center items-center bg-gradient-to-r from-pink-700 to-pink-500 px-4">
      <form
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col gap-6"
        onSubmit={handleSubmit}
      >

        <h1 className="text-3xl font-extrabold text-center text-pink-800">
          Cambiar Contraseña
        </h1>

        {/* New Password */}
        <div className="flex flex-col">
          <label
            htmlFor="new_password"
            className="text-sm font-semibold text-gray-600"
          >
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

        {/* Confirm Password */}
        <div className="flex flex-col">
          <label
            htmlFor="new_password"
            className="text-sm font-semibold text-gray-600"
          >
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

        {/* Button */}
        <button
          type="submit"
          className="cursor-pointer bg-gradient-to-r from-pink-500 to-pink-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Enviar
        </button>

        {/* No tienes cuenta */}
        <div className="text-center">
          <p className="text-sm text-pink-600">
            ¿Cambiaste la contraseña? <a href="/login" className='text-pink-800 font-bold'>Iniciar Sesión</a>
          </p>
        </div>
      </form>
    </div>
  )
}