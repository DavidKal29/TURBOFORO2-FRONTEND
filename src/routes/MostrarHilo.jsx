import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { toast } from "sonner"

export default function MostrarHilo() {
  const location = useLocation()
  const navigate = useNavigate()
  const { id_hilo, page } = useParams()
  const { user, setUser } = useAppContext()

  const [mensajes, setMensajes] = useState([])
  const [hilo, setHilo] = useState({})
  const [form, setForm] = useState({ mensaje: '' })
  const [respuesta, setRespuesta] = useState(null)
  const [csrfToken, setCsrfToken] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [contador, setContador] = useState(0)

  // 🎨 Paletas de colores
  const paletas = [
    {
      name: "azul",
      gradient: "from-blue-900 via-cyan-800 to-blue-700",
      button: "from-blue-600 to-cyan-600",
      active: "bg-blue-600",
      inactive: "bg-blue-800",
      border: "border-blue-500"
    },
    {
      name: "verde",
      gradient: "from-green-900 via-emerald-800 to-teal-700",
      button: "from-green-600 to-emerald-600",
      active: "bg-green-600",
      inactive: "bg-green-800",
      border: "border-green-500"
    },
    {
      name: "rojo",
      gradient: "from-red-900 via-pink-800 to-rose-700",
      button: "from-red-600 to-pink-600",
      active: "bg-red-600",
      inactive: "bg-red-800",
      border: "border-red-500"
    },
    {
      name: "morado",
      gradient: "from-purple-900 via-violet-800 to-fuchsia-700",
      button: "from-purple-600 to-fuchsia-600",
      active: "bg-purple-600",
      inactive: "bg-purple-800",
      border: "border-purple-500"
    },
    {
      name: "naranja",
      gradient: "from-orange-900 via-amber-800 to-yellow-700",
      button: "from-orange-600 to-amber-600",
      active: "bg-orange-600",
      inactive: "bg-orange-800",
      border: "border-orange-500"
    }
  ]

  const [tema, setTema] = useState(null)

  useEffect(() => {
    const randomPalette = paletas[Math.floor(Math.random() * paletas.length)]
    setTema(randomPalette)
  }, [])

  const obtenerMensajes = () => {
    fetch(`${process.env.REACT_APP_API_URL}/hilo/${id_hilo}/${page}`, { method: 'GET', credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data) {
          if (!data.message) {
            setHilo(data.hilo)
            setMensajes(data.mensajes)
          } else {
            navigate('/*')
          }
        }
      })
      .catch(err => toast.error(err))
  }

  const borrarMensaje = (id_mensaje) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p>¿Seguro que quieres borrar este mensaje? Esta acción no se puede deshacer.</p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                toast.dismiss(t)
                fetch(`${process.env.REACT_APP_API_URL}/delete_message/${id_mensaje}`, { method: 'GET', credentials: 'include' })
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
              className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 cursor-pointer"
            >
              Sí, borrar
            </button>
            <button
              onClick={() => toast.dismiss(t)}
              className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300 cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    )
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const responder = (msg) => {
    setRespuesta(msg)
  }

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

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace("#", "")
      const el = document.getElementById(elementId)
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }, [location, mensajes])

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

  useEffect(() => {
    if (hilo.titulo) {
      document.title = hilo.titulo
    }
  }, [hilo.titulo])

  return (
    <div className="flex justify-center px-4 py-10 mt-[80px] min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700">
      <div className="w-full max-w-5xl">

        {/* Header */}
        <div className={`bg-gradient-to-r ${tema?.button} rounded-3xl shadow-2xl p-8 text-white mb-10`}>
          <h1 className="font-extrabold text-3xl md:text-5xl mb-4 break-words drop-shadow-lg">{hilo.titulo}</h1>
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
        <div className="flex justify-center items-center gap-2 mt-4 flex-wrap pb-6">
          {Array.from({ length: Math.ceil(hilo.mensajes / 39) }, (_, i) => i + 1).map((p, index) => (
            <Link
              key={index}
              to={`/display_thread/${id_hilo}/page/${index + 1}`}
              className={`${Number(page) === p ? tema?.active : tema?.inactive} text-white px-4 py-2 rounded-xl font-bold hover:scale-105 transition`}
            >
              {p}
            </Link>
          ))}
        </div>

        {/* Mensajes */}
        <div className="space-y-8">
          {mensajes.map((msg, index) => {
            const borderClass = msg.id_usuario === hilo.id_usuario ? tema?.border : ''
            return (
              <div
                key={index}
                id={`post${msg.id}`}
                className={`scroll-mt-24 bg-white/95 dark:bg-zinc-900/95 rounded-2xl shadow-lg p-6 flex flex-col gap-4 hover:shadow-2xl transition-all ${borderClass}`}
              >
                {/* Cabecera */}
                <div className="flex items-center justify-between w-full gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      className="w-14 h-14 rounded-full object-cover border-2 border-gray-400"
                      src={`/avatars/avatar${msg.id_avatar}.webp`}
                      alt="avatar"
                    />
                    <div className="flex flex-col md:flex-row md:items-center w-full">
                      <a
                        href={user?.id && user?.id === msg?.id_usuario ? '/profile' : `/usuario/${msg.id_usuario}`}
                        target='_blank'
                        className="font-semibold text-zinc-800 dark:text-zinc-200"
                      >
                        {msg.username_mensaje}
                      </a>
                      <span className="text-sm text-zinc-500 md:ml-auto">
                        {msg.fecha} #{(Number(page) - 1) * 39 + (index + 1)}
                      </span>
                    </div>
                  </div>

                  {user && (user.id === msg.id_usuario || user.rol === 'admin') && (
                    <button
                      onClick={() => borrarMensaje(msg.id)}
                      className="p-2 cursor-pointer rounded-lg bg-red-600 text-white shadow-md hover:bg-red-700"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  )}
                </div>

                {/* Respuesta */}
                {msg.id_mensaje_respuesta > 0 && (
                  <div className="bg-gradient-to-r from-indigo-100 to-pink-100 dark:from-zinc-800 dark:to-zinc-700 rounded-xl p-3 max-h-32 overflow-auto border-l-4 border-gray-400">
                    <p className="font-semibold text-sm text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                      {msg.username_mensaje_respuesta}
                      <a href={`${window.location.origin}/display_thread/${id_hilo}/page/${msg.page_mensaje_respuesta}#post${msg.id_mensaje_respuesta}`}>
                        <i className="fa-solid fa-share text-indigo-500"></i>
                      </a>
                    </p>
                    <p className="text-sm break-words text-zinc-700 dark:text-zinc-300">{msg.contenido_mensaje_respuesta}</p>
                  </div>
                )}

                {/* Contenido */}
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed break-words whitespace-pre-wrap">
                  {msg.contenido}
                </p>

                {/* Acciones */}
                <div className="flex justify-end mt-2 gap-3 flex-wrap">
                  {user && (
                    <button
                      onClick={() => responder(msg)}
                      className={`px-4 cursor-pointer py-2 bg-gradient-to-r ${tema?.button} text-white font-semibold rounded-xl shadow-md hover:scale-105 transition flex items-center gap-2`}
                    >
                      <i className="fa-solid fa-reply"></i>
                      Responder
                    </button>
                  )}
                  <button
                    onClick={() => {
                      const enlace = `${window.location.origin}/display_thread/${id_hilo}/page/${page}#post${msg.id}`
                      navigator.clipboard.writeText(enlace)
                        .then(() => toast.success("Enlace copiado"))
                        .catch(err => console.error("Error al copiar enlace:", err))
                    }}
                    className="px-4 cursor-pointer py-2 bg-gray-700 text-white font-semibold rounded-xl shadow-md hover:scale-105 transition flex items-center gap-2"
                  >
                    <i className="fa-solid fa-link"></i>
                    Copiar enlace
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Paginación */}
        <div className="flex justify-center items-center gap-2 mt-10 flex-wrap pb-20">
          {Array.from({ length: Math.ceil(hilo.mensajes / 39) }, (_, i) => i + 1).map((p, index) => (
            <Link
              to={`/display_thread/${id_hilo}/page/${index + 1}`}
              key={index}
              className={`${Number(page) === p ? tema?.active : tema?.inactive} text-white px-4 py-2 rounded-xl font-bold hover:scale-105 transition`}
            >
              {p}
            </Link>
          ))}
        </div>

        {/* Respuesta fijada */}
        {respuesta && (
          <div className="fixed bottom-[120px] sm:bottom-[70px] left-0 w-full flex justify-center">
            <div className="bg-white/95 dark:bg-zinc-800/95 rounded-t-2xl p-4 shadow-xl max-h-28 overflow-auto flex justify-between items-start w-full border-t-4 border-gray-400">
              <div className="flex-1">
                <p className="font-semibold text-zinc-800 dark:text-zinc-200">{respuesta.username_mensaje}</p>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 break-words">{respuesta.contenido}</p>
              </div>
              <button
                className="ml-4 text-red-600 hover:text-red-800 font-bold cursor-pointer"
                onClick={() => setRespuesta(null)}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Formulario */}
        {user && (
          <div className="fixed bottom-0 left-0 w-full flex justify-center">
            <form
              onSubmit={handleSubmit}
              className={`flex flex-col-reverse sm:flex-row items-stretch gap-3 px-3 py-3 
                        bg-gradient-to-r ${tema?.gradient} shadow-2xl w-full`}
            >
              <button
                disabled={disabled}
                className={`w-full sm:w-auto px-6 py-3 bg-gradient-to-r ${tema?.button}
                          disabled:opacity-50 text-white font-bold rounded-xl shadow-md 
                          hover:scale-105 transition flex items-center justify-center gap-2 order-1 sm:order-2 cursor-pointer`}
              >
                <i className="fa-solid fa-paper-plane"></i>
                {disabled ? `(${contador}s)` : "Enviar"}
              </button>

              <input
                type="text"
                name="mensaje"
                placeholder="Escribe tu mensaje..."
                required
                disabled={disabled}
                value={form.mensaje}
                onChange={handleChange}
                className="flex-1 px-4 py-3 rounded-xl bg-white/90 text-zinc-800 
                          focus:outline-none focus:ring-4 focus:ring-pink-400 order-2 sm:order-1"
              />
            </form>
          </div>
        )}

      </div>
    </div>
  )
}
