import React from 'react'
import Categorias from '../components/Categorias'
import Populares from '../components/Populares'


export default function Home() {
  return (
    <div className='mt-[80px] bg-gray-200 flex flex-col px-6 md:flex-row-reverse md:gap-6'>
        
      <Populares></Populares>

      <Categorias></Categorias>

    </div>
  )
}
