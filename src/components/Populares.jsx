import React from 'react'

export default function Populares() {
  return (
      <div className='bg-gray-50 rounded-2xl shadow-2xl p-6 mt-12 mb-12 w-full md:overflow-y-auto md:h-[40%]'>
        <h1 className='font-extrabold text-3xl md:text-4xl text-left mb-4 text-gray-800'>Populares</h1>
        <h2 className='text-left mb-6 text-gray-600 border-b-[2px] border-gray-300 pb-2'>Los hilos más recientes</h2>

        <div className='flex flex-col gap-4'>
          {/* Card 1 */}
          <div className='bg-white rounded-xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 cursor-pointer'>
            <div className='flex items-start gap-3'>
              <div className='text-gray-800 font-extrabold text-3xl md:text-4xl'>1</div>
              <p className='font-semibold text-gray-700 text-sm md:text-base leading-snug'>Ione Belarra no entiende a esas personas que se mata a trabajar si con 6 horas …</p>
            </div>
            <div className='flex justify-between items-center mt-3 text-gray-500 text-sm'>
              <p><i className="fa-solid fa-message"></i> 690</p>
              <p>@ETS-Premium</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className='bg-white rounded-xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 cursor-pointer'>
            <div className='flex items-start gap-3'>
              <div className='text-gray-800 font-extrabold text-3xl md:text-4xl'>2</div>
              <p className='font-semibold text-gray-700 text-sm md:text-base leading-snug'>Ojos de pollo se ha convertido en un fucker</p>
            </div>
            <div className='flex justify-between items-center mt-3 text-gray-500 text-sm'>
              <p><i className="fa-solid fa-message"></i> 630</p>
              <p>@HugoArroyo</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className='bg-white rounded-xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 cursor-pointer'>
            <div className='flex items-start gap-3'>
              <div className='text-gray-800 font-extrabold text-3xl md:text-4xl'>3</div>
              <p className='font-semibold text-gray-700 text-sm md:text-base leading-snug'>URGENTE Cuidado con Campofrio, Navidul,... +Halal mola</p>
            </div>
            <div className='flex justify-between items-center mt-3 text-gray-500 text-sm'>
              <p><i className="fa-solid fa-message"></i> 112</p>
              <p>@David89</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className='bg-white rounded-xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 cursor-pointer'>
            <div className='flex items-start gap-3'>
              <div className='text-gray-800 font-extrabold text-3xl md:text-4xl'>4</div>
              <p className='font-semibold text-gray-700 text-sm md:text-base leading-snug'>FILTRADO los NUEVOS juguetes de APPLE</p>
            </div>
            <div className='flex justify-between items-center mt-3 text-gray-500 text-sm'>
              <p><i className="fa-solid fa-message"></i> 96</p>
              <p>@Trolebncio_45</p>
            </div>
          </div>

          

          {/* Card 5 */}
          <div className='bg-white rounded-xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 cursor-pointer'>
            <div className='flex items-start gap-3'>
              <div className='text-gray-800 font-extrabold text-3xl md:text-4xl'>5</div>
              <p className='font-semibold text-gray-700 text-sm md:text-base leading-snug'>🚨JPELIRROJO CONFIESA que fue INFIEL A RO🚨</p>
            </div>
            <div className='flex justify-between items-center mt-3 text-gray-500 text-sm'>
              <p><i className="fa-solid fa-message"></i> 540</p>
              <p>@AuronPlay</p>
            </div>
          </div>
        </div>
      </div>
  )
}
