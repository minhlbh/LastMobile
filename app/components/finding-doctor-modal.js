import  React, { Component } from 'react';
import {View,StyleSheet,Modal, Animated } from 'react-native';
import {
     Text,Avatar,Button
} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import images from '../config/images';
import {FadeInView} from '../components';

export class FindingDoctorModal extends Component {
    props: {
        modalVisible: boolean,
        doctorInfo: Object, 
        navigation: Object,
        close: Function
    };

    constructor() {
        super();
       
        this.state = {
          connectingAnim: new Animated.Value(150),
          doctorInfo:null,
          yPosition:  new Animated.Value(150)
        };
      }

    componentDidMount() {
        const anim1 = Animated.timing(                  
          this.state.connectingAnim,            
          {
            toValue: 250,                   
            duration: 1200,              
          }
        )
        
        const anim2 = Animated.timing(                 
          this.state.yPosition,            
          {
            toValue: 70,                   
            duration: 400,              
          }
        )
        // finalAnim = Animated.sequence([anim1,anim2])
        Animated.loop(anim1).start();
        const setDoctorInfo = ()=>{
            this.setState({doctorInfo: {
                Avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
                HoVaTen: 'Đỗ Thành Phúc' 
            }})
        }
        const stopAnimation = () => {
            anim1.stop();
            this.setState({connectingAnim: 150}) 
            anim2.start();
        }
        setTimeout(function() {
            setDoctorInfo();
            stopAnimation();
        }, 4000);
      }
    
    render() {
        const {
            modalVisible,
            onPress,
            close,
            navigation
        } = this.props;
        let { connectingAnim ,doctorInfo, yPosition} = this.state;
        
        return(
            <Modal
                animationType="fade"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {alert("Modal has been closed.")}}
                >
                <LinearGradient
                    colors={['#209EFF', '#209EFF', '#10A7BF']}
                    style={styles.container}
                >
                    <Animated.View style={[styles.animatedContainer,{paddingTop: yPosition}]}>
                        <View style={{height: doctorInfo? 150 : 250, justifyContent:'center', alignItems:'center'}}>
                        <Animated.View            
                            style={[styles.connecting,{width: connectingAnim, height: connectingAnim}]}
                        >
                            <Avatar
                                xlarge
                                rounded
                                source={doctorInfo? {uri: doctorInfo.Avatar} : images.defaultDoctor}
                                activeOpacity={0.7}
                            />
                        </Animated.View>
                        </View>
                        {doctorInfo && 
                            <FadeInView style={styles.doctorInfoContainer}>
                                <Text style={styles.name}>{doctorInfo.HoVaTen}</Text>
                                <Text style={styles.textNote}>Lưu ý: Câu trả lời trên sputnich không thể 
                                thay thế hoàn toàn việc khám chữa bệnh. Nếu cần chữa trị khẩn cấp vui lòng 
                                liên hệ các cơ sở y tế gần nhất</Text>
                                <Text style={styles.textNote}>Lưu ý: Câu trả lời trên sputnich không thể 
                                thay thế hoàn toàn việc khám chữa bệnh. Nếu cần chữa trị khẩn cấp vui lòng 
                                liên hệ các cơ sở y tế gần nhất</Text>
                                <Button
                                    title='Gặp bác sĩ' 
                                    buttonStyle={styles.btn}
                                    onPress={() => {
                                        navigation.navigate('Chat');
                                        close();
                                    }}
                                    backgroundColor='white'
                                    color='#209EFF'
                                    fontSize={16}
                                />
                            </FadeInView>
                        }
                    </Animated.View>
                    <View style={styles.noteContainer}>
                        <Text style={styles.textNote}>Lưu ý: Câu trả lời trên sputnich không thể 
                        thay thế hoàn toàn việc khám chữa bệnh. Nếu cần chữa trị khẩn cấp vui lòng 
                        liên hệ các cơ sở y tế gần nhất</Text>
                    </View>
                </LinearGradient>
            </Modal>                 
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    connecting: {
        borderRadius: 150,
        borderWidth: 1,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    animatedContainer:{
        flex: 5,
        alignItems: 'center',
    },
    noteContainer:{
        flex: 1,
        justifyContent: 'flex-end',
        padding: 10
    },
    textNote: {
        color: 'white'
    },
    doctorInfoContainer:{
        padding: 20,
        alignItems: 'center'
    },
    btn:{
        marginTop: 20,
        borderRadius: 24,
        width: 200,
    },
    name: {
        fontSize: 22,
        color: 'white',

    }
})