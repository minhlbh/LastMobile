import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity,Dimensions
} from 'react-native';
import styles from './styles'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {
    Header, Avatar, ListItem, Tile, Divider, List, ListView, Icon

} from 'react-native-elements';

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
export default class Home extends Component {
    render() {
        return (
            <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10, backgroundColor: 'white' }}>
                <ParallaxScrollView
                    backgroundColor="white"
                    contentBackgroundColor="white"
                    parallaxHeaderHeight={100}
                    renderForeground={() => (
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
                            <View style={{ flex: 1, }}>
                                <TouchableOpacity>
                                    <Text style={{ fontSize: 25, color: 'black' }}>Trưởng khoa</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 / 3, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <TouchableOpacity>
                                    <Icon
                                        style={{ marginRight: 10 }}
                                        name='notifications'
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Icon
                                        name='settings' />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    stickyHeaderHeight={30}
                    renderStickyHeader={() => (
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.viewHeader}>
                                <Text style={styles.generalText}>Trưởng khoa</Text>
                            </View>
                            <View style={{ flex: 4/4, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <TouchableOpacity>
                                    <Icon
                                        style={{ marginRight: 10 }}
                                        name='notifications'
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Icon
                                        name='settings' />
                                </TouchableOpacity>
                            </View>
                        </View>

                    )}>
                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ flex: 2 / 3, alignItems: 'center', }}>
                            <TouchableOpacity>
                                <Avatar
                                    large
                                    rounded
                                    source={{ uri: "https://www.touristisrael.com/wp-content/uploads/justin-300x300.jpg" }}
                                    activeOpacity={1}

                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 4 / 4, }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Họ và tên</Text>
                            <Text style={styles.infoText}>098098098</Text>
                            <Text style={styles.infoText}>TK Chính: 100.000 đ</Text>
                            <Text style={styles.infoText}>TK Khuyến mại: 20.000 đ</Text>
                        </View>
                    </View>
                    <Divider style={styles.divider} />
                    <Tile

                        containerStyle={{ alignSelf: 'center', height: 100 }}
                        titleStyle={{ paddingTop: 30 }}
                        imageSrc={{ uri: 'http://bvtwct.vn/images/1338794704kkb.jpg' }}
                        imageContainerStyle={{ height: 100 }}
                        title="Gặp bác sĩ"
                        featured
                    />
                    <View>
                        <View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}><Text style={styles.textDividerTitle}>HỒ SƠ BỆNH ÁN</Text></View>
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
                                                titleStyle={{ color: l.color }}
                                            />
                                        </TouchableOpacity>
                                    ))
                                }
                            </List>
                        </View>

                    </View>
                    <View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}><Text style={styles.textDividerTitle}>BÁC SĨ</Text></View>
                            <TouchableOpacity>
                                <View style={{ flex: 1, alignItems: 'flex-end', }}><Text style={styles.textdivider}> xem toàn bộ</Text></View>
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

                    <View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
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