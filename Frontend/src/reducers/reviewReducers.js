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
    REVIEW_CREATE_RESET,

    REVIEW_UPDATE_REQUEST,
    REVIEW_UPDATE_SUCCESS,
    REVIEW_UPDATE_FAILED,
    REVIEW_UPDATE_RESET
} from "../constants/reviewConstants";

export const reviewListReducer = (state = {reviews: [],prev_page:null, cur_page:null, next_page:null, total_page:null}, action) => {
    switch (action.type) {
        case REVIEW_LIST_REQUEST:
            return { loading: true, reviews: [] }
        case REVIEW_LIST_SUCCESS:
            return { 
                loading: false,
                reviews: action.payload.content,
                cur_page:action.payload.pageable.pageNumber,
                total_page: action.payload.totalPages,
                prev_page: action.payload.pageable.pageNumber > 0 ? action.payload.pageable.pageNumber - 1 : null,
                next_page: action.payload.pageable.pageNumber < action.payload.total_pages - 1 ? action.payload.pageable.pageNumber + 1 : null
                
            }
        case REVIEW_LIST_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}


export const reviewDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case REVIEW_DELETE_REQUEST:
            return { loading: true }
        case REVIEW_DELETE_SUCCESS:
            return { loading: false, success: true }
        case REVIEW_DELETE_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const reviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case REVIEW_CREATE_REQUEST:
            return { loading: true }
        case REVIEW_CREATE_SUCCESS:
            return { loading: false, success: true, review: action.payload }
        case REVIEW_CREATE_RESET:
            return { }
        case REVIEW_CREATE_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const reviewUpdateReducer = (state = {review: {}}, action) => {
    switch (action.type) {
        case REVIEW_UPDATE_REQUEST:
            return { loading: true }
        case REVIEW_UPDATE_SUCCESS:
            return { loading: false, success: true, review: action.payload }
        case REVIEW_UPDATE_RESET:
            return { review : {}}
        case REVIEW_UPDATE_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}
