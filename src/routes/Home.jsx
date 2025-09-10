import React, { useEffect } from 'react'
import Categorias from '../components/Categorias'
import Populares from '../components/Populares'


export default function Home() {

  useEffect(()=>{
    document.title = 'Inicio'
  },[])


  return (
    <div className='mt-[80px] bg-gray-200 flex flex-col px-6 md:flex-row-reverse md:gap-6'>
        
      <Populares></Populares>

      <Categorias></Categorias>

    </div>
  )
}
