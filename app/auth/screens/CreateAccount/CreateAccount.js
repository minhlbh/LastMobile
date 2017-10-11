import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image,ToastAndroid
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    FormInput, Button, Divider, Icon, FormLabel,Avatar
} from 'react-native-elements';
import styles from './styles'
import images from '../../../config/images';
var ImagePicker = require('react-native-image-picker');
import accountApi from '../../../api/accountApi';
import { connect } from 'react-redux';
import {ButtonAuth} from '../../../components'
import * as authAction from '../../auth.action';
import khamApi from '../../../api/khamApi';

var options = {
    title: 'Chọn ảnh đại diện',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

class CreateAccount extends Component {
    constructor(props){
        super(props);
        this.state ={
            avatar: null,
            name: null,
            pass: null,
            isPending: false,
            id: ''
        };

        if(!this.props.isRegister){
            accountApi.getUserByPhone(this.props.phone).then(res => {
                this.setState({
                    avatar: res.Avatar,
                    id: res.Id
                })
            })
        }       
    }

    pickImage() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                khamApi.uploadImg(response).then((res) => {
                    console.log(res);
                    //chỉ lấy tên ảnh
                    var imageUri = res.location.replace('https://sharinglife.blob.core.windows.net/images/', '');

                    //var avatar = { uri: response.uri, location: res.location }
                    this.setState({ avatar: res.location });
                })
            }
        });
    }

    createAccount(){
        const {avatar, name, pass} = this.state;
        const {state} = this.props.navigation;
        const {phone,code,fbToken } = this.props;

        console.log(code);
        this.setState({isPending: true});
        if(name.length <1 ){
            ToastAndroid.show('Bạn chưa nhập họ và tên', ToastAndroid.SHORT); 
            return
        }
        if(pass.length <6 ){
            ToastAndroid.show('Mật khẩu cần lớn hơn 6 kí tự ', ToastAndroid.SHORT); 
            return
        }
        accountApi.register(this.props.phone, name,state.params.code,pass, avatar, fbToken, null).then(res => {
            console.log(res)
            if(res.err){
                ToastAndroid.show(res.mess, ToastAndroid.SHORT); 
            }else {
                ToastAndroid.show(res.mess, ToastAndroid.SHORT); 
                this.props.storeToken(res.data.access_token)
                this.props.navigation.navigate('Tabs')
            }
            this.setState({isPedding: false})            
        }).catch(error => {
            console.log(error)
            ToastAndroid.show(error.message, ToastAndroid.SHORT); 
            this.setState({isPedding: false})            
        });    
    }

    forgotPass(isSkip){
        const {avatar, name, pass, id} = this.state;
        const {state} = this.props.navigation;
        const {phone,code } = this.props;

        if(isSkip) {
            this.setState({name: null, pass: null})
        }
        console.log(code);
        this.setState({isPending: true});
        if(!isSkip){
            if(name.length <1 ){
                ToastAndroid.show('Mật khẩu cần lớn hơn 6 kí tự', ToastAndroid.SHORT); 
                return
            }
            if(pass !== name ){
                ToastAndroid.show('Xác nhận mật khẩu không trùng ', ToastAndroid.SHORT); 
                return
            }
        }
        console.log(phone, code,pass,avatar,id);
        accountApi.forgotPass(phone, code,pass,avatar,id).then(res => {
            console.log(res)
            if(res.err){
                ToastAndroid.show(res.mess, ToastAndroid.SHORT); 
            }else {
                ToastAndroid.show(res.mess, ToastAndroid.SHORT); 
                this.props.storeToken(res.data.access_token)
                this.props.navigation.navigate('Tabs')
            }
            this.setState({isPedding: false})            
        }).catch(error => {
            console.log(error)
            ToastAndroid.show(error.message, ToastAndroid.SHORT); 
            this.setState({isPedding: false})            
        });    
    }

    render() {
        const {avatar, isPending} = this.state;
        const {isRegister} = this.props;
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <LinearGradient
                    colors={['#7B1FA2', '#00779A', '#10A7BF']}
                    style={[styles.gradient, { justifyContent: 'center', }]} >
                    <View style={{ alignItems: 'center' }}> 
                        <TouchableOpacity
                            onPress={()=> this.pickImage()}
                        >
                            <Image
                                source={!avatar ? images.addAvatar :{ uri: avatar}}
                                style={{ width: 100, height: 100, marginBottom: 20, borderRadius: avatar ? 50 : 0  }}
                                
                            />
                        </TouchableOpacity>
                        <Text style={[styles.text, { marginBottom: 15 }]}>{isRegister? 'Tạo tài khoản' :'Tạo mật khẩu mới'}</Text>
                        <FormInput
                            placeholder={isRegister?'Họ và tên': 'Mật khẩu mới'}
                            placeholderTextColor='rgba(255,255,255,0.5)'
                            containerStyle={styles.formInput}
                            underlineColorAndroid= 'transparent'
                            inputStyle={{ color: 'white' }}
                            onChangeText={(name) => this.setState({name})}
                            secureTextEntry={isRegister ? false : true}                                                        
                        />
                        <FormInput
                            placeholder={isRegister?'Mật khẩu': 'Nhập lại mật khẩu'}
                            placeholderTextColor='rgba(255,255,255,0.5)'
                            containerStyle={styles.formInput}
                            underlineColorAndroid= 'transparent'
                            inputStyle={{ color: 'white'}}
                            onChangeText={(pass) => this.setState({pass})}
                            secureTextEntry={true}                            
                        />
                        {isRegister ? 
                        <ButtonAuth title='Tạo tài khoản' onPress={() => this.createAccount()} isPendin={isPending}/> : 
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                onPress={() => this.forgotPass(false)}
                            >
                                <View style={styles.buttonView}>
                                    <Text style={{ fontSize: 17, color: 'white' }}>Cập nhật</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ marginLeft: 10 }}
                                onPress={() => this.forgotPass(true)}
                            >
                                <View style={styles.buttonView}>
                                    <Text style={{ fontSize: 17, color: 'white' }}>Bỏ qua</Text>
                                </View>
                            </TouchableOpacity>

                        </View>}

                    </View>
                </LinearGradient>
            </View>

        );
    }
}
function mapStateToProps(state) {
    return {
        phone: state.auth.phone,
        isRegister: state.auth.isRegister,
        code: state.auth.code,
        fbToken: state.auth.fbToken        
    }
}
export default connect(mapStateToProps,authAction)(CreateAccount);