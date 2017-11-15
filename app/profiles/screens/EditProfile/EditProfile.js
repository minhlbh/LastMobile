import React, { Component } from 'react';
import {View,TouchableOpacity,Picker,DatePickerAndroid} from 'react-native';
import {Avatar,Text,Divider,Icon, ListItem, List} from 'react-native-elements';
import styles from './styles';
import { connect } from 'react-redux';
import {StickyHeader, HeaderForeground} from '../../../components';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {editProfile} from '../../profile.action';

class EditProfile extends Component {
    constructor(props){
        super(props);
        const {profileInfo} = this.props;
        this.state = {
            name: profileInfo.HoVaTen,
            birth:new Date(profileInfo.NgaySinh),
            gender :profileInfo.GioiTinh,
            relation: profileInfo.QuanHe,
            address: profileInfo.DiaChi,
            province: profileInfo.TinhThanh,
            email: profileInfo.Email,
            phone: profileInfo.Phone, 
            latLng: profileInfo.LatLng 
        }
    }
    async pickDate() {
        try {
          const {action, year, month, day} = await DatePickerAndroid.open({
            date: this.state.birth
          });
        this.setState({birth:new Date(year, month, day) })  ;
        } catch ({code, message}) {
          console.warn('Cannot open date picker', message);
        }
    }

    done(){
        const {name, birth, gender, relation, address, province, email, latLng, phone} = this.state;
        this.props.editProfile(name, birth,gender,relation,address,province,email,phone,latLng);
        console.log(name, birth, gender, relation, address, province, email, latLng, phone)
        this.props.navigation.goBack();
    }
    render(){
        const {navigation} = this.props;
        const {birth} = this.state;
        return(
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <ParallaxScrollView
                    backgroundColor="white"
                    contentBackgroundColor="white"
                    parallaxHeaderHeight={100}
                    renderFixedHeader={() => (
                        <View style={{ position: 'absolute',flexDirection: 'row', flex:1}}>
                            <View style={{flex:1}}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', width: 100, marginLeft: 20}}
                                onPress={()=> this.done()}
                            >
                                <Text style={{ color: '#4385D5', fontSize: 16 }}>Done</Text>
                            </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={{alignSelf: 'center' , marginRight: 20}}>
                                <Text style={{ color: '#4385D5', fontSize: 16 }}>Cancel</Text>
                            </TouchableOpacity>            
                        </View>
                    )}
                    renderForeground={() => (
                        <HeaderForeground name=' Sửa hồ sơ'/>
                    )}
                    stickyHeaderHeight={40}
                    renderStickyHeader={() => (
                        <StickyHeader name='Sửa hồ sơ' />
                    )}>
                        <Text style={[styles.dividerText, {paddingLeft: 20}]}>CHI TIẾT HỒ SƠ</Text>
                    <List >
                        <ListItem
                            containerStyle={styles.firstItem}
                            title='Họ và tên'
                            hideChevron={true}
                            textInput={true}
                            textInputEditable
                            textInputContainerStyle={styles.formInputContainer}
                            textInputStyle={styles.formInputStyle}
                            textInputValue={this.state.name}
                            textInputOnChangeText={(name) => this.setState({ name })}
                        />
                        <ListItem
                            onPress={() => this.pickDate()}
                            title='Ngày sinh' 
                            rightTitle={`${birth.getDate()} - ${birth.getMonth() + 1} - ${birth.getFullYear()}`}
                        /> 
                        <View style={styles.pickerItem}>
                            <Text style={styles.pickerTextItem}>Giới tính</Text>
                            <Picker
                                mode='dropdown'
                                style={{ width: 100, flex: 1 }}
                                selectedValue={this.state.gender}
                                onValueChange={(itemValue, itemIndex) => this.setState({ gender: itemValue })}>
                                <Picker.Item label="Nam" value="Nam" />
                                <Picker.Item label="Nữ" value="Nữ" />
                            </Picker>
                        </View>
                        <ListItem
                            title='Quan hệ'
                            hideChevron={true}
                            textInput={true}
                            textInputEditable
                            textInputContainerStyle={styles.formInputContainer}
                            textInputStyle={styles.formInputStyle}
                            textInputValue={this.state.relation}
                            textInputOnChangeText={(relation) => this.setState({ relation })}
                        />

                        <ListItem
                            title='Địa chỉ'
                            hideChevron={true}
                            textInput={true}
                            textInputEditable
                            textInputContainerStyle={styles.formInputContainer}
                            textInputStyle={styles.formInputStyle}
                            textInputValue={this.state.address}
                            textInputOnChangeText={(address) => this.setState({ address })}
                        />

                        <ListItem
                            title='Tỉnh thành'
                            hideChevron={true}
                            textInput={true}
                            textInputEditable
                            textInputContainerStyle={styles.formInputContainer}
                            textInputStyle={styles.formInputStyle}
                            textInputValue={this.state.province}
                            textInputOnChangeText={(province) => this.setState({ province })}
                        />

                        <ListItem
                            title='Email'
                            hideChevron={true}
                            textInput={true}
                            textInputEditable
                            textInputContainerStyle={styles.formInputContainer}
                            textInputStyle={styles.formInputStyle}
                            textInputValue={this.state.email}
                            textInputOnChangeText={(email) => this.setState({ email })}
                        />

                        <ListItem
                            title='Số điện thoại'
                            hideChevron={true}
                            textInput={true}
                            textInputEditable
                            textInputContainerStyle={styles.formInputContainer}
                            textInputStyle={styles.formInputStyle}
                            textInputValue={this.state.phone}
                            textInputOnChangeText={(phone) => this.setState({ phone })}
                        />
                    </List>
                    <View>
                        <View style={styles.dividerView}>
                            <Text style={styles.dividerText}>TỌA ĐỘ</Text>
                        </View>
                        <View style={{ backgroundColor: 'white' }}>
                            <ListItem
                                containerStyle={styles.firstItem}
                                title='Tọa độ'
                                rightTitle={this.state.latLng}
                            />
                        </View>
                    </View>
                </ParallaxScrollView>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        accessToken: state.auth.accessToken,
        profileInfo: state.profile.profileInfo
    };
}

export default connect(mapStateToProps,{ editProfile })(EditProfile);