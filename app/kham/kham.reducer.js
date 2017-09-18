import {
    GET_CONNECTION_SIGNALR,
    GET_PROXY_SIGNALR
} from './kham.type';

const initialState = {
    connection: null,
    isPendingConnection: false,
    error: '',
    proxy: null,
    isPendingProxy: false
};

export const signalrReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        //GET CONNECTION
        case GET_CONNECTION_SIGNALR.PENDING:
            return {
                ...state,
                isPendingConnectionr: true,
            };
        case GET_CONNECTION_SIGNALR.SUCCESS:
            return {
                ...state,
                isPendingConnection: false,
                connection: action.connection,
                proxy: action.proxy
            };
        case GET_CONNECTION_SIGNALR.FAILURE:
            return {
                ...state,
                isPendingConnection: false,
                error: action.payload,
            };
        // //GET GET_PROXY_SIGNALR
        // case GET_PROXY_SIGNALR.PENDING:
        //     return {
        //         ...state,
        //         isPendingProxy: true,
        //     };
        // case GET_PROXY_SIGNALR.SUCCESS:
        //     return {
        //         ...state,
        //         isPendingProxy: false,
        //         proxy: action.payload,
        //     };
        // case GET_PROXY_SIGNALR.FAILURE:
        //     return {
        //         ...state,
        //         isPendingProxys: false,
        //         error: action.payload,
        //     };
        //DEFAULT
        default:
            return state;
    }
};