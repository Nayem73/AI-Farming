import axios from 'axios'

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
    USER_UPDATE_SUCCESS,

    PASSWORD_CHANGE_REQUEST,
    PASSWORD_CHANGE_SUCCESS,
    PASSWORD_CHANGE_FAILED} from "../constants/userConstants"

import {
    NOTIFICATION_LIST_RESET
} from "../constants/notificationConstants";


export const login = (formData) => async (dispatch) => {
    // console.log('signin')
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/signin/`, formData)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAILED,
            payload: error.response.data.message ? error.response.data.message :error.response? error.message : 'error'
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DETAILS_RESET });
    dispatch({ type: NOTIFICATION_LIST_RESET });

}


export const register = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/signup/`, formData)
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAILED,
            payload: error.response.data.message ? error.response.data.message :error.response? error.message : 'error'
        })
    }
}


export const changePassword = (formData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PASSWORD_CHANGE_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        // console.log('change', formData)
        const { data } = await axios.patch(`/api/changepassword/`, formData, config)
        // console.log('register action', data)
        dispatch({
            type: PASSWORD_CHANGE_SUCCESS,
            payload: data
        })

        // dispatch({
        //     type: USER_LOGIN_SUCCESS,
        //     payload: data
        // })

        // localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: PASSWORD_CHANGE_FAILED,
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
        // console.log('user details', userInfo)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/profile/`, config)
        // console.log('user details', data)
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

