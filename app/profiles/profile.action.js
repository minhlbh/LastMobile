import accountApi from '../api/accountApi';


import {
    CREATE_FAST_PROFILE
} from './profile.type';

export const createFastProfile = (name, birth,gender,avatar) => {
    return ( dispatch, getState) => {
    const accessToken = getState().auth.accessToken;
      dispatch({ type: CREATE_FAST_PROFILE.PENDING });
      accountApi.createFastProfile(name,birth,gender,accessToken,avatar)
        .then(data => {
            if(data.IdHoSo){
                dispatch({
                    type: CREATE_FAST_PROFILE.SUCCESS,
                });
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
