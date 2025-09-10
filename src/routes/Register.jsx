import React, { useEffect, useState } from 'react' 


export default function Register() {

  return (
    <div className="flex py-[150px] justify-center items-center bg-gradient-to-r from-purple-700 to-purple-500 px-4">
      <form
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col gap-6"
      >
        <h1 className="text-3xl font-extrabold text-center text-purple-800">
          Crear Cuenta
        </h1>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-semibold text-gray-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Introduce tu email"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Username */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-semibold text-gray-600">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Introduce tu username"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-sm font-semibold text-gray-600"
          >
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            autoComplete='off'
            placeholder="Introduce tu contraseña"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="cursor-pointer bg-gradient-to-r from-purple-500 to-purple-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Enviar
        </button>

        {/* No tienes cuenta */}
        <div className="text-center">
          <p className="text-sm text-purple-600">
            ¿Ya tienes cuenta? <a href="/login" className='text-purple-800 font-bold'>Iniciar Sesión</a>
          </p>
        </div>
      </form>
    </div>
  )
}