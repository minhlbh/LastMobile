import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    FormInput, Button, Divider, Icon
} from 'react-native-elements';
import styles from './styles'
import images from '../../../config/images';
import {connect } from 'react-redux';
import * as authAction from '../../auth.action';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            token: '',
        }
    }

    componentDidUpdate() {
        if (this.props.isAuthenticated) {
            this.props.navigation.navigate('Tabs');
        }
    }
    login() {
        const { username, password } = this.state;
        this.props.auth(username, password);
    }
    _loginFacebook() {
        this.props.authWithFb();
    }

    getLoginMess() {
        const { isLoggingIn, isAuthenticated, error } = this.props;
        if (isLoggingIn) return (
            <Loading animating={isLoggingIn} center />)
        if (error) return (<ErrorText error={error} center />)
    }
    render() {
        const { isAuthenticated, isLoggingIn, navigation } = this.props;
        return (
            <View style={{ flex: 1 }}>
            <LinearGradient
                colors={['#FF4081', '#7B1FA2']}
                style={[styles.gradient, { flex: 1 }]}>
                <View style={[{ flex: 7 }]}>
                    <View style={{ flex: 2, justifyContent: 'flex-end' }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.textSymbol}>Trưởng khoa</Text>
                            <FormInput
                                placeholder='Số điện thoại'
                                placeholderTextColor='white'
                                containerStyle={styles.formInput}
                                underlineColorAndroid='transparent'
                                inputStyle={{ color: 'white' }}
                                onChangeText={(username)=> this.setState({username})}
                            />
                            <FormInput
                                placeholder='Mật khẩu'
                                placeholderTextColor='white'
                                containerStyle={styles.formInput}
                                underlineColorAndroid='transparent'
                                inputStyle={{ color: 'white' }} 
                                onChangeText={(password)=> this.setState({password})}                                
                            />
                        </View>
                        <TouchableOpacity style={{ alignSelf: 'center' }}
                            onPress={()=>this.login()}
                        >
                            <View style={styles.buttonView}>
                                <Text style={{ fontSize: 17, color: 'white' }}>Đăng nhập</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ alignItems: 'center', marginTop: 20 }}>
                            <Text style={styles.text}>Quên mật khẩu?</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <View style={{ alignSelf: 'center', alignItems: 'center', flex: 2, justifyContent: 'flex-end' }}>
                            <View style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 10 }}>
                                <View style={styles.divider}><Divider /></View>
                                <Text style={[styles.text, { marginLeft: 10, marginRight: 10 }]}>HOẶC</Text>
                                <View style={styles.divider}><Divider /></View>
                            </View>
                            <TouchableOpacity 
                                onPress={()=> this._loginFacebook()}
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
                            <TouchableOpacity style={{ height: 40, justifyContent: 'center' }}
                                onPress={()=> navigation.navigate('Register') }
                            >
                                <View style={styles.footer}>
                                    <Text style={styles.text}>Bạn chưa có tài khoản?</Text>
                                    <Text style={[styles.text, { fontWeight: 'bold' }]}> Đăng kí</Text>
                                </View>
                            </TouchableOpacity>
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