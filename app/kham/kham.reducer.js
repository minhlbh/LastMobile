import {
    GET_CONNECTION_SIGNALR,
    GET_PROXY_SIGNALR,
    GET_CHUYEN_KHOA,
    STORE_BAC_SI_INFO
} from './kham.type';

const initialState = {
    connection: null,
    proxy: null,
    isPendingConnection: false,
    isConnectedSignalR: false,
    errorConnection: '',
    isPendingProxy: false,
    listChuyenKhoa: [],
    doctorInfo: {},
    isPendingDoctorInfo: false,
    isFoundDoctor: false,
    idGapHistory: null
};

export const khamReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        //GET CONNECTION
        case GET_CONNECTION_SIGNALR.PENDING:
            return {
                ...state,
                isPendingConnection: true,
            };
        case GET_CONNECTION_SIGNALR.SUCCESS:
            return {
                ...state,
                isPendingConnection: false,
                isConnectedSignalR: true,
                connection: action.connection,
                proxy: action.proxy         
            };
        case GET_CONNECTION_SIGNALR.FAILURE:
            return {
                ...state,
                isPendingConnection: false,
                isConnectedSignalR: false,
                errorConnection: action.payload,
            };
        case GET_CHUYEN_KHOA.SUCCESS:
            return {
                ...state,
                listChuyenKhoa: action.payload
            };
        case STORE_BAC_SI_INFO.PENDING:
            return {
                ...state,
                isPendingDoctorInfo: true,
            }
        case STORE_BAC_SI_INFO.SUCCESS:
            return {
                ...state,
                isPendingDoctorInfo: false,
                isFoundDoctor: true,
                doctorInfo: action.payload
            }
        case STORE_BAC_SI_INFO.FAILURE:
            return {
                ...state,
                isPendingDoctorInfo: false,
                isFoundDoctor: false,
            }
        case STORE_BAC_SI_INFO.SUCCESS:
            return {
                ...state,
                idGapHistory: action.payload
            }
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