import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { toast } from 'sonner'
import { useNavigate, Link } from 'react-router-dom'

export default function Usuarios() {
    const [users,setUsers] = useState([])
    const {user,setUser} = useAppContext()
    const navigate = useNavigate()

    // Función para borrar un usuario (solo admins)
      const borrarUsuario = (id_usuario) => {
        toast(
          (t) => (
            <div className="flex flex-col gap-2">
              <p>¿Seguro que quieres borrar a este usuario? Esta acción no se puede deshacer.</p>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => {
                    toast.dismiss(t);
                    fetch(`${process.env.REACT_APP_API_URL}/admin/delete_user/${id_usuario}`, { method: 'GET', credentials: 'include' })
                      .then(res => res.json())
                      .then(data => {
                        if (data.deleted) {
                          toast.success('Usuario borrado con éxito');
                          navigate(0)
                        } else {
                          toast.error(data.message);
                        }
                      })
                      .catch(err => {
                        console.error(err);
                        toast.error('Error al borrar el usuario');
                      });
                  }}
                  className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                >
                  Sí, borrar
                </button>
                <button
                  onClick={() => toast.dismiss(t)}
                  className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ),
          { duration: Infinity }
        )
      }

    useEffect(()=>{
        document.title = 'Usuarios Registrados'

        fetch(`${process.env.REACT_APP_API_URL}/perfil`, { credentials: 'include', method: 'GET' })
            .then(res => res.json())
            .then(data => {
                if (!data.loggedIn) {
                setUser(null)
                navigate('/login')
                } else setUser(data.user)
        })

        

    },[])

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/admin/users`, {credentials:'include',method:'GET'})
        .then(res=>res.json())
        .then(data=>{
            if (data.message) {
                toast.error(data.message)
                navigate('/')
            }else{
                setUsers(data.users)
            }
        })
    },[])



  return (
    <div className='py-[120px] flex flex-col justify-center items-center bg-gray-200'>
        <h1 className='font-extrabold text-3xl md:text-4xl text-left mb-4 text-gray-800'>Usuarios Registrados</h1>

        <div class="w-full px-4 py-8 flex flex-col items-center text-white">
            <div class="overflow-x-auto w-full max-w-[1250px] rounded scrollbar-hide">
                <table class="w-full whitespace-nowrap border-none">
                    <thead class="text-white bg-[#C40C0C]">
                        <tr>
                        <th class="px-4 py-3 text-[20px] md:text-[25px] font-bold text-center">Foto</th>
                        <th class="px-4 py-3 text-[20px] md:text-[25px] font-bold text-center">ID</th>
                        <th class="px-4 py-3 text-[20px] md:text-[25px] font-bold text-center">Email</th>
                        <th class="px-4 py-3 text-[20px] md:text-[25px] font-bold text-center">Username</th>
                        <th class="px-4 py-3 text-[20px] md:text-[25px] font-bold text-center">Rol</th>
                        <th class="px-4 py-3 text-[20px] md:text-[25px] font-bold text-center">Fecha Registro</th>
                        <th class="px-4 py-3 text-[20px] md:text-[25px] font-bold text-center">Acciones</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        
                        {users.map((user,index)=>{
                            
                            return (
                                <tr key={index} class="odd:bg-[#1f1f1f] even:bg-[#2a2a2a]">
                                    <td class="px-4 py-3 text-[16px] md:text-[18px] font-semibold text-center">
                                        <img src={`/avatars/avatar${user.id_avatar}.webp`} alt={user.id_avatar} className='rounded-full' />
                                    </td>
                                    <td class="px-4 py-3 text-[16px] md:text-[18px] font-semibold text-center">{user.id}</td>
                                    <td class="px-4 py-3 text-[16px] md:text-[18px] font-semibold text-center">{user.email}</td>
                                    <td class="px-4 py-3 text-[16px] md:text-[18px] font-semibold text-center">{user.username}</td>
                                    <td class="px-4 py-3 text-[16px] md:text-[18px] font-semibold text-center">{user.rol}</td>
                                    <td class="px-4 py-3 text-[16px] md:text-[18px] font-semibold text-center">{user.fecha}</td>
                                    
                                    <td class="px-4 py-3 text-[16px] md:text-[18px] font-semibold text-center">
                                        <div class="flex justify-center gap-4">
                                            <a href={`/usuario/${user.id}`} target='_blank' class="cursor-pointer text-center bg-green-800 px-3 py-1 rounded text-[15px]">Ver Perfil</a>
                                            <a href="/" class="cursor-pointer text-center bg-blue-800 px-3 py-1 rounded text-[15px]">Hilos</a>
                                            <a href="/" class="cursor-pointer text-center bg-yellow-600 px-3 py-1 rounded text-[15px]">Mensajes</a>
                                            <button onClick={()=>{borrarUsuario(user.id)}} class="cursor-pointer text-center bg-red-600 px-3 py-1 rounded text-[15px]">Eliminar</button>
                                        </div>
                                    </td>
                                </tr>
                            )

                        })}            
                        
                    </tbody>
                </table>
            </div>
        </div>



    </div>
  )
}
