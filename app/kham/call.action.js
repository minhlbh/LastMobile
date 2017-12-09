import TwilioVoice from 'react-native-twilio-programmable-voice';
import { AsyncStorage } from 'react-native';

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