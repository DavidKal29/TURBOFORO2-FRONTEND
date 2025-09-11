import React, { useEffect, useState } from 'react' 
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'


export default function EditProfile() {

  const {user,setUser} = useAppContext()  
  const navigate = useNavigate()

  const [form,setForm] = useState({
    email:user?.email || '',
    username:user?.username || '',
    description:user?.description || ''
  })

  const handleChange =(e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit =(e)=>{
    e.preventDefault()

    fetch('http://localhost:5000/editar_perfil',{
      credentials:'include',
      method:'POST',
      body: JSON.stringify(form),
      headers:{'Content-Type':'application/json'}
    }).then(res=>res.json())
          .then(data=>{
            alert(data.message)
            if (data.changed) {
              navigate('/profile')
            }
          })
          .catch(err=>{alert(err);})


  }

  useEffect(()=>{
    document.title = 'Edit Profile'

    fetch('http://localhost:5000/perfil', { credentials: 'include', method: 'GET' })
      .then(res => res.json())
      .then(data => {
        if (!data.loggedIn) {
          console.log('El usuario no está logueado')
          setUser(null)
          navigate('/login')
        } else {
          console.log('El usuario está logueado')
          setUser(data.user)
        }
      })


  },[])

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

        {/* Description */}
        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm font-semibold text-gray-600">
            Description
          </label>
          <textarea
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describete"
            className="resize-none mt-1 px-4 py-2 h-[10rem] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


        {/* Button */}
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