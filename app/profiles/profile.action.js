import accountApi from '../api/accountApi';
import {ToastAndroid} from 'react-native';
import {getProfiles} from '../user/user.action';

import {
    CREATE_FAST_PROFILE,
    GET_PROFILE_DETAIL,
    EDIT_PROFILE
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


export const getProfileDetail = (id) => {
    return ( dispatch, getState) => {
        const accessToken = getState().auth.accessToken;
        dispatch({ type: GET_PROFILE_DETAIL.PENDING });
        accountApi.profileDetail(accessToken, id).then((res) => {
            if(res.HoSo){
                dispatch({
                    type: GET_PROFILE_DETAIL.SUCCESS,
                    payload: res.HoSo
                });
            }
        }).catch(error => {
            dispatch({
              type: GET_PROFILE_DETAIL.FAILURE,
              payload: error.Message,
            });
        });
    }
}

export const editProfile = (name, birth, gender, relationship, address, tinhThanh, email, phone, latLng) => {
    return( dispatch, getState) => {
        console.log(birth)
        var profileInfo = getState().profile.profileInfo;
        profileInfo.HoVaTen = name;
        profileInfo.NgaySinh = birth;
        profileInfo.GioiTinh = gender;
        profileInfo.QuanHe = relationship;
        profileInfo.DiaChi = address;
        profileInfo.TinhThanh = tinhThanh;
        profileInfo.Email = email;
        profileInfo.Phone = phone;
        profileInfo.LatLng = latLng;

        dispatch({
            type: EDIT_PROFILE,
            payload: profileInfo,
        });

        const accessToken = getState().auth.accessToken;
        accountApi.editProfile(accessToken,profileInfo.Id, name, 
            Date.parse(birth),gender,relationship,address,tinhThanh,email,phone,latLng);
    }
}