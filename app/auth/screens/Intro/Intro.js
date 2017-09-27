import React, { Component } from 'react';
import {
    View, Text, Image, AsyncStorage
} from 'react-native';
import styles from './styles';
import AppIntro from 'react-native-app-intro';
import {
    Button
} from 'react-native-elements';
import images from '../../../config/images';
import { connect } from 'react-redux';
import * as authAction from '../../auth.action';

class Intro extends Component {
    // nút Skip
    onSkipBtnHandle = (index) => {
        this.props.navigation.navigate('LoginStack')
    }
    // nútDone
    doneBtnHandle = () => {
        this.props.navigation.navigate('LoginStack')
    }
    // nútNext
    // nextBtnHandle = (index) => {
    //     alert('Next');
    //     console.log(index);
    // }

    // onSlideChangeHandle = (index, total) => {
    //     console.log(index, total);
    // }

    componentWillMount() {
        //AsyncStorage.getItem('access_token').then((token) => {
        this.props.authByAsyncStorage();
        //})
    }
    componentDidUpdate() {
        if (this.props.isAuthenticated) {
            this.props.navigation.navigate('Tabs');
        }
    }
    render() {
        return (
            <View style={styles.container}>

                {/* Intro */}
                <View style={{ zIndex: 1, position: 'absolute' }}>
                    <AppIntro
                        dotColor={'#adadad'}
                        activeDotColor={'#10A5BD'}
                        rightTextColor={'#353839'}
                        leftTextColor={'#353839'}
                        onNextBtnClick={this.nextBtnHandle}
                        onDoneBtnClick={this.doneBtnHandle}
                        onSkipBtnClick={this.onSkipBtnHandle}
                        onSlideChange={this.onSlideChangeHandle}
                    >
                        <View style={[styles.slide, { backgroundColor: 'white' }]}>
                            <View style={{ width: 150, height: 150, marginBottom: 50 }}>
                                <Image source={images.logo}
                                    style={{ width: 150, height: 150, }} />
                            </View>

                            {/*Screen1 */}
                            <View level={10} style={{ alignItems: 'center' }}>
                                <Text level={15} style={styles.textFirstPage}>Chào mừng bạn đến với</Text>
                                <Text level={20} style={styles.textFirstPage}>Trưởng khoa!</Text>
                            </View>

                            {/*Screen2 */}
                        </View>
                        <View style={[styles.slide, { backgroundColor: '#468499' }]}>
                            <View style={{ width: 200, height: 200, marginBottom: 50 }}>
                                <Image source={{ uri: 'https://us.123rf.com/450wm/rastudio/rastudio1602/rastudio160203754/52372571-a-happy-doctor-with-stethoscope-and-a-file-on-the-background-of-hospital-ward-vector-flat-design-ill.jpg' }}
                                    style={{ width: 200, height: 200, }} />
                            </View>
                            <View level={15}><Text style={styles.text}>Hệ thống bác sĩ chuyên nghiệp,</Text></View>
                            <View level={-15}><Text style={styles.text}> có nhiều năm kinh nghiệm</Text></View>
                        </View>

                        {/* Screen3 */}
                        <View style={[styles.slide, { backgroundColor: '#fa931d' }]}>
                            <View style={{ width: 200, height: 200, marginBottom: 50 }}>
                                <Image source={{ uri: 'https://cdn2.iconfinder.com/data/icons/medical-flat-icons-part-2/513/83-512.png' }}
                                    style={{ width: 200, height: 200, }} />
                            </View>
                            <View level={15}><Text style={styles.text}>Liên lạc với bác sĩ nhanh chóng,</Text></View>
                            <View level={-15}><Text style={styles.text}>hiệu quả</Text></View>
                        </View>
                    </AppIntro>
                </View>

                {/* Button */}
                <View style={styles.buttonView}>
                    <Button
                        title='Đăng nhập'
                        fontSize={18}
                        buttonStyle={styles.button}
                        onPress={() => this.props.navigation.navigate('LoginStack')}
                    />
                    <Button
                        title='Đăng kí'
                        fontSize={18}
                        buttonStyle={styles.button}
                        onPress={() => this.props.navigation.navigate('Register')}
                    />
                </View>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}
export default connect(mapStateToProps, authAction)(Intro);