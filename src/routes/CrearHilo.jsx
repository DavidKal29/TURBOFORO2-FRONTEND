import React, { useEffect, useState } from 'react' 
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'


export default function CrearHilo() {

  const {user,setUser} = useAppContext()  
  const navigate = useNavigate()

  const [csrfToken,setCsrfToken] = useState('')

  const {categorias} = useAppContext()

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
      headers:{'Content-Type':'application/json','CSRF-Token':csrfToken}
    }).then(res=>res.json())
          .then(data=>{
            if (data.changed) {
              navigate('/profile')
            }else{
                if (data.error) {
                    alert(data.error.msg)
                }else{
                    alert(data.message)
                }
            }
          })
          .catch(err=>{alert('Error al enviar los datos');})


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

    fetch('http://localhost:5000/csrf-token',{credentials:'include',method:'GET'})
    .then(res=>res.json())
    .then(data=>{setCsrfToken(data.csrfToken)})


  },[])

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
            placeholder="Ponle título a tu hilo"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Categoria */}
        <div className="flex flex-col">
          <label htmlFor="titulo" className="text-sm font-semibold text-gray-600">
            Categoría
          </label>

          <select 
            type="text"
            name="titulo"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            
            {categorias.map((categoria,index)=>(
                <option key={index} value={categoria.id}>{categoria.nombre}</option>
            ))}

            

          </select>

        </div>

        

        {/* Contenido */}
        <div className="flex flex-col">
          <label htmlFor="contenido" className="text-sm font-semibold text-gray-600">
            Contenido
          </label>
          <textarea
            type="text"
            name="contenido"
            onChange={handleChange}
            placeholder="Escribe aquí tu mensaje"
            className="resize-none mt-1 px-4 py-2 h-[10rem] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


        {/* Button */}
        <button
          type="submit"
          className="cursor-pointer bg-gradient-to-r from-[#0d2c71] to-[#04ecb8] text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Enviar
        </button>

        
      </form>
    </div>
  )
}





