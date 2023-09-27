import axios from "axios";
import { 
    REVIEW_LIST_REQUEST,
    REVIEW_LIST_SUCCESS,
    REVIEW_LIST_FAILED,

    REVIEW_DELETE_REQUEST,
    REVIEW_DELETE_SUCCESS,
    REVIEW_DELETE_FAILED,

    REVIEW_CREATE_REQUEST,
    REVIEW_CREATE_SUCCESS,
    REVIEW_CREATE_FAILED,

    REVIEW_UPDATE_REQUEST,
    REVIEW_UPDATE_SUCCESS,
    REVIEW_UPDATE_FAILED
} from "../constants/reviewConstants";


export const listReviews = (params) => async (dispatch, getState) => {
    let page = 0;
    if (params){
        page = params.page || 0;}
    try {
        dispatch({
            type: REVIEW_LIST_REQUEST
        })

        const { data } = await axios.get(`/api/review?page=${page}`);
        // console.log(data);
        dispatch({
            type: REVIEW_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: REVIEW_LIST_FAILED,
            payload: error.response.data.message ? error.response.data.message :error.response? error.message : 'error'
        })
    }
}




export const deleteReview= (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: REVIEW_DELETE_REQUEST
        })

        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`/api/review/${id}`, config)
        dispatch({
            type: REVIEW_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: REVIEW_DELETE_FAILED,
            payload: error.response.data.message ? error.response.data.message :error.response? error.message : 'error'
        })
    }
}

export const createReview = (FormData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: REVIEW_CREATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/review`, FormData, config)
        dispatch({
            type: REVIEW_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: REVIEW_CREATE_FAILED,
            payload: error.response.data.message ? error.response.data.message :error.response? error.message : 'error'
        })
    }
}

export const updateReview = (id, formData) => async (dispatch, getState) => {
    console.log(formData);
    try {
        dispatch({
            type: REVIEW_UPDATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                // 'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/review/${id}`, formData, config)
        
        dispatch({
            type: REVIEW_UPDATE_SUCCESS,
            success: true,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: REVIEW_UPDATE_FAILED,
            payload: error.response.data.message ? error.response.data.message :error.response? error.message : 'error'
        })
    }
}

