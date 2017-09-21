import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './styles'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {
    Header, Avatar, ListItem, Tile, Divider, List, ListView, Icon, Text
} from 'react-native-elements';
import {
    HeaderForeground,
    StickyHeader,
    UserInfoHome,
    ListProfiles,
    ListDoctors,
    FixedHeader,
    ListHistory
} from '../../components';
import { connect } from 'react-redux';
import * as userAction from '../../user/user.action';
import images from '../../config/images';
import SignalR from '../../kham/SignalR';
var signalr = new SignalR();
console.disableYellowBox = true;

 class Home extends Component {
     constructor(props){
        super(props);   
        this.props.getUserInfo();   
        this.props.getProfiles();      
    }

    // componentWillMount(){
    //     signalr.getIsConnected().subscribe((rx) => {
    //         console.log("aaa:",rx)
    //     })
    // }
    componentDidMount(){
       
    }
    gapBacSi(){
        const {navigation} = this.props;
        this.khaiBaoUser()
        navigation.navigate('Kham');
    }
    khaiBaoUser(){
        const {userInfo} = this.props;
        SignalR.proxy.invoke('nguoiDungKhaiBaoUserName', userInfo.Email).done((directResponse) => {
            console.log('khai bao username thanh cong')
        }).fail(() => {
            console.warn('khai bao username thanh cong fail')
        });     
    }
    render() {
        var {profilesList, navigation, userInfo} = this.props;
        return (
            <View style={styles.container}>
                <ParallaxScrollView
                    backgroundColor="white"
                    contentBackgroundColor="white"
                    parallaxHeaderHeight={100}
                    renderFixedHeader={() => (
                        <FixedHeader icon1='notifications' icon2='settings' />
                    )}
                    renderForeground={() => (
                        <HeaderForeground name='Trưởng Khoa' />
                    )}
                    stickyHeaderHeight={30}
                    renderStickyHeader={() => (
                        <StickyHeader name='Trưởng Khoa' />
                    )}
                >
                    {/* THÔNG TIN TÀI KHOẢN */}
                    <UserInfoHome userInfo={userInfo} />

                    <Divider style={styles.divider} />

                    {/* KHÁM ONLINE */}
                    <Tile
                        containerStyle={{ alignSelf: 'center', height: 100 }}
                        titleStyle={{ paddingTop: 30 }}
                        imageSrc={{ uri: images.khamOnline }}
                        imageContainerStyle={{ height: 100 }}
                        title="Gặp bác sĩ"
                        onPress={()=>this.gapBacSi()}
                        featured
                    />
                    {/* HỒ SƠ BỆNH ÁN */}
                    <View style={styles.listContainer}>
                        <View style={styles.headerListContainer}>
                            <View style={{ flex: 1 }}><Text style={styles.textDividerTitle}>HỒ SƠ BỆNH ÁN</Text></View>
                            <TouchableOpacity>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}><Text style={styles.textdivider}> xem toàn bộ</Text></View>
                            </TouchableOpacity>
                        </View>
                        <ListProfiles profilesList={profilesList.slice(0, 5)} />
                        <ListItem
                            roundAvatar
                            avatar={{ uri: 'https://www.computerhope.com/jargon/p/plus.gif' }}
                            title='Tạo mới hồ sơ'
                            titleStyle={{ color: '#546CA8' }}
                        />
                    </View>
                
                    {/* BÁC SĨ */}
                    <View style={styles.listContainer}>
                        <View style={styles.headerListContainer}>
                            <View style={{ flex: 1 }}><Text style={styles.textDividerTitle}>BÁC SĨ CỦA TÔI</Text></View>
                            <TouchableOpacity>
                                <View style={{ flex: 1, alignItems: 'flex-end', }}><Text style={styles.textdivider}> xem toàn bộ</Text></View>
                            </TouchableOpacity>
                        </View>
                        <ListDoctors doctorsList={userInfo.DsBacSiCuaToi} />
                    </View>

                    {/* LỊCH SỬ KHÁM CHỮA */}
                    <View style={styles.listContainer}>
                        <View style={styles.headerListContainer}>
                            <View style={{ flex: 1 }}><Text style={styles.textDividerTitle}>LỊCH SỬ KHÁM CHỮA</Text></View>
                            <TouchableOpacity>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}><Text style={styles.textdivider}> xem toàn bộ</Text></View>
                            </TouchableOpacity>
                        </View>

                        <ListHistory historyList={userInfo.DsGap} navigation={this.props.navigation} khaiBaoUser={()=>this.khaiBaoUser()}/>
                    </View>
                </ParallaxScrollView>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        profilesList: state.user.profiles,
        isConnectedSignalR: state.kham.isConnectedSignalR,
        userInfo: state.user.user,
        isPendingUser : state.user.isPendingUser,
    }
}

export default connect(mapStateToProps, userAction)(Home);