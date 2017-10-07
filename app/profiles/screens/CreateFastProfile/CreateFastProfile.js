import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FormInput, FormLabel, Header, Icon } from 'react-native-elements';
import styles from './styles';
import ModalDropdown from 'react-native-modal-dropdown';
import {createFastProfile} from '../../profile.action';
import {connect } from 'react-redux';
import {ErrorText, Loading} from '../../../components';
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
        this.state = {
            birth: '',
            name: '',
            gender: '',
            avatar:{}
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

    _renderLeftHeader() {
        return (
            <Icon
                name='keyboard-arrow-left'
                color='black'
                onPress={() => this.props.navigation.goBack()}
            />
        )
    }

    disableButton(){
        const {name,birth,gender} = this.state;
        if(name && birth && gender) return false;
        return true;
    }

    componentDidUpdate(){
        const {isPeddingCreateProfile,isCreatedProfile,getProfiles,navigation} = this.props;
        if(isCreatedProfile){
            getProfiles();
            alert('Tạo hồ hơ nhanh thành công');
            navigation.goBack();
        }
    }
    createProfile(){
        const {name,birth,gender,avatar} = this.state;
        this.props.createFastProfile(name,birth,gender,avatar.location);
    }

    render() {
        const {isPeddingCreateProfile,isCreatedProfile,error} = this.props;
        const {avatar} = this.state;
        return (
            <View style={styles.container}>
                <Header
                    outerContainerStyles={{ height: 45 }}
                    leftComponent={this._renderLeftHeader()}
                    centerComponent={{ text: 'Tạo Hồ Sơ', style: { color: 'black', fontSize: 18, fontWeight: 'bold' } }}
                    rightComponent={{ icon: 'event-note', color: 'black' }}
                />
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={()=> this.pickImage()}
                    >
                        <Image
                            source={{uri: avatar.uri? avatar.uri :'https://i0.wp.com/www.artstation.com/assets/default_avatar.jpg?ssl=1'}}
                            style={{ width: 100, height: 100, marginBottom: 20, borderRadius: avatar ? 50 : 0  }}
                            
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.form}>
                    <View>
                        <FormLabel>Họ tên</FormLabel>
                        <FormInput
                            placeholder='Nhập tên'
                            onChangeText={(name) => this.setState({name})}                            
                        />
                    </View>
                    <View>
                        <FormLabel>Năm sinh</FormLabel>
                        <FormInput
                            placeholder='Năm sinh'
                            onChangeText={(birth) => this.setState({birth})}
                        />
                        <FormLabel>Giới tính: </FormLabel>
                        <ModalDropdown options={['Nam', 'Nữ']}
                            style={{ marginTop: 10, marginLeft: 18 }}
                            textStyle={{ fontSize: 15 }}
                            dropdownStyle={{ width: 80, height: 90 }}
                            dropdownTextStyle={{ fontSize: 15 }}
                            defaultValue={"Chọn giới tính..."}
                            onSelect={(index,value)=> this.setState({gender: value})}                            
                        />
                    </View>
                    <View style={{marginTop: 10}}>
                        {isPeddingCreateProfile && <Loading center animating={isPeddingCreateProfile}/>}
                        {error && <ErrorText center error={error}/>}
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={{ marginLeft: -10 }} 
                            disabled={this.disableButton()}
                            onPress={() =>this.createProfile()}
                        >
                            <View style={styles.button1}>
                                <Text style={styles.buttonText1}>Tạo hồ sơ</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginLeft: 30 }}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText2}>Hủy bỏ</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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