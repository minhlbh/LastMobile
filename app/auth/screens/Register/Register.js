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
import { Loading, ErrorText, InputCode } from '../../../components';
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
                <View style={{ flex: 5, justifyContent: 'flex-end' }}>
                    <View style={{ alignItems: 'center', flex: 4, justifyContent: 'flex-end', alignSelf: 'center' }}>
                        <Image
                            source={images.confirmCode}
                            style={{ width: 100, height: 100, marginBottom: 20 }}
                        />
                        <Text style={styles.text}>Đăng kí bằng số điện thoại</Text>
                        <View style={[styles.formInput, { flexDirection: 'row' }]}>
                            <FormLabel
                                style={{ borderRightWidth: 1 }}>
                                <Text style={[styles.text, { fontSize: 17 }]}>VN +84</Text>
                            </FormLabel>
                            <FormInput
                                underlineColorAndroid='transparent'
                                placeholder='Số điện thoại'
                                placeholderTextColor='white'
                                style={{ width: 200 }}
                                inputStyle={{ color: 'white' }}
                            />
                        </View>
                        <TouchableOpacity style={{ alignSelf: 'center' }}
                            onPress={()=> navigation.navigate('ConfirmCode')}
                        >
                            <View style={styles.buttonView}>
                                <Text style={{ fontSize: 17, color: 'white' }}>Tiếp tục</Text>
                            </View>
                        </TouchableOpacity>
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
                        <TouchableOpacity style={{ justifyContent: 'center', height: 40 }}
                            onPress={()=> navigation.navigate('Login')}
                        >
                            <View style={styles.footer}>
                                <Text style={styles.text}>Bạn đã có tài khoản?</Text>
                                <Text style={[styles.text, { fontWeight: 'bold' }]}> Đăng nhập</Text>
                            </View>
                        </TouchableOpacity>
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
