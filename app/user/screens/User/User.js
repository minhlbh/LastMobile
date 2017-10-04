import React, { Component } from 'react';
import {
    Text, List, Avatar, ListItem, Divider, Button, Icon
} from 'react-native-elements';
import {
    View, TouchableOpacity,
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {
    HeaderForeground,
    StickyHeader,
    UserInfoHome,
    ListProfiles,
    ListDoctors,
    FixedHeader,
    ListHistory,
    Loading
} from '../../../components';
import {connect } from 'react-redux';
import {signOut} from '../../../auth/auth.action';
import {resetNavigationTo} from '../../../utils';

const list = [
    {
        title: 'Thông tin tài khoản',
        icon: 'key',
        type: 'material-community'
    },
    {
        title: 'Hồ sơ của tôi',
        icon: 'note',
        type: 'material-community'
    },
    {
        title: 'Bác sĩ của tôi',
        icon: 'user-md',
        type: 'font-awesome'
    },

]
class User extends Component {
    signOut(){
        const { signOut, navigation } = this.props;        
        signOut().then(()=>{
            resetNavigationTo('Intro',navigation);
        })
    }
    render() {
        const { userInfo } = this.props;    
        return (
            <View style={{ flex: 1 }}>
                <ParallaxScrollView
                    backgroundColor="white"
                    contentBackgroundColor="white"
                    parallaxHeaderHeight={130}
                    //renderFixedHeader={() => (
                    //    <FixedHeader icon1='notifications' icon2='settings' handleIconPress2={() => this.signOut()} />
                    //)}
                    renderForeground={() => (
                        <View style={{ height: 130, justifyContent: 'center' }}>
                            <UserInfoHome userInfo={userInfo}/>
                        </View>
                    )}
                    stickyHeaderHeight={40}
                    renderStickyHeader={() => (
                        <StickyHeader name={userInfo.HoVaTen} />
                    )}
                >
                    <View style={{}}>
                        <Divider style={{ backgroundColor: '#BBBBBB', marginTop: 10 }} />

                        <View style={{ paddingTop: 20 }}>
                            <List>
                                {
                                    list.map((item, i) => (
                                        <TouchableOpacity>
                                            <ListItem
                                                key={i}
                                                title={item.title}
                                                leftIcon={{ name: item.icon, type: item.type, color: 'black' }}
                                                containerStyle={{ height: 60, justifyContent: 'center' }}
                                                titleStyle={{ fontSize: 16 }}
                                            />
                                        </TouchableOpacity>
                                    ))
                                }
                            </List>
                        </View>
                        <TouchableOpacity style={{ borderWidth: 1, marginTop: 70, height: 40, alignItems: 'center', borderColor:'#BBBBBB' }}
                                onPress={()=> this.signOut()}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'center', height: 40 }}>
                                <Icon
                                    name='power-off'
                                    type='font-awesome'
                                />
                                <View style={{ height: 40, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 16, marginLeft: 10 }}>Đăng xuất</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ParallaxScrollView>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        userInfo: state.user.user,
    }
}
export default  connect(mapStateToProps,{signOut})(User);
