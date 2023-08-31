import axios from "axios";
import { 
    NOTIFICATION_LIST_REQUEST,
    NOTIFICATION_LIST_SUCCESS,
    NOTIFICATION_LIST_FAILED,

    NOTIFICATION_DELETE_REQUEST,
    NOTIFICATION_DELETE_SUCCESS,
    NOTIFICATION_DELETE_FAILED,

    NOTIFICATION_STATUS_REQUEST,
    NOTIFICATION_STATUS_SUCCESS,
    NOTIFICATION_STATUS_FAILED

} from "../constants/notificationConstants";

export const listNotifications = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: NOTIFICATION_LIST_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/notification/`, config)

        dispatch({
            type: NOTIFICATION_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NOTIFICATION_LIST_FAILED,
            payload: error.response.data.message ? error.response.data.message :error.response? error.message : 'error'
        })
    }
}


export const deleteNotification = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: NOTIFICATION_DELETE_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(`/api/notification/${id}`, config)

        dispatch({
            type: NOTIFICATION_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: NOTIFICATION_DELETE_FAILED,
            payload: error.response.data.message ? error.response.data.message :error.response? error.message : 'error'
        })
    }
}


export const statusNotification = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: NOTIFICATION_STATUS_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/notification/${id}`, config)
        dispatch({
            type: NOTIFICATION_STATUS_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: NOTIFICATION_STATUS_FAILED,
            payload: error.response.data.message ? error.response.data.message :error.response? error.message : 'error'
        })
    }
}