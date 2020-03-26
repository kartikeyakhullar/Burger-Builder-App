import * as actionTypes from "./actions";

const initialState = {
    ingredients : {
        salad : 0,
        meat : 0,
        cheese : 0,
        bacon : 0
    },
    totalPrice : 4
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
            totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName] 
        }
    }
    if(action.type === actionTypes.REMOVE_INGREDIENTS){
        return {
            ...state,
            ingredients : {
                ...state.ingredients,
                [action.ingredientName] : state.ingredients[action.ingredientName] - 1
            },
            totalPrice : state.totalPrice - INGREDIENT_PRICES[action.ingredientName] 
        }
    }
    return state;
}

export default reducer;