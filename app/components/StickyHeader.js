import React from 'react';
import {View, StyleSheet, Text } from 'react-native';

type Props = {
    name: string
}  

  
export  const  StickyHeader  = ({  name } : Props ) =>{
    return(
        <View style={styles.viewHeader}>
            <Text style={styles.generalText}>{name}</Text>
        </View>
    )
}

const styles= StyleSheet.create({
    generalText:{
        color:'black', 
        fontWeight:'bold',
        fontSize: 18
    },
    viewHeader:{
        alignSelf:'center',
        height: 40,
        justifyContent: 'center'
    }
})