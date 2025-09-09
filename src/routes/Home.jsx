import React from 'react'

export default function Home() {
  return (
    <div className='mt-[80px] bg-gray-200 min-h-screen flex flex-col px-6'>
        <div className='bg-gray-50 rounded-xl shadow-lg p-6 mt-12'>
            <h1 className='font-extrabold text-4xl md:text-5xl text-center mb-6 text-gray-800'>Categorías</h1>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                
                <div className='flex items-center gap-3 p-4 bg-white rounded-xl shadow hover:shadow-xl transition-shadow duration-300 cursor-pointer border-l-4 border-blue-500'>
                <i className="fa-solid fa-earth-americas text-blue-500 text-2xl"></i>
                <span className='font-semibold text-lg md:text-xl text-gray-800'>General</span>
                </div>
                
                <div className='flex items-center gap-3 p-4 bg-white rounded-xl shadow hover:shadow-xl transition-shadow duration-300 cursor-pointer border-l-4 border-green-500'>
                <i className="fa-solid fa-computer text-green-500 text-2xl"></i>
                <span className='font-semibold text-lg md:text-xl text-gray-800'>Informática</span>
                </div>
                
                <div className='flex items-center gap-3 p-4 bg-white rounded-xl shadow hover:shadow-xl transition-shadow duration-300 cursor-pointer border-l-4 border-purple-500'>
                <i className="fa-solid fa-gamepad text-purple-500 text-2xl"></i>
                <span className='font-semibold text-lg md:text-xl text-gray-800'>Videojuegos</span>
                </div>
                
                <div className='flex items-center gap-3 p-4 bg-white rounded-xl shadow hover:shadow-xl transition-shadow duration-300 cursor-pointer border-l-4 border-red-500'>
                <i className="fa-solid fa-car text-red-500 text-2xl"></i>
                <span className='font-semibold text-lg md:text-xl text-gray-800'>Coches y Motor</span>
                </div>
                
                <div className='flex items-center gap-3 p-4 bg-white rounded-xl shadow hover:shadow-xl transition-shadow duration-300 cursor-pointer border-l-4 border-yellow-500'>
                <i className="fa-solid fa-film text-yellow-500 text-2xl"></i>
                <span className='font-semibold text-lg md:text-xl text-gray-800'>Series y Cine</span>
                </div>
                
                <div className='flex items-center gap-3 p-4 bg-white rounded-xl shadow hover:shadow-xl transition-shadow duration-300 cursor-pointer border-l-4 border-pink-500'>
                <i className="fa-solid fa-book text-pink-500 text-2xl"></i>
                <span className='font-semibold text-lg md:text-xl text-gray-800'>Manga y Anime</span>
                </div>
                
                <div className='flex items-center gap-3 p-4 bg-white rounded-xl shadow hover:shadow-xl transition-shadow duration-300 cursor-pointer border-l-4 border-indigo-500'>
                <i className="fa-solid fa-futbol text-indigo-500 text-2xl"></i>
                <span className='font-semibold text-lg md:text-xl text-gray-800'>Deportes</span>
                </div>
                
                <div className='flex items-center gap-3 p-4 bg-white rounded-xl shadow hover:shadow-xl transition-shadow duration-300 cursor-pointer border-l-4 border-teal-500'>
                <i className="fa-solid fa-dumbbell text-teal-500 text-2xl"></i>
                <span className='font-semibold text-lg md:text-xl text-gray-800'>Fitness</span>
                </div>
                
                <div className='flex items-center gap-3 p-4 bg-white rounded-xl shadow hover:shadow-xl transition-shadow duration-300 cursor-pointer border-l-4 border-orange-500'>
                <i className="fa-solid fa-palette text-orange-500 text-2xl"></i>
                <span className='font-semibold text-lg md:text-xl text-gray-800'>Hobbies</span>
                </div>
                
                <div className='flex items-center gap-3 p-4 bg-white rounded-xl shadow hover:shadow-xl transition-shadow duration-300 cursor-pointer border-l-4 border-red-600'>
                <i className="fa-solid fa-fire text-red-600 text-2xl"></i>
                <span className='font-semibold text-lg md:text-xl text-gray-800'>Polémica</span>
                </div>
                
                <div className='flex items-center gap-3 p-4 bg-white rounded-xl shadow hover:shadow-xl transition-shadow duration-300 cursor-pointer border-l-4 border-pink-600'>
                <i className="fa-solid fa-music text-pink-600 text-2xl"></i>
                <span className='font-semibold text-lg md:text-xl text-gray-800'>Música</span>
                </div>
                
                <div className='flex items-center gap-3 p-4 bg-white rounded-xl shadow hover:shadow-xl transition-shadow duration-300 cursor-pointer border-l-4 border-cyan-500'>
                <i className="fa-solid fa-plane text-cyan-500 text-2xl"></i>
                <span className='font-semibold text-lg md:text-xl text-gray-800'>Viajes</span>
                </div>
                
                <div className='flex items-center gap-3 p-4 bg-white rounded-xl shadow hover:shadow-xl transition-shadow duration-300 cursor-pointer border-l-4 border-yellow-600'>
                <i className="fa-solid fa-utensils text-yellow-600 text-2xl"></i>
                <span className='font-semibold text-lg md:text-xl text-gray-800'>Cocina</span>
                </div>
                
                <div className='flex items-center gap-3 p-4 bg-white rounded-xl shadow hover:shadow-xl transition-shadow duration-300 cursor-pointer border-l-4 border-green-600'>
                <i className="fa-solid fa-paw text-green-600 text-2xl"></i>
                <span className='font-semibold text-lg md:text-xl text-gray-800'>Mascotas</span>
                </div>
                
                <div className='flex items-center gap-3 p-4 bg-white rounded-xl shadow hover:shadow-xl transition-shadow duration-300 cursor-pointer border-l-4 border-purple-600'>
                <i className="fa-solid fa-brain text-purple-600 text-2xl"></i>
                <span className='font-semibold text-lg md:text-xl text-gray-800'>Ciencia</span>
                </div>

                <div className='flex items-center gap-3 p-4 bg-white rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer border-l-4 border-yellow-600'>
                    <i className="fa-solid fa-face-laugh-beam text-yellow-400 text-2xl"></i>
                    <span className='font-semibold text-lg md:text-xl text-yellow-400'>Memes y Humor</span>
                </div>


            </div>

        </div>

    </div>
  )
}
