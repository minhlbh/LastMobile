import React from 'react';
import { StyleSheet, View,TouchableOpacity } from 'react-native';
import {Icon, Text} from 'react-native-elements';

const styles = StyleSheet.create({
  container:{
    alignItems: 'center'
  }
});

export const EmtyList= ({info ,onPress} = this.props) =>
  <View style={styles.container}>
    <Icon size={90} name={info.mainIconName} type={info.mainIconType} color={info.color} />
    <Text>{info.text1}</Text> 
    {info.text2 && <Text> {info.text2}</Text>}
    <TouchableOpacity style={{flexDirection: 'row', marginTop: 10}}
      onPress={() => onPress()}  
    >
            <Icon 
                name={info.btnIconName} 
                type={info.btnIconType} 
                color={info.color} 
                style={{marginRight: 5}}
                size= {30}
            />
            <Text style={{color: info.color, fontSize:17}}>{info.btnText}</Text>
    </TouchableOpacity>
  </View>;
