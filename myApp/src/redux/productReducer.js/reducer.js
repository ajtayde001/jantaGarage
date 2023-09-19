import { ADD_PRODUCT_SUCCESS, DELETE_PRODUCT_SUCCESS, GET_ADHIKARI_SUCCESS, GET_Categories_SUCCESS, GET_KARYKARTA_SUCCESS, GET_PRODUCT_SUCCESS, GET_SEARCH_SUCCESS, GET_assemblies_SUCCESS, PATCH_PRODUCT_SUCCESS, POST_COMMENT_SUCCESS, POST_COMPLAINER_SUCCESS, POST_COMPLAINTE_SUCCESS, PRODUCT_FAILURE, PRODUCT_REQUEST} from "./actiontype";

const initialstate = {
    isLoading : false,
    isError : false,
    deleteItem : [],
    serchMainData : [],
    products : [],
    CategoriesData:[],
    assembliesData:[],
    karykarta:[],
    adhikari:[],
    complainerSinleData:{}
}
export const reducer = (state=initialstate, {type, payload}) =>{
    switch(type){
        case PRODUCT_REQUEST : 
            return {...state, isLoading : true};
        case ADD_PRODUCT_SUCCESS :
            return {...state, isLoading:false};
        case PRODUCT_FAILURE :
            return {...state, isError : true}
        case GET_PRODUCT_SUCCESS :
            return {...state, isLoading : true, products:payload}
        case POST_COMPLAINER_SUCCESS :
            return {...state, isLoading : true,     complainerSinleData
            :payload}
        case GET_SEARCH_SUCCESS :
            return {...state, isLoading : true, products:payload}
        case GET_Categories_SUCCESS :
            return {...state, isLoading : true, CategoriesData:payload}
        case GET_assemblies_SUCCESS :
            return {...state, isLoading : true, assembliesData:payload}
        case PATCH_PRODUCT_SUCCESS :
            return {...state, isLoading : false,}
        case POST_COMMENT_SUCCESS :
            return {...state, isLoading : false,}
        case POST_COMPLAINTE_SUCCESS :
            return {...state, isLoading : false,}
            case GET_KARYKARTA_SUCCESS:
                return {...state,karykarta:payload}
                case GET_ADHIKARI_SUCCESS:
                    return {...state,adhikari:payload}
        case DELETE_PRODUCT_SUCCESS :
            return {...state, isLoading : false,deleteItem :[...state.deleteItem,payload]}
        default :
            return initialstate;
    }
}