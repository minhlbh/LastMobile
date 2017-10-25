import accountApi from '../api/accountApi';
import {ToastAndroid} from 'react-native';
import {getProfiles} from '../user/user.action';

import {
    CREATE_FAST_PROFILE
} from './profile.type';

export const createFastProfile = (name, birth,gender,avatar, navigation) => {
    return ( dispatch, getState) => {
    const accessToken = getState().auth.accessToken;
      dispatch({ type: CREATE_FAST_PROFILE.PENDING });
      accountApi.createFastProfile(name,birth,gender,accessToken,avatar)
        .then(data => {
            if(data.IdHoSo){
                dispatch({
                    type: CREATE_FAST_PROFILE.SUCCESS,
                });
                dispatch(getProfiles());
                ToastAndroid.show('Tạo hồ hơ nhanh thành công', ToastAndroid.SHORT);
                navigation.goBack();
            } else {
                dispatch({
                    type: LOGIN.FAILURE,
                    payload: "Tạo hồ sơ k thành công",
                });
            }
        })
        .catch(error => {
          dispatch({
            type: CREATE_FAST_PROFILE.FAILURE,
            payload: error,
          });
        });
    };
};
