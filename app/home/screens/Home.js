import React, { Component } from 'react';
import { View, TouchableOpacity, } from 'react-native';
import styles from './styles';
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
    ListHistory,
    Loading, EmtyList
} from '../../components';
import { connect } from 'react-redux';
//import * as userAction from '../../user/user.action';
import images from '../../config/images';
import { signOut, storeToken } from '../../auth/auth.action';
import { resetNavigationTo, formatterCurrency } from '../../utils';
import { getProfiles, getUserInfo } from '../../user/user.action';
import { getProfileDetail} from '../../profiles/profile.action';
import {connectSignalR, storeDoctor} from '../../kham/kham.action';
import TwilioVoice from 'react-native-twilio-programmable-voice';
import {initEventCall} from '../../kham/call.action';

console.disableYellowBox = true;

class Home extends Component {
    constructor(props){
        super(props);
        this.gapBacSi = this.gapBacSi.bind(this);
    }
    componentWillMount() {
        const {getProfiles ,getUserInfo, navigation} = this.props;
        getUserInfo();
        getProfiles();
        this.props.connectSignalR();
        initEventCall(navigation);
    }

    signOut() {
        const { signOut, navigation } = this.props;
        signOut().then(() => {
            resetNavigationTo('Intro', navigation);
        });
    }
    gapBacSi() {
        const { navigation, isConnectedSignalR, errorConnection } = this.props;
        
        if (isConnectedSignalR) {
            navigation.navigate('ListChuyenKhoa');
        } else if (errorConnection) {
            alert(errorConnection);
        } else {
            alert('Chưa kết nối được với server');
        }
    }

