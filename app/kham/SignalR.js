import React, { Component } from 'react';
import signalr from 'react-native-signalr';
//import { Observable} from 'rxjs/Observable'
import {connectedSignalR} from './kham.action';
import { connect} from 'react-redux';

class SignalR extends Component{
    static instance = null;
    connection = null;
    proxy = null;
    isConnected = false;
    isPending = false;
  
    // getIsConnected(){
    //     return isConnectedOb
    // }
    static getInstance (){
        // var isConnectedOb = new Observable()
        
        if(this.instance == null){
            this.instance = new SignalR();
            this.connection = signalr.hubConnection('http://admincloud.truongkhoa.com/SignalR');
            this.proxy = this.connection.createHubProxy('truongKhoaHub');
            // connection.logging = true;
            this.isPending = true;
            this.proxy.on('timBacSiTheoChuyenKhoa_KetQua', () => {});
            this.proxy.on('chat', () => {});
            this.proxy.on('moiBacSi_BacSiTraLoi', () => {});
            this.proxy.on('nguoiDungMobileVaoGap_DaVaoDuoc', (IdGap) => {
                console.log('nguoiDungMobileVaoGap_DaVaoDuoc',IdGap)
            });
            this.proxy.on('loadUserOnline',  () => {});

            // isConnectedOb.create(subscriber => {
            //     return subscriber.next(false)
            // })

            connectedSignalR();
            this.connection.start().done(() => {
                console.log(this.connection.id)
                // isConnectedOb.create(subscriber => {
                //     return subscriber.next(true)
            
             }).fail(() => {
                isConnected = false;
                 console.log('Failed');
              
             })

             //connection-handling
            this.connection.connectionSlow(() => {
                console.log('We are currently experiencing difficulties with the connection.')
            });
  
            this.connection.error((error) => {
                const errorMessage = error.message;
                let detailedError = '';
                if (error.source && error.source._response) {
                detailedError = error.source._response;
                }
                if (detailedError === 'An SSL error has occurred and a secure connection to the server cannot be made.') {
                console.log('When using react-native-signalr on ios with http remember to enable http in App Transport Security https://github.com/olofd/react-native-signalr/issues/14')
                }
                console.debug('SignalR error: ' + errorMessage, detailedError)
            });

            // isConnectedOb =  Observable.fromPromise(this.connection);
        }
        //receives broadcast messages from a hub function, called "helloApp"
       
        // atempt connection, and handle errors
        return this.instance;
    }

}

export default SignalR;