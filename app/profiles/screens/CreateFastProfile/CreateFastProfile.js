import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FormInput, FormLabel, Header, Icon } from 'react-native-elements';
import styles from './styles';
import ModalDropdown from 'react-native-modal-dropdown';
import {createFastProfile} from '../../profile.action';
import {connect } from 'react-redux';
import {ErrorText, Loading} from '../../../components';
import {getProfiles} from '../../../user/user.action';

class CreateProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            birth: '',
            name: '',
            gender: '',
        }
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
        const {name,birth,gender} = this.state;
        this.props.createFastProfile(name,birth,gender);
    }
    render() {
        const {isPeddingCreateProfile,isCreatedProfile,error} = this.props;
        return (
            <View style={styles.container}>
                <Header
                    outerContainerStyles={{ height: 45 }}
                    leftComponent={this._renderLeftHeader()}
                    centerComponent={{ text: 'Tạo Hồ Sơ', style: { color: 'black', fontSize: 18, fontWeight: 'bold' } }}
                    rightComponent={{ icon: 'event-note', color: 'black' }}
                />
                <View>
                    <TouchableOpacity style={{width:100, height:100, alignSelf:'center', marginBottom: 20}}>
                        <Image source={{ uri: 'https://i0.wp.com/www.artstation.com/assets/default_avatar.jpg?ssl=1' }}
                            style={styles.avatar} />
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