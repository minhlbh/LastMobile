import {
    CREATE_FAST_PROFILE,
    GET_PROFILE_DETAIL,
    EDIT_PROFILE
} from './profile.type';

const initialState = {
    isPeddingCreateProfile: false,
    isCreatedProfile: false,
    error : null,
    profileInfo: {},
    isPeddingGetProfileDetail: false,
};

export const profileReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        //GET CONNECTION
        case CREATE_FAST_PROFILE.PENDING:
            return {
                ...state,
                isPeddingCreateProfile: true,
            };
        case CREATE_FAST_PROFILE.SUCCESS:
            return {
                ...state,
                isPeddingCreateProfile: false,
                isCreatedProfile: true,
            };
        case CREATE_FAST_PROFILE.FAILURE:
            return {
                ...state,
                isPeddingCreateProfile: false,
                error: action.payload
            };
        //GET_PROFILE_DETAIL
        case GET_PROFILE_DETAIL.PENDING:
            return {
                ...state,
                isPeddingGetProfileDetail: true,
            };
        case GET_PROFILE_DETAIL.SUCCESS:
            return {
                ...state,
                isPeddingGetProfileDetail: false,
                profileInfo: action.payload,
            };
        case GET_PROFILE_DETAIL.FAILURE:
            return {
                ...state,
                isPeddingGetProfileDetail: false,
                error: action.payload
            };
        //EDIT_PROFILE
        case EDIT_PROFILE:
            return {
                ...state,
                profileInfo: action.payload,
            };
        //DEFAULT
        default:
            return state;
    }
};