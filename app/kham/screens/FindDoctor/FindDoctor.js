import React, { Component } from 'react';
import {
    View, TouchableOpacity, Picker, Switch, TextInput, FlatList, Image,Modal,ToastAndroid
} from 'react-native';
import {
    Text, Icon, ListItem, Divider, Button, List, Avatar, FormInput
} from 'react-native-elements';
import styles from './styles';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { CloseHeaderContainer } from '../../../components';
import { connect } from 'react-redux';
import * as khamAction from '../../kham.action';
import khamApi from '../../../api/khamApi';
import { ListProfiles , FindingDoctorModal} from '../../../components';
import { resetNavigationTo } from '../../../utils';
import images from '../../../config/images';
import  ImagePicker from 'react-native-image-picker';

var options = {
    title: 'Chọn ảnh cho bác sĩ xem',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
class FindDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {Avatar: images.defaultAvatar,HoVaTen: 'Chọn hồ sơ'},
            anDanh: false,
            vanDe: '',
            images: [],
            isPickingProfile: false,
            isFindingDoctor: false
        }
    }

    componentWillMount() {
        const {chuyenKhoa, idGap,vanDe,hoSo} =  this.props.navigation.state.params;
        if(hoSo){
            this.setState({vanDe, profile: hoSo})
        }
        this.props.nguoidungLoadGap(idGap,chuyenKhoa.Id);
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
                khamApi.uploadImg(response).then((res) => {
                    console.log(res);
                    const idGap = this.props.idGap;
                    //chỉ lấy tên ảnh
                    var image = res.location.replace('https://sharinglife.blob.core.windows.net/images/', '');

                    //up tên ảnh lên signalR 
                    this.props.proxy.invoke('upAnh', image, idGap)
                        .done((directResponse) => {
                            console.log('direct-response-from-server-upAnh', directResponse);
                        }).fail((e) => {
                            console.warn('up anh loi', e)
                        });
                    var images = this.state.images;
                    images.push({ uri: response.uri, location: res.location });
                    this.setState({
                        images: images
                    });
                })
                //render ảnh 
            }
        });
    }

    deleteImage(image) {
        khamApi.deleteImage(image.location).then((res) => {
            console.log(res)
        });
        var images = this.state.images;
        var i = images.indexOf(image);

        if (i != -1) {
            images.splice(i, 1);
            this.setState({ images })
        }
    }

    findDoctor() {
        const {idGap ,navigation} = this.props;
        const {profile,anDanh,vanDe} = this.state;
        const {chuyenKhoa} =  navigation.state.params;        
        if(profile.Id && vanDe){
            this.setState({isFindingDoctor: true});
            this.props.timBacSiTheoChuyenKhoa(idGap,profile.Id, anDanh, vanDe, profile.HoVaTen, profile.NgaySinh, profile.GioiTinh);
        } else {
            ToastAndroid.show('Vui lòng chọn hồ sơ và điền vấn đề', ToastAndroid.SHORT);
        }
    }

    render() {
        var { profilesList, navigation ,isPeddingFindDoctor,dichVuDetail, chonBacSi} = this.props;
        const {profile, isFindingDoctor} = this.state;
        const {chuyenKhoa} =  navigation.state.params;
        return (
            <View style={styles.container}>
                <CloseHeaderContainer
                        onClose={() => navigation.goBack()}
                        title='Tìm bác sĩ'
                    >
                    <View>
                        <View >
                            <List>
                                <ListItem
                                    containerStyle={{ paddingLeft: 7 }}
                                    onPress={() => {this.setState({isPickingProfile: true}) }}
                                    roundAvatar
                                    avatar={profile.Avatar}
                                    title={profile.HoVaTen}
                                    titleStyle={{ fontSize: 20, paddingLeft: 20 }}
                                />
                                {/* MODAL LIST HỒ SƠ*/}
                                <Modal
                                    animationType="slide"
                                    transparent={false}
                                    visible={this.state.isPickingProfile}
                                    onRequestClose={() => {this.setState({isPickingProfile: false})}}
                                    hardwareAccelerated={true}
                                    >
                                    <ListProfiles 
                                        profilesList={profilesList} 
                                        onPress={(profile) => this.setState({profile, isPickingProfile: false})} 
                                    />
                                    <ListItem
                                        roundAvatar
                                        avatar={{ uri: 'https://www.computerhope.com/jargon/p/plus.gif' }}
                                        title='Tạo mới hồ sơ'
                                        titleStyle={{ color: '#546CA8' }}
                                        onPress={()=> {
                                            this.setState({isPickingProfile: false})
                                            navigation.navigate('CreateFastProfile')
                                        }}
                                        containerStyle={{borderBottomColor: '#bbb',borderBottomWidth: 0}} 
                                        hideChevron={true}                           
                                    />
                                </Modal> 
                                <ListItem
                                    title='Ẩn danh'
                                    titleStyle={styles.text}
                                    switchButton
                                    switched={this.state.anDanh}
                                    onSwitch={(value) => this.setState({
                                        anDanh: value
                                    })}
                                    hideChevron
                                />
                                <ListItem
                                    hideChevron
                                    titleStyle={styles.text}
                                    title='Chuyên khoa'
                                    rightTitle={chuyenKhoa.Ten}
                                    rightTitleStyle={styles.text}
                                />
                            </List>
                        </View>

                        <View style={{ height: 35, justifyContent: 'center', backgroundColor: '#F8F8F8' }}>
                            <Text style={{ paddingLeft: 20, color: 'black' }}>VẤN ĐỀ GẶP PHẢI</Text>
                        </View>
                        <View style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#CDCDCD' }}>
                            <FormInput
                                underlineColorAndroid='transparent'
                                placeholder='Mô tả triệu chứng, vấn đề ....'
                                containerStyle={styles.textInput}
                                multiline={true}
                                inputStyle={{ height: 150, textAlignVertical: 'top' }}
                                onChangeText={(text) => this.setState({ vanDe: text })}
                                value={this.state.vanDe}
                            />
                        </View>


                        <View style={{ marginTop: 5, marginBottom: 10 }}>
                        </View>
                        <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
                            <TouchableOpacity style={{ width: 80, height: 80, marginRight: 10 }} onPress={() => this.pickImage()}>
                                <Image style={{ width: 80, height: 80 }} source={{ uri: 'https://image.freepik.com/free-icon/plus-sign-ios-7-interface-symbol_318-38775.jpg' }} />
                            </TouchableOpacity>
                            {this.state.images.map((image) => (
                                <Image style={{ width: 80, height: 80, marginRight: 10 }} source={{ uri: image.uri }}>
                                    <View style={{ alignSelf: 'flex-end', width: 25, marginRight: 1 }}>
                                        <Icon
                                            size={20}
                                            name='x'
                                            type='octicon'
                                            onPress={() => this.deleteImage(image)} />
                                    </View>
                                </Image>
                            ))}
                        </View>
                    </View>
                </CloseHeaderContainer>

                <Button
                    buttonStyle={styles.button}
                    onPress={() => this.findDoctor()}
                    title="Tìm bác sĩ"
                    textStyle={{ color: 'white', fontSize: 18 }}
                />

                <FindingDoctorModal 
                    modalVisible={isFindingDoctor} 
                    chonBacSi={() => chonBacSi(navigation)}
                    close={() => this.setState({isFindingDoctor: false})}
                    doctorInfo={dichVuDetail}
                    isPendingFindDoctor={isPeddingFindDoctor}
                />
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        profilesList: state.user.profiles,
        idGap: state.kham.idGap,
        isFoundDoctor: state.kham.isFoundDoctor,
        doctorInfo: state.kham.doctorInfo,
        proxy: state.kham.proxy,
        isPeddingFindDoctor: state.kham.isPeddingFindDoctor,
        dichVuDetail : state.kham.dichVuDetail
    }
}

export default connect(mapStateToProps, khamAction)(FindDoctor);
