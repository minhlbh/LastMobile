import React, { Component } from 'react';
import {View,TouchableOpacity} from 'react-native';
import {Avatar,Text,Divider,Icon} from 'react-native-elements';
import {StickyHeader, ListHistory} from '../../../components';
import styles from './styles';
import { connect } from 'react-redux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

class ProfileDetail extends Component {
    // componentWillMount(){
    //     const {profileInfo} =  this.props.navigation.state.params;        
    //     accountApi.profileDetail(this.props.accessToken, profileInfo.Id).then((res) => {
    //         console.log(res)
    //         this.setState({profile: res.HoSo})
    //     })
    // }
    
    render(){
        const { navigation,profileInfo} = this.props;
        var date = new Date(profileInfo.NgaySinh)
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <ParallaxScrollView
                    backgroundColor="white"
                    contentBackgroundColor="white"
                    parallaxHeaderHeight={220}
                    renderFixedHeader={() => (
                        <View style={{ position: 'absolute',flexDirection: 'row', flex:1}}>
                            <View style={{flex:1}}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', width: 100}}
                                onPress={()=> navigation.goBack()}
                            >
                                <Icon
                                    name='chevron-left'
                                    color='#1864D3'
                                    size={40} />
                                <Text style={{ color: '#4385D5', fontSize: 16 }}>Quay lại</Text>
                            </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={{alignSelf: 'center' , marginRight: 20}}
                                onPress={()=> navigation.navigate('EditProfile')}
                            >
                                <Text>Sửa</Text>
                            </TouchableOpacity>            
                        </View>
                    )}
                    renderForeground={() => (
                        <View style={{alignItems: 'center', height: 220, marginTop: 40}}>
                            <Avatar large rounded source={{uri: profileInfo.Avatar}}/>
                            <Text style={{fontSize: 22, color:'black', marginTop: 10}} >{profileInfo.HoVaTen}</Text>
                            <View style={styles.itemContainer}>
                                <View style={styles.itemView} > 
                                    <Text>{profileInfo.QuanHe}</Text>
                                    <Text style={styles.itemTitle}>Quan Hệ</Text>
                                </View>
                                <View style={styles.itemView} > 
                                    <Text>{profileInfo.GioiTinh}</Text>
                                    <Text style={styles.itemTitle}>Giới tính</Text>
                                </View>
                                <View style={styles.itemView} > 
                                    <Text>{date.getFullYear()}</Text>
                                    <Text style={styles.itemTitle}>Năm sinh</Text>
                                </View>
                            </View>
                        </View>
                    )}
                    stickyHeaderHeight={40}
                    renderStickyHeader={() => (
                        <StickyHeader name={profileInfo.HoVaTen} />
                    )}>
                  
                    <Divider style={{ backgroundColor: '#BBBBBB', marginTop: 10 }} />    
                    <ListHistory historyList={profileInfo.DsCuocGap} navigation={navigation}/>
                </ParallaxScrollView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        profileInfo: state.profile.profileInfo
    };
}

export default connect(mapStateToProps)(ProfileDetail);