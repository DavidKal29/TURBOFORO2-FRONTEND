import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Footer() {

  const {user,setUser} = useAppContext()
  const navigate = useNavigate()

  const logout = () =>{
    fetch('http://localhost:5000/logout',{credentials:'include',method:'GET'})
    .then(res=>res.json())
    .then(data=>{
      if (data.loggedOut) {
        console.log('El usuario ha cerrado sesión');
        setUser(null)
        navigate('/login')
        
      }else{
        console.log('El usuario no está logueado');
      }
    })
  }

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-gray-300 py-10 px-6 border-t border-gray-700 shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo + descripción */}
        <div>
          <Link to="/" className="block w-[40%] sm:w-[25%] md:w-[50%] mb-4">
            <img src="/logo.png" alt="Logo" className="w-full" />
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed">
            Tu comunidad para debatir, compartir y descubrir los temas más populares.  
            Hecho con 💻 y ☕ para la gente que ama conversar.
          </p>
        </div>

        {/* Navegación */}
        <div>
          <h2 className="text-lg font-bold text-gray-200 mb-3">Navegación</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white transition-colors">Inicio</Link></li>
            {
              user ? 
              (
                <>
                  <li><Link to="/profile" className="hover:text-white transition-colors">{user.username}</Link></li>
                  <li><button onClick={logout} className="hover:text-white transition-colors">Cerrar sesión</button></li>
                </>
              ) 
              
              : 
              
              (
                <>
                  <li><Link to="/login" className="hover:text-white transition-colors">Iniciar Sesión</Link></li>
                  <li><Link to="/register" className="hover:text-white transition-colors">Crear Cuenta</Link></li>
                </>

              )
            }
          </ul>
        </div>

        {/* Redes sociales */}
        <div>
          <h2 className="text-lg font-bold text-gray-200 mb-3">Síguenos</h2>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-xl">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors text-xl">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-700 transition-colors text-xl">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-red-600 transition-colors text-xl">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} DavidKal29 Todos los derechos reservados.
      </div>
    </footer>
  );
}
