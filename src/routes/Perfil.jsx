import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function Perfil() {
  const { user, setUser } = useAppContext()
  const navigate = useNavigate()

  const verificarCorreo = ()=>{
    fetch('http://localhost:5000/enviar_verificacion', {
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({email: user?.email || null}),
      credentials:'include'
    }).then(res=>res.json()).then(data=>{alert(data.message)}).catch(err=>{alert('Error al enviar el correo de verificación')})
  }

  const logout = () =>{
    fetch('http://localhost:5000/logout',{credentials:'include',method:'GET'})
    .then(res=>res.json())
    .then(data=>{
      if (data.loggedOut) {
        console.log('El usuario ha cerrado sesión');
        setUser(null)
        navigate('/login')
        
      }else{
        console.log('El usuario no está logueado');
      }
    })
  }

  const borrarCuenta = ()=>{

    const confirm = window.confirm('¿Seguro que quieres borrar tu cuenta?')

    if(!confirm) return

    fetch('http://localhost:5000/borrar_cuenta', {
      method:'GET',
      credentials:'include'
    }).then(res=>res.json())
    .then(data=>{
      if (data.deleted) {
        logout()
      }else{
        alert('Error al intentar borrar usuario, intentalo más tarde')
      }
    })
    .catch(err=>{alert('Error al enviar el correo de verificación')})
  }

  useEffect(() => {
    document.title = 'Perfil'

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


      
    }, [])

    

  return (
    <div className="mt-[80px] flex justify-center items-center flex-col gap-8 px-4 sm:px-6 py-10 bg-gray-50">

      <div class="w-full max-w-6xl bg-gradient-to-r from-blue-200 to-gray-500 rounded-3xl shadow-2xl p-8 mt-6">
        <h1 class="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">Perfil de Usuario</h1>

        <div class="flex flex-col sm:flex-row justify-between gap-6">

            <div class="flex items-center gap-3 bg-blue-50 p-4 rounded-xl shadow-md">
            <div class="w-6 h-6 flex items-center justify-center rounded-full bg-blue-600">
                {user?.verificado ? (<><i class="fas fa-check text-white text-sm"></i></>) : (<><i class="fa-solid fa-x text-white text-sm"></i></>)}    
            </div>
            <span class="text-gray-800 font-medium">Usuario Verificado</span>
            </div>

            <div class="flex items-center gap-3 bg-green-50 p-4 rounded-xl shadow-md">
            <div class="w-6 h-6 flex items-center justify-center rounded-full bg-green-600">
                {user?.rol === 'admin' ? (<><i class="fas fa-check text-white text-sm"></i></>) : (<><i class="fa-solid fa-x text-white text-sm"></i></>)}    
            </div>
            <span class="text-gray-800 font-medium">Usuario Admin</span>
            </div>

        
            <div class="flex items-center gap-3 bg-red-50 p-4 rounded-xl shadow-md">
            <div class="w-6 h-6 flex items-center justify-center rounded-full bg-red-600">
                {user?.veterania >= 1 ? (<><i class="fas fa-check text-white text-sm"></i></>) : (<><i class="fa-solid fa-x text-white text-sm"></i></>)}    
            </div>
            <span class="text-gray-800 font-medium">Usuario Veterano</span>
            </div>
        </div>
      </div>

      
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl p-8">

        
        
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="relative">
                <img
                src={`/avatars/avatar${user?.avatar}.webp` || `/avatars/avatar16.webp`}
                alt="avatar"
                className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-lg object-cover"
                />
                <Link
                to="/avatares" 
                className="absolute bottom-2 right-2 bg-red-600 text-white w-8 h-8 flex items-center justify-center rounded-full shadow-md transition"
                >
                <i className="fas fa-pencil-alt text-sm"></i>
                </Link>
            </div>

          
          <div className="text-center md:text-left flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
              {user?.username || 'Username'} 
            </h1>
            
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              <Link to="/edit_profile">
                  <button className="bg-gradient-to-r from-green-700 to-green-500 shadow-lg text-white rounded-full px-5 py-2 font-semibold text-sm md:text-base cursor-pointer">
                      Editar Perfil
                  </button>
              </Link>

              {!user?.verificado ? (<button onClick={verificarCorreo} className="bg-gradient-to-r from-blue-700 to-blue-500 shadow-lg text-white rounded-full px-5 py-2 font-semibold text-sm md:text-base cursor-pointer">Verificar Correo</button>) : (<></>)}

              <Link to="/my_threads/page/1">
                  <button className="bg-gradient-to-r from-orange-700 to-orange-500 shadow-lg text-white rounded-full px-5 py-2 font-semibold text-sm md:text-base cursor-pointer">
                      Ver mis Hilos
                  </button>
              </Link>

              <button onClick={()=>{borrarCuenta()}} >
                  <button className="bg-gradient-to-r from-red-700 to-red-500 shadow-lg text-white rounded-full px-5 py-2 font-semibold text-sm md:text-base cursor-pointer">
                      Borrar Cuenta
                  </button>
              </button>
            </div>
          
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Descripción</h2>
          <p className="text-gray-700 leading-relaxed">
            {user?.description ||
              "Este usuario todavía no ha escrito una descripción personal, pero seguro que tiene mucho que contar."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-indigo-50 rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-sm font-semibold text-gray-600 uppercase">Hilos</h3>
            <p className="text-3xl font-extrabold text-indigo-600 mt-2">
              {user?.hilos || 0}
            </p>
          </div>
          <div className="bg-teal-50 rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-sm font-semibold text-gray-600 uppercase">Mensajes</h3>
            <p className="text-3xl font-extrabold text-teal-600 mt-2">
              {user?.mensajes || 0}
            </p>
          </div>
          <div className="bg-pink-50 rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-sm font-semibold text-gray-600 uppercase">Miembro desde</h3>
            <p className="text-lg font-medium text-pink-600 mt-2">
              {user?.fecha_registro}
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

