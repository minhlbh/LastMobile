import React, { Component } from 'react';
import {
    View, TouchableOpacity, Picker, Switch, TextInput,  Image,FlatList
} from 'react-native';
import {
    Text, Icon, ListItem, Divider, Button,
} from 'react-native-elements';
import styles from './styles';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {HeaderForeground,StickyHeader,FixedHeader} from '../../../components';
import { connect} from 'react-redux';
import * as khamAction from '../../kham.action';
import SignalR from '../../../kham/SignalR';
import khamApi from '../../../api/khamApi';
import ModalDropdown from 'react-native-modal-dropdown';

var ImagePicker = require('react-native-image-picker');

var options = {
    title: 'Chọn ảnh cho bác sĩ xem',
    customButtons: [
      {name: 'fb', title: 'Choose Photo from Facebook'},
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };
class FindDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueHoSo: {},
            valueKhoa: '',
            anDanh: false,
            vanDe: '',
            images: []
        }
    }

    componentWillMount(){
        this.props.getListChuyenKhoa();
        this.props.storeDoctorInfo();
    }

    componentDidUpdate(){
        if(this.props.isFoundDoctor){
            this.props.navigation.navigate('FoundDoctor',{
                idHoSo: this.state.valueHoSo.Id,
                vanDe:this.state.vanDe,
                anDanh: this.state.anDanh
            });
        } 
        console.log(this.state.valueHoSo);
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
                    var image = res.location.replace('https://sharinglife.blob.core.windows.net/images/','');
                    
                    //up tên ảnh lên signalR 
                    SignalR.proxy.invoke('upAnh',image ,idGap)
                    .done((directResponse) => {
                        console.log('direct-response-from-server-upAnh', directResponse);
                    }).fail((e) => {
                            console.warn('up anh loi',e)
                    });   
                    var images = this.state.images;
                    images.push( { uri: response.uri , location: res.location });
                    this.setState({
                        images: images
                    });     
               })
                //render ảnh 
            }
        });    
    }

    deleteImage(image){
        khamApi.deleteImage(image.location).then((res) => {
            console.log(res)
        });
        var images = this.state.images;
        var i = images.indexOf(image);

        if(i != -1) {
            images.splice(i, 1);
            this.setState({images})
        }
    }

    findDoctor(){
        const {valueHoSo,valueKhoa,anDanh,vanDe} = this.state;
        const idGap = this.props.idGap;
        console.log(valueHoSo.Id)
        SignalR.proxy.invoke('timBacSiTheoChuyenKhoa', valueKhoa,valueHoSo.Id,anDanh,vanDe,idGap).done((directResponse) => {
            console.log('timBacSiTheoChuyenKhoa success');
        }).fail(() => {
            console.warn('Something went wrong when calling server, it might not be up and running?')
        });
    }

    render() {
        var {profilesList, listChuyenKhoa} = this.props;        
        return (
            <View style={styles.container}>
                <ParallaxScrollView
                    backgroundColor="white"
                    contentBackgroundColor="white"
                    parallaxHeaderHeight={80}
                    renderFixedHeader={() => (
                        <FixedHeader icon0='keyboard-arrow-left' navigation={this.props.navigation}/>
                    )}
                    renderForeground={() => (
                        <HeaderForeground name='Gặp bác sĩ'  />                        
                    )}
                    stickyHeaderHeight={30}
                    renderStickyHeader={() => (
                        <StickyHeader name='Gặp bác sĩ' />                        
                    )}>

                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{ flex: 1, marginTop: 15 }}>
                            <Text style={styles.textDividerTitle}>Hồ sơ</Text>
                        </View>
                        <View style={{ flex: 1, alignSelf: 'flex-end' }}>
                            <Picker
                                style={styles.picker}

                                selectedValue={this.state.valueHoSo}
                                onValueChange={(item,itemIndex) => this.setState({
                                    valueHoSo: item
                                })}>
                                <Picker.Item
                                    style={styles.textDividerTitle}
                                    label='Chọn hồ sơ' />
                                {profilesList.map((profile) =>(
                                    <Picker.Item
                                        style={styles.textDividerTitle}
                                        label={profile.HoVaTen} value={profile} 
                                    />  
                                ))}
                            </Picker>
                            <ModalDropdown
                            options={profilesList}
                            renderRow= {(profile) => <TouchableOpacity><Text>{profile.HoVaTen}</Text></TouchableOpacity>}
                            textStyle={{fontSize:20 }}
                            dropdownTextStyle={{fontSize:20}}
                            defaultValue={<TouchableOpacity style={{width:70, height:50}}><Text>Chọn Hồ Sơ...</Text></TouchableOpacity>}
                            onSelect={(item,value)=> this.setState({
                                valueHoSo: value
                            })}
                            />

                        </View>
                    </View>

                    <Divider style={styles.divider} />

                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{ flex: 1, marginTop: 15 }}>
                            <Text style={styles.textDividerTitle}>Khoa</Text>
                        </View>
                        <View style={{ flex: 1, alignSelf: 'flex-end' }}>
                            <Picker
                                style={styles.picker}
                                mode='dropdown'
                                selectedValue={this.state.valueKhoa}
                                onValueChange={(itemValue, itemIndex) => this.setState({
                                    valueKhoa: itemValue
                                })}>
                                {listChuyenKhoa.map((item) => (
                                    <Picker.Item
                                        style={styles.textDividerTitle}
                                        label={item.Name} value={item.Id}/>
                                ))}
                            </Picker>
                        </View>
                    </View>

                    <Divider style={styles.divider} />

                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{ flex: 1, marginTop: 15 }}>
                            <Text style={styles.textDividerTitle}>Ẩn danh</Text>
                        </View>
                        <View style={{ flex: 1, alignSelf: 'flex-end' }}>
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
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity style={{ width: 80, height: 80 , marginRight: 10}} onPress={() =>this.pickImage()}>
                                <Image style={{ width: 80, height: 80 }} source={{ uri: 'https://image.freepik.com/free-icon/plus-sign-ios-7-interface-symbol_318-38775.jpg' }}/>
                            </TouchableOpacity> 
                            {this.state.images.map((image)  =>  (                       
                                <Image style={{ width: 80, height: 80,marginRight: 10 }} source={{ uri: image.uri }}>
                                    <View style={{alignSelf: 'flex-end', width:25, marginRight:1 }}>
                                        <Icon
                                            //raised
                                            size = {20}
                                            name='x'
                                            type='octicon'
                                            onPress={() => this.deleteImage(image)} />
                                    </View>   
                                </Image>    
                            ))}
                        </View>
                    </View>

                    <View style={{ marginTop: 30 }}>
                        <View style={{ borderBottomWidth: 1.2, borderLeftWidth: 1.2, borderRightWidth: 1.2, borderTopWidth: 1.2, borderColor: '#5198D0' }}>
                            <Button
                                buttonStyle={styles.button}
                                onPress={() => this.findDoctor()}
                                title="Tìm bác sĩ"
                                textStyle={{ color: '#5198D0', fontSize: 18 }}
                            />
                        </View>
                    </View>
                </ParallaxScrollView>
            </View>
        )
    }
}

function mapStateToProps(state){
    return {
        profilesList: state.user.profiles,
        listChuyenKhoa: state.kham.listChuyenKhoa,
        idGap: state.user.user.IdGap,
        isFoundDoctor: state.kham.isFoundDoctor,
        doctorInfo: state.kham.doctorInfo
    }
}

export default connect(mapStateToProps,khamAction)(FindDoctor);
