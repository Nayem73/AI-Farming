import axios from "axios";
import { 
    CROP_CREATE_FAILED,
    CROP_CREATE_REQUEST,
    CROP_CREATE_SUCCESS,

    CROP_DELETE_FAILED,
    CROP_DELETE_REQUEST,
    CROP_DELETE_SUCCESS,
    
    CROP_LIST_FAILED,
    CROP_LIST_REQUEST,
    CROP_LIST_SUCCESS,
    
    CROP_UPDATE_FAILED,
    CROP_UPDATE_REQUEST,
    CROP_UPDATE_SUCCESS } from "../constants/cropConstants";

const root_url = "http://192.168.77.4:8080";

export const listCrops = (keyword = ' ') => async (dispatch) => {
    try {
        dispatch({
            type: CROP_LIST_REQUEST
        })

        const { data } = await axios.get(`${root_url}/api/crops/`);

        dispatch({
            type: CROP_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CROP_LIST_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}



export const deleteCrop= (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CROP_DELETE_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`/api/crops/${id}`, config)
        dispatch({
            type: CROP_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: CROP_DELETE_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const createCrop = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: CROP_CREATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/crops`, {}, config)
        dispatch({
            type: CROP_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CROP_CREATE_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateCrop = (crop) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CROP_UPDATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/crops/${crop.id}`, crop, config)
        dispatch({
            type: CROP_UPDATE_SUCCESS,
            success: true,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CROP_UPDATE_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
