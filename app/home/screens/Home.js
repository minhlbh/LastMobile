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
    Loading, EmtyList, DoctorInfoPopup
} from '../../components';
import { connect } from 'react-redux';
//import * as userAction from '../../user/user.action';
import images from '../../config/images';
import { signOut } from '../../auth/auth.action';
import { resetNavigationTo } from '../../utils';
import { getProfiles, getUserInfo } from '../../user/user.action';

console.disableYellowBox = true;

class Home extends Component {
    constructor(props){
        super(props);
        this.state ={
            doctorInfo :{}, 
            showDoctorInfo: false
        }
        this.gapBacSi = this.gapBacSi.bind(this);
    }
    componentWillMount() {
        const {getProfiles ,getUserInfo} = this.props;
        getUserInfo();
        getProfiles();
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
            this.khaiBaoUser();
            navigation.navigate('ListChuyenKhoa');
        } else if (errorConnection) {
            alert(errorConnection);
        } else {
            alert('Chưa kết nối được với server');
        }
    }

    khaiBaoUser() {
        const { userInfo, proxy } = this.props;
        proxy.invoke('nguoiDungKhaiBaoUserName', userInfo.Email).done((directResponse) => {
            console.log('khai bao username thanh cong',directResponse);
        }).fail(() => {
            console.warn('khai bao username  fail');
            this.khaiBaoUser();
        });
    }

    showDoctorInfoPopup= (info) =>{
        console.log('aaaaa', info)
        this.setState({
            doctorInfo: info,
            showDoctorInfo: true
        })
    }
    render() {
        var { profilesList, navigation, userInfo, isPendingUser } = this.props;
        var DsGap = [];
        var DsBacSiCuaToi = [];
        if (userInfo.DsGap) {
            DsGap = userInfo.DsGap.reverse();
            DsBacSiCuaToi = userInfo.DsBacSiCuaToi;
        }
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
                                <TouchableOpacity onPress={() => navigation.navigate('Doctor')}>
                                    <View style={{ flex: 1, alignItems: 'flex-end', }}><Text style={styles.textdivider}> xem toàn bộ</Text></View>
                                </TouchableOpacity>}
                        </View>
                        <ListDoctors doctorsList={DsBacSiCuaToi} onPress={(item) => this.showDoctorInfoPopup(item)}/>
                        {DsBacSiCuaToi.length ==0 &&
                            <EmtyList 
                                info={{
                                    image: images.icon.doctorHome,
                                    text1: 'Bạn chưa kết nối với bác sĩ',
                                    btnIconName: 'ios-search-outline', btnIconType: 'ionicon', 
                                    btnText: 'Gặp bác sĩ tư vấn',
                                    color: '#42B72A'
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
                        <ListProfiles profilesList={profilesList.slice(0, 5)} />
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
                            {DsGap.length > 5 && <TouchableOpacity>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}><Text style={styles.textdivider}> xem toàn bộ</Text></View>
                            </TouchableOpacity>}
                        </View>
                        <ListHistory historyList={DsGap.slice(0,5)} navigation={navigation} khaiBaoUser={() => this.khaiBaoUser()} />
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
                {this.state.showDoctorInfo && 
                    <View style={styles.viewDoctorInfo}>
                        <DoctorInfoPopup 
                            doctorInfo={this.state.doctorInfo}
                        />
                    </View> 
                }
                {this.state.showDoctorInfo && 
                    <View style={styles.transparentView}/>
                }
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
        proxy: state.kham.proxy,
        errorConnection: state.kham.errorConnection
    };
}

export default connect(mapStateToProps, { signOut, getProfiles, getUserInfo })(Home);