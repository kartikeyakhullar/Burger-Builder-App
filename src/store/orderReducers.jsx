import * as actionTypes from "./actions";

const initialState = {
    orders : [],
    loading : false,
    purchased : false
}



const reducer = (state=initialState,action)=>{
    if(action.type === actionTypes.PURCHASE_BURGER_SUCCESS){
        const newOrder = {
            ...action.orderData,
            id : action.orderId
        }
        return {
            ...state,
            loading : false,
            orders : state.orders.concat(newOrder),
            purchased : true
        }
    }
    if(action.type === actionTypes.PURCHASE_BURGER_FAIL){
        return {
            ...state,
            loading : false
        }
    }
    if(action.type === actionTypes.PURCHASE_BURGER_START){
        return {
            ...state,
            loading : true
        }
    }
    if(action.type === actionTypes.PURCHASE_INIT){
        return {
            ...state,
            purchased : false
        }
    }
    if(action.type === actionTypes.FETCH_ORDERS_START){
        return {
            ...state,
            loading : true
        }
    }
    if(action.type === actionTypes.FETCH_ORDERS_SUCCESS){
        return {
            ...state,
            orders : action.orders,
            loading : false
        }
    }
    if(action.type === actionTypes.FETCH_ORDERS_FAIL){
        return {
            ...state,
            loading : false
        }
    }
    
    
    return  state;
}

export default reducer;
