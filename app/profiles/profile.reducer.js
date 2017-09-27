import {
    CREATE_FAST_PROFILE
} from './profile.type';

const initialState = {
    isPeddingCreateProfile: false,
    isCreatedProfile: false,
    error : null
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
        //DEFAULT
        default:
            return state;
    }
};