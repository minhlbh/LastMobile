import { AsyncStorage } from 'react-native';
import signalr from 'react-native-signalr';

import {
    GET_CONNECTION_SIGNALR,
    GET_PROXY_SIGNALR
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