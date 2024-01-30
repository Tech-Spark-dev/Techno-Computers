import React, { createContext,useReducer, useState } from 'react';
import { cartReducer,productReducer } from './components/Reducer';

export const Contextreact = createContext();

const Context = ({children}) => {

    const [state,dispatch] = useReducer(cartReducer,{
      cart:[]
    })

    const [productstate,productDispatch] = useReducer(productReducer,{
      searchQuery:'',
      updatedproducts:[],
    })

    const [prodview,setProdview] = useState([]);

  return (
    <Contextreact.Provider
      value={{
        state,
        dispatch,
        productstate,
        productDispatch,
        prodview,
        setProdview,
      }}
    >
      {children}
    </Contextreact.Provider>
  );
} 

export default Context;
