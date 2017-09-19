import { combineReducers } from 'redux';
import { authReducer } from './auth/auth.reducer';
import { userReducer} from './user/user.reducer';
import { khamReducer} from './kham/kham.reducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    kham: khamReducer,
});
