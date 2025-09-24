import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Header() {
  const { user, setUser } = useAppContext(); // Contexto de usuario
  const navigate = useNavigate(); // Hook para navegación programática

  // Función para cerrar sesión
  const logout = () => {
    fetch(`${process.env.REACT_APP_API_URL}/logout`, { credentials: "include", method: "GET" })
      .then(res => res.json())
      .then(data => {
        if (data.loggedOut) {
          console.log("El usuario ha cerrado sesión");
          setUser(null); // Limpiamos usuario del contexto
          navigate("/login"); // Redirigimos a login
        } else {
          console.log("El usuario no está logueado");
        }
      });
  };

  // Verificamos si el usuario está logueado al cargar el componente
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/perfil`, { credentials: "include", method: "GET" })
      .then(res => res.json())
      .then(data => {
        if (data.loggedIn) {
          console.log("El usuario está logueado");
          setUser(data.user); // Guardamos usuario en el contexto
        } else {
          console.log("El usuario no está logueado");
        }
      });
  }, []);

  return (
    <header className="bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-2xl z-50 flex justify-between items-center py-3 px-6 sm:px-12 fixed top-0 w-full h-[80px] md:h-[100px]">

      {/* Logo */}
      <Link to="/" className="w-[16%] min-[568px]:w-[12%] sm:w-[10%] lg:w-[8%] xl:w-[6%]">
        <img className="w-full" src="/logo.png" alt="Logo" />
      </Link>

      {user ? (
        // Si hay usuario logueado, mostramos botones de perfil y logout
        <div className="flex items-center gap-4 md:gap-6">
          <Link to="/profile">
            <button className="bg-gradient-to-r from-green-700 to-green-500 shadow-lg text-white rounded-full max-[360px]:px-2 max-[360px]:py-2 px-4 sm:px-5 py-3 font-semibold text-sm md:text-base cursor-pointer">
              <i className="fa-solid fa-user"></i> {user.username}
            </button>
          </Link>
          <button onClick={logout}>
            <button className="bg-gradient-to-r from-red-700 to-red-500 shadow-lg text-white rounded-full max-[360px]:px-2 max-[360px]:py-2 px-4 sm:px-5 py-3 font-semibold text-sm md:text-base cursor-pointer">
              Cerrar Sesión
            </button>
          </button>
        </div>
      ) : (
        // Si no hay usuario, mostramos botones de login y registro
        <div className="flex items-center gap-4 md:gap-6">
          <Link to="/login">
            <button className="bg-gradient-to-r from-blue-700 to-blue-500 shadow-lg text-white rounded-full max-[360px]:px-2 max-[360px]:py-2 px-4 sm:px-5 py-3 font-semibold text-sm md:text-base cursor-pointer">
              Iniciar Sesión
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-gradient-to-r from-purple-700 to-purple-500 shadow-lg text-white rounded-full max-[360px]:px-2 max-[360px]:py-2 px-4 sm:px-5 py-3 font-semibold text-sm md:text-base cursor-pointer">
              Crear cuenta
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}
