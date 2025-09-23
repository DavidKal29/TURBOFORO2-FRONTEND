const { createContext, useContext, useState, useEffect } = require("react");

const AppContext = createContext()

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [categorias, setCategorias] = useState([])

  // check si el usuario está logueado al inicio
  useEffect(() => {
    fetch('http://localhost:5000/perfil', { credentials: 'include', method: 'GET' })
      .then(res => res.json())
      .then(data => {
        if (data.loggedIn) {
          console.log('Usuario logueado');
          setUser(data.user)
        } else {
          console.log('Usuario no logueado');
        }
      })
  }, [])

  return (
    <AppContext.Provider value={{ categorias, setCategorias, user, setUser }}>
      {children}
    </AppContext.Provider>
  )
}

// Hook para usar el contexto en cualquier componente
export function useAppContext() {
  return useContext(AppContext)
}
