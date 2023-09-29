import { ADD_PRODUCT_SUCCESS, DELETE_PRODUCT_SUCCESS, GET_ADHIKARI_SUCCESS, GET_Categories_SUCCESS, GET_FILTER_SUCCESS, GET_KARYKARTA_SUCCESS, GET_PRODUCT_SUCCESS, GET_SEARCH_SUCCESS, GET_USERSEARCH_SUCCESS, GET_assemblies_SUCCESS, PATCH_PRODUCT_SUCCESS, POST_COMMENT_SUCCESS, POST_COMPLAINER_SUCCESS, POST_COMPLAINTE_SUCCESS, PRODUCT_FAILURE, PRODUCT_REQUEST } from "./actiontype"
import axios from "axios";


export const getProductDAta =(data,yourConfig) => (dispatch) => {
    dispatch({type:PRODUCT_REQUEST})

    // https://staging-api.digitaloms.in/complainbox/list/UNSOLVED
    axios.post("https://staging-api.digitaloms.in/complainbox/list/UNSOLVED",data, yourConfig)
    .then((res) => {
        console.log(res)
        return (
        dispatch({type:GET_PRODUCT_SUCCESS, payload:res.data})
        )
    })
    .catch((err)=>{
        console.log(err)
        dispatch({type:PRODUCT_FAILURE})
    });
}

export const getSearchDAta =(data,yourConfig) => (dispatch) => {
    dispatch({type:PRODUCT_REQUEST})

    // https://staging-api.digitaloms.in/complainbox/list/UNSOLVED
    axios.post("https://staging-api.digitaloms.in/complainbox/list/UNSOLVED",data, yourConfig)
    .then((res) => {
        console.log(res)
        return (
        dispatch({type:GET_SEARCH_SUCCESS, payload:res.data})
        )
    })
    .catch((err)=>{
        console.log(err)
        dispatch({type:PRODUCT_FAILURE})
    });
}

export const getFilterDAta =(data,yourConfig) => (dispatch) => {
    dispatch({type:PRODUCT_REQUEST})

    axios.post("https://staging-api.digitaloms.in/complainbox/list/UNSOLVED",data, yourConfig)
    .then((res) => {
        console.log(res)
        return (
        dispatch({type:GET_FILTER_SUCCESS, payload:res.data})
        )
    })
    .catch((err)=>{
        console.log(err)
        dispatch({type:PRODUCT_FAILURE})
    });
}


export const getUserSearchDAta =(data,yourConfig) => (dispatch) => {
    dispatch({type:PRODUCT_REQUEST})

    axios.get(`https://staging-api.digitaloms.in/visitor/search/${data}`, yourConfig)
    .then((res) => {
        console.log(res)
        return (
        dispatch({type:GET_USERSEARCH_SUCCESS, payload:res.data})
        )
    })
    .catch((err)=>{
        console.log(err)
        dispatch({type:PRODUCT_FAILURE})
    });
}



export const deleteData =(prop,yourConfig) => (dispatch) => {
    dispatch({type:PRODUCT_REQUEST})

     axios.put(`
    https://staging-api.digitaloms.in/complainbox/softDelete/${prop.id}`,prop,yourConfig)
    .then((res) => {
        console.log(res)
        return (
        dispatch({type:DELETE_PRODUCT_SUCCESS ,payload:res.data})
        )
    })
    .catch((err)=>{
        console.log(err)
        dispatch({type:PRODUCT_FAILURE})
    });
}


export const postCommentData =(prop,yourConfig) => (dispatch) => {
    console.log(prop)
    dispatch({type:PRODUCT_REQUEST})

    return axios.post(`https://staging-api.digitaloms.in/common/comment`,prop,yourConfig)
    .then((res) => {
        console.log(res)
        return (
        dispatch({type:POST_COMMENT_SUCCESS})
        )
    })
    .catch((err)=>{
        console.log(err)
        dispatch({type:PRODUCT_FAILURE})
    });
}

/////////////////////////////////////////////////

export const postCOMPLAINERdata =(prop,yourConfig) => (dispatch) => {
    // console.log(prop)
    dispatch({type:PRODUCT_REQUEST})

    return axios.post(`
    https://staging-api.digitaloms.in/visitor`,prop,yourConfig)
    .then((res) => {
        console.log(res.data)
        return (
        dispatch({type:POST_COMPLAINER_SUCCESS,payload:res.data})
        )
    })
    .catch((err)=>{
        console.log(err)
        dispatch({type:PRODUCT_FAILURE})
    });
}

//////////////////////////////////////////////

export const postCOMPLANTdata =(prop,yourConfig) => (dispatch) => {
    console.log(prop)
    dispatch({type:PRODUCT_REQUEST})

    return axios.post(`https://staging-api.digitaloms.in/complainbox`,prop,yourConfig)
    .then((res) => {
        console.log(res)
        return (
        dispatch({type:POST_COMPLAINTE_SUCCESS,payload:res.data})
        )
    })
    .catch((err)=>{
        console.log(err)
        dispatch({type:PRODUCT_FAILURE})
    });
}

///////////////////////////////////////////////////

export const getCategoriesData=(yourConfig) => (dispatch) => {
    
    dispatch({type:PRODUCT_REQUEST})

     axios.get(`
     https://staging-api.digitaloms.in/complainbox/categories`,yourConfig)
    .then((res) => {
        console.log(res)
        return (
        dispatch({type:GET_Categories_SUCCESS,payload:res.data})
        )
    })
    .catch((err)=>{
        console.log(err)
        dispatch({type:PRODUCT_FAILURE})
    });
}
export const getAssembliesData=(yourConfig) => (dispatch) => {
    
    dispatch({type:PRODUCT_REQUEST})

     axios.get(`
     https://staging-api.digitaloms.in/common/assemblies`,yourConfig)
    .then((res) => {
        console.log(res)
        return (
        dispatch({type:GET_assemblies_SUCCESS,payload:res.data})
        )
    })
    .catch((err)=>{
        console.log(err)
        dispatch({type:PRODUCT_FAILURE})
    });
}


//https://staging-api.digitaloms.in/complainbox/list/UNSOLVED
export const getKarykrtaDAta =(data,yourConfig) => (dispatch) => {
    dispatch({type:PRODUCT_REQUEST})

    // https://staging-api.digitaloms.in/complainbox/list/UNSOLVED
    axios.post("https://staging-api.digitaloms.in/user/karyakarta/list",data, yourConfig)
    .then((res) => {
        console.log(res)
        return (
        dispatch({type:GET_KARYKARTA_SUCCESS, payload:res.data[0]})
        )
    })
    .catch((err)=>{
        console.log(err)
        dispatch({type:PRODUCT_FAILURE})
    });
}


export const getAdhikariDAta =(data,yourConfig) => (dispatch) => {
    dispatch({type:PRODUCT_REQUEST})

    // https://staging-api.digitaloms.in/complainbox/list/UNSOLVED
    axios.post("https://staging-api.digitaloms.in/adhikari/list",data, yourConfig)
    .then((res) => {
        console.log(res)
        return (
        dispatch({type:GET_ADHIKARI_SUCCESS, payload:res.data[0]})
        )
    })
    .catch((err)=>{
        console.log(err)
        dispatch({type:PRODUCT_FAILURE})
    });
}