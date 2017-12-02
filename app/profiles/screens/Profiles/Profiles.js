import React, { Component } from 'react';
import {
   Text,
} from 'react-native-elements';
import { View , TouchableOpacity} from 'react-native';
import styles from './styles';
import { connect} from 'react-redux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {
    HeaderForeground,
    StickyHeader,
    ListProfiles
} from '../../../components';
import TwilioVoice from 'react-native-twilio-programmable-voice'
import khamApi from '../../../api/khamApi';
class Profiles extends Component {
   
    componentDidMount(){
        this.initTelephony().done();
        TwilioVoice.addEventListener('deviceReady', () => {
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaâ')
        })
        TwilioVoice.getActiveCall()
        .then(incomingCall => {
            if (incomingCall){
                _deviceDidReceiveIncoming(incomingCall)
            }
        })
    }

    async initTelephony() {
        try { 
                    const success = await TwilioVoice.initWithToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJpc3MiOiJTSzBjMDY0ZDRiYTBmMzM0MzdhN2Q1NGE3ZGIzZjc5NmMzIiwiZXhwIjoxNTEyMjA4NTkyLCJqdGkiOiJTSzBjMDY0ZDRiYTBmMzM0MzdhN2Q1NGE3ZGIzZjc5NmMzLTE1MTIyMDQ5OTIiLCJzdWIiOiJBQzA3MTY0NjZiN2MyNmNkOTZkOTI2MDcwOWZhMzFkMzBhIiwiZ3JhbnRzIjp7ImlkZW50aXR5IjoicGh1Y2RvIiwidm9pY2UiOnsib3V0Z29pbmciOnsiYXBwbGljYXRpb25fc2lkIjoiQVBkNDEzNzVjZWY3Y2M0ODNlYmJmNDVkYWJhMjcwMmRiMyJ9LCJwdXNoX2NyZWRlbnRpYWxfc2lkIjoiQ1JjZjVjMDJmMzUyNDI3ZTU2YTMyNWY0NDJjYzVjN2I3NiJ9fX0.mKbjoMv2l5Dsw00MGbH1Nzgj7HaGoP81xqID5gPHhQI') 
                    console.log(success)          
        } catch (err) {
            console.err(err)
        }
        
    }

    
    onPress() {
        TwilioVoice.connect({To: 'tuyentran'})
    }

    
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
                    <TouchableOpacity onPress={() => this.onPress()}><Text>callphone</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => {TwilioVoice.accept()}}><Text>accept</Text></TouchableOpacity>
                    
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