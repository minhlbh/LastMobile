import TwilioVoice from 'react-native-twilio-programmable-voice';
import { AsyncStorage } from 'react-native';
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
export const connectCall  = (idNguoiNhan, navigation) => {
    return ( dispatch, getState) => {
        const proxy = getState().kham.proxy;
        dispatch({type: CALL.PENDING});
        navigation.navigate('Call', {
            data :{
                call_from: 'Sputnich'
            },
            isComingCall: false
        })
        proxy.invoke('yeucauGoi', idNguoiNhan).done((directResponse) => {
            var res = JSON.parse(directResponse);
            console.log(res)
            if(res.ChoPhep == true){
                TwilioVoice.connect({To: '0911416817'});
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
            dispatch({ 
                type: CAll.FAILURE,
                liDoTuChoiCall: 'Gọi cho bác sĩ không thành công, vui lòng thử lại'
            })            
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
            dispatch({ 
                type: CAll.FAILURE,
                liDoTuChoiCall: 'Gọi cho bác sĩ không thành công, vui lòng thử lại'
            })            
        });
    }
}