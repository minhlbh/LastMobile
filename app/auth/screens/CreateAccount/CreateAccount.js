import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    FormInput, Button, Divider, Icon, FormLabel,Avatar
} from 'react-native-elements';
import styles from './styles'
import images from '../../../config/images';
var ImagePicker = require('react-native-image-picker');

var options = {
    title: 'Chọn ảnh đại diện',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

class CreateAccount extends Component {
    constructor(props){
        super(props);
        this.state ={
            avatar: ''
        }
    }
    pickImage() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let avatar = { uri: response.uri };
                this.setState({avatar});
            }
        });
    }

    render() {
        const {avatar} = this.state;
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <LinearGradient
                    colors={['#7B1FA2', '#00779A', '#10A7BF']}
                    style={[styles.gradient, { justifyContent: 'center', }]} >
                    <View style={{ alignItems: 'center' }}> 
                        <TouchableOpacity
                            onPress={()=> this.pickImage()}
                        >
                            <Image
                                source={!avatar ? images.addAvatar : this.state.avatar}
                                style={{ width: 100, height: 100, marginBottom: 20, borderRadius: avatar ? 50 : 0  }}
                                
                            />
                        </TouchableOpacity>
                        <Text style={[styles.text, { marginBottom: 15 }]}>Tạo tài khoản</Text>
                        <FormInput
                            placeholder='Mật khẩu mới'
                            placeholderTextColor='rgba(255,255,255,0.4)'
                            containerStyle={styles.formInput}
                            underlineColorAndroid= 'transparent'
                            inputStyle={{ color: 'white' }}
                            secureTextEntry={true}
                        />
                        <FormInput
                            placeholder='Nhập lại mật khẩu'
                            placeholderTextColor='white'
                            containerStyle={styles.formInput}
                            underlineColorAndroid= 'transparent'
                            inputStyle={{ color: 'white' , borderBottomWidth: 0}}
                            secureTextEntry={true}                            
                        />

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity>
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
