import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    FormInput, Button, Divider, Icon, FormLabel
} from 'react-native-elements';
import styles from './styles'
import * as authAction from '../../auth.action';
import { connect } from 'react-redux';
import { ErrorText, ButtonAuth,ButtonAuthFooter } from '../../../components';
import accountApi from '../../../api/accountApi';
import images from '../../../config/images';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    _loginFacebook() {
        this.props.authWithFb();
    }

    render() {
        const { navigation, isRegistered } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <LinearGradient
                    colors={['#209EFF', '#209EFF', '#10A7BF']}
                    style={styles.gradient}>
                    <View style={{flex:1, justifyContent: 'flex-end' }}>
                        <View style={styles.formContainer}>
                            <Image
                                source={images.confirmCode}
                                style={{ width: 100, height: 100, marginBottom: 20 }}
                            />
                            <Text style={styles.text}>Đăng kí bằng số điện thoại</Text>
                            <View style={[styles.formInput, { flexDirection: 'row' }]}>
                                <FormLabel
                                    containerStyle={{ borderRightWidth: 1, borderRightColor: 'white' }}
                                    labelStyle={{color:'white'}}>VN +84</FormLabel>
                                <FormInput
                                    underlineColorAndroid='transparent'
                                    placeholder='Số điện thoại'
                                    placeholderTextColor='rgba(255,255,255,0.5)' 
                                    style={{ width: 200 }}
                                    inputStyle={{ color: 'white' }}
                                />
                            </View>
                            <ButtonAuth onPress={() => navigation.navigate('ConfirmCode')} title='Tiếp tục'/>
                        </View>
                        <View style={{ flex: 2, justifyContent: 'flex-end' }}>
                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                <Text style={styles.textFooter}>Bằng cách đăng kí, bạn đồng ý với </Text>
                                <TouchableOpacity>
                                    <Text style={[styles.textFooter, { fontWeight: 'bold' }]}>điều khoản </Text>
                                </TouchableOpacity>
                                <Text style={styles.textFooter}>&</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 10 }}>
                                <TouchableOpacity>
                                    <Text style={[styles.textFooter, { fontWeight: 'bold' }]}>Chính sách bảo mật </Text>
                                </TouchableOpacity>
                                <Text style={styles.textFooter}>của chúng tôi</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                            <ButtonAuthFooter 
                                onPress={()=> navigation.navigate('Login')}
                                text='Bạn đã có tài khoản?'
                                textBold='Đăng nhập'
                            />
                        </View>
                    </View>
                </LinearGradient>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        isSigningUp: state.auth.isSigningUp,
        isRegistered: state.auth.isRegistered,
        errorSignUp: state.auth.errorSignUp,
        idU: state.auth.idU,
        isAuthenticated: state.auth.isAuthenticated
    }
}
export default connect(mapStateToProps, authAction)(Register);
