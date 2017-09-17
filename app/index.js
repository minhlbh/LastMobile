import React, { Component } from 'react';
import MainRouter from './routers/MainRouter';
import { Provider } from 'react-redux';
import { configureStore } from './root.store';

class App extends Component {
    render(){
        return (
            <Provider store={configureStore}>
                <MainRouter />
            </Provider>
        )
    }
}
export default App;