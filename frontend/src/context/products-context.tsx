import React, { createContext, useContext, useReducer } from 'react'


type productsTypes = {
    id: number
    title: string
    completed: boolean
}

type productTypes = {
    products: productsTypes[]
    ProductsDispatch: (data: ProductAction) => void
}

type SearchType = {
    type: 'SEARCH_PRODUCT'
    payload: string
}
type ResetType = {
    type: 'RESET_PRODUCTS'  
}

type UpdateType = {
    type:  'UPDATE_PRODUCTS'
    payload: {
        id: number
    }
}
type ProductAction = SearchType | UpdateType | ResetType

const ProductContext = createContext<productTypes>(null!)

export const useProduct = () => {
    return useContext(ProductContext)
}

const initialState: productsTypes[] = [];

const ProductReducer = (product: productsTypes[], action: ProductAction) => {
    switch (action.type) {
        // case 'ADD': {
        //     return [
        //         payload,
        //         ...product
        //     ]
        // }
        // case 'REMOVE': {
        //     const updatedProduct = product.filter((_, index) => index != payload.id)
        //     return updatedProduct
        // }
        // case 'COMPLETE': {
        //     const newState = product.map((obj, index) => {
        //         if (index === payload.id) {
        //             return { ...obj, completed: !obj.completed }
        //         }
        //         return obj
        //     })
        //     return newState
        // }
        case 'SEARCH_PRODUCT':{
            return { ...product, searchQuery: action.payload };
        }
        case 'RESET_PRODUCTS':{
            return { ...product, searchQuery: '' };
        }
        case 'UPDATE_PRODUCTS':{
            // return { ...state, updatedproducts: [...state.updatedproducts, payload] };
            return { ...product};
        }
        default: {
            return product
        }
    }
}

type ProductProviderType = {
    children: React.ReactNode
}

function ProductProvider({ children }: ProductProviderType) {
    const [products, ProductsDispatch] = useReducer(ProductReducer, initialState)
    const productValues = {
        products,
        ProductsDispatch
    }

    return (
        <ProductContext.Provider value={productValues}>{children}</ProductContext.Provider>
    )
}

export default ProductProvider