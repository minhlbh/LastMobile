import React, { Component } from "react";
import { View, Image, TouchableOpacity, } from 'react-native';
import { FormLabel, FormInput, Button, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading, ErrorText } from '../../../components';
import images from '../../../config/images';
import styles from './styles';
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
        const { isAuthenticated, isLoggingIn } = this.props;
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
                                containerStyle={styles.formInput}
                                placeholder='SỐ ĐIỆN THOẠI'
                                onChangeText={(username) => this.setState({ username })}
                                
                            />
                            <FormInput
                                containerStyle={styles.formInput}
                                placeholder='MẬT KHẨU'
                                secureTextEntry={true}
                                onChangeText={(password) => this.setState({ password })}
                            />

                            <Button
                                title='Đăng nhập'
                                fontSize={20}
                                buttonStyle={styles.button}
                                onPress={() => this.login()}
                            />

                            <View style={styles.socialIconView}>
                                <View style={{marginRight:15}}>
                                <TouchableOpacity style={styles.googleButton}
                                    onPress={() => this._loginFacebook()}>
                                    <Image source={images.facebooklogo}
                                        style={{ width: 13, height: 26 }} />
                                </TouchableOpacity>
                                </View>

                                <TouchableOpacity style={styles.googleButton}>
                                    <Image source={images.googlelogo}
                                        style={{ width: 30, height: 30 }} />
                                </TouchableOpacity>
                            </View>

                        </View>

                        <View style={{ height: 60 }}>{this.getLoginMess()}</View>

                        <View style={styles.footer}>
                            <TouchableOpacity
                                style={{ flex: 1, alignSelf: 'flex-start', marginLeft: 20 }}
                                onPress={() => this.props.navigation.navigate('Register')}
                            >
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

function mapStateToProps(state) {
    return {
        accessToken: state.auth.accessToken,
        isLoggingIn: state.auth.isLoggingIn,
        isAuthenticated: state.auth.isAuthenticated,
        error: state.auth.error
    }
}
export default connect(mapStateToProps, authAction)(Login);