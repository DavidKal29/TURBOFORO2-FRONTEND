import React, { useEffect, useState } from 'react'

export default function Populares() {
  const [hilosTrending, setHilosTrending] = useState([])
  const [stats, setStats] = useState({})

  // traer hilos y stats al cargar
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/home`, { method: 'GET', credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data) {
          setHilosTrending(data.hilosTrending)
          setStats(data.stats)
        } else {
          setHilosTrending([])
          setStats({})
        }
      })
  }, [])

  return (
    <div className='bg-gray-50 rounded-2xl shadow-2xl p-6 mb-12 w-full md:overflow-y-auto md:h-[40%] gap-6'>
      <h1 className='font-extrabold text-3xl md:text-4xl text-left mb-4 text-gray-800'>Populares</h1>
      <h2 className='text-left mb-6 text-gray-600 border-b-[2px] border-gray-300 pb-2'>Los hilos más recientes</h2>

      <div className='flex flex-col gap-4'>
        {hilosTrending.map((hilo, index) => (
          <a href={`/display_thread/${hilo.id}/page/1`} key={index} className="flex flex-col gap-4">
            <div className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              
              <div className="flex items-start gap-3">
                <div className="text-gray-800 font-extrabold text-3xl md:text-4xl">
                  {index + 1}
                </div>
                <p className="font-semibold text-gray-700 text-sm md:text-base leading-snug">
                  {hilo.titulo}
                </p>
              </div>

              <div className="flex justify-between items-center mt-3 text-gray-500 text-sm">
                <p>
                  <i className="fa-solid fa-message"></i> {hilo.mensajes}
                </p>
                <p>@{hilo.username}</p>
              </div>

            </div>
          </a>
        ))}
      </div>

      {/* stats */}
      <div className='flex flex-col gap-4 p-4'>
        <h1 className='font-extrabold text-3xl md:text-4xl text-left mb-4 text-gray-800'>Estadísticas</h1>
        <div className='flex flex-col items-start gap-4'>
          <div className='flex gap-2 justify-center items-center'>
            <i className="fa-solid fa-users text-black"></i>
            <p className='font-semibold text-[20px] text-black'>Usuarios: <span className='font-bold'>{stats.usuarios}</span></p>
          </div>

          <div className='flex gap-2 justify-center items-center'>
            <i className="fa-solid fa-clone text-black"></i>
            <p className='font-semibold text-[20px] text-black'>Hilos: <span className='font-bold'>{stats.hilos}</span></p>
          </div>

          <div className='flex gap-2 justify-center items-center'>
            <i className="fa-solid fa-comments text-black"></i>
            <p className='text-[20px] text-black'>Mensajes: <span className='font-bold'>{stats.mensajes}</span></p>
          </div>
        
        </div>
      </div>

    </div>
  )
}
