import axios from "axios";
import { 
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
    SUBCRIPTION_AMOUNT_FAILED
} from "../constants/subscriptionConstants";



export const getSubscriptionAmount = () => async (dispatch) => {
    try {
        dispatch({
            type: SUBCRIPTION_AMOUNT_REQUEST
        })


        const { data } = await axios.patch(`/api/admin/subscription/updateamount/`)
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



export const updateSubscriptionAmount = (formData) => async (dispatch, getState) => {
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

        const { data } = await axios.patch(`/api/admin/subscription/updateamount/`, formData, config)
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




export const getUserDetails = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/profile/`, config)
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAILED,
            payload: error.response.data.message ? error.response.data.message :error.response? error.message : 'error'
        })
    }
}


export const updateUerProfile = (user_id, FormData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.patch(`/api/userlist/${user_id}`, FormData, config)

        localStorage.setItem('userInfo', JSON.stringify(data))

        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAILED,
            payload: error.response.data.message ? error.response.data.message :error.response? error.message : 'error'
        })
    }
}


export const listUsers = (params) => async (dispatch, getState) => {
    let page = 0;
    if (params){
        page = params.page || 0;}
    try {
        dispatch({
            type: USER_LIST_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/userlist/?page=${page}`, config)

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_LIST_FAILED,
            payload: error.response.data.message ? error.response.data.message :error.response? error.message : 'error'
        })
    }
}

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(`/users/${id}`, config)

        dispatch({
            type: USER_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: USER_DELETE_FAILED,
            payload: error.response.data.message ? error.response.data.message :error.response? error.message : 'error'
        })
    }
}

// export const updateUser = (user) => async (dispatch, getState) => {
//     try {
//         dispatch({
//             type: USER_EDIT_REQUEST
//         })

//         const { userLogin: { userInfo } } = getState();

//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${userInfo.token}`
//             }
//         }

//         const { data } = await axios.put(`/users/${user._id}`, user, config)

//         dispatch({
//             type: USER_EDIT_SUCCESS,
//         })
//         dispatch({
//             type: USER_DETAILS_SUCCESS,
//             payload: data
//         })
//     } catch (error) {
//         dispatch({
//             type: USER_EDIT_FAILED,
//             payload: error.response.data.message ? error.response.data.message :error.response? error.message : 'error'
//         })
//     }
// }

