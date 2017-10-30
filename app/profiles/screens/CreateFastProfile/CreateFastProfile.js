import React, { Component } from 'react';
import {
    View, Text, Image, Picker, TouchableOpacity, StyleSheet,ToastAndroid
} from 'react-native';
import {
    ListItem, FormInput, Button
} from 'react-native-elements';
import styles from './styles';
//import ModalDropdown from 'react-native-modal-dropdown';
import {createFastProfile} from '../../profile.action';
import {connect } from 'react-redux';
import {ErrorText, Loading, ViewContainer} from '../../../components';
import {getProfiles} from '../../../user/user.action';
var ImagePicker = require('react-native-image-picker');
import images from '../../../config/images';
import khamApi from '../../../api/khamApi';


var options = {
    title: 'Chọn ảnh đại diện',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
class CreateProfile extends Component {
    constructor(props){
        super(props);
        var currentTime = new Date();
        var year = currentTime.getFullYear();
        this.pickImage = this.pickImage.bind(this);
        this.state = {
            birth: year,
            name: '',
            gender: 'Nam',
            avatar:{},
            moTa: ''
        }
    }

    pickImage() {
        if(this.state.avatar){
            khamApi.deleteImage(this.state.avatar.location).then((res) => {
                console.log(res)
            });
        }
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
            else {;
                khamApi.uploadImg(response).then((res) => {
                    console.log(res);
                    //chỉ lấy tên ảnh
                    var imageUri = res.location.replace('https://sharinglife.blob.core.windows.net/images/', '');

                    var avatar = { uri: response.uri, location: imageUri }
                    this.setState({ avatar });
                })
            }
        });
    }

    disableButton(){
        const {name,birth,gender} = this.state;
        const {isPeddingCreateProfile} = this.props;        
        if(name && birth && gender && !isPeddingCreateProfile) return false;
        return true;
    }

    createProfile(){
        const {name,birth,gender,avatar} = this.state;
        this.props.createFastProfile(name,birth,gender,avatar.location, this.props.navigation);
    }

    listYear = () => {
        var currentTime = new Date();
        var year = currentTime.getFullYear()

        var listYear = [] ;
        
        for (var i = year; i > (year -100); i--) {
            listYear.push(i);
        }

        return listYear;
    }
    render() {
        const {isPeddingCreateProfile,isCreatedProfile,error, navigation} = this.props;
        const {avatar} = this.state;
        var listYear = this.listYear();
        return (
            <ViewContainer
                title='Tạo nhanh hồ sơ'
                onBack={() => navigation.goBack()}
            >      
                <View style={styles.AvatarandName}>
                    <TouchableOpacity onPress={this.pickImage}>
                        <Image source={{ uri: avatar.uri? avatar.uri : 'https://www.shareicon.net/data/2015/09/09/98455_man_512x512.png' }}
                            style={{ width: 100, height: 100 }} />
                    </TouchableOpacity>

                    <FormInput
                        containerStyle={{ alignSelf: 'center' }}
                        underlineColorAndroid='transparent'
                        value={this.state.hoTen}
                        inputStyle={{ fontSize: 22, textAlign: 'center' }}
                        onChangeText={(name) => this.setState({name})}
                        maxLength={30}
                        placeholder='Họ và tên'
                    />
                </View>

                <View style={{ flex: 3 }}>
                    <View style={styles.itemList}>
                        <View style={{ flex: 4, paddingLeft: 20 }}>
                            <Text style={styles.text}>Giới tính</Text>
                        </View>
                        <View style={{ flex: 2 }}>
                            <Picker
                                mode='dropdown'
                                selectedValue={this.state.gender}
                                onValueChange={(itemValue, itemIndex) => this.setState({ gender: itemValue })}
                            >
                                <Picker.Item label='Nam' value='Nam' />
                                <Picker.Item label='Nữ' value='Nữ' />
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.itemList}>
                        <View style={{ flex: 4, paddingLeft: 20 }}>
                            <Text style={styles.text}>Năm sinh</Text>
                        </View>
                        <View style={{ flex: 2 }}>
                            <Picker
                                mode='dialog'
                                selectedValue={this.state.birth}
                                onValueChange={(itemValue, itemIndex) => this.setState({ birth: itemValue })}
                            >
                                {listYear.map((item) => (
                                    <Picker.Item label={`${item}`} value={item} />                                    
                                ))}
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.textDivider}>
                        <Text style={[styles.text, { paddingLeft: 20 }]}>Ghi chú</Text>
                    </View>
                    <View style={{}}>
                        <FormInput
                            placeholder='Mô tả triệu chứng, vấn đề...'
                            underlineColorAndroid='transparent'
                            containerStyle={{ height: 150 }}
                            multiline={true}
                            inputStyle={{ textAlignVertical: 'top', height: 150 }}
                            value={this.state.moTa}
                            onChangeText={(des) => this.setState({ moTa: des })}
                        />
                    </View>
                </View>
                <View style={{marginTop: 10}}>
                    {isPeddingCreateProfile && <Loading center animating={isPeddingCreateProfile}/>}
                    {error && <ErrorText center error={error}/>}
                </View>

                <Button
                    title='Tạo sổ y bạ'
                    textStyle={{ fontSize: 18 }}
                    containerViewStyle={{ flex: 0.5 }}
                    buttonStyle={{ backgroundColor: '#00749B' }}
                    borderRadius={20}
                    disabled={this.disableButton()}
                    onPress={() =>this.createProfile()}
                />
            </ViewContainer>
        )
    }
}

function mapStateToProps(state) {
    return {
        isPeddingCreateProfile: state.profile.isPeddingCreateProfile,
        isCreatedProfile:  state.profile.isCreatedProfile,
        error:  state.profile.error,       
    }
}

export default connect(mapStateToProps,{createFastProfile,getProfiles})(CreateProfile);