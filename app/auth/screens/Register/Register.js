import React, { Component } from 'react';
import {
    View, Text, Image, TouchableOpacity
} from 'react-native';
import {
    FormLabel, FormInput, Button, SocialIcon
} from 'react-native-elements';
import styles from './styles';
import images from '../../../config/images';
import FBSDK, { LoginManager , AccessToken, LoginButton} from 'react-native-fbsdk';
import * as authAction from '../../auth.action';
import { connect} from 'react-redux';
import { Loading, ErrorText,InputCode } from '../../../components';
import accountApi from '../../../api/accountApi';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            phone: '',
            email: '',
            pass: '',
            code: '',
            errorConfirmCode: null,
        }
    }
    _loginFacebook() {   
        this.props.authWithFb(); 
    }

    componentDidUpdate() {
        if (this.props.isAuthenticated) {
            this.props.navigation.navigate('Tabs');
        }
    }
    register(){
        const {name,phone,email,pass} = this.state;
        this.props.register(name,phone,email,pass);
    }

    _getRegisterMess(){
        const {isRegistered, isSigningUp, errorSignUp} = this.props;
        if(isSigningUp) return ( 
            <Loading animating={isSigningUp} center  />)
        if(errorSignUp) return (<ErrorText error={errorSignUp} center/>)
    }

    onChangeTextHandler = (text) =>{
        this.setState({code : text})
    } 
    
    confirmCode(){
        const { phone, code, pass,email} = this.state;
        accountApi.confirmPhone(this.props.idU, code, phone).then(res => {
            alert(res);
            if(res === 'Xác nhận Phone thành công'){
                this.props.auth(email,pass);
            }else {
                this.setState({errorConfirmCode: res})
            }     
        }).catch((error) => {
            this.setState({errorConfirmCode: error})
        });
    }
    render() {
        const {navigation,isRegistered} = this.props;
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Image
                        source={images.logo}
                        style={styles.logo}
                    />
                    <TouchableOpacity 
                        style={styles.loginTextView}
                        onPress={()=> navigation.navigate('Login')}
                    >
                        <Text style={styles.loginText}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputView}>
                    <FormInput containerStyle={styles.formInput} placeholder='HỌ TÊN' onChangeText={(name) => this.setState({ name })}/>
                    <FormInput containerStyle={styles.formInput} placeholder='SỐ ĐIỆN THOẠI' onChangeText={(phone) => this.setState({ phone })}/>
                    <FormInput containerStyle={styles.formInput} placeholder='EMAIL' onChangeText={(email) => this.setState({ email })}/>                    
                    <FormInput containerStyle={styles.formInput} placeholder='MẬT KHẨU' 
                        onChangeText={(pass) => this.setState({ pass })}
                        secureTextEntry={true}
                    />
                </View>

                <Button
                    title='Đăng kí'
                    fontSize={20}
                    buttonStyle={styles.button}
                    onPress={()=>this.register()}
                />
                <View style={{height: 60}}>{this._getRegisterMess()}</View>
                <View style={{ flexDirection: 'row', marginLeft: 30}}>
                    <Text style={{ marginTop: 23, color: 'black' }}> Hoặc đăng nhập bằng:</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 35 }}>
                        <SocialIcon light type='facebook' 
                            onPress={()=> this._loginFacebook()}
                        />
                        <SocialIcon light type='google-plus-official' />                
                    </View>
                </View>
                <View style={{ marginTop: 20, marginLeft: 10 }}>
                    <Text>Bằng việc đăng nhập đăng kí{'\n'}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>Bạn đã đồng ý với </Text>
                        <TouchableOpacity><Text style={{ color: 'black', fontWeight: 'bold' }}>điều khoản sử dụng</Text></TouchableOpacity>
                        <Text> của chúng tôi</Text>
                    </View>
                </View>
                    {this.props.isRegistered && 
                    <View style={styles.inputCodeView}>
                        <InputCode 
                             text= 'Nhập mã xác nhận được gửi về máy điện thoại của bạn'
                            onChangeTextHandler = {this.onChangeTextHandler}
                            error={this.state.errorConfirmCode}
                            onPress={()=> this.confirmCode()}
                        />
                         
                    </View> }
                    {this.props.isRegistered &&
                        <View style={styles.transparentView}/>
                    }
            </View>
        )
    }
}

function mapStateToProps(state){
    return {
        isSigningUp : state.auth.isSigningUp,
        isRegistered : state.auth.isRegistered,
        errorSignUp : state.auth.errorSignUp,
        idU: state.auth.idU,
        isAuthenticated: state.auth.isAuthenticated
    }
}
export default connect(mapStateToProps,authAction)(Register);
