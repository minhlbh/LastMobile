import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image,ToastAndroid
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    FormInput, Button, Divider, Icon, FormLabel
} from 'react-native-elements';
import styles from './styles'
import * as authAction from '../../auth.action';
import { connect } from 'react-redux';
import { ErrorText, ButtonAuth, ButtonAuthFooter } from '../../../components';
import images from '../../../config/images';

class VerifyPhone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone:''
        }
        console.log(this.props.phone, this.props.isRegister)
    }

    verifyPhone () {
        const { phone } = this.state;
        this.props.vefifyPhone(phone,this.props.navigation);
    }

    _loginFacebook() {
        this.props.authWithFb(this.props.navigation);
    }
    render() {
        const { isPendingVerifyPhone, navigation ,messVerifyPhone,isRegister} = this.props;
        return (
            <View style={{ flex: 1 }}>
                <LinearGradient
                    colors={['#209EFF', '#209EFF', '#10A7BF']}
                    style={styles.gradient}>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <View style={styles.formContainer}>
                            <Image
                                source={isRegister ?  images.confirmCode : images.lockRs}
                                style={{ width: 100, height: 100, marginBottom: 20 }}
                            />
                            <Text style={styles.text}>{isRegister? 'Đăng kí bằng số điện thoại' : 'Bạn không thể đăng nhập ?' }</Text>
                            <View style={[styles.formInput, { flexDirection: 'row' }]}>
                                <FormLabel
                                    containerStyle={{ borderRightWidth: 1, borderRightColor: 'white' }}
                                    labelStyle={{ color: 'white' }}>VN +84</FormLabel>
                                <FormInput
                                    underlineColorAndroid='transparent'
                                    placeholder='Số điện thoại'
                                    placeholderTextColor='rgba(255,255,255,0.5)'
                                    inputStyle={{ color: 'white' }}
                                    onChangeText= {(phone) => this.setState({phone})}
                                />
                            </View>
                            <ButtonAuth onPress={() => this.verifyPhone()} title='Tiếp tục' isPending={isPendingVerifyPhone}/>
                        </View>

                        {isRegister && 
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
                        </View>}

                        <View style={{ flex: isRegister? 1 : 3, justifyContent: 'flex-end' }}>
                            {!isRegister && 
                            <View style={{ alignItems: 'center', flex: 2.7, justifyContent: 'flex-end' }}>
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
                            </View>}
                            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                                <ButtonAuthFooter
                                    onPress={() => navigation.navigate('Login')}
                                    text='Bạn đã có tài khoản?'
                                    textBold='Đăng nhập'
                                />
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        isPendingVerifyPhone: state.auth.isPendingVerifyPhone,
        messVerifyPhone: state.auth.messVerifyPhone,
        phone: state.auth.phone,
        isRegister: state.auth.isRegister,        
    }
}
export default connect(mapStateToProps, authAction)(VerifyPhone);
