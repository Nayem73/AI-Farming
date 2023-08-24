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

export const listDiseases = (params) => async (dispatch) => {
    let crop = '';
    let search = '';
    let page = 0;
    let url = `/api/disease/`
    if (params){
        if (params.crop){
            crop = params.crop;
            url = `/api/disease?crop=${crop}&search=${search}`
        }
        if (params.search){
            search = params.search;
            url = `/api/disease?crop=${crop}&search=${search}`
        }
        if (params.page){
            page = params.page;
            url = `/api/disease?crop=${crop}&search=${search}&page=${page}`
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
            payload: error.response.data.message ? error.response.data.message :error.response? error.message : 'error'
        })
    }
}


export const listDiseaseDetails = (crop, disease) => async (dispatch) => {
    try {
        dispatch({
            type: DISEASE_DETAIL_REQUEST
        })
        let url = `/api/disease/${crop}/${disease}`;
        const { data } = await axios.get(url);

        dispatch({
            type: DISEASE_DETAIL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DISEASE_DETAIL_FAILED,
            payload: error.response.data.message ? error.response.data.message :error.response? error.message : 'error'
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
        const { data } = await axios.post(`/api/search/`, formData, config);
        // console.log('data',data)
        dispatch({
            type: AI_SEARCH_SUCCESS,
            payload: data
        })
    } catch (error) {
        if (error instanceof TypeError){
            dispatch({
                type: AI_SEARCH_FAILED,
                payload: 'user not login or token expired or invalid token'
            })

        }else{
            dispatch({
                type: AI_SEARCH_FAILED,
                payload: error.response.data.message ? error.response.data.message :error.response? error.message : 'error'
            })
        }
        
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
        await axios.delete(`/api/disease/${id}`, config)
        dispatch({
            type: DISEASE_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: DISEASE_DELETE_FAILED,
            payload: error.response.data.message ? error.response.data.message :error.response? error.message : 'error'
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
        const { data } = await axios.post(`/api/disease/`, formData, config)
        
        dispatch({
            type: DISEASE_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DISEASE_CREATE_FAILED,
            payload: error.response.data.message ? error.response.data.message :error.response? error.message : 'error'
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
        const { data } = await axios.put(`/api/disease/${disease_id}`, formData, config)
        dispatch({
            type: DISEASE_UPDATE_SUCCESS,
            success: true,
            payload: data
        })
        dispatch({ type: DISEASE_DETAIL_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: DISEASE_UPDATE_FAILED,
            payload: error.response.data.message ? error.response.data.message :error.response? error.message : 'error'
        })
    }
}
