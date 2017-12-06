import  React, { Component } from 'react';
import {View,StyleSheet } from 'react-native';
import {
     Text,Avatar,Button
} from 'react-native-elements';
import {formatterCurrency } from '../utils';


type Props = {
    userInfo: Object,
    onPress: Function
}  
  

export const UserInfoHome= ({userInfo ,onPress} : Props) =>{
        return(
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ flex: 1.5, alignItems: 'center', }}>       
                        <Avatar
                            large
                            rounded
                            source={userInfo.Avatar ? { uri: userInfo.Avatar }: { uri: "https://www.touristisrael.com/wp-content/uploads/justin-300x300.jpg" }}
                            activeOpacity={1}
                        />
                    </View>
                    <View style={{ flex: 4 , justifyContent: 'center'}}>
                        <Text style={styles.name}>{userInfo.HoVaTen}</Text>
                        <Text style={styles.infoTextSub}> TK Chính: {formatterCurrency.format(userInfo.TaiKhoanChinh)}</Text>
                        <Text style={styles.infoTextSub}> Sổ y bạ: 0 sổ </Text>                      
                    </View>         
                </View>                         
            </View>
        )
    }

const styles = StyleSheet.create({
    infoTextSub:{
        fontSize:13,
    },
    infoView:{
        flex: 1,
        alignItems: 'center'
    },
    infoText:{
        fontSize:15,
        color:'black',
        fontWeight: 'bold'        
    },
    name:{ 
        marginTop: 3,
        fontSize: 18, 
        fontWeight: 'bold',
        color: 'black' 
    },
    container:{
        backgroundColor: 'white',
        paddingBottom: 10
    }
})