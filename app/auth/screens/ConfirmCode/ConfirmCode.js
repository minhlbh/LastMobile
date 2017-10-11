import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image,ToastAndroid
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    FormInput, Button, Divider, Icon, FormLabel
} from 'react-native-elements';
import {ButtonAuth,ButtonAuthFooter} from '../../../components';
import styles from './styles'
import images from '../../../config/images';
import * as authAction from '../../auth.action';
import { connect } from 'react-redux';
import accountApi from '../../../api/accountApi';

class ConfirmCode extends Component {
    constructor(props){
        super(props);
        this.state ={
            code: '',
        }
    }

    verifyCode(){
        const {code} = this.state;
        this.props.verifyCode(code, this.props.navigation);
    }
    render() {
        const { navigation, phone,isPendingVerifyCode } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <LinearGradient
                    colors={['#10A7BF', '#10A7BF', '#10A7BF', '#00779A']}
                    style={[styles.gradient, { flex: 1 }]}>
                    <View style={{ flex: 7 }}>
                        <View style={{ flex: 6, justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Image
                                source={images.confirmCode}
                                style={{ width: 100, height: 100, marginBottom: 20 }}
                            />
                            <Text style={[styles.text, { marginBottom: 10 }]}>Nhập mã xác nhận</Text>
                            <Text style={styles.text}>Nhập mã gồm 6 chữ số chúng {'\n'} tôi đã gửi tới {phone} </Text>
                            <TouchableOpacity>
                                <Text style={[styles.text, { fontWeight: 'bold' }]}>Gửi lại mã</Text>
                            </TouchableOpacity>
                            <FormInput
                                placeholder='mã xác nhận'
                                placeholderTextColor='rgba(255,255,255,0.5)'
                                containerStyle={styles.formInput}
                                underlineColorAndroid='transparent'
                                inputStyle={{ color: 'white' }} 
                                onChangeText={(code) => this.setState({code})}
                            />
                            <ButtonAuth onPress={() => this.verifyCode()} title='Xác nhận' isPending={isPendingVerifyCode} />
                        </View>
                        <View style={{ flex: 2.5, justifyContent: 'flex-end' }}>
                            <ButtonAuthFooter 
                                onPress={()=> navigation.goBack()}
                                text='Quay lại'
                            />
                        </View>
                    </View>
                </LinearGradient>
            </View >

        );
    }
}

function mapStateToProps(state) {
    return {
        phone: state.auth.phone,
        isPendingVerifyCode: state.auth.isPendingVerifyCode, 
    }
}
export default connect(mapStateToProps, authAction)(ConfirmCode);