import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Page404() {
  useEffect(() => {
    document.title = 'Not Found 404'
  }, [])

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6">
      <h1 className="text-[120px] font-extrabold drop-shadow-lg">404</h1>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        ¡Ups! Página no encontrada
      </h2>
      <p className="text-lg text-blue-100 max-w-lg text-center mb-8">
        Parece que la página que buscas no existe o fue movida.  
      </p>
      <Link
        to="/"
        className="bg-white text-blue-700 font-bold px-6 py-3 rounded-full shadow-lg 
                   transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
