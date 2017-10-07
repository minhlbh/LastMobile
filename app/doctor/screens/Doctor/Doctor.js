import React, { Component } from 'react';
import {
   Text
} from 'react-native-elements';
import {
    View
} from 'react-native';
import { connect} from 'react-redux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {
    HeaderForeground,
    StickyHeader,
    ListDoctors,
    FixedHeader
} from '../../../components';
import styles from './styles';
class Doctor extends Component {
    render(){
        const {doctorList} = this.props;
        return (
            <View style={styles.container}>
                <ParallaxScrollView
                    backgroundColor="white"
                    contentBackgroundColor="white"
                    parallaxHeaderHeight={80}
                    renderForeground={() => (
                        <HeaderForeground name='Bác sĩ của tôi' />
                    )}
                    renderFixedHeader={() => (
                        <FixedHeader  icon2='search' />
                    )}
                    stickyHeaderHeight={40}
                    renderStickyHeader={() => (
                        <StickyHeader name='Bác sĩ của tôi' />
                    )}
                >
                    <ListDoctors doctorsList={doctorList}/>
                </ParallaxScrollView>
            </View>
        )
    }
}

function mapStateToProps(state){
    return {
        doctorList: state.user.user.DsBacSiCuaToi
    }
}

export default connect(mapStateToProps)(Doctor);