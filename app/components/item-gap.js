import React from 'react';
import {View, StyleSheet, Text ,TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';
import images from '../config/images';

type Props = {
    item: Object,
    onPress: Function
}  
export  const  ItemGap  = ({item, onPress } : Props ) =>{
    return(
        <TouchableOpacity style={styles.container}
            onPress={onPress}
        >
            <View style={styles.avatarContainer}>
                <Avatar
                    medium
                    rounded
                    source={item.HoSo.Avatar ? {uri: item.HoSo.Avatar} : images.defaultAvatar}
                    activeOpacity={0.7}
                />
                <Avatar
                    medium
                    rounded
                    source={item.BacSi.Avatar ? {uri: item.BacSi.Avatar} : images.defaultDoctor}
                    activeOpacity={0.7}
                    containerStyle={{marginRight: 10, marginLeft: 5}}
                />
                <View>
                    <Text style={styles.profileName}>{item.HoSo.HoVaTen}</Text>
                    <Text style={styles.doctorName}>{item.BacSi.TenBacSi}</Text>
                </View>
            </View>
            <Text style={styles.vanDe}>{item.VanDe}</Text>
            <View style={styles.footerContainer}>
                <Text style={styles.footerText}>{item.TrangThai}</Text>
                <Text style={styles.footerText}>{item.Update}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles= StyleSheet.create({
    container: {
        padding: 10
    },
    avatarContainer: {
        flexDirection : 'row',       
    },
    profileName: {
        fontSize: 18,
        color: 'black'
    },
    doctorName: {
        fontSize: 16,
        color: 'gray'
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    footerText: {
        color: '#C0C0C0'
    },
    vanDe: {
        color:'#808080',
        fontSize: 15,
        marginTop: 8
    }
})