const { createContext, useContext, useState, useEffect } = require("react");


const AppContext = createContext()


export function AppProvider({children}){

    const [user,setUser] = useState(null)

    useEffect(()=>{
    
        fetch('http://localhost:5000/perfil',{credentials:'include',method:'GET'})
        .then(res=>res.json())
        .then(data=>{
          if (data.loggedIn) {
            console.log('El usuario está logueado');
            setUser(data.user)
            
          }else{
            console.log('El usuario no está logueado');
          }
        })
    
    
      },[])



    const categorias = [
        { nombre: "General", icono: "fa-earth-americas", color: "blue-500" },
        { nombre: "Informática", icono: "fa-computer", color: "green-500" },
        { nombre: "Videojuegos", icono: "fa-gamepad", color: "purple-500" },
        { nombre: "Coches y Motor", icono: "fa-car", color: "red-500" },
        { nombre: "Series y Cine", icono: "fa-film", color: "yellow-500" },
        { nombre: "Manga y Anime", icono: "fa-book", color: "pink-500" },
        { nombre: "Deportes", icono: "fa-futbol", color: "indigo-500" },
        { nombre: "Fitness", icono: "fa-dumbbell", color: "teal-500" },
        { nombre: "Hobbies", icono: "fa-palette", color: "orange-500" },
        { nombre: "Polémica", icono: "fa-fire", color: "red-600" },
        { nombre: "Música", icono: "fa-music", color: "pink-600" },
        { nombre: "Viajes", icono: "fa-plane", color: "cyan-500" },
        { nombre: "Cocina", icono: "fa-utensils", color: "yellow-600" },
        { nombre: "Mascotas", icono: "fa-paw", color: "green-600" },
        { nombre: "Ciencia", icono: "fa-brain", color: "purple-600" },
        { nombre: "Memes y Humor", icono: "fa-face-laugh-beam", color: "yellow-400" },
    ];

    return (
        <AppContext.Provider value={{categorias,user,setUser}}>
            {children}
        </AppContext.Provider>
    )
}


//Hook para usar el conexto en todos lados
export function useAppContext(){
    return useContext(AppContext)
}