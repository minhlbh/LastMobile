import { AsyncStorage } from 'react-native';
import accountApi from '../api/accountApi';
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';


import {
    LOGIN,
    LOGOUT,
    REGISTER,
} from './auth.type';

export const auth = (user, pass) => {
    return dispatch => {
        dispatch({ type: LOGIN.PENDING });
        accountApi.getToken(user, pass)
            .then(data => {
                if (data.access_token) {
                    dispatch({
                        type: LOGIN.SUCCESS,
                        payload: data.access_token,
                    });
                    AsyncStorage.setItem('access_token', data.access_token);
                    //this.props.navigation.navigate('Tabs');   
                } else {
                    dispatch({
                        type: LOGIN.FAILURE,
                        payload: "Số điện thoại hoặc mật khẩu sai!",
                    });
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

export const authWithFb = () => {
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
                                    accountApi.checkFacebookLogin(data.userID, res.email, data.accessToken.toString()).then(response => {
                                        console.log(response);
                                        if (response == 'Email chưa được dùng đăng kí tài khoản nào!') {
                                            // this.props.navigation.navigate("InputPhone", {
                                            //     id: data.userID,
                                            //     email: res.email,
                                            //     token: data.accessToken.toString()
                                            // });
                                            alert(response)
                                        } else if (response.access_token) {
                                            dispatch({
                                                type: LOGIN.SUCCESS,
                                                payload: response.access_token,
                                            });
                                            AsyncStorage.setItem('access_token', response.access_token);
                                        } else {
                                            dispatch({
                                                type: LOGIN.FAILURE,
                                                payload: response,
                                            });
                                        };
                                    }).catch(error => {
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
                alert('Đăng nhập xảy ra lỗi: ' + error);
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

export const register = (name, phone, email, pass) => {
    return dispatch => {
        dispatch({ type: REGISTER.PENDING });
        if (!name) {
            dispatch({
                type: REGISTER.FAILURE,
                payload: "Chưa nhập họ và tên",
            });
        } else if (!phone) {
            dispatch({
                type: REGISTER.FAILURE,
                payload: "Chưa nhập số điện thoại",
            });
        } else if (!pass) {
            dispatch({
                type: REGISTER.FAILURE,
                payload: "Chưa nhập mật khẩu",
            });
        } else {
            accountApi.signUp(name, email, phone, pass).then(data => {
                console.log(data);
                if (data.Id) {
                    console.log(data);
                    console.log(data);
                    dispatch({
                        type: REGISTER.SUCCESS,
                        payload: data.Id
                    });
                } else {
                    dispatch({
                        type: REGISTER.FAILURE,
                        payload: data,
                    });
                }
            })
                .catch(error => {
                    dispatch({
                        type: REGISTER.FAILURE,
                        payload: '',
                    });
                });
        }

    };
};

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