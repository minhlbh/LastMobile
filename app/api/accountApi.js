import api from '../config/api';
import { AsyncStorage } from "react-native";
import postFormBody from './postFormBody';
var apiUrl = api.account;

var accountApi = {
    getToken(user, pass) {
        let details = {
            grant_type: 'password',
            username: user,
            password: pass
        };
        var url = apiUrl.login;
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: postFormBody(details),
        })
            .then((response) => response.json())
    },
    signUp(name, email, phone, pass, confirmPass) {
        let details = {
            HoVaTen: name,
            Email: email,
            Phone: phone,
            Password: pass,
            ConfirmPassword: confirmPass
        };

        var url = apiUrl.signUp;
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: postFormBody(details),
        })
            .then((response) => response.json())
    },
    confirmPhone(idU, code, phone) {
        let details = {
            PhoneNumber: phone,
            Code: code,
        };

        var url = `${apiUrl.confirmPhone}?IdU=${idU}`;
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: postFormBody(details),
        })
            .then((response) => response.json())
    },
    forgotPassword(phone) {
        let details = {
            phone: phone,
        };

        var url = apiUrl.forgotPassword;
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: postFormBody(details),
        })
            .then((response) => response.json())
    },
    forgotPassConfirm(idU, phone, pass, code) {
        let details = {
            Code: code,
            PhoneNumber: phone,
            Password: pass,
        };
        var url = `${apiUrl.forgotPassword}?IdU=${idU}`;
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: postFormBody(details),
        })
            .then((response) => response.json())
    },
    checkFacebookLogin(id,email,token){
        let details = {
            id: id,
            email: email,
            token: token,
        };

        var url = `${apiUrl.checkFacebookLogin}`;
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: postFormBody(details),
        })
            .then((response) => response.json())
    },
    socialRegister(id,token,phone,email){
        let details = {
            id: id,
            email: email,
            token: token,
            phone: phone,
        };

        var url = `${apiUrl.socialRegister}`;
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: postFormBody(details),
        })
            .then((response) => response.json())
    },
    getUserInfo(value){
        var url = `${apiUrl.userInfo}`;
        return fetch(url,{
            method: 'GET',
            headers:{
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `bearer ${value}` 
            }
        }).then((response) => response.json()).catch((e) => {
            alert(e)
        })

    },
    createFastProfile(name, birth, gender,token){
        var url = `${apiUrl.taoMoiNhanhHoSo}?HoVaTen=${name}&NamSinh=${birth}&GioiTinh=${gender}`;
        return fetch(url,{
            method: 'POST',
            headers:{
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `bearer ${token}` 
            }
        }).then((response) => response.json()).catch((e) => {
            alert(e)
        })
    },
    listHistory(token){
        var url = `${apiUrl.history}`;
        return fetch(url,{
            method: 'POST',
            headers:{
                'Authorization': `bearer ${token}` 
            }
        }).then((response) => response.json()).catch((e) => {
            alert(e)
        })
    },
    getProfiles(token) {
        var url = `${apiUrl.listHoSoSucKhoe}`;
        return fetch(url, {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `bearer ${token}`
            }
        }).then((response) => response.json())
    },
};


export default accountApi;