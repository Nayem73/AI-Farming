import { 
    PICTURE_LIST_REQUEST,
    PICTURE_LIST_SUCCESS,
    PICTURE_LIST_FAILED,

    PICTURE_DELETE_REQUEST,
    PICTURE_DELETE_SUCCESS,
    PICTURE_DELETE_FAILED,

    PICTURE_CREATE_REQUEST,
    PICTURE_CREATE_SUCCESS,
    PICTURE_CREATE_FAILED,
    PICTURE_CREATE_RESET,

    PICTURE_UPDATE_REQUEST,
    PICTURE_UPDATE_SUCCESS,
    PICTURE_UPDATE_FAILED,
    PICTURE_UPDATE_RESET 
} from "../constants/pictureConstants";

export const pictureListReducer = (state = {pictures: []}, action) => {
    switch (action.type) {
        case PICTURE_LIST_REQUEST:
            return { loading: true, pictures: [] }
        case PICTURE_LIST_SUCCESS:
            return { loading: false, pictures: action.payload }
        case PICTURE_LIST_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}


export const pictureDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PICTURE_DELETE_REQUEST:
            return { loading: true }
        case PICTURE_DELETE_SUCCESS:
            return { loading: false, success: true }
        case PICTURE_DELETE_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const pictureCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PICTURE_CREATE_REQUEST:
            return { loading: true }
        case PICTURE_CREATE_SUCCESS:
            return { loading: false, success: true, picture: action.payload }
        case PICTURE_CREATE_RESET:
            return { }
        case PICTURE_CREATE_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const pictureUpdateReducer = (state = {picture: {}}, action) => {
    switch (action.type) {
        case PICTURE_UPDATE_REQUEST:
            return { loading: true }
        case PICTURE_UPDATE_SUCCESS:
            return { loading: false, success: true, picture: action.payload }
        case PICTURE_UPDATE_RESET:
            return { picture : {}}
        case PICTURE_UPDATE_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}
