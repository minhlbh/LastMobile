import React, { Component } from 'react';
import {
    View, TouchableOpacity, Picker, Switch, TextInput,  Image,FlatList
} from 'react-native';
import {
    Text, Icon, ListItem, Divider, Button,
} from 'react-native-elements';
import styles from './styles';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {HeaderForeground,StickyHeader} from '../../../components';
import { connect} from 'react-redux';
import * as khamAction from '../../kham.action';
import SignalR from '../../../kham/SignalR';

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
            images: [{ uri: 'https://image.freepik.com/free-icon/plus-sign-ios-7-interface-symbol_318-38775.jpg' , type: 'AddImage' }]
        }
    }

    componentWillMount(){
        this.props.getListChuyenKhoa();
        this.props.storeDoctorInfo();
    }

    componentDidUpdate(){
        if(this.props.isFoundDoctor){
            this.props.navigation.navigate('FoundDoctor');
        } 
    }
    pickImage(type) {
        if(type==='AddImage'){
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
                    //render ảnh 
                    var images = this.state.images;
                    let image = { uri: response.uri , type: 'PickedImage' };
                    images.push(image);
                    this.setState({
                        images: images
                    });
                }
            });
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
                    renderForeground={() => (
                        <HeaderForeground name='Gặp bác sĩ'/>                        
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
                                mode='dropdown'
                                selectedValue={this.state.valueHoSo}
                                onValueChange={(item) => this.setState({
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
                            {this.state.images.map((image)  =>  (                       
                                <TouchableOpacity style={{ width: 80, height: 80 , marginRight: 10}} onPress={() =>this.pickImage(image.type)}>
                                    <Image style={{ width: 80, height: 80 }} source={{ uri: image.uri }}
                                    />
                                </TouchableOpacity>     
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
