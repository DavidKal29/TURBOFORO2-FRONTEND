import React from 'react'
import { useParams } from 'react-router-dom'

export default function Categoria() {
  const categoria = useParams().categoria


  return (
    <div className='mt-[300px]'>Esta es la categoria {categoria}</div>
  )
}
