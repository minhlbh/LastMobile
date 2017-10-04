import React from 'react';
import { StyleSheet, View,TouchableOpacity,Image } from 'react-native';
import {Icon, Text} from 'react-native-elements';

const styles = StyleSheet.create({
  container:{
    alignItems: 'center'
  }, 
  image:{
    height: 90, 
    width: 90,
  }
});


type Props = {
  info: Object,
  onPress: Function
}  

export const EmtyList= ({info ,onPress} : Props) =>{
  return (
    <View style={styles.container}>
      <Image 
        source={info.image}
        style={styles.image}
      />
      <Text>{info.text1}</Text> 
      {info.text2 && <Text> {info.text2}</Text>}
      <TouchableOpacity style={{flexDirection: 'row', marginTop: 10}}
        onPress={onPress}  
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
    </View>
  )
}

  // EmtyList.propTypes = {
  //   info: React.PropTypes.object.isRequired,
  //   onPress: React.PropTypes.func.isRequired,
  // };