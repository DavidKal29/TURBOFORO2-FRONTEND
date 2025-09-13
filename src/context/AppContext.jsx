const { createContext, useContext, useState, useEffect } = require("react");


const AppContext = createContext()


export function AppProvider({children}){

    const [user,setUser] = useState(null)

    const [categorias,setCategorias] = useState([])

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


    return (
        <AppContext.Provider value={{categorias,setCategorias,user,setUser}}>
            {children}
        </AppContext.Provider>
    )
}


//Hook para usar el conexto en todos lados
export function useAppContext(){
    return useContext(AppContext)
}