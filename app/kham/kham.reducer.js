import {
    GET_CONNECTION_SIGNALR,
    GET_CHUYEN_KHOA,
    KHAI_BAO_USERNAME,
    NGUOI_DUNG_LOAD_GAP, 
    GET_DETAIL_DICH_VU
} from './kham.type';

const initialState = {
    connection: null,
    proxy: null,
    isPendingConnection: false,
    isConnectedSignalR: false,
    errorConnection: '',
    isPendingProxy: false,
    listChuyenKhoa: [],
    isFoundDoctor: false,
    idGapHistory: null,
    userId : null,
    idGap: null,
    isPeddingFindDoctor: false,
    dichVuDetail :null
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

        // KHAI_BAO_USERNAME 
        case KHAI_BAO_USERNAME:
            return {
                ...state,
                userId: action.payload
            } 
        
        //NGUOI_DUNG_LOAD_GAP
        case NGUOI_DUNG_LOAD_GAP: 
            return {
                ...state,
                idGap: action.payload
            } 
        //GET_DETAIL_DICH_VU
        case GET_DETAIL_DICH_VU.PENDING: 
            return {
                ...state,
                isPeddingFindDoctor: true,
                isFoundDoctor: false,
            }
        case GET_DETAIL_DICH_VU.SUCCESS:
            return {
                ...state,
                isPeddingFindDoctor: false,
                isFoundDoctor: true,
                dichVuDetail: action.payload
            }
        case GET_DETAIL_DICH_VU.FAILURE: 
            return {
                ...state,
                isPeddingFindDoctor: false,
                isFoundDoctor: false,
                dichVuDetail: {}
            }
        default:
            return state;
    }
};