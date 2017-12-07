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
    createFastProfile(name, birth, gender,token, avatar){
        var url = `${apiUrl.taoMoiNhanhHoSo}?HoVaTen=${name}&NamSinh=${birth}&GioiTinh=${gender}&Avatar=${avatar}`;
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
    getProfiles(token) {
        var url = `${apiUrl.user_DsHoSo}`;
        return fetch(url, {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `bearer ${token}`
            }
        }).then((response) => response.json())
    },
    getCodeVerify(phone, isRegister){
        var url = `${apiUrl.getCodeVerify}?phone=${phone}&register=${isRegister}`;
        return fetch(url).then(res => {
            
            if(res.status !== 200){
                console.log(JSON.parse(res._bodyText).Message)
                let error = new Error(JSON.parse(res._bodyText).Message);
                    //error.message = JSON.parse(res._bodyText).Message;
                throw error;
            } else {
                return res.json()
            }
        });
    },
    verifycode(phone, code){
        let details = {
            code: code,
            phone: phone,
        };
        var url = `${apiUrl.verifyCode}`;
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: postFormBody(details),
        }).then(res => {
            if(res.status !== 200){
                console.log(JSON.parse(res._bodyText).Message)
                let error = new Error(JSON.parse(res._bodyText).Message);
                throw error;
            } else {
                return res.json()
            }
        });
    },
    register(phone,HoVaTen,code,password,avatar_url,facebook_token,Id){
        let details = {
            phone: phone, 
            HoVaTen: HoVaTen,
            code: code,
            password: password,
            avatar_url: avatar_url,
            facebook_token: facebook_token ,
            Id: Id 
        };
        var url = `${apiUrl.register}`;
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: postFormBody(details),
        }).then(res => {
            if(res.status !== 200){
                console.log(JSON.parse(res._bodyText).Message)
                console.log(res)                
                let error = new Error(JSON.parse(res._bodyText).Message);
                throw error;
            } else {
                return res.json()
            }
        }); 
    },
    forgotPass(phone,code,password,avatar_url,Id){
        let details = {
            phone: phone, 
            code: code,
            password: password,
            avatar_url: avatar_url,
            Id: Id 
        };
        var url = `${apiUrl.forgotUpdate}`;
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: postFormBody(details),
        }).then(res => {
            if(res.status !== 200){
                console.log(JSON.parse(res._bodyText).Message)
                console.log(res)                
                let error = new Error(JSON.parse(res._bodyText).Message);
                throw error;
            } else {
                return res.json()
            }
        }); 
    },
    getUserByPhone(phone){
        var url = `${apiUrl.uInfo}?phone=${phone}`;
        return fetch(url).then(res => {
            
            if(res.status !== 200){
                console.log(JSON.parse(res._bodyText).Message)
                let error = new Error(JSON.parse(res._bodyText).Message);
                    //error.message = JSON.parse(res._bodyText).Message;
                throw error;
            } else {
                return res.json()
            }
        });
    },
    loginFb(id,email,token){
        let details = {
           id: id,
           email: email,
           token: token
        };
        var url = `${apiUrl.fblogin}`;
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: postFormBody(details),
        }).then(res => {
            if(res.status !== 200){
                console.log(JSON.parse(res._bodyText).Message)
                console.log(res)                
                let error = new Error(JSON.parse(res._bodyText).Message);
                throw error;
            } else {
                return res.json()
            }
        }); 
    },
    profileDetail(token,id){
        var url = `${apiUrl.user_Hoso_detail}${id}`;
        return fetch(url,{
            method: 'GET',
            headers:{
                'Authorization': `bearer ${token}` 
            }
        }).then(res => {
            
            if(res.status !== 200){
                console.log(JSON.parse(res._bodyText).Message)
                let error = new Error(JSON.parse(res._bodyText).Message);
                    //error.message = JSON.parse(res._bodyText).Message;
                throw error;
            } else {
                return res.json()
            }
        });
    },
    editProfile(token,id, name, birth, gender, relationship, address, tinhThanh, email, phone, latLng){
        let details = {
            Id: id,
            HoVaTen: name,
            NgaySinh: birth,
            GioiTinh: gender,
            QuanHe: relationship,
            TinhThanh: tinhThanh,
            Email: email,
            Phone: phone,
            DiaChi: address,
            LatLng: latLng
         };
         var url = `${apiUrl.user_HoSo_Edit}`;
         return fetch(url, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/x-www-form-urlencoded',
                 'Authorization': `bearer ${token}`
             },
             body: postFormBody(details),
         }).then(res => {
             if(res.status !== 200){
                 console.log(JSON.parse(res._bodyText).Message)
                 console.log(res)                
                 let error = new Error(JSON.parse(res._bodyText).Message);
                 throw error;
             } else {
                 return res.json()
             }
         }); 
    },
    getListTuVan(token) {
        var url = apiUrl.User_DsCuocGap;
        return fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `bearer ${token}`,
            },
        })
            .then((response) => response.json())
    },
    getEventMonth(month, token){
        var url = apiUrl.event_user_month + month;
        return fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `bearer ${token}`,
            },
        })
            .then((response) => response.json())
    }
};


export default accountApi;