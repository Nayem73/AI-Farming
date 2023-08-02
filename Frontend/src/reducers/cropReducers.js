import {
    CROP_CREATE_FAILED,
    CROP_CREATE_REQUEST,
    CROP_CREATE_RESET,
    CROP_CREATE_SUCCESS,

    CROP_DELETE_FAILED,
    CROP_DELETE_REQUEST,
    CROP_DELETE_SUCCESS,

    CROP_LIST_FAILED,
    CROP_LIST_REQUEST,
    CROP_LIST_SUCCESS,
    
    CROP_UPDATE_FAILED,
    CROP_UPDATE_REQUEST,
    CROP_UPDATE_RESET,
    CROP_UPDATE_SUCCESS } from "../constants/cropConstants";

export const cropListReducer = (state = {crops: []}, action) => {
    switch (action.type) {
        case CROP_LIST_REQUEST:
            return { loading: true, crops: [] }
        case CROP_LIST_SUCCESS:
            return { loading: false, crops: action.payload }
        case CROP_LIST_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}


export const cropDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case CROP_DELETE_REQUEST:
            return { loading: true }
        case CROP_DELETE_SUCCESS:
            return { loading: false, success: true }
        case CROP_DELETE_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const cropCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CROP_CREATE_REQUEST:
            return { loading: true }
        case CROP_CREATE_SUCCESS:
            return { loading: false, success: true, crop: action.payload }
        case CROP_CREATE_RESET:
            return { }
        case CROP_CREATE_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const cropUpdateReducer = (state = {crop: {}}, action) => {
    switch (action.type) {
        case CROP_UPDATE_REQUEST:
            return { loading: true }
        case CROP_UPDATE_SUCCESS:
            return { loading: false, success: true, crop: action.payload }
        case CROP_UPDATE_RESET:
            return { crop : {}}
        case CROP_UPDATE_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}
