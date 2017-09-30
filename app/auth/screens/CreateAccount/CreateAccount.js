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

class CreateAccount extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <LinearGradient
                    colors={['#7B1FA2', '#00779A', '#10A7BF']}
                    style={[styles.gradient, { justifyContent: 'center', }]} >
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity>
                            <Image
                                source={images.addAvatar}
                                style={{ width: 100, height: 100, marginBottom: 20 }}
                            />
                        </TouchableOpacity>
                        <Text style={[styles.text, { marginBottom: 15 }]}>Tạo tài khoản</Text>
                        <FormInput
                            placeholder='Mật khẩu mới'
                            placeholderTextColor='white'
                            containerStyle={styles.formInput}
                            underlineColorAndroid= 'transparent'
                            inputStyle={{ color: 'white' }}
                        />
                        <FormInput
                            placeholder='Nhập lại mật khẩu'
                            placeholderTextColor='white'
                            containerStyle={styles.formInput}
                            underlineColorAndroid= 'transparent'
                            inputStyle={{ color: 'white' , borderBottomWidth: 0}}
                        />

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{}}>
                                <View style={styles.buttonView}>
                                    <Text style={{ fontSize: 17, color: 'white' }}>Cập nhật</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ marginLeft: 10 }}>
                                <View style={styles.buttonView}>
                                    <Text style={{ fontSize: 17, color: 'white' }}>Bỏ qua</Text>
                                </View>
                            </TouchableOpacity>

                        </View>

                    </View>
                </LinearGradient>
            </View>

        );
    }
}

export default CreateAccount;
