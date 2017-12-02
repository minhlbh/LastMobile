import { AsyncStorage } from 'react-native';
import accountApi from '../api/accountApi';
import khamApi from '../api/khamApi';
import TwilioVoice from 'react-native-twilio-programmable-voice'

import {
    GET_AUTH_USER,
    GET_PROFILES
} from './user.type';

//  async function initTelephony(username) {
//     try {
//         khamApi.getTokenCallById(username).then((res) => {
//             console.log(res);
            
//             const success = await TwilioVoice.initWithToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJpc3MiOiJTSzBjMDY0ZDRiYTBmMzM0MzdhN2Q1NGE3ZGIzZjc5NmMzIiwiZXhwIjoxNTEyMTkyNjk1LCJqdGkiOiJTSzBjMDY0ZDRiYTBmMzM0MzdhN2Q1NGE3ZGIzZjc5NmMzLTE1MTIxODkwOTUiLCJzdWIiOiJBQzA3MTY0NjZiN2MyNmNkOTZkOTI2MDcwOWZhMzFkMzBhIiwiZ3JhbnRzIjp7ImlkZW50aXR5IjoicGh1YyBkbyIsInZvaWNlIjp7Im91dGdvaW5nIjp7ImFwcGxpY2F0aW9uX3NpZCI6IkFQZDQxMzc1Y2VmN2NjNDgzZWJiZjQ1ZGFiYTI3MDJkYjMifSwicHVzaF9jcmVkZW50aWFsX3NpZCI6IkNSY2MwN2U0ZDM5NGFkNWY2YmEwYjE3YmY4MjBlOGIyNTYifX19.CIWPeRinxLDS0G8GgpgR1cefXUIbM2vjsfsKSSnI1ys') 
//             console.log(success)    
//         })
              
//     } catch (err) {
//         console.err(err)
//     }
    
// }

export const getUserInfo = () => {
    return ( dispatch, getState) => {
        const accessToken = getState().auth.accessToken;
      dispatch({ type: GET_AUTH_USER.PENDING });
      accountApi.getUserInfo(accessToken)
        .then(data => {
            if(data.Email){
                dispatch({
                    type: GET_AUTH_USER.SUCCESS,
                    payload: data,
                });
                //initTelephony(data.HoVaTen).done();
            } else {
                dispatch({
                    type: GET_AUTH_USER.FAILURE,
                    payload: data.Message,
                });
            }
        })
        .catch(error => {
          dispatch({
            type: GET_AUTH_USER.FAILURE,
            payload: error,
          });
        });
    };
};

export const getProfiles = () => {
    return ( dispatch, getState) => {
        const accessToken = getState().auth.accessToken;
        dispatch({ type: GET_PROFILES.PENDING });
      accountApi.getProfiles(accessToken)
        .then(data => {
            if(data.DsHoSo){
                dispatch({
                    type: GET_PROFILES.SUCCESS,
                    payload: data.DsHoSo.reverse(),
                  });
            } else {
                dispatch({
                    type: GET_PROFILES.FAILURE,
                    payload: data.Message,
                });
            }
        })
        .catch(error => {
          dispatch({
            type: GET_PROFILES.FAILURE,
            payload: error,
          });
        });
    };
};
