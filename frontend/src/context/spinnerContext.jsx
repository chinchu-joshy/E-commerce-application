import React,{useState,useEffect,useContext,createContext} from 'react'

const SpinContext=createContext();
function SpinContextProvider({children}) {
    const [spin, setspin] = useState(false)
   

    return <SpinContext.Provider value={{setspin,spin}}>
        {children}
    </SpinContext.Provider>
}

export default SpinContext;
export  {SpinContextProvider};
