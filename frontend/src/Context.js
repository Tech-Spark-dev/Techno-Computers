import React, { createContext,useReducer } from 'react';
import { cartReducer,productReducer } from './components/Reducer';

export const Contextreact = createContext();

const Context = ({children}) => {

    const [state,dispatch] = useReducer(cartReducer,{
      cart:[]
    })

    const [productstate,productDispatch] = useReducer(productReducer,{
      searchQuery:''
    })


  return (
    <Contextreact.Provider value={{state,dispatch,productstate,productDispatch}}>
            {children}
    </Contextreact.Provider>
  )
} 

export default Context;
