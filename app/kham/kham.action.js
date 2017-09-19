import { AsyncStorage } from 'react-native';
import khamApi from '../api/khamApi';
import SignalR from './SignalR';

import {
    GET_CONNECTION_SIGNALR,
    GET_PROXY_SIGNALR,
    GET_CHUYEN_KHOA,
    STORE_BAC_SI_INFO
} from './kham.type';

export const connectSignalR = (isConnected) => {
    return ( dispatch) => {
        dispatch({ type: GET_CONNECTION_SIGNALR.PENDING });
    };
};


export const connectedSignalR = () => {
    return (dispatch) =>{
        dispatch({
            type: GET_CONNECTION_SIGNALR.SUCCESS,
        });
    }
}

export const connectFailSignalR = () => {
    return (dispatch) =>{
        dispatch({
            type: GET_CONNECTION_SIGNALR.FAILURE,
            payload: 'Failed',
        });
    }
}

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
    return ( dispatch) => {
        dispatch({ type: GET_CONNECTION_SIGNALR.PENDING })
        SignalR.proxy.on('timBacSiTheoChuyenKhoa_KetQua', (KetQua, IdDichVu, TenDichVu, GiaTien, BacSiId, HoVaTen, Avatar, GioiThieuNhanh) => {
            console.log(KetQua)
            if (!BacSiId) { //Nếu k có id bác sĩ trả về thì báo kết quả 
                alert(KetQua);
                dispatch({ type: GET_CONNECTION_SIGNALR.FAILURE })
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