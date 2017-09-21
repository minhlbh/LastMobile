import React, { Component } from 'react';
import {
    View,Image
} from 'react-native';
import {
    Text, Icon, ListItem, Divider, Button,
} from 'react-native-elements';
import { connect} from 'react-redux';
import styles from './styles';

class FoundDoctor extends Component{
    constructor(props){
        super(props);
        this.props.proxy.on('moiBacSi_BacSiTraLoi', (TraLoi, IdGap) => {
            console.log('Bác sĩ trả lời ',TraLoi)
            alert(TraLoi);
        });
    }

    inviteDoctor(){
        const { doctorInfo,idGap,navigation} = this.props;
        const {idHoSo,anDanh,vanDe} = navigation.state.params
        navigation.navigate('Chat');
        console.log(idGap);
        this.props.proxy.invoke('moiBacSi', doctorInfo.bacSiId,doctorInfo.idDichVu,idHoSo, anDanh, vanDe,idGap).done((directResponse) => {
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
        proxy: state.kham.proxy        
    }
}

export default connect(mapStateToProps)(FoundDoctor);
