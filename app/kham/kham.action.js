import { AsyncStorage } from 'react-native';
import signalr from 'react-native-signalr';

import {
    GET_CONNECTION_SIGNALR,
    GET_PROXY_SIGNALR
} from './kham.type';

export const getConnectionSignalR = () => {
    return ( dispatch) => {
        const connection = signalr.hubConnection('http://admincloud.truongkhoa.com/SignalR');
        const proxy = connection.createHubProxy('truongKhoaHub');        
        
        dispatch({ type: GET_CONNECTION_SIGNALR.PENDING });
        connection.start().done(() => {
            console.log('Now connected, connection ID=' + connection.id);
            dispatch({
                type: GET_CONNECTION_SIGNALR.SUCCESS,
                connection: connection,
                proxy: proxy
            });
        }).fail(() => {
            console.log('Failed');
            dispatch({
                type: GET_CONNECTION_SIGNALR.FAILURE,
                payload: 'Failed',
            });
        });

        connection.connectionSlow(() => {
            dispatch({ type: GET_CONNECTION_SIGNALR.PENDING });
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
            dispatch({
                type: GET_CONNECTION_SIGNALR.FAILURE,
                payload: ('SignalR error: ' + errorMessage, detailedError),
            });
            console.debug('SignalR error: ' + errorMessage, detailedError)
        });
    };
};



