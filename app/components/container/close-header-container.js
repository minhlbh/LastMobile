import React, { Component } from 'react';
import { View,Text,StyleSheet } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {StickyHeader} from '../../components';
import { Icon } from 'react-native-elements';

type Props = {
    children?: React.Element<*>,
    onClose: Function,
    title: string
};

const styles = StyleSheet.create({
    foregroudText: {
        color: 'black',
        fontWeight: 'bold',
        marginLeft: 20,
        fontSize: 30
    }
})

export const CloseHeaderContainer = ({ onClose, children, title }: Props) =>
    <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ParallaxScrollView
            backgroundColor="white"
            contentBackgroundColor="white"
            parallaxHeaderHeight={100}
            renderFixedHeader={() => (
                <View style={{paddingLeft: 20, position: 'absolute', height: 40, justifyContent: 'center'}}>
                    <Icon
                        name='close'
                        color='black'
                        size={25}
                        onPress={onClose} 
                    />
                </View>
            )}
            renderForeground={() => (
                <View style={{ flex: 1, marginTop: 40 }}>
                    <View style={{ flex: 1, }}>
                        <View>
                            <Text style={styles.foregroudText}>{title}</Text>
                        </View>
                    </View>
                </View>
            )}
            stickyHeaderHeight={40}
            renderStickyHeader={() => (
                <StickyHeader name={title} />
            )}>
            {children}
        </ParallaxScrollView>
    </View>;

CloseHeaderContainer.defaultProps = {
    children: null,
};
