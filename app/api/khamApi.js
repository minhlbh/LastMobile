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
            method: 'POST',
        }).then((response) => response.json())
    }
}

export default khamApi;