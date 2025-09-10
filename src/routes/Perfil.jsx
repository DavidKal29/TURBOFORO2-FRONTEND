import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Perfil() {
  const {user,setUser} = useAppContext()  
  const navigate = useNavigate()

  useEffect(()=>{
      document.title = 'Perfil'
  
      fetch('http://localhost:5000/perfil',{credentials:'include',method:'GET'})
      .then(res=>res.json())
      .then(data=>{
        if (!data.loggedIn) {
          console.log('El usuario no está logueado');
          setUser(null)
          navigate('/login')
          
        }else{
          console.log('El usuario está logueado');
        }
      })
  
  },[])
 


  return (
    <div className='mt-[1000px]'>Perfil</div>
  )
}
