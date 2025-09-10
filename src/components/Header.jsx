import { Link } from "react-router-dom";


export default function Header() {
  return (
    <header className="bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-2xl z-50 flex justify-between items-center py-3 px-6 sm:px-12 fixed top-0 w-full h-[80px] md:h-[100px]">

      {/* Logo */}
      <Link to="/" className="w-[16%] min-[568px]:w-[12%] sm:w-[10%] lg:w-[8%] xl:w-[6%]">
        <img className="w-full" src="/logo.png" alt="Logo" />
      </Link>

      {/* Botones */}
      <div className="flex items-center gap-4 md:gap-6">
        <Link to="/login">
          <button className="bg-gradient-to-r from-blue-700 to-blue-500 shadow-lg text-white rounded-full px-5 py-2 font-semibold text-sm md:text-base cursor-pointer">
            Iniciar Sesión
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-gradient-to-r from-purple-700 to-purple-500 shadow-lg text-white rounded-full px-5 py-2 font-semibold text-sm md:text-base cursor-pointer">
            Crear cuenta
          </button>
        </Link>
      </div>

    </header>
  );
}
