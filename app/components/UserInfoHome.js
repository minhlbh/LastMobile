import  React, { Component } from 'react';
import {View,StyleSheet } from 'react-native';
import {
     Text,Avatar
} from 'react-native-elements';
 

export class UserInfoHome extends Component {
    
    render(){
        const { userInfo} = this.props;
        return(
            <View style={{ flexDirection: 'row', }}>
            <View style={{ flex: 2 / 3, alignItems: 'center', }}>
                {userInfo.Avatar ?
                    <Avatar
                        large
                        rounded
                        source={{ uri: userInfo.Avatar }}
                        activeOpacity={1}
                    /> :
                    <Avatar
                        large
                        rounded
                        source={{ uri: "https://www.touristisrael.com/wp-content/uploads/justin-300x300.jpg" }}
                        activeOpacity={1}
                    />    
                }
            </View>
            <View style={{ flex: 4 / 4, }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>{userInfo.HoVaTen}</Text>
                <Text style={styles.infoText}>{userInfo.Phone}</Text>
                <Text style={styles.infoText}>TK Chính: 100.000 đ</Text>
                <Text style={styles.infoText}>TK Khuyến mại: 20.000 đ</Text>
            </View>                                     
            </View>
        )
    }
}

const styles = StyleSheet.create({
    infoText:{
        fontSize:13
    },
})