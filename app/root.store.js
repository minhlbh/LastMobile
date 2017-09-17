import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { rootReducer } from './root.reducer';

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

export const configureStore = store;
