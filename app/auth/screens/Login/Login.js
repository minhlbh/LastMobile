import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator,ToastAndroid,Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    FormInput, Button, Divider, Icon
} from 'react-native-elements';
import styles from './styles'
import images from '../../../config/images';
import { connect } from 'react-redux';
import * as authAction from '../../auth.action';
import { ButtonAuth, ButtonAuthFooter } from '../../../components';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            token: '',
        }
    }

    login() {
        const { username, password } = this.state;
        this.props.auth(username, password, this.props.navigation);
    }
    _loginFacebook() {
        this.props.authWithFb(this.props.navigation);
    }

    getLoginMess() {
        const { isLoggingIn, isAuthenticated, error,  } = this.props;
        if (isLoggingIn) return (
            <Loading animating={isLoggingIn} center />)
        if (error) return (<ErrorText error={error} center />)
    }
    render() {
        const { isAuthenticated, isLoggingIn, navigation ,error,actionTypeIsRegister} = this.props;
        return (
            <View style={{ flex: 1 }}>
                <LinearGradient
                    colors={['#FF4081', '#7B1FA2']}
                    style={[styles.gradient, { flex: 1 }]}>
                    <View style={{ flex: 7 }}>
                        <View style={{ flex: 2, justifyContent: 'flex-end' }}>
                            <View style={{ alignItems: 'center' }}>
                                <Image source={images.logo}
                                style={{ width: 150, height: 150, }} />
                                <FormInput
                                    placeholder='Số điện thoại'
                                    placeholderTextColor='rgba(255,255,255,0.5)'
                                    containerStyle={styles.formInput}
                                    underlineColorAndroid='transparent'
                                    inputStyle={{ color: 'white' }}
                                    onChangeText={(username) => this.setState({ username })}
                                />
                                <FormInput
                                    placeholder='Mật khẩu'
                                    placeholderTextColor='rgba(255,255,255,0.5)'
                                    containerStyle={styles.formInput}
                                    underlineColorAndroid='transparent'
                                    inputStyle={{ color: 'white' }}
                                    onChangeText={(password) => this.setState({ password })}
                                    secureTextEntry={true}
                                />
                            </View>

                            <ButtonAuth isPending={isLoggingIn} onPress={() => this.login()} title='Đăng nhập' />

                            <TouchableOpacity style={{ alignSelf: 'center', marginTop: 20 }}
                                onPress={() => {
                                    navigation.navigate('VerifyPhone')
                                    actionTypeIsRegister(false)
                                }}
                            >
                                <Text style={styles.text}>Quên mật khẩu?</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                            <View style={{ alignItems: 'center', flex: 2, justifyContent: 'flex-end' }}>
                                <View style={styles.dividerContainer}>
                                    <Divider style={styles.divider} />
                                    <Text style={[styles.text, { marginLeft: 10, marginRight: 10 }]}>HOẶC</Text>
                                    <Divider style={styles.divider} />
                                </View>
                                <TouchableOpacity
                                    onPress={() => this._loginFacebook()}
                                >
                                    <View style={{ flexDirection: 'row', }}>
                                        <Icon
                                            name='facebook-square'
                                            type='font-awesome'
                                            color='white'
                                        />
                                        <Text style={{ color: 'white', marginLeft: 10 }}>Đăng nhập bằng facebook</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                                <ButtonAuthFooter
                                    onPress={() => {
                                        navigation.navigate('VerifyPhone')
                                        actionTypeIsRegister(true)
                                    }}
                                    text='Bạn chưa có tài khoản?'
                                    textBold='Đăng kí'
                                />
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        accessToken: state.auth.accessToken,
        isLoggingIn: state.auth.isLoggingIn,
        isAuthenticated: state.auth.isAuthenticated,
        error: state.auth.error
    }
}
export default connect(mapStateToProps, authAction)(Login);