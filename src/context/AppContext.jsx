const { createContext, useContext } = require("react");


const AppContext = createContext()


export function AppProvider({children}){

    return (
        <AppContext.Provider>
            {children}
        </AppContext.Provider>
    )
}


//Hook para usar el conexto en todos lados
export function useAppContext(){
    return useContext(AppContext)
}