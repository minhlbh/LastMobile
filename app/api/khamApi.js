import api from '../config/api';
import postFormBody from './postFormBody';
import RNFetchBlob from 'react-native-fetch-blob';
var apiUrl = api.kham;

var khamApi = {
    uploadImg(source) {
        return RNFetchBlob.fetch('POST', apiUrl.uploadImg, {
            //Authorization: "Bearer access-token",
            //otherHeader: "foo",
            // this is required, otherwise it won't be process as a multipart/form-data request
            'Content-Type': 'multipart/form-data',
        }, [
            // append field data from file path
            {
                name: 'file',
                filename: 'avatar.png',
                // Change BASE64 encoded data to a file path with prefix `RNFetchBlob-file://`.
                // Or simply wrap the file path with RNFetchBlob.wrap().
                data: RNFetchBlob.wrap(source.path)
            },
        ]).then((response) => response.json())
    },
    getListChuyenKhoa(){
        var url = `${apiUrl.listChuyenKhoa}`;
        return fetch(url,{
            method: 'GET',
        }).then((response) => response.json())
    },
    deleteImage(location){
        let details = {
            location: location
        };
        var url = apiUrl.deleteImage;
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: postFormBody(details),
        })
            .then((response) => response.json())
    },
    listChatMes(idGap, accessToken){
        var url = `${apiUrl.lichSuChat}${idGap}`;
        return fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `bearer ${accessToken}`,
            },
        })
            .then((response) => response.json())
    }, 
    getDetailDichVu(id){
        var url = `${apiUrl.detailDichVu}${id}`; 
        return fetch(url,{
            method: 'GET',
        }).then((response) => response.json())
    },
    getTokenCallById(id){
        var url = `${apiUrl.getTokenCall}${id}`;
        return fetch(url, {
            method: 'GET',            
        }).then((response) => response._bodyText)
    }
}

export default khamApi;