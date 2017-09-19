import React, { Component } from 'react';
import MainRouter from './routers/MainRouter';
import { Provider } from 'react-redux';
import { configureStore } from './root.store';
import AppSetup from './app.setup';

class App extends Component {
    render(){
        return (
            <Provider store={configureStore}>
                <AppSetup />
            </Provider>
        )
    }
}
export default App;