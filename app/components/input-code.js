import React, { Component } from 'react';
import { StyleSheet, View,Dimensions } from 'react-native';
import {
    Text, Icon,  Button, Avatar,FormInput 
} from 'react-native-elements';
import {ErrorText} from './error-text';

export class InputCode extends Component {
    render(){
        const {onChangeTextHandler, text, error,onPress} = this.props;
        return (
            <View>
                <View style={styles.container}>
                    <Text style={styles.text}>{text}</Text>
        
                    <FormInput 
                        containerStyle={styles.textInput}
                        onChangeText={(text) => onChangeTextHandler(text)}
                        keyboardType='numeric'
                        maxLength={6}
                        selectTextOnFocus={true}
                        style={{ textAlign: 'center' }}
                    />
                    {error &&
                        <View style={{height: 30}}>
                            <ErrorText error={error} center/>
                        </View>
                    }
                    <Button 
                        fontSize={19}
                        title='Xác nhận'
                        buttonStyle={styles.btn}
                        onPress={onPress}
                    />           
                </View>
            </View>
        )
    }
}

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    textInput:{
        marginTop: 25,
        width: deviceWidth - 60,
    },
    container:{
        marginTop:deviceHeight/3.5,
        width: deviceWidth - 40,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    text:{
        marginTop: 20,
    },
    btn :{
        marginTop: 25,
        marginBottom: 25,
        borderRadius: 20,
        backgroundColor: '#575757'
    }
});
 