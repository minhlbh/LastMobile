import React, { Component } from "react";
import {View, Image} from 'react-native';
import { FormLabel, FormInput,Button, Text } from 'react-native-elements';
import { connect} from 'react-redux';
import images from '../../../config/images';
import styles from './styles';
import * as authAction from '../../auth.action';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            token: '',
        }
        this.props.authByAsyncStorage();
    }

    componentDidUpdate() {
        if (this.props.isAuthenticated) {
            this.props.navigation.navigate('Tabs');
        }
    }
    login(){
        const {username,password} = this.state;
        this.props.auth(username,password);
    }
    getLoginMess(){
        const {isLoggingIn, isAuthenticated, error} = this.props;
        if(isLoggingIn) return (<Text>loading ...</Text>);
        if(isAuthenticated) return (<Text>Đăng nhập thành công</Text>);
        if(error) return (<Text>Đăng nhập thất bại</Text>)
    }
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={images.logo} />
                </View>
                <View style={styles.formContainer}>
                    <FormLabel>ĐIỆN THOẠI</FormLabel>
                    <FormInput 
                        placeholder='Nhập số điện thoại của bạn'
                        onChangeText={(username) => this.setState({username})}
                    />
                    <FormLabel>MẬT KHẨU</FormLabel>
                    <FormInput 
                        placeholder='Nhập mật khẩu của bạn'
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({password})}
                    />
                    <View style={styles.btnGroupCointainer}>
                        <View style={styles.btnContainer} >
                            <Button 
                                icon={{name: 'done'}}
                                title='ĐĂNG NHẬP' 
                                borderRadius={4}
                                onPress={() => this.login()}
                            />
                        </View>
                        <View style={styles.btnContainer} >
                            <Button 
                                icon={{name: 'done'}}
                                title='ĐĂNG KÍ' 
                                borderRadius={4}
                            />
                        </View>  
                    </View>  
                    <View>{this.getLoginMess()}</View>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state){
    return {
        accessToken: state.auth.accessToken,
        isLoggingIn: state.auth.isLoggingIn,
        isAuthenticated: state.auth.isAuthenticated,
        error: state.auth.error
    }
}
export default connect(mapStateToProps,authAction)(Login);