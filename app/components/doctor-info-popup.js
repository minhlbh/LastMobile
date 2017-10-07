import React from 'react';
import { StyleSheet, View,TouchableOpacity,Dimensions } from 'react-native';
import {Avatar, Text} from 'react-native-elements';
import colors from '../config/styles';


const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    textPanel2: {
        color: 'black',
        // marginLeft: 10,
        marginRight: 10,
    },
    viewAvatar: {
        alignSelf: 'center',
        zIndex: 3,
        position: 'absolute',
        marginTop: 105
    },
    viewInfo: {
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: 'white',
        marginTop: 190,
        zIndex: 2,
        height: 310,
        borderRadius:20
    },
    viewButton: {
        zIndex: 3,
        position: 'absolute',
        marginTop: 370,
        alignSelf: 'center'
    },
    button1: {
        borderWidth: 1.5,
        borderColor: '#5198D0',
        backgroundColor: 'white',
        borderRadius: 20,
        width: 100,
        height: 40,
    },
    buttonText1: {
        color: '#0E81FF',
        paddingTop: 5,
        paddingLeft: 15,
        fontSize: 18,
    },
    buttonText2: {
        color: '#686868',
        paddingTop: 5,
        paddingLeft: 15,
        fontSize: 18,
    },
    doctorName:{
        color: 'black',
        marginLeft: 10,
        marginRight: 10,
        fontSize:20,
        fontWeight:'bold'
    }
});


type Props = {
    doctorInfo: Object,
    onPressAccept: Function,
    onPressDecline: Function
}  

export const DoctorInfoPopup= ({doctorInfo ,onPressAccept,onPressDecline} : Props) =>{
  return (
    <View style={{width: deviceWidth - 60}}>
        <View style={styles.viewAvatar}>
            <Avatar
                containerStyle={{ width: 150, height: 150 }}
                xlarge
                rounded
                source={{ uri: doctorInfo.Avatar? doctorInfo.Avatar: 'http://www.phongkhammathaiyen.com/uploads/images/Hinh%20bai%20viet/Thumbnail/Thumb_BSMinhHuy.jpg' }}
                activeOpacity={1}
            />
        </View>
            <View style={styles.viewInfo}>
                <View style={{ alignItems: 'center', paddingTop: 74, backgroundColor: 'white', }}>
                    <Text h5 style={styles.textPanel2}>Bác sĩ</Text>
                    <Text style={styles.doctorName}>{doctorInfo.TenBacSi}</Text>
                </View>

                <View>
                    <View style={{ marginTop: 5, marginLeft: 30,alignSelf: 'center' }}>
                        <Text h5 style={styles.textPanel2}>{doctorInfo.TenDichVu}</Text>
                        <Text h5 style={styles.textPanel2}>{doctorInfo.gioiThieuNhanh}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 20, alignSelf: 'center' }}>
                        <Text h5 style={{ marginTop: 7, color: 'black' }}>Giá dịch vụ: </Text>
                        <Text h4 style={styles.doctorName}>{doctorInfo.giaTien}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', }}>
                    <TouchableOpacity style={{ marginLeft: -10 }}
                        onPress={onPressAccept}    
                    >
                        <View style={styles.button1}>
                            <Text style={styles.buttonText1}> Đồng ý</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginLeft: 30 }}
                        onPress= {onPressDecline}
                    >
                        <View style={styles.button}>
                            <Text style={styles.buttonText2}> Bỏ qua</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
    </View>
  )
}
