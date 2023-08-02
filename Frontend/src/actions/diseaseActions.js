import axios from "axios";
import { 
    DISEASE_CREATE_FAILED,
    DISEASE_CREATE_REQUEST,
    DISEASE_CREATE_SUCCESS,

    DISEASE_DELETE_FAILED,
    DISEASE_DELETE_REQUEST,
    DISEASE_DELETE_SUCCESS,

    DISEASE_DETAIL_FAILED,
    DISEASE_DETAIL_REQUEST,
    DISEASE_DETAIL_SUCCESS,


    DISEASE_LIST_FAILED,
    DISEASE_LIST_REQUEST,
    DISEASE_LIST_SUCCESS,

    DISEASE_UPDATE_FAILED,
    DISEASE_UPDATE_REQUEST,
    DISEASE_UPDATE_SUCCESS,

    AI_SEARCH_REQUEST,
    AI_SEARCH_SUCCESS,
    AI_SEARCH_FAILED } from "../constants/diseaseConstants";

const root_url = "http://192.168.77.4:8080";

export const listDiseases = (params) => async (dispatch) => {
    let crop = '';
    let search = '';
    let url = `${root_url}/api/disease/`
    if (params){
        if (params.crop){
            crop = params.crop;
            url = `${root_url}/api/disease?crop=${crop}&search=${search}`
        }
        if (params.search){
            search = params.search;
            url = `${root_url}/api/disease?crop=${crop}&search=${search}`
        }
    }
    try {
        dispatch({
            type: DISEASE_LIST_REQUEST
        })

        const { data } = await axios.get(url);
        dispatch({
            type: DISEASE_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DISEASE_LIST_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const listDiseaseDetails = (crop, disease) => async (dispatch) => {
    try {
        dispatch({
            type: DISEASE_DETAIL_REQUEST
        })
        let url = `${root_url}/api/disease/${crop}/${disease}`;
        const { data } = await axios.get(url);

        dispatch({
            type: DISEASE_DETAIL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DISEASE_DETAIL_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const aiSearch = (formData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: AI_SEARCH_REQUEST
        })
        const { userLogin: { userInfo } } = getState();

        
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`${root_url}/api/search/`, formData, config);
        
        dispatch({
            type: AI_SEARCH_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: AI_SEARCH_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}




export const deleteDisease= (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DISEASE_DELETE_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`${root_url}/api/disease/${id}`, config)
        dispatch({
            type: DISEASE_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: DISEASE_DELETE_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const createDisease = (formData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DISEASE_CREATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`${root_url}/api/disease/`, formData, config)
        
        dispatch({
            type: DISEASE_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DISEASE_CREATE_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateDisease = (disease_id, formData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DISEASE_UPDATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`${root_url}/api/disease/${disease_id}`, formData, config)
        dispatch({
            type: DISEASE_UPDATE_SUCCESS,
            success: true,
            payload: data
        })
        dispatch({ type: DISEASE_DETAIL_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: DISEASE_UPDATE_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}