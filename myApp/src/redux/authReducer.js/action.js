import axios from "axios";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./actiontype";

export const login = (userData) => (dispatch) => {
        dispatch({type:LOGIN_REQUEST})
    return axios.post("https://staging-api.digitaloms.in/user/auth/login",userData)

    .then((res)=>{
        dispatch({type:LOGIN_SUCCESS, payload:res.data})
        console.log(res.data)
        if (res.data){
            const user = localStorage.setItem("user", JSON.stringify(res.data));
            const info = localStorage.setItem("token",res.data.accessToken);
        }
    })
    .catch((err)=>{
        dispatch({type:LOGIN_FAILURE})
        console.log(err);
    })
}