import { 
    NOTIFICATION_LIST_REQUEST,
    NOTIFICATION_LIST_SUCCESS,
    NOTIFICATION_LIST_FAILED,

    NOTIFICATION_DELETE_REQUEST,
    NOTIFICATION_DELETE_SUCCESS,
    NOTIFICATION_DELETE_FAILED } from "../constants/notificationConstants";




export const notificationListReducer = (state = { notifications: []}, action) => {
    switch (action.type) {
        case NOTIFICATION_LIST_REQUEST:
            return { loading: true, notifications: [] }
        case NOTIFICATION_LIST_SUCCESS:
            return {
                loading: false,
                notifications: action.payload
            }
        case NOTIFICATION_LIST_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const notificationDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case NOTIFICATION_DELETE_REQUEST:
            return { loading: true }
        case NOTIFICATION_DELETE_SUCCESS:
            return { loading: false, success: true }
        case NOTIFICATION_DELETE_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

