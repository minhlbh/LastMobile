import React, { Component } from 'react';
import {
    View, TouchableOpacity, Picker, Switch, TextInput, FlatList, Image
} from 'react-native';
import {
    Text, Icon, ListItem, Divider, Button, List, Avatar, FormInput
} from 'react-native-elements';
import styles from './styles';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { HeaderForeground, StickyHeader, FixedHeader } from '../../../components';
import { connect } from 'react-redux';
import * as khamAction from '../../kham.action';
import khamApi from '../../../api/khamApi';
import ModalDropdown from 'react-native-modal-dropdown';
import FoundDoctor from '../FoundDoctor';
import { resetNavigationTo } from '../../../utils';
import images from '../../../config/images';

var ImagePicker = require('react-native-image-picker');

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
            idHoso: '',
            idKhoa: '',
            anDanh: false,
            vanDe: '',
            images: [],
        }
    }

    componentWillMount() {
        this.props.getListChuyenKhoa();
        this.props.storeDoctorInfo();
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
        const { idHoso, idKhoa, anDanh, vanDe } = this.state;
        const idGap = this.props.idGap;
        this.props.proxy.invoke('timBacSiTheoChuyenKhoa', idKhoa, idHoso, anDanh, vanDe, idGap).done((directResponse) => {
            console.log('timBacSiTheoChuyenKhoa success');
        }).fail(() => {
            console.warn('timBacSiTheoChuyenKhoa fail')
            alert('Hiện các bác sĩ đang bận')
        });
    }

    _onSelectedKhoa(index) {
        this.setState({ idKhoa: this.props.listChuyenKhoa[index].Id })
    }
    _onSelectedHoSo(index) {
        this.setState({ idHoso: this.props.profilesList[index].Id })
    }
    render() {
        var { profilesList, listChuyenKhoa, navigation } = this.props;
        return (

            <View style={styles.container}>
                <ParallaxScrollView
                    contentContainerStyle={{ zIndex: 0, }}
                    backgroundColor="white"
                    contentBackgroundColor="white"
                    parallaxHeaderHeight={80}
                    renderFixedHeader={() => (
                        <FixedHeader icon0='close' navigation={() => resetNavigationTo('Tabs', navigation)} />
                    )}
                    renderForeground={() => (
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 30 }}>
                            <View style={{ flex: 1, }}>
                                <TouchableOpacity>
                                    <Text h3 style={{ color: 'black', fontWeight: 'bold', marginLeft: 20 }}>Tìm bác sĩ</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    stickyHeaderHeight={40}
                    renderStickyHeader={() => (
                        <StickyHeader name='Gặp bác sĩ' />
                    )}>
                    <View>
                        <View>
                            <List>
                                <ListItem
                                    containerStyle={{ paddingLeft: 7 }}
                                    onPress={() => { }}
                                    roundAvatar
                                    avatar={images.defaultAvatar}
                                    title='Chọn hồ sơ'
                                    titleStyle={{ fontSize: 20, paddingLeft: 20 }}
                                />
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
                                    onPress={() => { }}
                                    titleStyle={styles.text}
                                    title='Chuyên khoa'
                                    rightTitle='Đa khoa'
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
                                            //raised
                                            size={20}
                                            name='x'
                                            type='octicon'
                                            onPress={() => this.deleteImage(image)} />
                                    </View>
                                </Image>
                            ))}
                        </View>
                    </View>

                    {/* <View style={{marginRight:10}}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{ flex: 1, marginTop: 15 }}>
                            <Text style={styles.textDividerTitle}>Hồ sơ</Text>
                        </View>
                        <View style={styles.pickerView}>
                            <ModalDropdown
                                options={profilesList.map((item) => item.HoVaTen)}
                                textStyle={{fontSize:15 }}
                                dropdownTextStyle={{fontSize:15}}
                                defaultValue={"Chọn hồ sơ"}
                                onSelect={(index)=> this._onSelectedHoSo(index)}
                            />
                        </View>
                    </View>

                    <Divider style={styles.divider} />

                    <View style={styles.khoaView}>
                        <View style={{ flex: 1, marginTop: 15 }}>
                            <Text style={styles.textDividerTitle}>Khoa</Text>
                        </View>
                        <View style={styles.pickerView}>
                            <ModalDropdown
                                options={listChuyenKhoa.map((item) => item.Name) }
                                textStyle={{fontSize:15 }}
                                dropdownTextStyle={{ fontSize:15}}
                                defaultValue={"Chọn khoa"}
                                onSelect={(index)=> this._onSelectedKhoa(index)}
                            />
                        </View>
                    </View>

                    <Divider style={styles.divider} />

                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{ flex: 1, marginTop: 15 }}>
                            <Text style={styles.textDividerTitle}>Ẩn danh</Text>
                        </View>
                        <View style={styles.switchView}>
                            <Switch
                                value={this.state.anDanh}
                                onValueChange={(value) => this.setState({
                                    anDanh: value
                                })} />
                        </View>
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <TextInput
                            style={styles.textInput}
                            multiline={true}
                            placeholder='Vấn đề gặp phải'
                            onChangeText={(text) => this.setState({ vanDe: text })}
                            value={this.state.vanDe}
                        />
                    </View>

                    <View>
                        <View style={{ marginTop: 5, marginBottom: 10 }}>
                            <Text style={styles.textDividerTitle}>HÌNH ẢNH</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ width: 80, height: 80, marginRight: 10 }} onPress={() => this.pickImage()}>
                                <Image style={{ width: 80, height: 80 }} source={{ uri: 'https://image.freepik.com/free-icon/plus-sign-ios-7-interface-symbol_318-38775.jpg' }} />
                            </TouchableOpacity>
                            {this.state.images.map((image) => (
                                <Image style={{ width: 80, height: 80, marginRight: 10 }} source={{ uri: image.uri }}>
                                    <View style={{ alignSelf: 'flex-end', width: 25, marginRight: 1 }}>
                                        <Icon
                                            //raised
                                            size={20}
                                            name='x'
                                            type='octicon'
                                            onPress={() => this.deleteImage(image)} />
                                    </View>
                                </Image>
                            ))}
                        </View>
                    </View>

                    <View style={{ marginTop: 30 }}>
                        <View style={styles.buttonView}>
                            <Button
                                buttonStyle={styles.button}
                                onPress={() => this.findDoctor()}
                                title="Tìm bác sĩ"
                                textStyle={{ color: '#5198D0', fontSize: 18 }}
                            />
                        </View>
                    </View>
                    </View> */}
                </ParallaxScrollView>

                <Button
                    buttonStyle={styles.button}
                    onPress={() => this.findDoctor()}
                    title="Tìm bác sĩ"
                    textStyle={{ color: 'white', fontSize: 18 }}
                />

                {this.props.isFoundDoctor &&
                    <View style={styles.viewDoctorInfo}>
                        <FoundDoctor
                            idHoSo={this.state.idHoso}
                            vanDe={this.state.vanDe}
                            anDanh={this.state.anDanh}
                            navigation={this.props.navigation} />
                    </View>
                }
                {this.props.isFoundDoctor &&
                    <View style={styles.transparentView} />
                }
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        profilesList: state.user.profiles,
        listChuyenKhoa: state.kham.listChuyenKhoa,
        idGap: state.user.user.IdGap,
        isFoundDoctor: state.kham.isFoundDoctor,
        doctorInfo: state.kham.doctorInfo,
        proxy: state.kham.proxy
    }
}

export default connect(mapStateToProps, khamAction)(FindDoctor);
