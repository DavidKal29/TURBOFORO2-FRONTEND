import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { toast } from "sonner"

export default function MostrarHilo() {
  const location = useLocation()
  const navigate = useNavigate()
  const { id_hilo, page } = useParams()
  const { user, setUser } = useAppContext()

  const [mensajes, setMensajes] = useState([]) // Lista de mensajes del hilo
  const [hilo, setHilo] = useState({}) // Datos del hilo
  const [form, setForm] = useState({ mensaje: '' }) // Formulario de mensaje
  const [respuesta, setRespuesta] = useState(null) // Mensaje al que se responde
  const [csrfToken, setCsrfToken] = useState('') // Token CSRF para envíos
  const [disabled, setDisabled] = useState(false) // Bloqueo de botón mientras espera cooldown
  const [contador, setContador] = useState(0) // Contador de cooldown en segundos

  // Función para obtener mensajes del hilo
  const obtenerMensajes = () => {
    fetch(`${process.env.REACT_APP_API_URL}/hilo/${id_hilo}/${page}`, { method: 'GET', credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data) {
          if (!data.message) {
            setHilo(data.hilo)
            setMensajes(data.mensajes)
          } else {
            navigate('/*') // Redirigir a 404 si no existe
          }
        }
      })
      .catch(err => toast.error(err))
  }

  // Función para borrar un mensaje (propio o admin)
  const borrarMensaje = (id_mensaje) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p>¿Seguro que quieres borrar este mensaje? Esta acción no se puede deshacer.</p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                toast.dismiss(t)
                fetch(`${process.env.REACT_APP_API_URL}${user?.rol === 'admin' ? '/admin' : ''}/delete_message/${id_mensaje}`, { method: 'GET', credentials: 'include' })
                  .then(res => res.json())
                  .then(data => {
                    if (data.deleted) {
                      toast.success('Mensaje borrado con éxito')
                      obtenerMensajes()
                    } else {
                      toast.error(data.message)
                    }
                  })
                  .catch(err => {
                    console.error(err)
                    toast.error('Error al borrar el mensaje')
                  })
              }}
              className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
            >
              Sí, borrar
            </button>
            <button
              onClick={() => toast.dismiss(t)}
              className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300"
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    )
  }

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Marcar un mensaje para responder
  const responder = (msg) => {
    setRespuesta(msg)
  }

  // Enviar mensaje al hilo
  const handleSubmit = (e) => {
    e.preventDefault()
    if (disabled) return
    setDisabled(true)

    const body = { ...form }
    if (respuesta) body.id_mensaje_respuesta = respuesta.id

    fetch(`${process.env.REACT_APP_API_URL}/hilo/${id_hilo}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'CSRF-Token': csrfToken },
      credentials: 'include',
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          toast.error(data.error)
          if (data.cooldown) {
            setForm({ mensaje: '' })
            setContador(data.cooldown)
            setDisabled(true)
          } else {
            setDisabled(false)
          }
        } else {
          setRespuesta(null)
          setForm({ mensaje: '' })
          if (data.cooldown) {
            setContador(data.cooldown)
            setDisabled(true)
          } else {
            setDisabled(false)
          }
          obtenerMensajes()
        }
      })
      .catch(err => {
        console.error(err)
        toast.error("Error al enviar el mensaje. Intenta de nuevo.")
        setDisabled(false)
      })
  }

  // Scroll automático a hash en URL si existe
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace("#", "")
      const el = document.getElementById(elementId)
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }, [location, mensajes])

  // Cooldown de envío de mensajes
  useEffect(() => {
    if (contador > 0) {
      const interval = setInterval(() => {
        setContador(prev => {
          if (prev <= 1) {
            clearInterval(interval)
            setDisabled(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [contador])

  // Inicialización: cargar hilo, usuario y token CSRF
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    obtenerMensajes()

    fetch(`${process.env.REACT_APP_API_URL}/perfil`, { credentials: 'include', method: 'GET' })
      .then(res => res.json())
      .then(data => {
        if (!data.loggedIn) setUser(null)
        else setUser(data.user)
      })

    fetch(`${process.env.REACT_APP_API_URL}/csrf-token`, { credentials: 'include', method: 'GET' })
      .then(res => res.json())
      .then(data => setCsrfToken(data.csrfToken))
  }, [page])

  // Actualizar título del documento según título del hilo
  useEffect(() => {
    if (hilo.titulo) {
      document.title = hilo.titulo
    }
  }, [hilo.titulo])

  return (
    <div className="flex justify-center px-4 py-10 mt-[80px] min-h-screen bg-gradient-to-r from-gray-200 to-indigo-500">
      <div className="w-full max-w-5xl pb-32">

        {/* Header del hilo */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 text-white mb-10">
          <h1 className="font-extrabold text-3xl md:text-5xl mb-4 break-words">{hilo.titulo}</h1>
          <p className="flex items-center text-lg font-medium opacity-90">
            <i className="fa-solid fa-book mr-2"></i>
            Página: {page}
          </p>
          <p className="flex items-center text-lg font-medium opacity-90">
            <i className="fa-solid fa-comments mr-2"></i>
            Mensajes enviados: {hilo.mensajes}
          </p>
        </div>

        {/* Paginación */}
        <div className="flex justify-center items-center gap-2 mt-4 lg:mt-6 flex-wrap pb-6">
          {Array.from({ length: Math.ceil(hilo.mensajes / 39) }, (_, i) => i + 1).map((p, index) => (
            <Link
              key={index}
              to={`/display_thread/${id_hilo}/page/${index + 1}`}
              className={`${Number(page) === p ? 'bg-indigo-900' : 'bg-blue-500'} text-white px-3 py-2 sm:px-5 sm:py-3 rounded-[5px] font-bold`}
            >
              {p}
            </Link>
          ))}
        </div>

        {/* Lista de mensajes */}
        <div className="space-y-6">
          {mensajes.map((msg, index) => {
            const borderClass = msg.id_usuario === hilo.id_usuario ? 'border-l-4 border-blue-500' : ''
            return (
              <div
                key={index}
                id={`post${msg.id}`}
                className={`scroll-mt-24 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 flex flex-col gap-4 transition hover:shadow-2xl ${borderClass}`}
              >
                {/* Encabezado del mensaje */}
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                      src={`/avatars/avatar${msg.id_avatar}.webp`}
                      alt="avatar"
                    />
                    <div className="flex flex-col md:flex-row md:items-center w-full">
                      <a
                        href={user?.id && user?.id === msg?.id_usuario ? '/profile' : `/usuario/${msg.id_usuario}`}
                        target='_blank'
                        className="font-semibold text-zinc-800 dark:text-zinc-200 break-words"
                      >
                        {msg.username_mensaje}
                      </a>
                      <span className="text-sm text-zinc-500 dark:text-zinc-400 md:ml-auto">
                        {msg.fecha} #{(Number(page)-1)*39+(index+1)}
                      </span>
                    </div>
                  </div>

                  {/* Botones borrar mensaje */}
                  {user && (user.id === msg.id_usuario || user.rol === 'admin') && (
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => borrarMensaje(msg.id)}
                        className="p-1 cursor-pointer rounded-lg bg-red-600 text-white shadow-md"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  )}
                </div>

                {/* Mensaje respondido */}
                {msg.id_mensaje_respuesta>0 && (
                  <div className="bg-gray-100 dark:bg-zinc-700/70 rounded p-3 max-h-32 overflow-auto border-l-4 border-blue-500">
                    <p className="font-semibold text-sm dark:text-zinc-200">
                      {msg.username_mensaje_respuesta}
                      <a href={`${window.location.origin}/display_thread/${id_hilo}/page/${msg.page_mensaje_respuesta}#post${msg.id_mensaje_respuesta}`}>
                        <i className="fa-solid fa-share"></i>
                      </a>
                    </p>
                    <p className="text-sm break-words dark:text-zinc-200">{msg.contenido_mensaje_respuesta}</p>
                  </div>
                )}

                {/* Contenido del mensaje */}
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed w-full break-words whitespace-pre-wrap">
                  {msg.contenido}
                </p>

                {/* Botones de responder y copiar enlace */}
                <div className="flex justify-end mt-2 gap-2">
                  {user && (
                    <button
                      onClick={() => responder(msg)}
                      className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition flex items-center gap-2 cursor-pointer"
                    >
                      <i className="fa-solid fa-reply"></i>
                      Responder
                    </button>
                  )}

                  <button
                    onClick={() => {
                      const enlace = `${window.location.origin}/display_thread/${id_hilo}/page/${page}#post${msg.id}`
                      navigator.clipboard.writeText(enlace)
                        .then(() => alert("Enlace copiado: " + enlace))
                        .catch(err => console.error("Error al copiar enlace:", err))
                    }}
                    className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition flex items-center gap-2 cursor-pointer"
                  >
                    <i className="fa-solid fa-link"></i>
                    Copiar enlace
                  </button>
                </div>

              </div>
            )
          })}
        </div>

        {/* Paginación inferior */}
        <div className="flex justify-center items-center gap-2 mt-4 lg:mt-6 flex-wrap pb-6">
          {Array.from({ length: Math.ceil(hilo.mensajes / 39) }, (_, i) => i + 1).map((p, index) => (
            <Link
              to={`/display_thread/${id_hilo}/page/${index + 1}`}
              key={index}
              className={`${Number(page) === p ? 'bg-indigo-900' : 'bg-blue-500'} text-white px-3 py-2 sm:px-5 sm:py-3 rounded-[5px] font-bold`}
            >
              {p}
            </Link>
          ))}
        </div>

        {/* Mensaje de respuesta fijado */}
        {respuesta && (
          <div className="fixed bottom-20 left-0 w-full flex justify-center">
            <div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md rounded-t p-4 shadow-md max-h-32 overflow-auto flex justify-between items-start w-full border-t-blue-500">
              <div className="flex-1">
                <p className="font-semibold text-zinc-800 dark:text-zinc-200">{respuesta.username}</p>
                <p className="text-zinc-700 dark:text-zinc-300 break-words">{respuesta.contenido}</p>
              </div>
              <button
                className="ml-4 text-red-500 hover:text-red-600 font-bold cursor-pointer"
                onClick={() => setRespuesta(null)}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Formulario para enviar mensaje */}
        {user && (
          <div className="fixed bottom-0 left-0 w-full flex justify-center">
            <form onSubmit={handleSubmit} className="flex items-center gap-3 p-4 bg-blue-900 shadow-lg w-full">
              <input
                type="text"
                name="mensaje"
                placeholder="Escribe tu mensaje..."
                required
                disabled={disabled}
                value={form.mensaje}
                onChange={handleChange}
                className="flex-1 px-4 py-3 rounded-xl bg-white/90 text-zinc-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <button disabled={disabled} className="px-6 py-3 bg-green-600 disabled:bg-green-900 text-white font-semibold rounded-xl shadow-md transition cursor-pointer">
                <i className="fa-solid fa-paper-plane mr-2"></i>
                {disabled ? `Enviar (en ${contador}s)` : "Enviar"}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  )
}
