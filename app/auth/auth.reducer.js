import {
    LOGIN,
    LOGOUT,
    REGISTER,
    VERIFY_PHONE,
    ACTION_TYPE,
    VERIFY_CODE,
    REGISTER_FB
} from './auth.type';

const initialState = {
    isLoggingIn: false,
    isSigningOut: false,
    isAuthenticated: false,
    accessToken: null,
    error: '', 
    idU: null,
    isPendingVerifyPhone: false,
    phone: '',
    messVerifyPhone: '',
    isRegister: true,
    code: null,
    isPendingVerifyCode: false,
    fbToken: null
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
            };
        case LOGOUT.FAILURE:
            return {
                ...state,
                isSigningOut: false,
                error: action.payload,
            };
        case VERIFY_PHONE.PENDING: 
            return {
                ...state,
                isPendingVerifyPhone: true,
            }
        case VERIFY_PHONE.SUCCESS: 
            return {
                ...state,
                isPendingVerifyPhone: false,
                phone: action.payload,
                messVerifyPhone: action.mess
            }
        case VERIFY_PHONE.FAILURE:
            return {
                ...state,
                isPendingVerifyPhone: false,
            }
        case ACTION_TYPE:
            return {
                ...initialState,
                isRegister: action.payload
            }
        case VERIFY_CODE.PENDING: 
            return {
                ...state,
                isPendingVerifyCode: true,
            }
        case VERIFY_CODE.SUCCESS: 
            return {
                ...state,
                isPendingVerifyCode: false,
                code: action.payload
            }
        case VERIFY_CODE.FAILURE:
            return {
                ...state,
                isPendingVerifyCode: false,
            }
        case REGISTER_FB :
            return {
                ...initialState,
                isRegister: true,
                fbToken: action.payload
            }
        default:
            return state;
    }
};