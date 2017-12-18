import {
    GET_CONNECTION_SIGNALR,
    GET_CHUYEN_KHOA,
    KHAI_BAO_USERNAME,
    NGUOI_DUNG_LOAD_GAP,  
    CALL,
    STORE_DOCTOR
} from './kham.type';

const initialState = {
    connection: null,
    proxy: null,
    isPendingConnection: false,
    isConnectedSignalR: false,
    errorConnection: '',
    isPendingProxy: false,
    listChuyenKhoa: [],
    userId : null,
    idGap: null,
    //CALL
    isPendingConnectCall : false,
    choPhepCall: false, 
    liDoTuChoiCall: null,
    soGiayConLaiCall: null,
    idCuocGoi: null,
    //CHỌN BÁC SĨ BY CHUYÊN KHOA
    doctorInfo : null,
    idDichVu: null
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
        //CALL
        case CALL.PENDING:
            return {
                ...state,
                isPendingConnectCall: true,
            };
        case CALL.SUCCESS:
            return {
                ...state,
                isPendingConnectCall: false,
                choPhepCall: true, 
                soGiayConLaiCall: action.soGiayConLaiCall ,
                idCuocGoi: action.idCuocGoi      
            };
        case CALL.FAILURE:
            return {
                ...state,
                isPendingConnectCall: false,
                choPhepCall: false,
                liDoTuChoiCall: action.liDoTuChoiCall,
            };
        //CHỌN BÁC SĨ BY CHUYÊN KHOA
        case STORE_DOCTOR:
            return {
                ...state,
                doctorInfo: action.payload,
                idDichVu: action.idDichVu
            }
        default:
            return state;
    }
};