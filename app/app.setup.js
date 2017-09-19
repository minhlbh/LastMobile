import React, { Component } from 'react';
import MainRouter from './routers/MainRouter';
import { connect} from 'react-redux';
import SignalR from './kham/SignalR';
//import * as signalrAction from './kham.action';

class AppSetup extends Component {
    constructor(props){
        super(props);  
        SignalR.getInstance();  
            
    }
    render(){
        return (
            <MainRouter />
        )
    }
}
export default connect()(AppSetup);