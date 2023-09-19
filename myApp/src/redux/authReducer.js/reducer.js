import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./actiontype";



const initialState = {
    isLoading : false,
    isError : false,
    auth : false,
    authUser : null
}




export const reducer = (state=initialState, {type, payload}) => {
    switch(type){
        case LOGIN_REQUEST :
            return {...state, isLoading:true};
        case LOGIN_SUCCESS :
            return {...state, isLoading : false, authUser: payload, auth: true};
        case LOGIN_FAILURE :
            return {...state, isError: true}
        default:
            return state;
    }
}