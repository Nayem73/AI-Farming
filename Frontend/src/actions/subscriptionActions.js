import axios from "axios";
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


        
export const createSubscription = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: SUBCRIPTION_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        const { data } = await axios.get(`/api/payment`, config)
        // redirect to payment page
        window.location.href = data;


        dispatch({
            type: SUBCRIPTION_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SUBCRIPTION_FAILED,
            payload: error.response.data.message ? error.response.data.message :error.response? error.message : 'error'
        })
    }
}


export const checkSubscription= () => async (dispatch, getState) => {
    try {
        dispatch({
            type: SUBCRIPTION_CHECK_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        const { data } = await axios.get(`/api/issubscribed/`, config)
        dispatch({
            type: SUBCRIPTION_CHECK_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SUBCRIPTION_CHECK_FAILED,
            payload: error.response.data.message ? error.response.data.message :error.response? error.message : 'error'
        })
    }
}



export const amountSubscription = () => async (dispatch) => {
    try {
        dispatch({
            type: SUBCRIPTION_AMOUNT_REQUEST
        })


        const { data } = await axios.get(`/api/admin/subscription/amount/`)
        dispatch({
            type: SUBCRIPTION_AMOUNT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SUBCRIPTION_AMOUNT_FAILED,
            payload: error.response.data.message ? error.response.data.message :error.response? error.message : 'error'
        })
    }
}



export const updateAmountSubscription = (formData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SUBCRIPTION_AMOUNT_UPDDATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.patch(`/api/admin/subscription/amount/`, formData, config)
        dispatch({
            type: SUBCRIPTION_AMOUNT_UPDDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SUBCRIPTION_AMOUNT_UPDDATE_FAILED,
            payload: error.response.data.message ? error.response.data.message :error.response? error.message : 'error'
        })
    }
}


export const listSubscriptions = (params) => async (dispatch, getState) => {
    let page = 0;
    if (params){
        page = params.page || 0;}
    try {
        dispatch({
            type: SUBCRIPTION_LIST_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/admin/subscriptions?page=${page}`, config)

        dispatch({
            type: SUBCRIPTION_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SUBCRIPTION_LIST_FAILED,
            payload: error.response.data.message ? error.response.data.message :error.response? error.message : 'error'
        })
    }
}




export const statisticSubscriptions = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: SUBCRIPTION_STATISTIC_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/admin/subscription/statistic/`, config)

        dispatch({
            type: SUBCRIPTION_STATISTIC_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SUBCRIPTION_STATISTIC_FAILED,
            payload: error.response.data.message ? error.response.data.message :error.response? error.message : 'error'
        })
    }
}
