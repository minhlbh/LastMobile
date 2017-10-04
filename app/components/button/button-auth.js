import React from 'react';
import { StyleSheet, View,TouchableOpacity ,Text,Dimensions} from 'react-native';
import {Loading } from '../index';
var deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    buttonView: {
        opacity: 0.7,
        width: deviceWidth - 50,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'white',
        marginTop: 10
    },
    button: {
        alignSelf: 'center'
    },
    title:{ 
        fontSize: 17, 
        color: 'white' 
    }
});


type Props = {
    isPending: boolean,
    onPress: Function,
    title: string
}  

export const ButtonAuth= ({isPending ,onPress, title} : Props) =>{
  return (
    <TouchableOpacity style={styles.button}
        onPress={onPress}
        disabled={isPending}
    >
    
        <View style={styles.buttonView}>
        {!isPending? 
            <Text style={styles.title}>{title}</Text> :
            <Loading animating={isPending} color='white' /> }
        </View>
    
    </TouchableOpacity>
  )
}
