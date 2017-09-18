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
    FixedHeader
} from '../../components';
import { connect } from 'react-redux';
import * as userAction from '../../user/user.action';
import images from '../../config/images';

const list = [
    {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Con',
        color: 'black'
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Bố',
        color: 'black',
    },
    {
        name: 'Tạo mới hồ sơ',
        avatar_url: 'https://www.computerhope.com/jargon/p/plus.gif',
        color: '#546CA8'
    }
]
const doctorsList = [
    {
        HoVaTen: 'Nguyễn Huy Hiệp',
        Avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        ChuyenKhoa: 'Tai mũi họng',
    },
    {
        HoVaTen: 'Đỗ Thành Phúc',
        Avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        ChuyenKhoa: 'Bác sĩ đa khoa đầu ngành',
    }
]
class Home extends Component {
    constructor(props) {
        super(props);
        this.props.getUserInfo();
        this.props.getProfiles();
    }

    render() {
        var { userInfo, profilesList } = this.props;
        return (
            <View style={styles.container}>
                <ParallaxScrollView
                    backgroundColor="white"
                    contentBackgroundColor="white"
                    parallaxHeaderHeight={100}
                    renderFixedHeader={() => (
                        <FixedHeader icon1 ='notifications' icon2='settings' />
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
                            <View style={{ flex: 1 }}><Text style={styles.textDividerTitle}>BÁC SĨ</Text></View>
                            <TouchableOpacity>
                                <View style={{ flex: 1, alignItems: 'flex-end', }}><Text style={styles.textdivider}> xem toàn bộ</Text></View>
                            </TouchableOpacity>
                        </View>
                        <ListDoctors doctorsList={doctorsList} />
                    </View>

                    {/* LỊCH SỬ KHÁM CHỮA */}
                    <View>
                        <View style={styles.headerListContainer}>
                            <View style={{ flex: 1 }}><Text style={styles.textDividerTitle}>LỊCH SỬ KHÁM CHỮA</Text></View>
                            <TouchableOpacity>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}><Text style={styles.textdivider}> xem toàn bộ</Text></View>
                            </TouchableOpacity>
                        </View>


                        <List containerStyle={{ marginBottom: 20 }}>
                            {
                                list.map((l, i) => (
                                    <TouchableOpacity>
                                        <ListItem
                                            roundAvatar
                                            avatar={{ uri: l.avatar_url }}
                                            key={i}
                                            title={l.name}
                                            subtitle={l.subtitle}
                                        />
                                    </TouchableOpacity>
                                ))
                            }
                        </List>
                    </View>
                </ParallaxScrollView>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        userInfo: state.user.user,
        isPendingUser: state.user.isPendingUser,
        profilesList: state.user.profiles
    }
}

export default connect(mapStateToProps, userAction)(Home);