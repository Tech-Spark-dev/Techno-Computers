import React, { createContext,useState } from 'react';


export const Contextreact = createContext();

const Context = ({children}) => {

    const [cart,setCart] = useState([]);

  return (
    <Contextreact.Provider value={{cart,setCart}}>
            {children}
    </Contextreact.Provider>
  )
} 

export default Context;
