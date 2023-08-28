import {
    USER_DELETE_FAILED,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,

    USER_DETAILS_FAILED,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,

    USER_LIST_FAILED,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,

    USER_LOGIN_FAILED,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,

    USER_LOGOUT,

    USER_REGISTER_FAILED,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,

    USER_UPDATE_FAILED,
    USER_UPDATE_REQUEST,
    USER_UPDATE_RESET,
    USER_UPDATE_SUCCESS,

    PASSWORD_CHANGE_REQUEST,
    PASSWORD_CHANGE_SUCCESS,
    PASSWORD_CHANGE_FAILED } from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAILED:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state;
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return { loading: false, message: action.payload }
        case USER_REGISTER_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}



export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_DETAILS_RESET:
            return { user: {} }
        case USER_DETAILS_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true }
        case USER_UPDATE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case USER_UPDATE_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}


export const userListReducer = (state = { users: [],prev_page:null, cur_page:null, next_page:null, total_page:null }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading: true }
        case USER_LIST_SUCCESS:
            return {
                loading: false,
                users: action.payload.content,
                cur_page:action.payload.pageable.pageNumber,
                total_page: action.payload.totalPages,
                prev_page: action.payload.pageable.pageNumber > 0 ? action.payload.pageable.pageNumber - 1 : null,
                next_page: action.payload.pageable.pageNumber < action.payload.total_pages - 1 ? action.payload.pageable.pageNumber + 1 : null
            }
        case USER_LIST_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return { loading: true }
        case USER_DELETE_SUCCESS:
            return { loading: false, success: true }
        case USER_DELETE_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}



// password change

export const passwordChangeReducer = (state = {}, action) => {
    switch (action.type) {
        case PASSWORD_CHANGE_REQUEST:
            return { loading: true }
        case PASSWORD_CHANGE_SUCCESS:
            return { loading: false, success: true }
        case PASSWORD_CHANGE_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}