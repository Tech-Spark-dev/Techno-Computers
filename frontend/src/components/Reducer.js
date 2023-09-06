export const cartReducer =(state,action)=>{
    switch(action.type){
        case "CHANGE_CART_QTY":
            return {...state,cart:state.cart.filter((c)=>c._id===action.payload.id?c.qty=action.payload.qty:c.qty)}
        case "ADD_TO_CART":
            return{...state,cart:[...state.cart,{...action.payload,qty:1}]};
        case "REMOVE_FROM_CART":
            return {...state,cart: state.cart.filter((c)=>c._id !==action.payload._id)}
        default:
            return state;
    }
};


