import * as actionTypes from "./actions";

const initialState = {
    ingredients : null,
    totalPrice : 4,
    error : false,
    building : false
}

const INGREDIENT_PRICES = {
    salad: 0.5, 
    meat: 1.3, 
    bacon: 0.7, 
    cheese: 0.4
};


const reducer = (state=initialState,action)=>{
    if(action.type === actionTypes.ADD_INGREDIENTS){
        return {
            ...state,
            ingredients : {
                ...state.ingredients,
                [action.ingredientName] : state.ingredients[action.ingredientName] + 1
            },
            totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
            building : true 
        }
    }
    if(action.type === actionTypes.REMOVE_INGREDIENTS){
        return {
            ...state,
            ingredients : {
                ...state.ingredients,
                [action.ingredientName] : state.ingredients[action.ingredientName] - 1
            },
            totalPrice : state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
            building : true 
        }
    }
    if(action.type === actionTypes.SET_INGREDIENTS){
        return{
            ...state,
            ingredients : action.ingredients,
            error : false,
            totalPrice : 4,
            building : false
        }
    }
    if(action.type === actionTypes.FETCH_INGREDIENTS_FAILED){
        return{
            ...state,
            error : true
        }
    }
    
    return state;
}

export default reducer;