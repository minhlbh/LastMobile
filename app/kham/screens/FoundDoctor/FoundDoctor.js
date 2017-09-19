import React, { Component } from 'react';
import {
    View,Image
} from 'react-native';
import {
    Text, Icon, ListItem, Divider, Button,
} from 'react-native-elements';
import { connect} from 'react-redux';
import styles from './styles';
import SignalR from '../../../kham/SignalR';

class FoundDoctor extends Component{
    constructor(props){
        super(props);
        SignalR.proxy.on('moiBacSi_BacSiTraLoi', (TraLoi, IdGap)=> {
            console.log('Bác sĩ trả lời ',TraLoi)
            alert(TraLoi);
        });
    }
    inviteDoctor(){
        const { doctorInfo,idGap} = this.props;
        console.log(idGap);
        SignalR.proxy.invoke('moiBacSi', doctorInfo.idDichVu,doctorInfo.bacSiId,idGap).done((directResponse) => {
        }).fail(() => {
            console.warn('Something went wrong when calling server, it might not be up and running?')
        });
    }
    render(){
        const {doctorInfo} = this.props;
        return (
            <View  style={styles.container}>
                <Text h3> Tìm được bác sĩ </Text>
                <Text>
                    Tên Bác sĩ : {doctorInfo.hoVaTen} {'\n'}
                    Giá Tiền : {doctorInfo.giaTien} {'\n'}
                    Giới thiệu nhanh : {doctorInfo.gioiThieuNhanh} {'\n'}
                    Tên dịch vụ : {doctorInfo.tenDichVu} {'\n'}
                </Text>
                <View style={{ marginTop: 30 }}>
                    <View style={{ borderBottomWidth: 1.2, borderLeftWidth: 1.2, borderRightWidth: 1.2, borderTopWidth: 1.2, borderColor: '#5198D0' }}>
                        <Button
                            buttonStyle={styles.button}
                            onPress={() => this.inviteDoctor()}
                            title="Mời bác sĩ"
                            textStyle={{ color: '#5198D0', fontSize: 18 }}
                        />
                    </View>
                </View>
            </View>
        )   
    }
}

function mapStateToProps(state){
    return {
        doctorInfo: state.kham.doctorInfo,
        idGap: state.user.user.IdGap,        
    }
}

export default connect(mapStateToProps)(FoundDoctor);
