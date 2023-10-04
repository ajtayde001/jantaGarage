import { ADD_PRODUCT_SUCCESS, DELETE_PRODUCT_SUCCESS, GET_ADHIKARI_SUCCESS, GET_CatTotal_SUCCESS, GET_Categories_SUCCESS, GET_FILTER_INPROGRESS_SUCCESS, GET_FILTER_ONHOLD_SUCCESS, GET_FILTER_QUEUE_SUCCESS, GET_FILTER_SOLVED_SUCCESS, GET_FILTER_STATUSUPDATE_SUCCESS, GET_FILTER_SUCCESS, GET_INPROGRESSDATA_SUCCESS, GET_KARYKARTA_SUCCESS, GET_ONHOLDDATA_SUCCESS, GET_PRODUCT_SUCCESS, GET_QUEUEDATA_SUCCESS, GET_SEARCH_INPROGRESS_SUCCESS, GET_SEARCH_ONHOLD_SUCCESS, GET_SEARCH_QUEUE_SUCCESS, GET_SEARCH_SOLVED_SUCCESS, GET_SEARCH_STATUSUPDATE_SUCCESS, GET_SEARCH_SUCCESS, GET_SOLVEDDATA_SUCCESS, GET_STATUSUPDATEDATA_SUCCESS, GET_USERSEARCH_SUCCESS, GET_assemblies_SUCCESS, PATCH_PRODUCT_SUCCESS, POST_COMMENT_SUCCESS, POST_COMPLAINER_SUCCESS, POST_COMPLAINTE_SUCCESS, PRODUCT_FAILURE, PRODUCT_REQUEST} from "./actiontype";

const initialstate = {
    isLoading : false,
    isError : false,
    deleteItem : [],
    serchMainData : [],
    CategoriesData:[],
    assembliesData:[],
    karykarta:[],
    adhikari:[],
    complainerSinleData:{},
    complaintPostData:{},
    srch:[],
    isSubmitted : false,
    products : [],
    inprogressdata:[],
    solvedata:[],
    onholddata:[],
    queuedata:[],
    statusupdatedata:[],
    catTotal:[]
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
        case GET_INPROGRESSDATA_SUCCESS :
            return {...state, isLoading : true, inprogressdata:payload}
        case GET_SOLVEDDATA_SUCCESS :
            return {...state, isLoading : true, solvedata:payload}
        case GET_ONHOLDDATA_SUCCESS :
            return {...state, isLoading : true, onholddata:payload}
        case GET_QUEUEDATA_SUCCESS :
            return {...state, isLoading : true, queuedata:payload}
        case GET_STATUSUPDATEDATA_SUCCESS :
            return {...state, isLoading : true, statusupdatedata:payload}
        case POST_COMPLAINER_SUCCESS :
            return {...state, isLoading : true,     complainerSinleData
            :payload}
        case GET_SEARCH_SUCCESS :
            return {...state, isLoading : true, products:payload}
        case GET_SEARCH_INPROGRESS_SUCCESS :
            return {...state, isLoading : true, inprogressdata:payload}
        case GET_SEARCH_SOLVED_SUCCESS :
            return {...state, isLoading : true, solvedata:payload}
        case GET_SEARCH_ONHOLD_SUCCESS :
            return {...state, isLoading : true, onholddata:payload}
        case GET_SEARCH_QUEUE_SUCCESS :
            return {...state, isLoading : true, queuedata:payload}
        case GET_SEARCH_STATUSUPDATE_SUCCESS :
            return {...state, isLoading : true, statusupdatedata:payload}
        case GET_FILTER_SUCCESS :
            return {...state, isLoading : true, products:payload}
        case GET_FILTER_INPROGRESS_SUCCESS :
            return {...state, isLoading : true, inprogressdata:payload}
        case GET_FILTER_SOLVED_SUCCESS :
            return {...state, isLoading : true, solvedata:payload}
        case GET_FILTER_ONHOLD_SUCCESS :
            return {...state, isLoading : true, onholddata:payload}
        case GET_FILTER_QUEUE_SUCCESS :
            return {...state, isLoading : true, queuedata:payload}
        case GET_FILTER_STATUSUPDATE_SUCCESS :
            return {...state, isLoading : true, statusupdatedata:payload}
        case GET_USERSEARCH_SUCCESS :
            return {...state, isLoading : true, srch:payload}
        case GET_Categories_SUCCESS :
            return {...state, isLoading : true, CategoriesData:payload}
        case GET_assemblies_SUCCESS :
            return {...state, isLoading : true, assembliesData:payload}
        case PATCH_PRODUCT_SUCCESS :
            return {...state, isLoading : false,}
        case POST_COMMENT_SUCCESS :
            return {...state, isLoading : false}
        case POST_COMPLAINTE_SUCCESS :
            return {...state, isLoading : false , isSubmitted:true,complaintPostData:payload}
            case GET_KARYKARTA_SUCCESS:
                return {...state,karykarta:payload}
                case GET_ADHIKARI_SUCCESS:
                    return {...state,adhikari:payload}
                case GET_CatTotal_SUCCESS:
                    return {...state,catTotal:payload}
        case DELETE_PRODUCT_SUCCESS :
            return {...state, isLoading : false,deleteItem :[...state.deleteItem,payload]}
        default :
            return initialstate;
    }
}