export const cartReducer =(state,action)=>{
    switch(action.type){
        case "CHANGE_CART_QTY":
            return {...state,cart:state.cart.filter((c)=>c._id===action.payload.id?c.qty=action.payload.qty:c.qty)}
        case "ADD_TO_CART":
            return{...state,cart:[...state.cart,{...action.payload,qty:1}]};
        case "REMOVE_FROM_CART":
            return {...state,cart: state.cart.filter((c)=>c._id !==action.payload._id)}
        case "CLEAR_CART":
            return {...state,cart:[]};
        default:
            return state;
    }
};

export const productReducer =(state,action)=>{
    switch(action.type){
        case "search_product":
            return {...state,searchQuery:action.payload};
        case "RESET_PRODUCTS":
            return {...state,searchQuery:''};
        default:
            return state;
    }
}


