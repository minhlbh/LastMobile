import {
    LOGIN,
    LOGOUT,
    REGISTER
} from './auth.type';

const initialState = {
    isLoggingIn: false,
    isSigningOut: false,
    isAuthenticated: false,
    accessToken: null,
    user: {},
    isPendingUser: false,
    error: '',
    isSigningUp: false,
    isRegistered: false,
    errorSignUp: '', 
    idU: null  
};

export const authReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case LOGIN.PENDING:
            return {
                ...state,
                isLoggingIn: true,
                isAuthenticated: false,
            };
        case LOGIN.SUCCESS:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: true,
                accessToken: action.payload,
            };
        case LOGIN.FAILURE:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: false,
                error: action.payload,
            };
        case LOGOUT.PENDING:
            return {
                ...state,
                isSigningOut: true,
            };
        case LOGOUT.SUCCESS:
            return {
                ...initialState,
                hasInitialUser: false,
            };
        case LOGOUT.FAILURE:
            return {
                ...state,
                isSigningOut: false,
                error: action.payload,
            };
        case REGISTER.PENDING:
            return {
                ...state,
                isSigningUp: true,
                isRegistered: false,
            };
        case REGISTER.SUCCESS:
            return {
                ...state,
                isSigningUp: false,
                isRegistered: true,
                idU: action.payload
            };
        case REGISTER.FAILURE:
            return {
                ...state,
                isSigningUp: false,
                errorSignUp: action.payload,
            };
        default:
            return state;
    }
};