import React, { Component } from 'react';
import MainRouter from './routers/MainRouter';
import { connect} from 'react-redux';
import {getConnectionSignalR} from './kham/kham.action';

class AppSetup extends Component {
    constructor(props){
        super(props);
        this.props.getConnectionSignalR();                
    }
    render(){
        return (
            <MainRouter />
        )
    }
}
export default connect(null, {getConnectionSignalR})(AppSetup);