import React, { Component } from 'react';
import MainRouter from './routers/MainRouter';
import { connect} from 'react-redux';
import * as khamAction from './kham/kham.action';

class AppSetup extends Component {
    constructor(props){
        super(props);  
        // this.props.connectSignalR();
    }
    render(){
        return (
            <MainRouter />
        )
    }
}

export default connect(null,khamAction)(AppSetup);