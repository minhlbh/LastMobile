import React, { Component } from 'react';
import {
   Text,Icon,Header
} from 'react-native-elements';
import {
    View, TouchableOpacity
} from 'react-native';
import { GiftedChat,Actions } from 'react-native-gifted-chat';
import { connect} from 'react-redux';
import styles from './styles';
import khamApi from '../../../api/khamApi';
var ImagePicker = require('react-native-image-picker');

class Chat extends Component {
    state = {
        messages: [],
    };

    // {
    //     _id: 1,
    //     text: 'Hello developer',
    //     createdAt: new Date(),
    //     image:  'https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg',
    //     user: {
    //       _id: 2,
    //       name: 'React Native',
    //       avatar: 'https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg',
    //     },
    //   }
    constructor(props){
        super(props)
        const {idGap, userId,accessToken} =  this.props;
        khamApi.listChatMes(idGap, accessToken).then((res) =>{
            if(res.DsChat){
                var DsChat = res.DsChat;
                DsChatMes.map((mes) => {
                    if(mes.UserId === userId){
                        var message = {
                            _id: this.state.messages.length + 1,
                            text: mes.NoiDung,
                            createdAt: mes.ThoiGian,
                            user:{
                                _id: 1,
                                name: mes.HoVaTen,
                                avatar: mes.Avatar
                            }
                        }
                        this.setState((previousState) => ({
                            messages: GiftedChat.append(previousState.messages, message),
                        }));
                    }else {
                        var message = {
                            _id: this.state.messages.length + 1,
                            text: mes.NoiDung,
                            createdAt: mes.ThoiGian,
                            user:{
                                _id: 2,
                                name: mes.HoVaTen,
                                avatar: mes.Avatar
                            }
                        }
                        this.setState((previousState) => ({
                            messages: GiftedChat.append(previousState.messages, message),
                        }));
                    }
                })
            }
        })
    }
    componentDidMount(){
        this.props.proxy.on('chat', (idGap, vai, name, userId, avatar, time, mess) => {
            if(idGap === this.props.idGap){
                if(userId === this.props.userId){
                    var message = {
                        _id: this.state.messages.length + 1,
                        text: mess,
                        createdAt: time,
                        user:{
                            _id: 1,
                            name: name,
                            avatar: avatar
                        }
                    }
                    this.setState((previousState) => ({
                        messages: GiftedChat.append(previousState.messages, message),
                    }));
                }else {
                    var message = {
                        _id: this.state.messages.length + 1,
                        text: mess,
                        createdAt: time,
                        user:{
                            _id: 2,
                            name: name,
                            avatar: avatar
                        }
                    }
                    this.setState((previousState) => ({
                        messages: GiftedChat.append(previousState.messages, message),
                    }));
                }
            }
        });
    }
    onSend(messages = []) {
        for (let i = 0; i < messages.length; i++) {
            this.props.proxy.invoke('sendChat',this.props.idGap ,messages[i].text)
            .done((directResponse) => {
                console.log('sendChat', directResponse);
            }).fail((e) => {
                    console.warn('sendChat loi',e)
            });  
        }
        this.setState((previousState) => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }));
        
    }

    pickImage = () =>{
        var options = {
            title: 'Chọn ảnh cho bác sĩ xem',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        console.log('aaaaaa')
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                var message = {
                    _id: this.state.messages.length + 1,
                    createdAt: new Date(),
                    image: response.uri ,
                    user:{
                        _id: 1,
                    }
                }
                this.setState((previousState) => ({
                    messages: GiftedChat.append(previousState.messages, message),
                  }));
            }
        });
    }
    
    renderCustomActions(props) {
        const options = {
          'Chọn ảnh': (props) => {
            props.pickImage()
          },
          'Chọn tệp': () => {
            alert('tệp đc chọn');
          },
          'Hủy': () => {},
        };
        return (
          <Actions
            {...props}
            options={options}
          />
        );
      }

    _renderLeftHeader(){
        return (
            <Icon
                name='keyboard-arrow-left'
                color='black' 
                onPress={() =>this.props.navigation.goBack()}
            />
        )
    }

    _renderCenterHeader(){
        return (
               <TouchableOpacity style={{flexDirection: 'row'}}>
                    <Icon
                        name='dot-single'
                        color='blue' 
                        type='entypo'
                    />
                    <Text style={styles.headerTitle}>{this.props.dichVuDetail.TenBacSi}</Text>
               </TouchableOpacity>
        )
    }

    _renderRightHeader(){
        return (
            <Icon
                name='videocam'
                color='black' 
                onPress={() =>{}}
            />
        )
    }

    renderFooter(props) {
          return (
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>
                Bác sĩ đang trả lời ...
              </Text>
            </View>
          );
      }
    render(){
        return (
            <View style={styles.container}>
                <Header 
                    outerContainerStyles={{height: 50}}
                    leftComponent={this._renderLeftHeader()}
                    centerComponent={this._renderCenterHeader()} 
                    rightComponent={this._renderRightHeader()}
                />
                <View style={{ flex: 1, marginTop: 50}}>
                    <GiftedChat
                        pickImage={this.pickImage}
                        messages={this.state.messages}
                        onSend={(messages) => this.onSend(messages)}
                        user={{
                            _id: 1,
                        }}
                        isAnimated={true}
                        placeholder='Nhập tin nhắn'
                        renderAvatarOnTop={true}
                        renderActions={this.renderCustomActions}
                        isLoadingEarlier = {true}
                        renderFooter={this.renderFooter}
                    />
                </View>
            </View>
        )
    }
}
function mapStateToProps(state){
    return {
        idGap: state.kham.idGap,
        proxy: state.kham.proxy,
        userId: state.kham.userId,
        accessToken: state.auth.accessToken,    
        dichVuDetail: state.kham.dichVuDetail    
    }
}
export default connect(mapStateToProps)(Chat);