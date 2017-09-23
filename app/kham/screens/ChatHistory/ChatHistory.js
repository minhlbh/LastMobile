import React, { Component } from 'react';
import {
   Text, Header,Icon
} from 'react-native-elements';
import {
    View
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';;
import { connect} from 'react-redux';
import styles from './styles';
import khamApi from '../../../api/khamApi';
import {FixedHeader} from '../../../components';
class ChatHistory extends Component {
    state = {
        messages: [],
        idGap: '',
    };
    
    constructor(props) {
        super(props);
        var idGap = this.props.navigation.state.params.idGap
        khamApi.listChatMes(idGap, this.props.accessToken).then((res) => {
            console.log(res)
            if(res.Gap.DsChatMes){
                var DsChatMes = res.Gap.DsChatMes;
                console.log(DsChatMes)
                DsChatMes.map((mes) => {
                    if(mes.Vai == "Bác sĩ"){
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
                    } else {
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
                    }
                });
            }
        })
    }
    
    componentWillMount() {
        var idGap = this.props.navigation.state.params.idGap;
        // SignalR.proxy.on('nguoiDungMobileVaoGap_DaVaoDuoc', (IdGap) => {
        //     console.log('nguoiDungMobileVaoGap_DaVaoDuoc',IdGap)
        // });
        this.props.proxy.on('loadUserOnline', (IdGap,Mes) => {
            console.log('loadUserOnline',IdGap,Mes)
        }); 
        this.setState({idGap}); 
        this.props.proxy.invoke('nguoiDungMobileVaoGap', idGap).done((directResponse) => {
            console.log('direct-response-from-server-nguoiDungMobileVaoGap', directResponse);
        }).fail((e) => {
            console.warn('nguoiDungMobileVaoGap loi',e)
        });  
    }
    componentDidMount(){
        this.props.proxy.on('chat', (Vai, HoVaTen, UserId, Avatar, ThoiGian, NoiDung) => {
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
            this.props.proxy.invoke('sendChat',this.state.idGap ,messages[i].text)
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

    _renderLeftHeader(){
        return (
            <Icon
                name='keyboard-arrow-left'
                color='black' 
                onPress={() =>this.props.navigation.goBack()}
            />
        )
    }
    render(){
        return (
            <View style={styles.container}>
                <Header 
                    outerContainerStyles={{height: 45}}
                    leftComponent={this._renderLeftHeader()}
                    centerComponent={{ text: 'BS: Lê Bá Hồng Minh', style: { color: 'black', fontSize: 18, fontWeight: 'bold' } }} 
                    rightComponent={{ icon: 'event-note', color: 'black' }}
                />
                <View style={{ flex: 1, marginTop: 45}}>
                    <GiftedChat
                        messages={this.state.messages}
                        onSend={(messages) => this.onSend(messages)}
                        user={{
                        _id: 1,
                        }}
                    />     
                </View>             
            </View>
        )
    }
}
function mapStateToProps(state){
    return {
        //idGap: state.user.user.IdGap,
        accessToken: state.auth.accessToken,
        proxy: state.kham.proxy
        
    }
}
export default connect(mapStateToProps)(ChatHistory);