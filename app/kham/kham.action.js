import { AsyncStorage } from 'react-native';
import khamApi from '../api/khamApi';
import signalr from 'react-native-signalr';
import SignalR from './SignalR';

import {
    GET_CONNECTION_SIGNALR,
    GET_PROXY_SIGNALR,
    GET_CHUYEN_KHOA,
    STORE_BAC_SI_INFO,
    SET_IDGAP_HISTORY
} from './kham.type';


export const connectSignalR = () => {
    return dispatch => {
        const connection = signalr.hubConnection('http://admincloud.truongkhoa.com/SignalR');
        const proxy = connection.createHubProxy('truongKhoaHub')
        dispatch({ type: GET_CONNECTION_SIGNALR.PENDING });
        // PROXY ON
        proxy.on('timBacSiTheoChuyenKhoa_KetQua', () => {});
        proxy.on('chat', () => {});
        proxy.on('moiBacSi_BacSiTraLoi', () => {});
        proxy.on('nguoiDungMobileVaoGap_DaVaoDuoc', (IdGap) => {
            console.log('nguoiDungMobileVaoGap_DaVaoDuoc',IdGap)
        });
        proxy.on('loadUserOnline',  () => {});

        
        connection.start().done(() => {
            console.log('Now connected, connection ID=',connection.id)
                dispatch({
                    type: GET_CONNECTION_SIGNALR.SUCCESS,
                    connection: connection,
                    proxy: proxy
                });
        }).fail(() => {
            dispatch({
                type: GET_CONNECTION_SIGNALR.FAILURE,
                payload: '',
            });
            connectSignalR();
        });

        connection.error((error) => {
            const errorMessage = error.message;
            let detailedError = '';
            if (error.source && error.source._response) {
            detailedError = error.source._response;
            }
            if (detailedError === 'An SSL error has occurred and a secure connection to the server cannot be made.') {
            console.log('When using react-native-signalr on ios with http remember to enable http in App Transport Security https://github.com/olofd/react-native-signalr/issues/14')
            }
            console.debug('SignalR error: ' + errorMessage, detailedError)
            dispatch({
                type: GET_CONNECTION_SIGNALR.FAILURE,
                payload: errorMessage +': '+detailedError ,
            });
            connectSignalR();
        });
    };
};

export const getListChuyenKhoa = () => {
    return ( dispatch) => {
      khamApi.getListChuyenKhoa()
        .then(data => {
            dispatch({
                type: GET_CHUYEN_KHOA.SUCCESS,
                payload: data.DsChuyenKhoa,
            });
        })
    };
};


export const storeDoctorInfo = () => {
    return ( dispatch, getState) => {
        const proxy = getState().kham.proxy;
        dispatch({ type: STORE_BAC_SI_INFO.PENDING })
        proxy.on('timBacSiTheoChuyenKhoa_KetQua', (KetQua, IdDichVu, TenDichVu, GiaTien, BacSiId, HoVaTen, Avatar, GioiThieuNhanh) => {
            console.log(KetQua)
            if (!BacSiId) { //Nếu k có id bác sĩ trả về thì báo kết quả 
                alert(KetQua);
                dispatch({ type: STORE_BAC_SI_INFO.FAILURE })
            } else { //Nếu có chuyển sang trang bác sĩ
                var data = {
                    idDichVu: IdDichVu,
                    tenDichVu: TenDichVu,
                    giaTien: GiaTien,
                    bacSiId: BacSiId,
                    hoVaTen: HoVaTen,
                    avatar: Avatar,
                    gioiThieuNhanh: GioiThieuNhanh
                }
                dispatch({
                    type: STORE_BAC_SI_INFO.SUCCESS,
                    payload: data,
                });
            }
        });
    };
};

export const setIdGapHistory = (idGap) => {
    return (dispatch) =>{
        dispatch({
            type: SET_IDGAP_HISTORY.SUCCESS,
            payload: idGap,
        });
    }
}