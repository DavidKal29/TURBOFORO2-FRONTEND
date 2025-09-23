import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'sonner' // notificaciones

export default function Avatares() {
  const avatarCount = 24
  const avatars = Array.from({ length: avatarCount }, (_, i) => `/avatars/avatar${i + 1}.webp`)
  const { user, setUser } = useAppContext()
  const navigate = useNavigate()

  // cambiar avatar
  const cambiarAvatar = (id_avatar) => {
    fetch('http://localhost:5000/editar_avatar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ id_avatar: id_avatar })
    })
      .then(res => res.json())
      .then(data => {
        toast.info(data.message)
        if (data.changed) {
          navigate('/profile')
        }
      })
  }

  // check login y título
  useEffect(() => {
    document.title = 'Change Avatars'

    fetch('http://localhost:5000/perfil', { credentials: 'include', method: 'GET' })
      .then(res => res.json())
      .then(data => {
        if (!data.loggedIn) {
          console.log('Usuario no logueado')
          setUser(null)
          navigate('/login')
        } else {
          console.log('Usuario logueado')
          setUser(data.user)
        }
      })
  }, [])

  return (
    <div className="min-h-screen mt-[80px] bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 py-12 px-6 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-12 text-center drop-shadow-lg">
        Elige tu Avatar
      </h1>

      <div className="grid grid-cols-2 justify-center items-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 w-full max-w-7xl">
        {avatars.map((src, index) => {
          const isSelected = user?.avatar === index + 1
          return (
            <button
              onClick={() => { cambiarAvatar(index + 1) }}
              key={index}
              className={`relative group cursor-pointer w-40 h-40 rounded-full overflow-hidden shadow-2xl transform transition duration-300 ease-out ${
                isSelected
                  ? 'border-4 border-green-500'
                  : 'hover:shadow-pink-500/50 hover:scale-105'
              }`}
            >
              <img
                src={src}
                alt={`Avatar ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
