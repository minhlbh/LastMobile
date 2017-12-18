import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar, Icon } from "react-native-elements";
import TwilioVoice from 'react-native-twilio-programmable-voice';
import styles from './styles';
import images from '../../../config/images';
import * as callAction from '../../call.action';
import { connect } from 'react-redux';

class Call extends Component {
    state = {
        isCalling: false,
        timming: 0,
        interval: null
    }

    componentWillMount() {
        const { isComingCall } = this.props.navigation.state.params;
        if (!isComingCall) this.setState({ isCalling: true })
    }
    onCall() {
        TwilioVoice.accept();
        this.setState({ isCalling: true })
    }

    reject() {
        if (this.state.isCalling) {
            TwilioVoice.disconnect();
        } else {
            TwilioVoice.reject();
        }
        this.props.navigation.goBack();
    }

    componentDidMount() {
        TwilioVoice.addEventListener('connectionDidConnect', function (data) {
            console.log(data)
            //if (data.call_state === 'ACCEPTED') {
                const interval = setInterval(function () {
                    const { isComingCall } = this.props.navigation.state.params;
                    this.setState({ timming: this.state.timming + 1 })
                    if (this.state.timming % 10 == 0 && !isComingCall) {
                        const { idCuocGoi, updateCall } = this.props;
                        updateCall(idCuocGoi, this.state.timming, false)
                    }
                }.bind(this), 1000)
                this.setState({interval})
            //}
        }.bind(this))
        TwilioVoice.addEventListener('connectionDidDisconnect', function(data) {
            clearInterval(this.state.interval)
            console.log(data)
            const { idCuocGoi, updateCall } = this.props;
            updateCall(idCuocGoi, this.state.timming, true);
            this.props.navigation.goBack();
        }.bind(this))
    }

    render() {
        const { data } = this.props.navigation.state.params;
        return (
            <View style={styles.container}>

                <View style={styles.panelName}>
                    <Text style={[styles.text, { fontSize: 25 }]}>Bác sĩ : {data.call_from}</Text>
                    {this.state.timming == 0 ?
                        <Text style={styles.text}>Đang liên hệ...</Text>
                        :
                        <Text style={styles.text}>đã kết nối {this.state.timming} giây</Text>
                    }
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

function mapStateToProps(state) {
    return {
        isPendingConnectCall: state.kham.isPendingConnectCall,
        choPhepCall: state.kham.choPhepCall,
        liDoTuChoiCall: state.kham.liDoTuChoiCall,
        soGiayConLaiCall: state.kham.soGiayConLaiCall,
        idCuocGoi: state.kham.idCuocGoi,
    }
}

export default connect(mapStateToProps, callAction)(Call);
