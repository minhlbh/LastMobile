const domain = 'https://api.sputnich.com/';

var apiUrl = {
    account: {
        login: `${domain}token`,
        signUp: `${domain}api/Account/Register`,
        confirmPhone: `${domain}api/Account/XacNhanPhone`,
        forgotPassword: `${domain}api/Account/ForgotPassword`,
        checkFacebookLogin: `${domain}api/Account/CheckFacebookLogin`,
        socialRegister: `${domain}api/Account/SocialRegister`,
        userInfo:`${domain}api/Account/UserInfo`,
        taoMoiNhanhHoSo: `${domain}api/BADT/HoSoSucKhoe_Create_Fast`,
        history: `${domain}api/BADT/Gap_List`,
        user_DsHoSo: `${domain}api/CSDLYT/User_DsHoSo`,
        getCodeVerify: `${domain}api/Account/GetCodeVerify`,
        verifyCode: `${domain}api/Account/PhoneVerify`,
        register: `${domain}api/Account/dangky`,
        forgotUpdate: `${domain}api/Account/forgotupdate`,
        uInfo: `${domain}api/Account/uInfo`,
        fblogin: `${domain}api/Account/fblogin`,
        user_Hoso_detail: `${domain}api/CSDLYT/User_HoSo_Detail?Id=`,
        user_HoSo_Edit: `${domain}api/CSDLYT/User_HoSo_Edit`,
        User_DsCuocGap: `${domain}api/CSDLYT/User_DsCuocGap`
    },
    home: {
        listDichVu :`${domain}api/CSDLYT/DichVu_List`,
    },
    kham: {
        uploadImg: `${domain}api/DD/UploadImg`,
        listChuyenKhoa: `${domain}api/CSDLYT/tenchuyenkhoa_list`,
        deleteImage: `${domain}api/DD/DeleteImg`,
        lichSuChat: `${domain}api/CSDLYT/Gap_LichSuChat?IdGap=`,
        detailDichVu: `${domain}api/CSDLYT/DichVu_Detail?IdDichVu=`,
        getTokenCall: `${domain}call/gettoken?Id=`
    }
}


export default apiUrl;