import { AsyncStorage,ToastAndroid } from 'react-native';
import khamApi from '../api/khamApi';
import signalr from 'react-native-signalr';
import SignalR from './SignalR';

import {
    GET_CONNECTION_SIGNALR,
    GET_PROXY_SIGNALR,
    GET_CHUYEN_KHOA,
    STORE_BAC_SI_INFO,
    SET_IDGAP_HISTORY,
    KHAI_BAO_USERNAME,
    NGUOI_DUNG_LOAD_GAP,
    GET_DETAIL_DICH_VU
} from './kham.type';


export const connectSignalR = () => {
    return dispatch => {
        const connection = signalr.hubConnection('http://sputnich.com/SignalR');
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
                dispatch(khaiBaoUserName());
        }).fail(() => {
            dispatch({
                type: GET_CONNECTION_SIGNALR.FAILURE,
                payload: '',
            });
            dispatch(connectSignalR());
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
            dispatch(connectSignalR());
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
        // var data = {
        //     idDichVu: '123456789',
        //     tenDichVu: 'Khám chữa bệnh',
        //     giaTien: '1000000',
        //     bacSiId: '123556568',
        //     hoVaTen: 'Phúc Đỗ',
        //     avatar: 'https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg',
        //     gioiThieuNhanh: 'Khám chữa bệnh'
        // }
        // dispatch({
        //     type: STORE_BAC_SI_INFO.SUCCESS,
        //     payload: data,
        // });

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

export const khaiBaoUserName = () => {
    return ( dispatch, getState) => {
        const proxy = getState().kham.proxy;
        const username = getState().user.user.Phone;
       
        proxy.invoke('nguoiDungKhaiBaoUserName', username).done((directResponse) => {
            console.log('khai bao username thanh cong', 'userId = ' +directResponse);
            dispatch({
                type: KHAI_BAO_USERNAME,
                payload: directResponse,
            });
        }).fail(() => {
            console.warn('khai bao username  fail');
            dispatch(khaiBaoUserName());
        });
    }
}

export const nguoidungLoadGap = (idGap, idChuyenKhoa) => {
    return ( dispatch, getState) => {
        const proxy = getState().kham.proxy;        
        if (idGap) {
            proxy.invoke('nguoidungLoadGap', "ChuyenKhoa",idGap,idChuyenKhoa).done((directResponse) => {
                console.log('nguoidungLoadGap', 'idGap = ' +directResponse);
                dispatch({
                    type: NGUOI_DUNG_LOAD_GAP,
                    payload: directResponse,
                });
            }).fail(() => {
                console.warn('nguoidungLoadGap fail');
            });
        } else {
            proxy.invoke('nguoidungLoadGap', "ChuyenKhoa",'',idChuyenKhoa).done((directResponse) => {
                console.log('nguoidungLoadGap', 'idGap = ' +directResponse);
                dispatch({
                    type: NGUOI_DUNG_LOAD_GAP,
                    payload: directResponse,
                });
            }).fail(() => {
                console.warn('nguoidungLoadGap fail');
            });
        }
    }
}

export const timBacSiTheoChuyenKhoa = (idGap, idHoSo, an, vanDe, name, birth, gender) => {
    return (dispatch,getState ) => {
        dispatch({ type: GET_DETAIL_DICH_VU.PENDING})
        const proxy = getState().kham.proxy;                
        proxy.invoke('nguoidungTimBacSiTheoChuyenKhoa', idGap, idHoSo, an, vanDe, name, birth, gender).done((directResponse) => {
            console.log('nguoidungTimBacSiTheoChuyenKhoa success',directResponse);
            khamApi.getDetailDichVu(directResponse).then((res) => {
                if(res.ChiTietDichVu) {
                    dispatch({
                        type: GET_DETAIL_DICH_VU.SUCCESS,
                        payload: res.ChiTietDichVu
                    })
                    console.log(res.ChiTietDichVu)
                }else {
                    dispatch({ type: GET_DETAIL_DICH_VU.FAILURE})
                }
            })
        }).fail(() => {
            ToastAndroid.show('Tìm bác sĩ không thành công', ToastAndroid.SHORT);
            dispatch({ type: GET_DETAIL_DICH_VU.FAILURE})            
        });

    }
}

export const chonBacSi = (navigation) => {
    return (dispatch,getState ) => {
        const idGap = getState().kham.idGap;
        const idDichVu = getState().kham.dichVuDetail.IdDichVu;
        const proxy = getState().kham.proxy;                    
        proxy.invoke('nguoidungChonBacSi', idGap, idDichVu).done((directResponse) => {
            if(directResponse === 'OK'){
                navigation.navigate('Chat');
            }else {
                ToastAndroid.show('Bác sĩ không đồng ý gặp', ToastAndroid.SHORT);           
            }
        }).fail(() => {
            ToastAndroid.show('Có lỗi xảy ra vui lòng thử lại', ToastAndroid.SHORT);           
        });
    }
}