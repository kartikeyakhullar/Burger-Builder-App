import * as actionTypes from "./actions"
import axios from "../axios-instance"


export const addIngredient = (name)=>{
    return {
        type : actionTypes.ADD_INGREDIENTS,
        ingredientName : name
    }
}

export const removeIngredient = (name)=>{
    return {
        type : actionTypes.REMOVE_INGREDIENTS,
        ingredientName : name
    }
}

export const setIngredients = (ingredients)=>{
    return {
        type : actionTypes.SET_INGREDIENTS,
        ingredients : ingredients
    }
}

export const fetchIngredientsFailed = ()=>{
    return {
        type : actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = (name)=>{
    return dispatch => {
        axios.get('https://react-my-burger-47f48.firebaseio.com/ingredients.json').then((response)=>{
            dispatch(setIngredients(response.data))
        }).catch((err)=>{
            dispatch(fetchIngredientsFailed())
        })
    }
}
