import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function Usuario() {
  const [userData, setUserData] = useState(null)
  const navigate = useNavigate()
  const {id_usuario} = useParams()

  useEffect(() => {
    document.title = 'Usuario'

    fetch(`http://localhost:5000/usuario/${id_usuario}`, { credentials: 'include', method: 'GET' })
      .then(res => res.json())
      .then(data => {
        if (data.user_data) {
          setUserData(data.user_data)
        } else {
          navigate('/*')
        }
      })
      
    }, [])

    

  return (
    <div className="mt-[80px] flex justify-center items-center flex-col gap-8 px-4 sm:px-6 py-10 bg-gray-50">

      <div class="w-full max-w-6xl bg-gradient-to-r from-blue-200 to-gray-500 rounded-3xl shadow-2xl p-8 mt-6">
        <h1 class="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">Perfil de Usuario</h1>

        <div class="flex flex-col sm:flex-row justify-between gap-6">

            <div class="flex items-center gap-3 bg-blue-50 p-4 rounded-xl shadow-md">
            <div class="w-6 h-6 flex items-center justify-center rounded-full bg-blue-600">
                {userData?.verificado ? (<><i class="fas fa-check text-white text-sm"></i></>) : (<><i class="fa-solid fa-x text-white text-sm"></i></>)}    
            </div>
            <span class="text-gray-800 font-medium">Usuario Verificado</span>
            </div>

            <div class="flex items-center gap-3 bg-green-50 p-4 rounded-xl shadow-md">
            <div class="w-6 h-6 flex items-center justify-center rounded-full bg-green-600">
                {userData?.rol === 'admin' ? (<><i class="fas fa-check text-white text-sm"></i></>) : (<><i class="fa-solid fa-x text-white text-sm"></i></>)}    
            </div>
            <span class="text-gray-800 font-medium">Usuario Admin</span>
            </div>

        
            <div class="flex items-center gap-3 bg-red-50 p-4 rounded-xl shadow-md">
            <div class="w-6 h-6 flex items-center justify-center rounded-full bg-red-600">
                {userData?.veterania >= 1 ? (<><i class="fas fa-check text-white text-sm"></i></>) : (<><i class="fa-solid fa-x text-white text-sm"></i></>)}    
            </div>
            <span class="text-gray-800 font-medium">Usuario Veterano</span>
            </div>
        </div>
      </div>

      
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl p-8">

        
        
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="relative">
                <img
                src={`/avatars/avatar${userData?.avatar}.webp` || `/avatars/avatar16.webp`}
                alt="avatar"
                className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-lg object-cover"
                />
            </div>

          
          <div className="text-center md:text-left flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
              {userData?.username || 'Username'} 
            </h1>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Descripción</h2>
          <p className="text-gray-700 leading-relaxed">
            {userData?.description ||
              "Este usuario todavía no ha escrito una descripción personal, pero seguro que tiene mucho que contar."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-indigo-50 rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-sm font-semibold text-gray-600 uppercase">Hilos</h3>
            <p className="text-3xl font-extrabold text-indigo-600 mt-2">
              {userData?.hilos || 0}
            </p>
          </div>
          <div className="bg-teal-50 rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-sm font-semibold text-gray-600 uppercase">Mensajes</h3>
            <p className="text-3xl font-extrabold text-teal-600 mt-2">
              {userData?.mensajes || 0}
            </p>
          </div>
          <div className="bg-pink-50 rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-sm font-semibold text-gray-600 uppercase">Miembro desde</h3>
            <p className="text-lg font-medium text-pink-600 mt-2">
              {userData?.fecha_registro}
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

