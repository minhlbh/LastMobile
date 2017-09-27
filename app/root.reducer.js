import { combineReducers } from 'redux';
import { authReducer } from './auth/auth.reducer';
import { userReducer} from './user/user.reducer';
import { khamReducer} from './kham/kham.reducer';
import { profileReducer} from './profiles/profile.reducer';


export const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    kham: khamReducer,
    profile: profileReducer
});
