import React, { useEffect } from 'react'
import Categorias from '../components/Categorias'
import Populares from '../components/Populares'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function Home() {

  useEffect(() => {
    document.title = 'Inicio'

  }, [])

  return (
    <div className='mt-[80px] bg-gray-200 flex flex-col px-6'>

      {/* Botón arriba a la derecha */}
      <div className="flex mb-4 mt-4 md:mt-12">
        <Link to="/crear_hilo" className="bg-gradient-to-r from-orange-700 to-orange-500 shadow-lg text-white rounded-full px-5 py-2 font-semibold text-sm md:text-base cursor-pointer">
          Crear nuevo hilo <i className="fa-solid fa-pencil"></i>
        </Link>
      </div>

      {/* Contenido en columnas */}
      <div className="flex flex-col lg:flex-row-reverse md:gap-6">
        <Populares></Populares>
        <Categorias></Categorias>
      </div>

    </div>
  )
}