    render() {
        var { profilesList, navigation, userInfo, isPendingUser } = this.props;
        var DsGap = [];
        var DsBacSiCuaToi = [];
        if (userInfo.DsGap) {
            DsGap = userInfo.DsGap.reverse();
            DsBacSiCuaToi = userInfo.DsBacSiCuaToi;
        }
        //console.log(userInfo)
        return (
            <View style={styles.container}>
                <ParallaxScrollView
                    backgroundColor="white"
                    contentBackgroundColor="white"
                    parallaxHeaderHeight={100}
                    renderFixedHeader={() => (
                        <FixedHeader icon1='notifications' icon2='settings' handleIconPress2={() => this.signOut()} />
                    )}
                    renderForeground={() => (
                        <HeaderForeground name='Sputnich' />
                    )}
                    stickyHeaderHeight={40}
                    renderStickyHeader={() => (
                        <StickyHeader name='Sputnich' />
                    )}
                >
                    {isPendingUser && <Loading center animating={isPendingUser} />}
                    {/* THÔNG TIN TÀI KHOẢN */}
                    <UserInfoHome userInfo={userInfo} />

                    <Divider style={styles.divider} />
                    {/* KHÁM ONLINE */}
                    <View style={{ marginRight: 30 }}>
                        <Tile
                            containerStyle={{ alignSelf: 'center', height: 100 }}
                            titleStyle={{ paddingTop: 30 }}
                            imageSrc={{ uri: images.khamOnline }}
                            imageContainerStyle={{ height: 100, }}
                            title="Gặp bác sĩ"
                            onPress={this.gapBacSi}
                            featured
                        />
                    </View>
                    
                    {/* BÁC SĨ */}
                    <View style={styles.listContainer}>
                        <View style={styles.headerListContainer}>
                            <View style={{ flex: 1 }}><Text style={styles.textDividerTitle}>BÁC SĨ CỦA TÔI</Text></View>
                            {DsBacSiCuaToi.length > 5 &&
                                <TouchableOpacity 
                                    onPress={() => navigation.navigate('Doctor')}
                                >
                                    <View style={{ flex: 1, alignItems: 'flex-end', }}><Text style={styles.textdivider}> xem toàn bộ</Text></View>
                                </TouchableOpacity>}
                        </View>
                        <ListDoctors doctorsList={DsBacSiCuaToi} onPress={(item) => {
                            this.props.getProfileDetail(item.IdBacSi)
                            navigation.navigate('ProfileDetail')
                        } }/>
                        {DsBacSiCuaToi.length ==0 &&
                            <EmtyList 
                                info={{
                                    image: images.icon.doctorHome,
                                    text1: 'Bạn chưa kết nối với bác sĩ',
                                    btnIconName: 'ios-search-outline', btnIconType: 'ionicon', 
                                    btnText: 'Gặp bác sĩ tư vấn',
                                    color: '#4A90E2'
                                }}
                                onPress={this.gapBacSi}
                            />}
                    </View>

                    {/* HỒ SƠ BỆNH ÁN */}
                    <View style={styles.listContainer}>
                        <View style={styles.headerListContainer}>
                            <View style={{ flex: 1 }}><Text style={styles.textDividerTitle}>HỒ SƠ BỆNH ÁN</Text></View>
                            {profilesList.length > 5 &&
                                <TouchableOpacity onPress={() => navigation.navigate('Profiles')}>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}><Text style={styles.textdivider}> xem toàn bộ</Text></View>
                                </TouchableOpacity>}
                        </View>
                        <ListProfiles 
                            profilesList={profilesList.slice(0, 5)} 
                            onPress={(item) => {
                                this.props.getProfileDetail(item.Id)
                                navigation.navigate('ProfileDetail')
                            } }/>
                        {profilesList.length > 0 ? 
                            <ListItem
                                roundAvatar
                                avatar={{ uri: 'https://www.computerhope.com/jargon/p/plus.gif' }}
                                title='Tạo mới hồ sơ'
                                titleStyle={{ color: '#546CA8' }}
                                onPress={()=> navigation.navigate('CreateFastProfile')}
                                containerStyle={{borderBottomColor: '#bbb',borderBottomWidth: 0}} 
                                hideChevron={true}                           
                            />
                        :
                            <EmtyList 
                                info={{
                                    image: images.icon.folderHome,
                                    text1: 'Bạn chưa có hồ sơ sức khỏe,',
                                    text2: 'Hãy tạo mới để quản lý sức khỏe của mình và người thân',
                                    btnIconName: 'plus', btnIconType: 'octicon', btnText: 'Tạo mới hồ sơ',
                                    color: '#4990E2'
                                }}
                                onPress={ () => navigation.navigate('CreateFastProfile')}
                        />}
                        
                    </View>
                    {/* LỊCH SỬ KHÁM CHỮA */}
                    <View style={styles.listContainer}>
                        <View style={styles.headerListContainer}>
                            <View style={{ flex: 1 }}><Text style={styles.textDividerTitle}>LỊCH SỬ KHÁM CHỮA</Text></View>
                            {DsGap.length > 5 && 
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('TuVan')}
                                >
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}><Text style={styles.textdivider}> xem toàn bộ</Text></View>
                                </TouchableOpacity>}
                        </View>
                        <ListHistory historyList={DsGap.slice(0,5)} navigation={navigation} storeDoctor={this.props.storeDoctor}/>
                        {DsGap ==0 &&
                            <EmtyList 
                                info={{
                                    image: images.icon.chatHome,
                                    text1: 'Bạn chưa có cuộc tư vấn nào với bác sĩ',
                                    btnIconName: 'ios-search-outline', btnIconType: 'ionicon', 
                                    btnText: 'Gặp bác sĩ tư vấn',
                                    color: '#ddd'
                                }}
                        />}
                    </View>
                </ParallaxScrollView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        profilesList: state.user.profiles,
        isConnectedSignalR: state.kham.isConnectedSignalR,
        userInfo: state.user.user,
        isPendingUser: state.user.isPendingUser,
        errorConnection: state.kham.errorConnection
    };
}

export default connect(mapStateToProps, { signOut, getProfiles, getUserInfo,getProfileDetail,connectSignalR ,storeDoctor})(Home);