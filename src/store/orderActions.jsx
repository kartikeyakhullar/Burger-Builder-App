import * as actionTypes from "./actions";
import axios from "../axios-instance"


export const purchaseBurgerSuccess = (id,orderData)=>{
    return {
        type : actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId : id,
        orderData : orderData
    }
}

export const purchaseBurgerFail = (error)=>{
    return {
        type : actionTypes.PURCHASE_BURGER_FAIL,
        error : error
    }
}

export const purchaseBurger = (orderData,token)=>{
    return dispatch =>{
        dispatch(purchaseBurgerStart());
        axios.post('https://react-my-burger-47f48.firebaseio.com/orders.json?auth=' + token,orderData).then((response)=>{
            console.log(response.data);
            dispatch(purchaseBurgerSuccess(response.data.name,orderData));
        }).catch(err=>{
            dispatch(purchaseBurgerFail(err))
        });
    }
}

export const purchaseBurgerStart= ()=>{
    return {
        type : actionTypes.PURCHASE_BURGER_START
    }
}
export const purchaseInit= ()=>{
    return {
        type : actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders)=>{
    return {
        type : actionTypes.FETCH_ORDERS_SUCCESS,
        orders : orders
    }
}

export const fetchOrdersFail = (error)=>{
    return {
        type : actionTypes.FETCH_ORDERS_FAIL,
        error : error
    }
}

export const fetchOrdersStart = ()=>{
    return {
        type : actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token,userId)=>{
    return dispatch =>{
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('https://react-my-burger-47f48.firebaseio.com/orders.json' + queryParams).then((res)=>{
            // console.log(res.data);
            const fetchedOrders = [];
            for(let  key in res.data){
                fetchedOrders.push({...res.data[key],id:key});
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        }).catch((err)=>{
            dispatch(fetchOrdersFail(err));
        })
    }
}

