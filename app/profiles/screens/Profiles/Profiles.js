import React, { Component } from 'react';
import {
   Text
} from 'react-native-elements';
import { View } from 'react-native';
import styles from './styles';
import { connect} from 'react-redux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {
    HeaderForeground,
    StickyHeader,
    ListProfiles
} from '../../../components';

class Profiles extends Component {
    render(){
        var {profilesList} = this.props;        
        return (
            <View style={styles.container}>
                <ParallaxScrollView
                    backgroundColor="white"
                    contentBackgroundColor="white"
                    parallaxHeaderHeight={80}
                    renderForeground={() => (
                        <HeaderForeground name='Hồ sơ bệnh án' icon2='search'/>
                    )}
                    stickyHeaderHeight={40}
                    renderStickyHeader={() => (
                        <StickyHeader name='Hồ sơ bệnh án' icon2='search'/>
                    )}
                >
                    <ListProfiles profilesList={profilesList}/>
                </ParallaxScrollView>
            </View>
        )
    }
}

function mapStateToProps(state){
    return {
        profilesList: state.user.profiles
    }
}
export default connect(mapStateToProps)(Profiles);