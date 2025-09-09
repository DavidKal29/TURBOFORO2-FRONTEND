import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header({ currentUser, parametros = {} }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-gray-800 via-gray-900 to-black z-50 flex justify-between items-center py-[10px] px-[15px] sm:px-[35px] fixed top-0 w-full h-[80px] md:h-[100px]">
      {/* Logo */}
      <Link to="/" className="w-[16%] min-[568px]:w-[10%] sm:w-[10%] lg:w-[7%] xl:w-[5%]">
        <img className="w-full" src="./logo.png" alt="Logo" />
      </Link>


      {/* Botones */}
      <div className="flex items-center">
        <div id="botones" className="flex gap-4">
            <Link to="#">
              <button className="bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded px-[16px] py-[8px]  font-bold text-[14px] cursor-pointer">
                Iniciar Sesión
              </button>
            </Link>
            <Link to="#">
              <button className="bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded px-[16px] py-[8px]  font-bold text-[14px] cursor-pointer">
                Crear cuenta
              </button>
            </Link>
          </div>
      </div>

    </header>
  );
}

