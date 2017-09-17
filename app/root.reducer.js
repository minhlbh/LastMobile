import { combineReducers } from 'redux';
import { authReducer } from './auth/auth.reducer';
import { userReducer} from './user/user.reducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer
});
