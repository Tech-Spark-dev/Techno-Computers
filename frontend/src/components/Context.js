import React, { createContext,useState } from 'react'


export const contextreact = createContext();

const Context = ({children}) => {

    const [cart,setCart] = useState([]);

  return (
    <contextreact.Provider value={{cart,setCart}}>
            {children}
    </contextreact.Provider>
  )
} 

export default Context;
