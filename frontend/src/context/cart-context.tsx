import React, { createContext, useContext, useReducer } from 'react'


type cartTypes = {
    id: number
    title: string
    completed: boolean
}

type cartContextTypes = {
    cart: cartTypes[]
    CartDispatch: (data: CartAction) => void
}

type AddType = {
    type: 'ADD_TO_CART'
    payload: cartTypes
}

type UpdateType = {
    type: 'CHANGE_CART_QTY'
    payload: {
        id: number,
        qty:number
    }
}

type RemoveType = {
    type: 'REMOVE_FROM_CART'
    payload: {
        id: number
    }
}

type ClearType = {
    type: 'CLEAR_CART'
}

type CartAction = AddType | UpdateType | RemoveType | ClearType

const CartContext = createContext<cartContextTypes>(null!)

export const useCart = () => {
    return useContext(CartContext)
}

const initialState: cartTypes[] = [];

const CartReducer = (cart: cartTypes[], action: CartAction) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            return [
                action.payload,
                ...cart
            ]
        }
        case 'REMOVE_FROM_CART': {
            const removedCart = cart.filter((c:any, index) => c._id != action.payload.id)
            return removedCart
        }
        case 'CHANGE_CART_QTY': {
            const newState = cart.map((obj, index) => {
                if (obj.id === action.payload.id) {
                    return { ...obj, qty: action.payload.qty }
                }
                return obj
            })
            return newState
        }
        case 'CLEAR_CART': {
            return [];
        }
        default: {
            return cart
        }
    }
}

type CartProviderType = {
    children: React.ReactNode
}

function CartProvider({ children }: CartProviderType) {
    const [cart, CartDispatch] = useReducer(CartReducer, initialState)
    const CartValues = {
        cart,
        CartDispatch
    }

    return (
        <CartContext.Provider value={CartValues}>{children}</CartContext.Provider>
    )
}

export default CartProvider