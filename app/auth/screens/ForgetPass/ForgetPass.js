import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet
} from 'react-native';
import { FormInput } from 'react-native-elements';
import accountApi from '../../../api/accountApi';

class ForgetPass extends Component {
    constructor(props){
        super(props);
        this.state = {
            phone : '',
            isPendding: false,

        };
    }
    
    forgetPass(){
        const { phone } = this.state;
        if (phone ) {
            accountApi.forgotPassword(phone).then((res) => {
                alert(res);
            });
        }
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', zIndex: 0 , backgroundColor: 'white'}}>
                <View style={styles.container}>

                    <Text style={{ fontSize: 15, marginBottom: 10 }}>Nhập số điện thoại để nhận mã xác thực</Text>

                    <View style={{ width: 200 }}>
                        <FormInput
                            keyboardType='numeric'
                            onChangeText= {(phone) => this.setState({phone})}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <TouchableOpacity style={{ marginLeft: -10 }}
                            onPress={() => this.forgetPass()}
                        >
                            <View style={styles.button1}>
                                <Text style={styles.buttonText1}> Nhận mã</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginLeft: 30 }}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText2}> Quay lại</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button1: {
        borderWidth: 1.5,
        borderColor: '#5198D0',
        backgroundColor: 'white',
        borderRadius: 20,
        width: 100,
        height: 40,
    },
    buttonText1: {
        color: '#0E81FF',
        paddingTop: 5,
        paddingLeft: 8,
        fontSize: 18,
    },
    buttonText2: {
        color: '#686868',
        paddingTop: 5,
        paddingLeft: 15,
        fontSize: 18,
    },
    container: {
        height: 170,
        width: 300,
        paddingLeft: 10,
        paddingRight: 10,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#5198D0',
        alignItems: 'center',
        backgroundColor: 'white'
    }
});

export default ForgetPass;