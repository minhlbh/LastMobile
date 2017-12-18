import TwilioVoice from 'react-native-twilio-programmable-voice';
import { AsyncStorage ,ToastAndroid} from 'react-native';
import {
    CALL
} from './kham.type';

export async function initTelephony() {
    try {
        const accessToken =await AsyncStorage.getItem('call_token');
        const success = await TwilioVoice.initWithToken(accessToken);
        console.log(success)
    } catch (err) {
        console.err(err)
    }
} 

export const initEventCall = (navigation) =>{
    TwilioVoice.getActiveCall()
    .then(incomingCall => {
        if (incomingCall){
            navigation.navigate('Call', {data: incomingCall, isComingCall: true})
        }
    });
    TwilioVoice.addEventListener('deviceDidReceiveIncoming', (data) => {
        navigation.navigate('Call', {data, isComingCall: true})
    });
}
export const connectCall  = (idNguoiNhan,phone, idDichVu, navigation) => {
    return ( dispatch, getState) => {
        console.log(phone)
        const proxy = getState().kham.proxy;
        dispatch({type: CALL.PENDING});
        navigation.navigate('Call', {
            data :{
                call_from: 'Sputnich'
            },
            isComingCall: false
        })
        proxy.invoke('yeucauGoi', idNguoiNhan, idDichVu).done((directResponse) => {
            var res = JSON.parse(directResponse);
            console.log(res)
            if(res.ChoPhep == true){
                TwilioVoice.connect({To: phone });
                dispatch({
                    type: CALL.SUCCESS,
                    soGiayConLaiCall: res.SoGiayConLai,
                    idCuocGoi: res.IdCuocGoi
                })
            } else {
                dispatch({
                    type: CALL.FAILURE,
                    liDoTuChoiCall: res.LiDo
                })
            }
        }).fail(() => {
            ToastAndroid.show('Có lỗi xảy ra vui lòng thử lại', ToastAndroid.SHORT);         
        });
    }
}

export const updateCall = (idCuocGoi, soGiay, isEndCall) => {
    return ( dispatch, getState) => {
        const proxy = getState().kham.proxy;
        proxy.invoke('baocaoGoi', idCuocGoi, soGiay, isEndCall).done((directResponse) => {
            var res = JSON.parse(directResponse);
            console.log(res)
            if(res.ChoPhep == true){
                dispatch({
                    type: CALL.SUCCESS,
                    soGiayConLaiCall: res.SoGiayConLai,
                    idCuocGoi: res.IdCuocGoi
                })
            } else {
                dispatch({
                    type: CALL.FAILURE,
                    liDoTuChoiCall: res.LiDo
                })               
            }
        }).fail(() => {
            ToastAndroid.show('Có lỗi xảy ra vui lòng thử lại', ToastAndroid.SHORT);         
        });
    }
}