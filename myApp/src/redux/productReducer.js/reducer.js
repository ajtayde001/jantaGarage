import { ADD_PRODUCT_SUCCESS, DELETE_PRODUCT_SUCCESS, GET_ADHIKARI_SUCCESS, GET_ATTEND_SUCCESS, GET_CatTotal_SUCCESS, GET_Categories_SUCCESS, GET_DEVELOPMENT_SUCCESS, GET_FILTER_INPROGRESS_SUCCESS, GET_FILTER_ONHOLD_SUCCESS, GET_FILTER_QUEUE_SUCCESS, GET_FILTER_SOLVED_SUCCESS, GET_FILTER_STATUSUPDATE_SUCCESS, GET_FILTER_SUCCESS, GET_INPROGRESSDATA_SUCCESS, GET_INWARDOUT_SUCCESS, GET_KARYKARTA_SUCCESS, GET_OFFICE_SUCCESS, GET_ONHOLDDATA_SUCCESS, GET_PRODUCT_SUCCESS, GET_QUEUEDATA_SUCCESS, GET_SEARCH_INPROGRESS_SUCCESS, GET_SEARCH_ONHOLD_SUCCESS, GET_SEARCH_QUEUE_SUCCESS, GET_SEARCH_SOLVED_SUCCESS, GET_SEARCH_STATUSUPDATE_SUCCESS, GET_SEARCH_SUCCESS, GET_SOLVEDDATA_SUCCESS, GET_STATUSUPDATEDATA_SUCCESS, GET_STATUS_SUCCESS, GET_TODAYEVENT_SUCCESS, GET_USERSEARCH_SUCCESS, GET_assemblies_SUCCESS, PATCH_PRODUCT_SUCCESS, POST_COMMENT_SUCCESS, POST_COMPLAINER_SUCCESS, POST_COMPLAINTE_SUCCESS, PRODUCT_FAILURE, PRODUCT_REQUEST} from "./actiontype";

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
    catTotal:[],
    attenddata:[],
    inwardoutdata:[],
    devlopmentdata:[],
    todayevent:[],
    officedata:[],
    statusdata:[]
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
            return {...state, isLoading : false, products:payload}
        case GET_INPROGRESSDATA_SUCCESS :
            return {...state, isLoading : false, inprogressdata:payload}
        case GET_SOLVEDDATA_SUCCESS :
            return {...state, isLoading : false, solvedata:payload}
        case GET_ONHOLDDATA_SUCCESS :
            return {...state, isLoading : false, onholddata:payload}
        case GET_QUEUEDATA_SUCCESS :
            return {...state, isLoading : false, queuedata:payload}
        case GET_STATUSUPDATEDATA_SUCCESS :
            return {...state, isLoading : false, statusupdatedata:payload}
        case POST_COMPLAINER_SUCCESS :
            return {...state, isLoading : false,     complainerSinleData
            :payload}
        case GET_SEARCH_SUCCESS :
            return {...state, isLoading : false, products:payload}
        case GET_SEARCH_INPROGRESS_SUCCESS :
            return {...state, isLoading : false, inprogressdata:payload}
        case GET_SEARCH_SOLVED_SUCCESS :
            return {...state, isLoading : false, solvedata:payload}
        case GET_SEARCH_ONHOLD_SUCCESS :
            return {...state, isLoading : false, onholddata:payload}
        case GET_SEARCH_QUEUE_SUCCESS :
            return {...state, isLoading : false, queuedata:payload}
        case GET_SEARCH_STATUSUPDATE_SUCCESS :
            return {...state, isLoading : false, statusupdatedata:payload}
        case GET_FILTER_SUCCESS :
            return {...state, isLoading : false, products:payload}
        case GET_FILTER_INPROGRESS_SUCCESS :
            return {...state, isLoading : false, inprogressdata:payload}
        case GET_FILTER_SOLVED_SUCCESS :
            return {...state, isLoading : false, solvedata:payload}
        case GET_FILTER_ONHOLD_SUCCESS :
            return {...state, isLoading : false, onholddata:payload}
        case GET_FILTER_QUEUE_SUCCESS :
            return {...state, isLoading : false, queuedata:payload}
        case GET_FILTER_STATUSUPDATE_SUCCESS :
            return {...state, isLoading : false, statusupdatedata:payload}
        case GET_USERSEARCH_SUCCESS :
            return {...state, isLoading : false, srch:payload}
        case GET_Categories_SUCCESS :
            return {...state, isLoading : false, CategoriesData:payload}
        case GET_assemblies_SUCCESS :
            return {...state, isLoading : false, assembliesData:payload}
        case PATCH_PRODUCT_SUCCESS :
            return {...state, isLoading : false,}
        case POST_COMMENT_SUCCESS :
            return {...state, isLoading : false}
        case POST_COMPLAINTE_SUCCESS :
            return {...state, isLoading : false , isSubmitted:true,complaintPostData:payload}
            case GET_KARYKARTA_SUCCESS:
                return {...state, isLoading : false,karykarta:payload}
                case GET_ADHIKARI_SUCCESS:
                    return {...state, isLoading : false,adhikari:payload}
                case GET_CatTotal_SUCCESS:
                    return {...state, isLoading : false,catTotal:payload}
                case GET_ATTEND_SUCCESS:
                    return {...state, isLoading : false,attenddata:payload}
                case GET_INWARDOUT_SUCCESS:
                    return {...state, isLoading : false,inwardoutdata:payload}
                case GET_DEVELOPMENT_SUCCESS:
                    return {...state, isLoading : false,devlopmentdata:payload}
                case GET_TODAYEVENT_SUCCESS:
                    return {...state, isLoading : false,todayevent:payload}
                case GET_OFFICE_SUCCESS:
                    return {...state, isLoading : false,officedata:payload}
                case GET_STATUS_SUCCESS:
                    return {...state, isLoading : false,statusdata:payload}
        case DELETE_PRODUCT_SUCCESS :
            return {...state, isLoading : false,deleteItem :[...state.deleteItem,payload]}
        default :
            return initialstate;
    }
}