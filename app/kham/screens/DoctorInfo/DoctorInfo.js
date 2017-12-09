import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { CloseHeaderContainer } from '../../../components';
import { Icon, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import styles from './styles';
import images from '../../../config/images';
import TwilioVoice from 'react-native-twilio-programmable-voice';
import {initTelephony, initEventCall} from '../../../kham/call.action';

class DoctorInfo extends Component {
    state = {}
    componentWillMount(){
        this.initCall().done();
    }
    onCall(){
        TwilioVoice.connect({To: '0911416817'});
        this.props.navigation.navigate('Call', {
            data :{
                call_from: 'Sputnich'
            },
            isComingCall: false
        })
    }

    async initCall (){
        await initTelephony();
    }
    render() {
        const { navigation } = this.props;
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
                                source={images.defaultDoctor}
                                activeOpacity={10}
                                height={120}
                                width={120}
                            />
                            <Text style={styles.doctorName}>BS. Đỗ Thành Phúc</Text>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <Icon name='hospital-o' type='font-awesome' containerStyle={{ marginRight: 5 }} />
                                <Text style={{ fontSize: 15 }}>Bệnh viện việt pháp hà nội</Text>
                            </View>
                            <Text style={{ marginTop: 20, }}>Phòng khám bệnh Bs Phúc là một thương hiệu đảm bảo sức khỏe cho nhân dân trong khu vực đã tồn tại vững chắc và phát triển liên tục trong hơn 30 năm qua</Text>
                        </View>
                    </CloseHeaderContainer>
                </View>

                <View style={styles.footerButtonContainer}>
                    <TouchableOpacity style={[styles.button, { borderRightWidth: 1, borderColor: '#f2f2f2' }]}
                        onPress={() => this.onCall()}
                    >
                        <Icon name='call' size={33} color='green' />
                        <Text style={{color:'black'}}>7.000 đ/phút</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => navigation.navigate('FindDoctor',{chuyenKhoa: navigation.state.params.chuyenKhoa})}
                    >
                        <Icon name='ios-chatbubbles' type='ionicon' size={33} color='#bbb' />
                        <Text style={{color:'black'}}>80.000 đ/lượt tư vấn</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

export default connect()(DoctorInfo);

