import React, { createContext,useReducer } from 'react';
import { cartReducer } from './components/Reducer';

export const Contextreact = createContext();

const Context = ({children}) => {

    // const [cart,setCart] = useState([]);

    const [state,dispatch] = useReducer(cartReducer,{
      cart:[]
    })


  return (
    <Contextreact.Provider value={{state,dispatch}}>
            {children}
    </Contextreact.Provider>
  )
} 

export default Context;
