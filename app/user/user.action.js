import { AsyncStorage } from 'react-native';
import accountApi from '../api/accountApi';
import SignalR from '../kham/SignalR';

import {
    GET_AUTH_USER,
    GET_PROFILES
} from './user.type';

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
