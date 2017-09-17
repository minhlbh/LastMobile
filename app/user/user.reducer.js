import {
    GET_AUTH_USER,
    GET_PROFILES
} from './user.type';

const initialState = {
    user: {},
    isPendingUser: false,
    error: '',
    profiles: [],
    isPendingProfiles: false
};

export const userReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        //GET USER
        case GET_AUTH_USER.PENDING:
            return {
                ...state,
                isPendingUser: true,
            };
        case GET_AUTH_USER.SUCCESS:
            return {
                ...state,
                isPendingUser: false,
                user: action.payload,
            };
        case GET_AUTH_USER.FAILURE:
            return {
                ...state,
                isPendingUser: false,
                error: action.payload,
            };
        //GET PROFILES
        case GET_PROFILES.PENDING:
            return {
                ...state,
                isPendingProfiles: true,
            };
        case GET_PROFILES.SUCCESS:
            return {
                ...state,
                isPendingProfiles: false,
                profiles: action.payload,
            };
        case GET_PROFILES.FAILURE:
            return {
                ...state,
                isPendingProfiles: false,
                error: action.payload,
            };
        //DEFAULT
        default:
            return state;
    }
};