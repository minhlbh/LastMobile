import React, { Component } from 'react';
import signalr from 'react-native-signalr';

 class SignalR{
    static instance = null;
     connection = null;
     proxy = null;
    isConnected = false;
    static getInstance (props){
        if(this.instance == null){
            this.instance = new SignalR();
            this.connection = signalr.hubConnection('http://admincloud.truongkhoa.com/SignalR');
            this.proxy = this.connection.createHubProxy('truongKhoaHub');
            // connection.logging = true;

            this.proxy.on('timBacSi_KetQua', () => {});
            this.proxy.on('moiBacSi_BacSiTraLoi', () => {});
            this.proxy.on('nguoiDungVaoDichVu_CapSoIdPhong',  () => {});

            this.connection.start().done(() => {
                console.log(this.connection.id);
                this.connected = true;
             }).fail(() => {
                 console.log('Failed');
             });

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
        }
        //receives broadcast messages from a hub function, called "helloApp"
       
        // atempt connection, and handle errors
        return this.instance;
    }

}

export default SignalR;