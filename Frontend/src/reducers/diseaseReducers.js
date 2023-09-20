import {
    DISEASE_CREATE_FAILED,
    DISEASE_CREATE_REQUEST,
    DISEASE_CREATE_RESET,
    DISEASE_CREATE_SUCCESS,

    DISEASE_DELETE_FAILED,
    DISEASE_DELETE_REQUEST,
    DISEASE_DELETE_SUCCESS,

    DISEASE_DETAIL_FAILED,
    DISEASE_DETAIL_REQUEST,
    DISEASE_DETAIL_SUCCESS,
    DISEASE_DETAIL_RESET,

    DISEASE_LIST_FAILED,
    DISEASE_LIST_REQUEST,
    DISEASE_LIST_SUCCESS,

    DISEASE_UPDATE_FAILED,
    DISEASE_UPDATE_REQUEST,
    DISEASE_UPDATE_RESET,
    DISEASE_UPDATE_SUCCESS,
    
    AI_SEARCH_REQUEST,
    AI_SEARCH_SUCCESS,
    AI_SEARCH_FAILED,
    AI_SEARCH_RESET } from "../constants/diseaseConstants";

export const diseaseListReducer = (state = {diseases: [],prev_page:null, cur_page:null, next_page:null, total_page:null}, action) => {
    switch (action.type) {
        case DISEASE_LIST_REQUEST:
            return { loading: true, diseases: [] }
        case DISEASE_LIST_SUCCESS:
            return { 
                loading: false,
                diseases: action.payload.content,
                cur_page:action.payload.pageable.pageNumber,
                total_page: action.payload.totalPages,
                prev_page: action.payload.pageable.pageNumber > 0 ? action.payload.pageable.pageNumber - 1 : null,
                next_page: action.payload.pageable.pageNumber < action.payload.total_pages - 1 ? action.payload.pageable.pageNumber + 1 : null
                
            }
        case DISEASE_LIST_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const aiSearchReducer = (state = {crop:'', disease:''}, action) => {
    switch (action.type) {
        case AI_SEARCH_REQUEST:
            return { loading: true, disease: '', crop: ''}
        case AI_SEARCH_SUCCESS:
            return { loading: false, disease: action.payload.disease, crop: action.payload.crop }
        case AI_SEARCH_FAILED:
            return { loading: false, error: action.payload}
        case AI_SEARCH_RESET:
            return { crop:'', disease:'' }
        default:
            return state;
    }
}

export const diseaseDetailReducer = (state = {disease: []}, action) => {
    switch (action.type) {
        case DISEASE_DETAIL_REQUEST:
            return { loading: true, ...state }
        case DISEASE_DETAIL_SUCCESS:
            return { loading: false, disease: action.payload }
        case DISEASE_DETAIL_RESET:
            return { disease: [] }
        case DISEASE_DETAIL_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const diseaseDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case DISEASE_DELETE_REQUEST:
            return { loading: true }
        case DISEASE_DELETE_SUCCESS:
            return { loading: false, success: true }
        case DISEASE_DELETE_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const diseaseCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case DISEASE_CREATE_REQUEST:
            return { loading: true }
        case DISEASE_CREATE_SUCCESS:
            return { loading: false, success: true, disease: action.payload }
        case DISEASE_CREATE_RESET:
            return { }
        case DISEASE_CREATE_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const diseaseUpdateReducer = (state = {disease: {}}, action) => {
    switch (action.type) {
        case DISEASE_UPDATE_REQUEST:
            return { loading: true }
        case DISEASE_UPDATE_SUCCESS:
            return { loading: false, success: true, disease: action.payload }
        case DISEASE_UPDATE_RESET:
            return { disease : {}}
        case DISEASE_UPDATE_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}
