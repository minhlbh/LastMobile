import React, { Component } from 'react';
import {
    View,Image,TouchableOpacity
} from 'react-native';
import {
    Text, Icon, ListItem, Divider, Button, Avatar
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

//     <View  style={styles.container}>
//     <Text h3> Tìm được bác sĩ </Text>
//     <Text>
//         Tên Bác sĩ : {doctorInfo.hoVaTen} {'\n'}
//         Giá Tiền : {doctorInfo.giaTien} {'\n'}
//         Giới thiệu nhanh : {doctorInfo.gioiThieuNhanh} {'\n'}
//         Tên dịch vụ : {doctorInfo.tenDichVu} {'\n'}
//     </Text>
//     <View style={{ marginTop: 30 }}>
//         <View style={{ borderBottomWidth: 1.2, borderLeftWidth: 1.2, borderRightWidth: 1.2, borderTopWidth: 1.2, borderColor: '#5198D0' }}>
//             <Button
//                 buttonStyle={styles.button}
//                 onPress={() => this.inviteDoctor()}
//                 title="Mời bác sĩ"
//                 textStyle={{ color: '#5198D0', fontSize: 18 }}
//             />
//         </View>
//     </View>
// </View>
    inviteDoctor(){
        const { doctorInfo,idGap,navigation,idHoSo,anDanh,vanDe} = this.props;
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
            <View>
            <View style={styles.viewAvatar}>
                <Avatar
                    containerStyle={{ width: 155, height: 155 }}
                    xlarge
                    rounded
                    source={{ uri: 'http://www.phongkhammathaiyen.com/uploads/images/Hinh%20bai%20viet/Thumbnail/Thumb_BSMinhHuy.jpg' }}
                    activeOpacity={1}
                />
            </View>
                <View style={styles.viewInfo}>
                    <View style={{ alignItems: 'center', paddingTop: 74, backgroundColor: 'white', }}>
                        <Text h5 style={styles.textPanel2}>Bác sĩ</Text>
                        <Text style={styles.doctorName}>{doctorInfo.hoVaTen}</Text>
                    </View>

                    <View>
                        <View style={{ marginTop: 5, marginLeft: 30 }}>
                            <Text h5 style={styles.textPanel2}>{doctorInfo.tenDichVu}</Text>
                            <Text h5 style={styles.textPanel2}>{doctorInfo.gioiThieuNhanh}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 20, alignSelf: 'center' }}>
                            <Text h5 style={{ marginTop: 7, color: 'black' }}>Giá dịch vụ: </Text>
                            <Text h4 style={styles.doctorName}>{doctorInfo.giaTien}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', }}>
                        <TouchableOpacity style={{ marginLeft: -10 }}
                            onPress={()=>this.inviteDoctor()}    
                        >
                            <View style={styles.button1}>
                                <Text style={styles.buttonText1}> Đồng ý</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginLeft: 30 }}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText2}> Bỏ qua</Text>
                            </View>
                        </TouchableOpacity>
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
