import * as actionTypes from "./actions";
import axios from "axios";


export const authStart = ()=>{
    return {
        type : actionTypes.AUTH_START
    }
}

export const authSuccess = (token,userId)=>{
    return {
        type : actionTypes.AUTH_SUCCESS,
        userId : userId,
        idToken : token
    }
}

export const authFail = (error)=>{
    return {
        type : actionTypes.AUTH_FAIL,
        error : error
    }
}

export const logout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    
    
    return {
        type : actionTypes.AUTH_LOGOUT
    }
}



export const checkAuthTimeout = (expireTime)=>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout());
        },expireTime*1000)
    }

}


export const auth = (email,password,isSignup)=>{
    return dispatch =>{
        dispatch(authStart());
        const authData = {
            email : email,
            password : password,
            returnSecureToken : true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBBT0jdrQhIXZBdnll7Io_03dUo_dZCPhE';
        if(!isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBBT0jdrQhIXZBdnll7Io_03dUo_dZCPhE';
        }
        axios.post(url,authData)
        .then((res)=>{
            console.log(res);
            const expirationDate = new  Date(new Date().getTime() + res.data.expiresIn*1000);
            localStorage.setItem('token',res.data.idToken);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('userId',res.data.localId);
            dispatch(authSuccess(res.data.idToken,res.data.localId));
            dispatch(checkAuthTimeout(res.data.expiresIn))

        })
        .catch((err)=>{
            console.log(err.response.data);
            dispatch(authFail(err.response.data.error));
        })
    }
}

export const setAuthRedirectPath = (path) =>{
    return {
        type : actionTypes.SET_AUTH_REDIRECT_PATH,
        path : path
    }
}


export const authCheckState = ()=>{
    return dispatch =>{
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate < new Date()){
                dispatch(logout());
            }else{
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeout((expirationDate.getTime()-new Date().getTime())/1000));
            }
        }
    }
}