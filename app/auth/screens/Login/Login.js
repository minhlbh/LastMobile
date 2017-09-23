import React, { Component } from "react";
import {View, Image,TouchableOpacity} from 'react-native';
import { FormLabel, FormInput,Button, Text ,SocialIcon} from 'react-native-elements';
import { connect} from 'react-redux';
import { Loading, ErrorText } from '../../../components';
import images from '../../../config/images';
import styles from './styles';
import * as authAction from '../../auth.action';
import FBSDK, { LoginManager , AccessToken, LoginButton} from 'react-native-fbsdk';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            token: '',
        }
        this.props.authByAsyncStorage();
    }

    componentDidUpdate() {
        if (this.props.isAuthenticated) {
            this.props.navigation.navigate('Tabs');
        }
    }
    login(){
        const {username,password} = this.state;
        this.props.auth(username,password);
    }
    _loginFacebook() {   
        this.setState({ loading: true });
        LoginManager.logInWithReadPermissions(['email']).then(
            function(result) {
              if (result.isCancelled) {
                alert('Đăng nhập được huỷ');
              } else {
                AccessToken.getCurrentAccessToken().then(
                    (data) => {
                        fetch(`https://graph.facebook.com/me?fields=email&&access_token=${data.accessToken.toString()}`)
                        .then((response) => response.json())
                        .then((res) => {
                              this.props.authWithFb(data.userID,res.email,data.accessToken.toString())           
                        })                    
                    }
                )             
              }
              
            },
            function(error) {
                alert('Đăng nhập xảy ra lỗi: ' + error);
            },
        )     
    }

    getLoginMess(){
        const {isLoggingIn, isAuthenticated, error} = this.props;
        if(isLoggingIn) return ( 
            <Loading animating={isLoggingIn} center  />)
        if(error) return (<ErrorText error={error} center/>)
    }
    render(){
        const {isAuthenticated,isLoggingIn} = this.props;        
        return (
            <View style={styles.container}>
                {!isAuthenticated &&
                <View>
                    <Image
                        source={images.logo}
                        style={styles.image}
                    />

                    <View style={{ marginTop: 50 }}>
                        <Text style={styles.labelText}>Đăng nhập</Text>
                        <FormInput 
                            placeholder='SỐ ĐIỆN THOẠI'
                            onChangeText={(username) => this.setState({username})}
                        />
                        <FormInput 
                            placeholder='MẬT KHẨU' 
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({password})}
                        />

                        <Button
                            title='Đăng nhập'
                            fontSize={20}
                            buttonStyle={styles.button}
                            onPress={() => this.login()}
                        />

                        <View style={styles.socialIconView}>
                            <TouchableOpacity style={{ marginRight: 10 }}>
                                <SocialIcon light type='facebook' 
                                    onPress={() => this._loginFacebook()}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <SocialIcon light type='google-plus-official' />
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={{height: 60}}>{this.getLoginMess()}</View>

                    <View style={{ flexDirection: 'row' , alignItems:'flex-end'}}>
                        <TouchableOpacity style={{ flex: 1, alignSelf: 'flex-start', marginLeft: 20 }}>
                            <Text style={styles.loginText}>Đăng kí</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.loginTextView}>
                            <Text style={{ flex: 1, alignSelf: 'flex-end', marginRight: 10 }}>Quên mật khẩu?</Text>
                        </TouchableOpacity>
                    </View>               
                </View>}
            </View>
        );
    }
}

function mapStateToProps(state){
    return {
        accessToken: state.auth.accessToken,
        isLoggingIn: state.auth.isLoggingIn,
        isAuthenticated: state.auth.isAuthenticated,
        error: state.auth.error
    }
}
export default connect(mapStateToProps,authAction)(Login);