import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar, Icon } from "react-native-elements";
import TwilioVoice from 'react-native-twilio-programmable-voice';
import styles from './styles';
import images from '../../../config/images';

class Call extends Component {
    state = {
        isCalling: false
    }

    onCall() {
        TwilioVoice.accept();
        this.setState({isCalling: true})
    }

    reject() {
        if(this.state.isCalling){
            TwilioVoice.disconnect()
        } else {
            TwilioVoice.reject();            
        }
        this.props.navigation.goBack();
    }
    render() {
        return (
            <View style={styles.container}>

                <View style={styles.panelName}>
                    <Text style={[styles.text, { fontSize: 25 }]}>Bác sĩ</Text>
                    <Text style={styles.text}>Đang liên hệ...</Text>
                </View>

                <View style={styles.panelAvatar}>
                    <Avatar
                        rounded
                        containerStyle={{}}
                        xlarge
                        source={images.defaultDoctor}
                    />
                </View>
                <View style={styles.panelAction}>
                    <Icon
                        size={27}
                        reverse
                        type='ionicon'
                        name='ios-mic-off-outline'
                        color='rgba(255, 255, 255, .4)'
                    />
                    
                    {!this.state.isCalling && 
                    <Icon
                        containerStyle={{ marginLeft: 20 }}
                        size={27}
                        reverse
                        type="material-icon"
                        name='call'
                        color='green' 
                        onPress={() => this.onCall()}
                    />}

                    <Icon
                        containerStyle={{ marginLeft: 20, marginRight: 20 }}
                        size={27}
                        reverse
                        type="material-icon"
                        name='call-end'
                        color='#DD3218' 
                        onPress={() => this.reject()}
                    />
                    <Icon
                        size={27}
                        reverse
                        type='ionicon'
                        name='ios-volume-up-outline'
                        color='rgba(255, 255, 255, .4)'
                    />
                </View>

            </View>
        )
    }
}

export default Call;
