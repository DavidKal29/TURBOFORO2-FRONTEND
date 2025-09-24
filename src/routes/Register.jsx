import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Register() {

  // Contexto global del usuario
  const { user, setUser } = useAppContext();
  const navigate = useNavigate();

  // Estado para CSRF token
  const [csrfToken, setCsrfToken] = useState('');

  // Estado para el formulario
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: ''
  });

  // Función para actualizar el formulario dinámicamente
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Función para enviar datos de registro al backend
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/register`, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': csrfToken
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          // Registro exitoso, guardar usuario y redirigir
          setUser(data.user);
          navigate('/profile');
        } else {
          // Mostrar errores del servidor
          if (data.error) {
            toast.error(data.error.msg);
          } else {
            toast.error(data.message);
          }
        }
      })
      .catch(err => {
        toast.error('Error al enviar datos');
      });
  };

  // useEffect inicial
  useEffect(() => {
    document.title = 'Register';

    // Verificar si el usuario ya está logueado
    fetch(`${process.env.REACT_APP_API_URL}/perfil`, { credentials: 'include', method: 'GET' })
      .then(res => res.json())
      .then(data => {
        if (data.loggedIn) {
          console.log('El usuario está logueado');
          setUser(data.user);
          navigate('/profile');
        } else {
          console.log('El usuario no está logueado');
        }
      });

    // Obtener CSRF token
    fetch(`${process.env.REACT_APP_API_URL}/csrf-token`, { credentials: 'include', method: 'GET' })
      .then(res => res.json())
      .then(data => { setCsrfToken(data.csrfToken); });

  }, [navigate, setUser]);

  return (
    <div className="flex py-[150px] justify-center items-center bg-gradient-to-r from-purple-700 to-purple-500 px-4">

      {/* Formulario de registro */}
      <form
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col gap-6"
        onSubmit={handleSubmit}
      >

        {/* Título */}
        <h1 className="text-3xl font-extrabold text-center text-purple-800">
          Crear Cuenta
        </h1>

        {/* Campo Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-semibold text-gray-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Introduce tu email"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Campo Username */}
        <div className="flex flex-col">
          <label htmlFor="username" className="text-sm font-semibold text-gray-600">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Introduce tu username"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Campo Password */}
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-semibold text-gray-600">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="off"
            placeholder="Introduce tu contraseña"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Botón Enviar */}
        <button
          type="submit"
          className="cursor-pointer bg-gradient-to-r from-purple-500 to-purple-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Enviar
        </button>

        {/* Enlace a Login */}
        <div className="text-center">
          <p className="text-sm text-purple-600">
            ¿Ya tienes cuenta? <a href="/login" className="text-purple-800 font-bold">Iniciar Sesión</a>
          </p>
        </div>

      </form>
    </div>
  );
}
