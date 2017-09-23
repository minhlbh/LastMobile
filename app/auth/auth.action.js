import { AsyncStorage } from 'react-native';
import accountApi from '../api/accountApi';

import {
    LOGIN,
    LOGOUT,
    GET_AUTH_USER,
} from './auth.type';

export const auth = (user, pass) => {
    return dispatch => {
      dispatch({ type: LOGIN.PENDING });
      accountApi.getToken(user, pass)
        .then(data => {
            if(data.access_token){
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

export const authWithFb = (userID, email,accessToken) => {
    return dispatch => {
      dispatch({ type: LOGIN.PENDING });
        accountApi.checkFacebookLogin(userID, email, accessToken.toString()).then(response =>{
            console.log(response);
            if(response == 'Email chưa được dùng đăng kí tài khoản nào!'){
                // this.props.navigation.navigate("InputPhone", {
                //     id: data.userID,
                //     email: res.email,
                //     token: data.accessToken.toString()
                // });
                alert(response)
            }else if (response.access_token){
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
    };
};

export const authByAsyncStorage = () => {
    return dispatch => {
      dispatch({ type: LOGIN.PENDING });
      AsyncStorage.getItem('access_token').then((token) => {
            if(token){
                dispatch({
                    type: LOGIN.SUCCESS,
                    payload: token,
                  });
            } else {
                dispatch({
                    type: LOGIN.FAILURE,
                    payload: '',
                });
            }
        })
    };
};