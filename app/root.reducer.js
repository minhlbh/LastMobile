import { combineReducers } from 'redux';
import { authReducer } from './auth/auth.reducer';
import { userReducer} from './user/user.reducer';
import { signalrReducer} from './kham/kham.reducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    signalR: signalrReducer,
});
