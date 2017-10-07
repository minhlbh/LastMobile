import  React, { Component } from 'react';
import {View,StyleSheet } from 'react-native';
import {
     Text,Avatar,Button
} from 'react-native-elements';
 

export class UserInfoHome extends Component {
    
    render(){
        const { userInfo} = this.props;
        return(
            <View>
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ flex: 1.5, alignItems: 'center', }}>       
                        <Avatar
                            large
                            rounded
                            source={userInfo.Avatar ? { uri: userInfo.Avatar }: { uri: "https://www.touristisrael.com/wp-content/uploads/justin-300x300.jpg" }}
                            activeOpacity={1}
                        />
                    </View>
                    <View style={{ flex: 4 }}>
                        <View style={{flexDirection: 'row'}}> 
                            <View style={styles.infoView}>
                                <Text style={styles.infoText}>{userInfo.TaiKhoanChinh} đ</Text>
                                <Text style={styles.infoTextSub}> TK Chính </Text>
                            </View>
                            <View style={styles.infoView}>
                                <Text style={styles.infoText}>{userInfo.TaiKhoanKhuyenMai}</Text>     
                                <Text style={styles.infoTextSub}>Lượt xem HS </Text>                            
                            </View>
                            <View style={styles.infoView}>
                                <Text style={styles.infoText}>20</Text>
                                <Text style={styles.infoTextSub}> Lịch sử </Text>                            
                            </View>                        
                        </View>
                        <Button 
                            title='Gói tư vấn'
                            borderRadius={4}
                            backgroundColor='#F1F1F1'
                            textStyle={{color: 'black', fontWeight: 'bold'}}
                            buttonStyle={{height: 30}}
                            containerViewStyle={{marginTop: 6}}
                        />
                    </View>         
                </View>
                <Text style={styles.name}>{userInfo.HoVaTen}</Text>                 
            </View>
        )
    }
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
    }
})