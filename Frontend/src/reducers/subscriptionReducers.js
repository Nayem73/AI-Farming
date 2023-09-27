import {
    SUBCRIPTION_REQUEST,
    SUBCRIPTION_SUCCESS,
    SUBCRIPTION_FAILED,

    SUBCRIPTION_LIST_REQUEST,
    SUBCRIPTION_LIST_SUCCESS,
    SUBCRIPTION_LIST_FAILED,

    SUBCRIPTION_AMOUNT_UPDDATE_REQUEST,
    SUBCRIPTION_AMOUNT_UPDDATE_SUCCESS,
    SUBCRIPTION_AMOUNT_UPDDATE_FAILED,
    
    SUBCRIPTION_STATISTIC_REQUEST,
    SUBCRIPTION_STATISTIC_SUCCESS,
    SUBCRIPTION_STATISTIC_FAILED,

    SUBCRIPTION_AMOUNT_REQUEST,
    SUBCRIPTION_AMOUNT_SUCCESS,
    SUBCRIPTION_AMOUNT_FAILED,

    SUBCRIPTION_CHECK_REQUEST,
    SUBCRIPTION_CHECK_SUCCESS,
    SUBCRIPTION_CHECK_FAILED
} from "../constants/subscriptionConstants";


export const subscriptionReducer = (state = { subscription: {} }, action) => {
    switch (action.type) {
        case SUBCRIPTION_REQUEST:
            return { ...state, loading: true }
        case SUBCRIPTION_SUCCESS:
            return { loading: false, subscription: action.payload }
        case SUBCRIPTION_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}


export const subscriptionCheckdReducer = (state = { subscription: {} }, action) => {
    switch (action.type) {
        case SUBCRIPTION_CHECK_REQUEST:
            return { ...state, loading: true }
        case SUBCRIPTION_CHECK_SUCCESS:
            return { loading: false, subscription: action.payload }
        case SUBCRIPTION_CHECK_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}


export const subscriptionAmountReducer = (state = { subscription: {} }, action) => {
    switch (action.type) {
        case SUBCRIPTION_AMOUNT_REQUEST:
            return { ...state, loading: true }
        case SUBCRIPTION_AMOUNT_SUCCESS:
            return { loading: false, subscription: action.payload }
        case SUBCRIPTION_AMOUNT_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}


export const subscriptionAmountUpdateReducer = (state = {subscription: {}}, action) => {
    switch (action.type) {
        case SUBCRIPTION_AMOUNT_UPDDATE_REQUEST:
            return { loading: true }
        case SUBCRIPTION_AMOUNT_UPDDATE_SUCCESS:
            return { loading: false, success: true, subscription: action.payload }
        case SUBCRIPTION_AMOUNT_UPDDATE_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}


export const subscriptionListReducer = (state = { subscriptions: [],prev_page:null, cur_page:null, next_page:null, total_page:null }, action) => {
    switch (action.type) {
        case SUBCRIPTION_LIST_REQUEST:
            return { loading: true }
        case SUBCRIPTION_LIST_SUCCESS:
            return {
                loading: false,
                subscriptions: action.payload.content,
                cur_page:action.payload.pageable.pageNumber,
                total_page: action.payload.totalPages,
                prev_page: action.payload.pageable.pageNumber > 0 ? action.payload.pageable.pageNumber - 1 : null,
                next_page: action.payload.pageable.pageNumber < action.payload.total_pages - 1 ? action.payload.pageable.pageNumber + 1 : null
            }
        case SUBCRIPTION_LIST_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}


export const subscriptionsStatisticReducer = (state = {subscription: {}}, action) => {
    switch (action.type) {
        case SUBCRIPTION_STATISTIC_REQUEST:
            return { loading: true }
        case SUBCRIPTION_STATISTIC_SUCCESS:
            return { loading: false, success: true, subscription: action.payload }
        case SUBCRIPTION_STATISTIC_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

