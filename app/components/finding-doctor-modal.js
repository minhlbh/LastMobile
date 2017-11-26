import  React, { Component } from 'react';
import {View,StyleSheet,Modal, Animated } from 'react-native';
import {
     Text,Avatar,Button
} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import images from '../config/images';
import {FadeInView} from '../components';
import { setInterval } from 'core-js/library/web/timers';
import { chonBacSi } from '../kham/kham.action';

export class FindingDoctorModal extends Component {
    props: {
        modalVisible: boolean,
        doctorInfo: Object, 
        chonBacSi: Function,
        close: Function,
        isPendingFindDoctor: boolean
    };

    constructor() {
        super();
       
        this.state = {
          connectingAnim: new Animated.Value(150),
          doctorInfo: null,
          yPosition:  new Animated.Value(150),

        };
      }

    animation(){
        const anim1 = Animated.timing(                  
            this.state.connectingAnim,            
            {
              toValue: 250,                   
              duration: 1200,              
            }
          )
          
         
  
        Animated.loop(anim1).start();
    }
    componentDidMount() {
        this.animation()
        // const anim1 = Animated.timing(                  
        //   this.state.connectingAnim,            
        //   {
        //     toValue: 250,                   
        //     duration: 1200,              
        //   }
        // )
        
        // const anim2 = Animated.timing(                 
        //   this.state.yPosition,            
        //   {
        //     toValue: 70,                   
        //     duration: 400,              
        //   }
        // )

        // anim1.start(()=> {

        // })
        // const {
        //     doctorInfo,
        //     isPendingFindDoctor,
        // } = this.props;
        // const setDoctorInfo = ()=>{
        //     this.setState({doctorInfo})
        // }
        // const stopAnimation = () => {
        //     anim1.stop();
        //     this.setState({connectingAnim: 150}) 
        //     anim2.start();
        // }
       
        // setInterval(function(){ 
        //     if(this.state.doctorInfo){
        //         stopAnimation();
        //     }
        // }, 1000);

        // if(doctorInfo){
        //     console.log('dsadsadsadsadasdsada', doctorInfo)
        // // } else {
        //     this.setState({doctorInfo: doctorInfo});
        //     anim1.stop();
        //     this.setState({connectingAnim: 150}) 
        //     anim2.start();            
        // }
    }
    
    render() {
        const {
            modalVisible,
            onPress,
            close,
            chonBacSi,
            doctorInfo
        } = this.props;
        let { connectingAnim , yPosition} = this.state;
        if(doctorInfo) {
            const anim2 = Animated.timing(                 
                this.state.yPosition,            
                {
                  toValue: 70,                   
                  duration: 400,              
                }
            )
            anim2.start()
        }
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
                                <Text style={styles.name}>{doctorInfo.TenBacSi}</Text>
                                <Text style={styles.textNote}>{doctorInfo.TenDichVu}</Text>
                                <Text style={styles.textNote}>{doctorInfo.GioiThieuNhanh}</Text>
                                <Text style={styles.name}>Giá tư vấn: {doctorInfo.Gia} đ</Text>
                                <Button
                                    title='Gặp bác sĩ' 
                                    buttonStyle={styles.btn}
                                    onPress={() => {
                                        chonBacSi();
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