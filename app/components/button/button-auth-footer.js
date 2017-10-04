import React from 'react';
import { StyleSheet, View,TouchableOpacity,Text,Dimensions} from 'react-native';
import {Loading } from '../index';
var deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    button:{
        height: 40, 
        justifyContent: 'center'
    },
    textView: {
        color: 'white',
        zIndex: 2,
        position: 'absolute',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%'
    },
    footer: {
        backgroundColor: 'white',
        opacity: 0.1,
        height: 60,
    }, 
    text:{
        color: 'white'
    }
});


type Props = {
    onPress: Function,
    text: string,
    textBold: string
}  

export const ButtonAuthFooter= ({onPress, text, textBold} : Props) =>{
  return (
    <TouchableOpacity style={styles.button}
        onPress={onPress}
    >
        <View style={styles.footer}>
           
        </View>
        <View style={styles.textView}>
        <Text style={styles.text}>{text}</Text>
        {textBold && <Text style={[styles.text, { fontWeight: 'bold' }]}> {textBold}</Text>}
        </View>
    </TouchableOpacity>
  )
}
