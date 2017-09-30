import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    FormInput, Button, Divider, Icon, FormLabel
} from 'react-native-elements';
import styles from './styles'
import images from '../../../config/images';

class ConfirmCode extends Component {
    render() {
        const {navigation} = this.props;    
        return (
            <View style={{ flex: 1, justifyContent:'center' }}>
                <LinearGradient
                    colors={['#10A7BF', '#10A7BF', '#10A7BF', '#00779A']}
                    style={styles.gradient}>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity>
                            <Image
                                source={images.confirmCode}
                                style={{ width: 100, height: 100, marginBottom: 20 }}
                            />
                        </TouchableOpacity>
                        <Text style={[styles.text, { marginBottom: 10 }]}>Nhập mã xác nhận</Text>
                        <Text style={styles.text}>Nhập mã gồm 4 chữ số chúng {'\n'} tôi đã gửi tới 01672034616 </Text>
                        <TouchableOpacity>
                            <Text style={[styles.text, { fontWeight: 'bold' }]}>Gửi lại mã</Text>
                        </TouchableOpacity>
                        <FormInput
                            placeholder='mã xác nhận'
                            placeholderTextColor='white'
                            containerStyle={styles.formInput}
                            underlineColorAndroid='transparent'
                            inputStyle={{ color: 'white' }} />
                        <TouchableOpacity style={{ alignSelf: 'center' }}
                            onPress={()=> navigation.navigate('CreateAccount')}
                        >
                            <View style={styles.buttonView}>
                                <Text style={{ fontSize: 17, color: 'white' }}>Xác nhận</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>

        );
    }
}

export default ConfirmCode;
