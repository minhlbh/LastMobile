import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { CloseHeaderContainer } from '../../../components';
import { Icon, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import styles from './styles';
import images from '../../../config/images';
import TwilioVoice from 'react-native-twilio-programmable-voice';
import { initTelephony, initEventCall, connectCall } from '../../../kham/call.action';
import { storeDoctor } from '../../../kham/kham.action';

class DoctorInfo extends Component {
    state = {
        listDoctor: null
    }
    componentWillMount() {
        const { chuyenKhoa } = this.props.navigation.state.params;
        this.props.proxy.invoke('timBacSiTheoChuyenKhoa', chuyenKhoa.Id).done((directResponse) => {
            var res = JSON.parse(directResponse);
            this.setState({ listDoctor: res })
        })
        this.initCall().done();
    }
    onCall(idNguoiNhan, phone, idDichVu) {
        this.props.connectCall(idNguoiNhan,phone,idDichVu, this.props.navigation);
    }

    onChat (doctorInfo) {
        const { navigation ,storeDoctor} = this.props;   
        var doctor = {
            IdBacSi: doctorInfo.IdBacSi,
            TenBacSi: doctorInfo.HoVaTen,
            Avatar: doctorInfo.Avatar,
            GioiThieuNhanh: doctorInfo.GioiThieuNhanh,
            Phone: doctorInfo.SoPhone,
        }
        storeDoctor(doctor, doctorInfo.DsDichVu[0].IdDichVu);
        console.log(doctor, doctorInfo.DsDichVu[0].IdDichVu)
        navigation.navigate('FindDoctor', { 
            chuyenKhoa: navigation.state.params.chuyenKhoa,
            isTuVan: true 
        })
    }
    async initCall() {
        await initTelephony();
    }
    render() {
        const { navigation } = this.props;
        const { chuyenKhoa } = navigation.state.params;
        
        var doctorInfo = null;
        if (this.state.listDoctor) {
            doctorInfo = this.state.listDoctor[0];
        }
        return (
            <View style={styles.container}>
                <View style={{ flex: 5 }}>
                    <CloseHeaderContainer
                        onClose={() => navigation.goBack()}
                        title='Tìm bác sĩ'
                    >
                        <View style={styles.contentContainer}>
                            <Avatar
                                rounded
                                source={doctorInfo ? { uri: doctorInfo.Avatar } : images.defaultDoctor}
                                activeOpacity={10}
                                height={120}
                                width={120}
                            />
                            {doctorInfo ?
                                <View style={{alignItems: 'center'}}>
                                    <Text style={styles.doctorName}>{doctorInfo.HoVaTen}</Text>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <Icon name='hospital-o' type='font-awesome' containerStyle={{ marginRight: 5 }} />
                                        <Text style={{ fontSize: 15 }}>Chuyên khoa: {chuyenKhoa.Ten}</Text>
                                    </View>
                                    <Text style={{ marginTop: 20, }}>{doctorInfo.GioiThieuNhanh}</Text>
                                </View>
                                : <Text style={styles.doctorName}>Tất cả các bác sĩ đang bận</Text>}
                        </View>
                    </CloseHeaderContainer>
                </View>
                {doctorInfo &&
                <View style={styles.footerButtonContainer}>
                    <TouchableOpacity style={[styles.button, { borderRightWidth: 1, borderColor: '#f2f2f2' }]}
                        onPress={() => this.onCall(doctorInfo.IdBacSi, doctorInfo.SoPhone, doctorInfo.DsDichVu[0].IdDichVu)}
                    >
                        <Icon name='call' size={33} color='green' />
                        <Text style={{ color: 'black' }}>7.000 đ/phút</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => this.onChat(doctorInfo)}
                    >
                        <Icon name='ios-chatbubbles' type='ionicon' size={33} color='#bbb' />
                        <Text style={{ color: 'black' }}>80.000 đ/lượt tư vấn</Text>
                    </TouchableOpacity>
                </View>
                }
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        proxy: state.kham.proxy,
    }
}

export default connect(mapStateToProps, {connectCall,storeDoctor})(DoctorInfo);

