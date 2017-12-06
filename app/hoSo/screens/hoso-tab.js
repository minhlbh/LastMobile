import React, { Component } from 'react';
import { View, Text ,StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container :{
        flex: 1,
        backgroundColor: 'white' 
    }
})

export default class HoSoTab extends Component {
    state = {  }
    render() {
        return (
            <View style={styles.container}>
                <Text>Ho So</Text>
            </View>  
        );
    }
}

