import { AsyncStorage, ToastAndroid } from 'react-native';
import accountApi from '../api/accountApi';
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';
import TwilioVoice from 'react-native-twilio-programmable-voice';

import {
    LOGIN,
    LOGOUT,
    REGISTER,
    VERIFY_PHONE,
    ACTION_TYPE,
    VERIFY_CODE,
    REGISTER_FB
} from './auth.type';
import khamApi from '../api/khamApi';

export const auth = (user, pass, navigation) => {
    return async dispatch => {
        if (user.length < 9 && pass.length < 6) {
            dispatch({
                type: LOGIN.FAILURE,
                payload: 'Số điện thoại hoặc mặt khẩu k đúng định dạng',
            });
            ToastAndroid.show('Số điện thoại hoặc mặt khẩu k đúng định dạng', ToastAndroid.SHORT);
            return
        }
        dispatch({ type: LOGIN.PENDING });
        accountApi.getToken(user, pass)
            .then(data => {
                if (data.access_token) {
                    dispatch({
                        type: LOGIN.SUCCESS,
                        payload: data.access_token,
                    });
                    AsyncStorage.setItem('access_token', data.access_token);
                    khamApi.getTokenCallById(user).then(async res => {
                        AsyncStorage.setItem('call_token', res);
                        try {
                            const success = await TwilioVoice.initWithToken(res);
                            console.log(success)
                        } catch (err) {
                            console.err(err)
                        }
                    })
                    navigation.navigate('Tabs');
                } else {
                    dispatch({
                        type: LOGIN.FAILURE,
                        payload: "Số điện thoại hoặc mật khẩu sai!",
                    });
                    ToastAndroid.show("Số điện thoại hoặc mật khẩu sai!", ToastAndroid.SHORT);
                }
            })
            .catch(error => {
                dispatch({
                    type: LOGIN.FAILURE,
                    payload: error,
                });
            });
    };
};

export const authWithFb = (navigation) => {
    return dispatch => {
        dispatch({ type: LOGIN.PENDING });
        LoginManager.logInWithReadPermissions(['email']).then(
            function (result) {
                if (result.isCancelled) {
                    alert('Đăng nhập được huỷ');
                } else {
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            fetch(`https://graph.facebook.com/me?fields=email&&access_token=${data.accessToken.toString()}`)
                                .then((response) => response.json())
                                .then((res) => {
                                    console.log('facebook', data.userID, res.email, data.accessToken.toString());
                                    accountApi.loginFb(data.userID, res.email, data.accessToken.toString()).then(response => {
                                        if (response.access_token) {
                                            dispatch({
                                                type: LOGIN.SUCCESS,
                                                payload: response.access_token,
                                            });
                                            AsyncStorage.setItem('access_token', response.access_token);
                                            ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT);
                                            navigation.navigate('Tabs');
                                        }
                                    }).catch(error => {
                                        if (error.message == 'dangky') {
                                            dispatch({
                                                type: REGISTER_FB,
                                                payload: data.accessToken.toString(),
                                            });
                                            ToastAndroid.show('Bạn cần đăng kí số điện thoại', ToastAndroid.SHORT);
                                            navigation.navigate('VerifyPhone');
                                        }
                                        dispatch({
                                            type: LOGIN.FAILURE,
                                            payload: error,
                                        });
                                    });
                                })
                        }
                    )
                }
            },
            function (error) {
                ToastAndroid.show('Đăng nhập xảy ra lỗi: ' + error, ToastAndroid.SHORT);
            },
        )
    };
};

export const authByAsyncStorage = (token) => {
    return dispatch => {
        dispatch({
            type: LOGIN.SUCCESS,
            payload: token,
        });
    };
}

export const storeToken = (token) => {
    return dispatch => {
        AsyncStorage.setItem('access_token', token);
        dispatch({
            type: LOGIN.SUCCESS,
            payload: token,
        });
    };
}

export const signOut = () => {
    return dispatch => {
        dispatch({ type: LOGOUT.PENDING });

        return AsyncStorage.clear()
            .then(() => {
                dispatch({
                    type: LOGOUT.SUCCESS,
                });
            })
            .catch(error => {
                dispatch({
                    type: LOGOUT.ERROR,
                    payload: error,
                });
            });
    };
};

export const vefifyPhone = (phone, navigation) => {
    return (dispatch, getState) => {
        if (phone.length <= 9) {
            ToastAndroid.show('Số điện thoại không đúng định dạng', ToastAndroid.SHORT);
            return
        }
        dispatch({ type: VERIFY_PHONE.PENDING });
        accountApi.getCodeVerify(phone, getState().auth.isRegister).then(res => {
            console.log(res);
            if (res.err) {
                dispatch({
                    type: VERIFY_PHONE.FAILURE,
                });
                ToastAndroid.show(res.mess, ToastAndroid.SHORT);
            } else {
                dispatch({
                    type: VERIFY_PHONE.SUCCESS,
                    payload: phone,
                    mess: res.mess
                });
                navigation.navigate('ConfirmCode')
            }
        }).catch(error => {
            dispatch({
                type: VERIFY_PHONE.FAILURE,
            });
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
        });
    }
}

export const actionTypeIsRegister = (isRegister) => {
    return dispatch => {
        dispatch({
            type: ACTION_TYPE,
            payload: isRegister
        });
    }
}

export const verifyCode = (code, navigation) => {
    return (dispatch, getState) => {
        if (code.length !== 6) {
            ToastAndroid.show('Mã xác thực phải đủ 6 kí tự', ToastAndroid.SHORT);
            return
        }
        dispatch({ type: VERIFY_CODE.PENDING });
        accountApi.verifycode(getState().auth.phone, code).then(res => {
            console.log(res);
            if (res.err) {
                dispatch({
                    type: VERIFY_CODE.FAILURE,
                });
                ToastAndroid.show(res.mess, ToastAndroid.SHORT);
            } else {
                dispatch({
                    type: VERIFY_CODE.SUCCESS,
                    payload: code
                });
                navigation.navigate('CreateAccount', { code: code });
            }
        }).catch(error => {
            dispatch({
                type: VERIFY_CODE.FAILURE,
            });
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
        });
    }
}