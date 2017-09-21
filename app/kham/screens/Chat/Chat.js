import React, { Component } from 'react';
import {
   Text
} from 'react-native-elements';
import {
    View
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import SignalR from '../../SignalR';
import { connect} from 'react-redux';

class Chat extends Component {
    state = {
        messages: [],
    };
    
    componentDidMount(){
        SignalR.proxy.on('chat', (Vai, HoVaTen, UserId, Avatar, ThoiGian, NoiDung) => {
             if(Vai == "Bác sĩ"){
                console.log(Vai, HoVaTen, UserId, Avatar, ThoiGian, NoiDung)
                var message = {
                    _id: this.state.messages.length + 1,
                    text: NoiDung,
                    createdAt: ThoiGian,
                    user:{
                        _id: 2,
                        name: HoVaTen,
                        avatar: Avatar
                    }
                }
                this.setState((previousState) => ({
                    messages: GiftedChat.append(previousState.messages, message),
                }));
             }
        });
    }
    onSend(messages = []) {
        for (let i = 0; i < messages.length; i++) {
            SignalR.proxy.invoke('sendChat',this.props.idGap ,messages[i].text)
            .done((directResponse) => {
                console.log('direct-response-from-server-upAnh', directResponse);
            }).fail((e) => {
                    console.warn('up anh loi',e)
            });  
        }
        this.setState((previousState) => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }));
        
    }
    render(){
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={(messages) => this.onSend(messages)}
                user={{
                _id: 1,
                }}
            />
        )
    }
}
function mapStateToProps(state){
    return {
        idGap: state.user.user.IdGap,
    }
}
export default connect(mapStateToProps)(Chat);