import React from 'react';
import { StyleSheet, View,TouchableOpacity ,Text} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {StickyHeader} from '../../components';
import { Icon } from 'react-native-elements';

type Props = {
  children?: React.Element<*>,
  onBack: Function,
  title : string
};

const styles = StyleSheet.create({
     foregroudText: {
        color: 'black',
        fontWeight: 'bold',
        marginLeft: 20,
        fontSize: 30
    }
});

export const ViewContainer = ({ onBack, children,title }: Props) =>
<View style={{ flex: 1, backgroundColor: 'white' }}>
    <ParallaxScrollView
        backgroundColor="white"
        contentBackgroundColor="white"
        parallaxHeaderHeight={100}
        renderFixedHeader={() => (
            <View style={{ position: 'absolute', height: 40, }}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', height: 40 }}
                    onPress={onBack}
                >
                    <Icon
                        name='chevron-left'
                        color='#1864D3'
                        size={40} />
                    <Text style={{ color: '#1864D3', fontSize: 16 }}>Quay lại</Text>
                </TouchableOpacity>
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

ViewContainer.defaultProps = {
  children: null,
};

